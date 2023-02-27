<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Vue3DraggableResizable v-if="sign64 == null && tool.tool_name != 'Textarea'" :key="tool.id"
    :initH="tool.tool_name != 'Photo' ? 30 : 100" :initW="Number(tool.tool_width)" :x="Number(tool.tool_pos_left)"
    :y="Number(tool.tool_pos_top)" v-model:x="x" v-model:y="y" :parent="true" :draggable="profile?.id != null"
    :resizable="false" @drag-end="dragEnd($event, tool)" class="image-area" :handles="['tl', 'tr', 'bl', 'br']"
    :class="tool.tool_class">
    <div @click="getUserId(tool)" class="h-100">
      <div v-if="tool.tool_name == 'Photo'">
        <img src="@/assets/noimage.png" class="img-fluid" alt="Preview" />
      </div>
      <div v-if="tool.tool_name == 'Signature'"
        class="bg-fill w-100 h-100 d-flex justify-content-center align-items-center">
        {{ tool.tool_name }}
      </div>
    </div>

    <span class="drag-me">
      <span title="Drag" class="btn btn-xs btn-secondary rounded-0 movement">
        <MoveIcon />
      </span>

      <span v-if="profile?.id" title="Remove" class="btn btn-xs btn-secondary rounded-0 remove"
        @click="remove({ id: tool.id, can_delete: tool.can_delete_tool })">
        <DeleteIcon />
      </span>
    </span>
  </Vue3DraggableResizable>
  <Vue3DraggableResizable v-else :initH="Number(tool.tool_height)" :initW="Number(tool.tool_width)" :minW="70"
    :minH="30" :x="Number(tool.tool_pos_left)" :y="Number(tool.tool_pos_top)" :parent="true" v-model:x="x" v-model:y="y"
    v-model:h="toolHeight" v-model:w="toolWidth" :draggable="tool.allow_signature || profile?.id != null"
    :resizable="tool.allow_signature || profile?.id != null" @drag-end="dragEnd($event, tool)"
    @resize-end="resizeEnd(tool, toolWidth, toolHeight)"
    :class="[tool.tool_name == 'Textarea' ? 'text-wrapper z-indexed' : 'image-area']"
    :handles="['tl', 'tr', 'bl', 'br']" class-name-active="active-class" class-name-dragging="dragging-class"
    class-name-handle="handle-class" class-name-resizing="resizing-class">
    <textarea v-if="tool.tool_name == 'Textarea'" v-model="tool.value" class="textareaTool h-100"
      :data-id="tool.id" @blur="textInput($event.target, x, y)" placeholder="Input text here"
      :readonly="!tool.allow_signature && !profile?.id ? true : false"
      style="border: none; outline: none; font-weight: 500; transition: width 0.25s;color:#000!important;"></textarea>
    <!-- <input v-if="tool.tool_name == 'Textarea'" type="text" v-model="tool.value" class="textareaTool h-100"
      :data-id="tool.id" @blur="textInput($event.target, x, y)" placeholder="Input text here"
      :readonly="!tool.allow_signature && !profile?.id ? true : false"
      style="border: none; outline: none; font-weight: 500; transition: width 0.25s;color:#000!important;" /> -->
    <template v-else>
      <div class="grid" v-if="isToolLoading.id == tool.id && isToolLoading.active">
        <span class="spinner-border" role="status"></span>
      </div>
      <img v-else :src="b64" @contextmenu.prevent="false" style="object-fit: scale-down" />
    </template>

    <span class="drag-me">
      <template v-if="tool.allow_signature || profile?.id">
        <span title="Drag" class="btn btn-xs btn-secondary rounded-0 movement">
          <MoveIcon />
        </span>
        <span v-if="tool.tool_name != 'Textarea'" title="Edit" class="btn btn-xs btn-secondary rounded-0 edit"
          @click="getUserId(tool)">
          <EditIcon />
        </span>
      </template>

      <span v-if="profile?.id" title="Remove" class="btn btn-xs btn-secondary rounded-0 remove"
        @click="remove({ id: tool.id })">
        <DeleteIcon />
      </span>
    </span>
  </Vue3DraggableResizable>

  <Teleport to="body">
    <ModalComp :show="affixModal" :footer="false" @close="affixModal = false">
      <template #header>
        <h4 class="modal-title">Create your signature</h4>
      </template>

      <template #body>
        <LeftTabWrapper>
          <LeftTabList title="Draw">
            <SignaturePad @close="swapModal" />
          </LeftTabList>

          <LeftTabList title="Select">
            <SignatureSelectFull @close="swapModal" />
          </LeftTabList>

          <LeftTabList title="Initial">
            <SignatureSelectInitial @close="swapModal" />
          </LeftTabList>

          <LeftTabList title="Upload">
            <div class="row">
              <div class="col-md-12 mx-auto position-relative">
                <SignatureUpload @close="swapModal" />
              </div>
            </div>
          </LeftTabList>
        </LeftTabWrapper>
        <div class="row">
          <div class="col-md-10 ms-auto mt-2">
            <p class="fw-normal">
              By clicking create, I agree that all signatures, marks or initials created
              here are as valid as my hand written signature to the extent allowed by law.
            </p>
          </div>
        </div>
      </template>
    </ModalComp>
  </Teleport>

  <Teleport to="body">
    <ModalComp :show="signatureListModal" :footer="false" :size="'modal-sm'" @close="signatureListModal = false">
      <template #header>
        <h4 class="modal-title">Signature box</h4>
      </template>

      <template #body>
        <SignatureList @selectedSignature="savePrint" />
      </template>
    </ModalComp>
  </Teleport>

  <Teleport to="body">
    <ModalComp :show="uploadImage" :footer="false" :size="'modal-md'" @close="uploadImage = false">
      <template #header>
        <h4 class="modal-title">Image management</h4>
      </template>

      <template #body>
        <PassportPhotograph @close="uploadImage = false" @selectedPassport="savePrint" />
      </template>
    </ModalComp>
  </Teleport>
