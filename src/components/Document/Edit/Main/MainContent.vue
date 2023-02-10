<template>
  <div class="content-right border-0">
    <div @click="$emit('open', (openSide = true))" class="d-none sidebar-toggle d-block d-lg-none ms-1 my-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="feather feather-menu font-medium-5">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>

    <div class="content-body">
      <div class="body-content-overlay" :class="{ show: dashboard.isOpened }" @click="dashboard.setIsOpened(false)">
      </div>
      <div class="email-app-list">
        <div class="email-user-list">
          <!-- <div class="email-user-list ps ps--active-y"> -->
          <div class="card shadow-none bg-light">
            <div class="card-body shadow-none p-1">
              <InternetAccess />

              <p v-if="theDoc.title">Title: {{ theDoc.title }}</p>
              <div id="mainWrapper" class="mx-auto" :style="{ width: '830px' }">
                <RenderPDFDoc v-for="doc in sortedFile" :key="doc.id" :file="doc.file_url"
                  @click="$emit('docId', doc.id)" @pageId="getPageId" @documentHeight="getHeight">
                  <template #document-tools>
                    <template v-if="theTools?.length != 0 && documentHeight">
                      <div v-for="tool in activeTaskFilter(theTools, doc.id)" :key="tool.id" class="parent"
                        :style="{ height: documentHeight + 'px' }">
                        <ToolAnnotation @remove="remove" :tool="tool"
                          :owner="{ isOwner: theDoc.is_the_owner_of_document }" />
                      </div>
                    </template>
                  </template>
                </RenderPDFDoc>
              </div>
            </div>
          </div>
        </div>

        <div class="ps__rail-y" style="top: 0px; height: 100px; right: 0px">
          <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 100px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dashboard } from "@/store/dashboard";
import ToolAnnotation from "@/components/Document/Edit/Tools/ToolAnnotation.vue";
import RenderPDFDoc from "./RenderPDFDoc.vue";
import InternetAccess from "@/components/InternetAccess.vue";

import { ref, onMounted, watch } from "vue";
import { useGetters, useActions } from "vuex-composition-helpers/dist";

import { useRouter } from "vue-router";

const route = useRouter();

const { link, workingTools, isLoading } = useGetters({
  profile: "auth/profile",
  workingTools: "signLink/workingTools",
  isLoading: "signLink/isLoading",
  link: "signLink/link",
});

const { getLink, getTools, removeTool } = useActions({
  getLink: "signLink/getLink",
  getTools: "signLink/getTools",
  removeTool: "signLink/removeTool",
});

const openSide = ref(false);
const theDoc = ref('');
const theTools = ref('');
const documentHeight = ref(0);

const activeTaskFilter = (tools, docUpId) => {
  let activeTasks = tools.filter((tool) => {
    return tool.document_upload_id === docUpId;
  });
  return activeTasks;
};

const files = ref([]);
const sortedFile = ref('');
watch(
  () => [link.value, isLoading.value],
  ([newDoc, newTool], [oldDoc, oldTool]) => {
    if (oldDoc != newDoc) {
      theDoc.value = newDoc

      newDoc.documentUploads.filter(item => {
        if (item.status == 'Processing') {
          files.value.push({ id: item.id, file_url: item.file_url, number: item.number_ordering })
        }
        sortedFile.value = files.value.sort((a, b) => (a.number > b.number) ? 1 : -1)
      })
    }

    if (oldTool != newTool) theTools.value = workingTools.value;
  },
  { deep: true }
);

const getHeight = (event) => {
  documentHeight.value = event;
};

const remove = (params) => {
  return removeTool(params.id);
};

const uri = ref('')
onMounted(() => {
  uri.value = route.currentRoute.value.params.document_id;
  getLink(uri.value);
  getTools(uri.value);
});
</script>

<style scoped>
.parent {
  width: 830px;
  position: absolute;
  user-select: none;
}

.email-application .content-area-wrapper .email-user-list {
  height: auto;
}

.custom-box {
  width: 28px;
  height: 28px;
}
</style>