</template>

<script setup>
import ModalComp from "@/components/ModalComp.vue";
import SignaturePad from "@/components/Signature/SignaturePad.vue";
import SignatureSelectFull from "@/components/Signature/SignatureTextFull.vue";
import SignatureSelectInitial from "@/components/Signature/SignatureTextInitial.vue";
import SignatureUpload from "@/components/Signature/SignatureUpload.vue";
import SignatureList from "@/components/Signature/SignatureList.vue";
import LeftTabList from "@/components/Tab/TabLeftNav/LeftTabList.vue";
import LeftTabWrapper from "@/components/Tab/TabLeftNav/LeftTabWrapper.vue";
import PassportPhotograph from "@/components/Passport/PassportPhotograph.vue";
import MoveIcon from "@/icons/MoveIcon.vue";
import EditIcon from "@/icons/EditIcon.vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";

import { useDragResizeComposable } from "@/composables/useDragResize";
import { useConvertToBase64Composable } from "@/composables/useDataURL";

import { ref, defineProps, defineEmits, watch, onMounted } from "vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";

const { dragEnd, resizeEnd } = useDragResizeComposable();
const { toBase64 } = useConvertToBase64Composable();

const props = defineProps({ tool: Object, owner: Object });

const { link, profile, isToolLoading } = useGetters({
  profile: "auth/profile",
  isToolLoading: "signLink/isToolLoading",
  link: "signLink/link",
});

const { editTools, editPublicTools } = useActions({
  editTools: "signLink/editTools",
  editPublicTools: "signLink/editPublicTools",
});

const toolWidth = ref(0);
const toolHeight = ref(0);
const sign64 = ref(props.tool.value);
const b64 = ref("");
watch(
  () => props.tool,
  (newTool) => {
    toolWidth.value = Number(newTool.tool_width);
    toolHeight.value = Number(newTool.tool_height);

    if (
      (sign64.value == null && newTool.value_file_url.split(".").includes("png")) ||
      (newTool.tool_name == "Textarea" && newTool.value != null)
    ) {
      sign64.value = newTool?.value;
    }

    if (sign64.value != null) {
      toBase64(newTool?.value_file_url, (dataUrl) => {
        if (dataUrl != "") {
          b64.value = dataUrl;
        }
      });
    }
  }
);

const x = ref(Number(props.tool.tool_pos_left));
const y = ref(Number(props.tool.tool_pos_top));

const affixModal = ref(false);
const signatureListModal = ref(false);
const initialModal = ref(false);
const uploadImage = ref(false);
const toolId = ref(null);

const swapModal = () => {
  affixModal.value = false;
  signatureListModal.value = true;
};

const getUserId = (params) => {
  if (params.tool_name == "Initial") initialModal.value = true;
  if (params.tool_name == "Signature") affixModal.value = true;
  if (params.tool_name == "Photo") uploadImage.value = true;

  toolId.value = params.id;
};

const textInput = (e) => {
  toolId.value = e.dataset.id;

  const dataInputObj = {
    category: "Textarea",
    tool_height: toolHeight.value.toString(),
    tool_name: "Textarea",
    tool_width: textWidth.value.toString(),
    type: "Text",
    value: e.value,
  };
  savePrint(dataInputObj);
};

const savePrint = (params) => {
  if (params.category == "Draw") {
    params.tool_width = "100";
    params.tool_height = "50";
  } else if (params.category == "Type") {
    params.tool_width = "150";
    params.tool_height = "40";
  } else if (params.category == "Initial") {
    params.tool_width = "80";
    params.tool_height = "40";
  } else if (params.tool_name == "Signature" && params.category == "Upload") {
    params.tool_width = "100";
    params.tool_height = "62";
  } else if (params.tool_name == "Photo") {
    params.tool_width = "100";
    params.tool_height = "100";
  }

  const dataObj = {
    allow_signature: false,
    document_id: props.tool?.document_id ?? link.value.id,
    document_upload_id: props.tool?.document_upload_id,
    id: props.tool?.id,
    signed: false,
    tool_class:
      params.tool_name == "Photo"
        ? "main-element photo-style"
        : params.tool_name == "Textarea"
          ? "main-element"
          : "tool-box main-element",
    tool_height: params.tool_height,
    tool_name: params.tool_name,
    tool_pos_left: props.tool.tool_pos_left,
    tool_pos_top: props.tool.tool_pos_top,
    tool_width: params.tool_width,
    // type: params.type,
    // category: params.category,
    value: params.value ?? params.inputVal,
  };

  if (profile.value?.id != undefined) {
    editTools({ id: toolId.value, payload: dataObj });
  } else {
    editPublicTools({ id: toolId.value, payload: dataObj });
  }
  affixModal.value = signatureListModal.value = uploadImage.value = false;
};

const emit = defineEmits(["remove"]);
const remove = (params) => {
  emit("remove", params);
};

const textWidth = ref(120)
const autoResize = {
  minWidth: 120,
  maxWidth: 500,
  buffer: 55,

  resize: function (el) {
    const test = document.createElement('pre');
    test.className = 'input-test';
    test.innerHTML = el.value;
    el.parentNode.appendChild(test);
    const calculatedWidth = Math.min(Math.max(test.offsetWidth + this.buffer, this.minWidth), this.maxWidth)
    el.parentElement.style.width = el.style.width = calculatedWidth + 'px';
    textWidth.value = calculatedWidth
    el.parentNode.removeChild(test);
  },

  init: function () {
    let els = document.getElementsByClassName('textareaTool'),
      i = els.length;

    while (i--) {
      els[i].addEventListener('keydown', function () {
        autoResize.resize(this);
      }, false);

      els[i].addEventListener('keyup', function () {
        autoResize.resize(this);
      }, false);

      this.resize(els[i]);
    }
  }
};

onMounted(() => {
  autoResize.init();

  if (sign64.value != null) {
    toBase64(props.tool.value_file_url, (dataUrl) => {
      if (dataUrl != "") {
        b64.value = dataUrl;
      }
    });
  }
});
</script>

<style>
.input-test {
  display: inline;
  visibility: hidden;
}
</style>

<style scoped>
.z-indexed {
  z-index: 1;
}

.grid {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
  font-size: 12px;
}
</style>
