<template>
  <table class="table table-borderless mb-5" role="grid" :id="theSignId">
    <thead>
      <tr role="row">
        <th rowspan="1" colspan="1" style="width: 0px" aria-label="">
          <input type="checkbox" @click="checkAll" v-model="isCheckAll" class="form-check-input" />
        </th>
        <th rowspan="1" colspan="1" style="width: 258px" aria-label="Name">Name</th>
        <th rowspan="1" colspan="1" style="width: 348px" aria-label="Link">Link</th>
        <th tabindex="0" rowspan="1" colspan="1" style="width: 227px" aria-label="Responses">
          <span>Response(s)</span>
        </th>
        <th rowspan="1" colspan="1" style="width: 115px" aria-label="Actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="even" v-for="(doc, index) in links" :key="index">
        <td class="control" tabindex="0">
          <input type="checkbox" v-model="docIds" @change="updateCheckAll" :value="doc.id" class="form-check-input" />
        </td>
        <td>
          <a role="button" class="text-truncate" style="width: 200px" @click="
            getDocument({
              id: doc.id,
              status: dashboard.status,
              isView: true,
            })
          ">
            <Icon icon="mdi:file-document-edit-outline" style="font-size:1.2rem;" />
            {{ doc.title }}
          </a>
        </td>
        <td>
          <span class="badge rounded-pill fw-normal" :class="[doc.active == '0' ? 'bg-dark' : 'badge-light-dark']"
            style="font-size:10px">
            {{ linkUrl + "/to-sign/" + doc.id }}
          </span>
        </td>
        <td>
          <span role="button" class="text-primary fw-bolder" @click="showResponse({ id: doc.id, doc: doc })">
            {{ doc.response_count > 0 ? doc.response_count : 0 }}
            response(s)
            <Icon icon="material-symbols:edit-square-outline" style="font-size:1rem;" />
          </span>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-sm waves-effect"
              :class="[doc.active == '0' ? 'btn-dark' : 'btn-outline-primary']"
              v-clipboard:copy="linkUrl + '/to-sign/' + doc.id" v-clipboard:success="onCopy" v-clipboard:error="onError"
              :disabled="doc.active == '0' ? true : false">
              Copy link
            </button>
            <div class="dropdown">
              <button type="button"
                class="btn btn-sm dropdown-toggle hide-arrow py-0 waves-effect waves-float waves-light"
                data-bs-toggle="dropdown" aria-expanded="false">
                <Icon icon="mdi:ellipsis-vertical" style="font-size:1.2rem;" />
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <template v-if="dashboard.status != 'Deleted'">
                  <a class="dropdown-item" href="#" @click="deactivateLink(doc.id)">
                    <Icon icon="ri:link-m" style="font-size:1.2rem;" />
                    <span v-if="doc.active == '0'"> Deactivate</span>
                    <span v-else> Activate</span>
                  </a>
                  <a class="dropdown-item" role="button" @click="
                    getDocument({
                      id: doc.id,
                      status: dashboard.status,
                      isView: true,
                    })
                  ">
                    <Icon icon="ic:outline-remove-red-eye" style="font-size:1.2rem;" />
                    <span> View</span>
                  </a>
                  <a class="dropdown-item" role="button" @click="
                    getDocument({
                      id: doc.id,
                      status: dashboard.status,
                      isEdit: true,
                    })
                  ">
                    <Icon icon="material-symbols:edit-outline-rounded" style="font-size:1.2rem;" />
                    <span> Edit</span>
                  </a>
                </template>
                <template v-else>
                  <a class="dropdown-item" href="#" @click="deleteDocument('restore', doc.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-rotate-ccw me-50">
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                    </svg>
                    <span>Restore</span>
                  </a>
                </template>
                <a class="dropdown-item" href="#" @click="deleteDocument('delete', doc.id)">
                  <Icon icon="uil:trash" style="font-size:1.2rem;" />
                  <span> Delete</span>
                </a>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <ModalComp :show="responseModal" :size="'modal-lg'" @close="responseModal = false">
    <template #header>
      <h4 class="modal-title mb-0">Responses</h4>
    </template>

    <template #body>
      <div class="row mb-2 me-1">
        <div class="col-md-8">
          <h4 class="text-capitalize">Title: {{ docTitle }}</h4>
        </div>
        <div class="col-md-4">
          <p>Created at: {{ dateTime(createdAt) }}</p>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Email</th>
            <th>Signed at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!isLoading">
            <template v-if="signLinkResponses.length > 0">
              <tr v-for="(sign, index) in signLinkResponses" :key="index">
                <td>{{ sign.first_name + ' ' + sign.last_name }}</td>
                <td>{{ sign.email ?? 'Not available' }}</td>
                <td>{{ dateTime(sign.updated_at) }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="showParticipantDoc(sign)">View</button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="5" class="text-center"><i>No record found</i></td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="5">
                <div class="my-2 text-center">
                  <span class="spinner-border spinner-border-sm"></span> Loading...
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>

    <template #footer>
      <button type="button" class="btn btn-secondary me-1 waves-effect waves-float waves-light"
        @click="responseModal = false">
        Close
      </button>
    </template>
  </ModalComp>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import ModalComp from "@/components/ModalComp.vue";
import { dashboard } from "@/store/dashboard";
import { onMounted, ref, watch, defineEmits } from "vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";

import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import $ from "jquery";

const dateTime = (value) => {
  return moment(value).format("Do MMM YYYY, hh:mm A");
};

const emit = defineEmits(['close'])

const route = useRouter();
const toast = useToast();

const isLoading = ref(false);
const responseModal = ref(false);
const isHidden = ref(false);
const hasMultipleSelection = ref(false);
const isCheckAll = ref(false);
const isDeleteOrRestore = ref(false);
const docIds = ref([]);

const { links, signLinkResponses, hasLink } = useGetters({
  links: "signLink/links",
  signLinkResponses: "signLink/signLinkResponses",
  hasLink: "document/hasLink",
});

const { getLinks, getSignLinkResponses, previewResponse, editLinkStatus } = useActions({
  getLinks: "signLink/getLinks",
  getLink: "signLink/getLink",
  getSignLinkResponses: "signLink/getSignLinkResponses",
  previewResponse: "signLink/previewResponse",
  getDeletedLinks: "signLink/getDeletedLinks",
  editLinkStatus: "signLink/editLinkStatus",
});

watch(
  () => [dashboard.value.status, hasLink.value],
  ([newStatus, newLink], [oldStatus, oldLink]) => {
    if (newStatus != oldStatus) {
      isCheckAll.value = hasMultipleSelection.value = isHidden.value = false;
      docIds.value = [];
    }
    if (newLink != oldLink) {
      return getLinks();
    }
  }
);

const docTitle = ref('')
const createdAt = ref('')
const showResponse = (params) => {
  isLoading.value = responseModal.value = true
  docTitle.value = params.doc.title
  createdAt.value = params.doc.created_at
  getSignLinkResponses(params.doc.id)

  setTimeout(() => {
    isLoading.value = false
  }, 1000);
}

const showParticipantDoc = (params) => {
  responseModal.value = false
  previewResponse({ title: docTitle.value, data: params })
}

const getDocument = (params) => {
  if (params.isView && params.status == "Sign") {
    return route.push({ name: "document.show", params: { document_id: params.id } });
  }

  if (params.isEdit === true) {
    return route.push({ name: "document.edit", params: { document_id: params.id } });
  }
};

const checkAll = () => {
  isCheckAll.value = !isCheckAll.value;
  docIds.value = [];
  if (isCheckAll.value) {
    for (const key in links.value) {
      docIds.value.push(links.value[key].id);
    }
  }
  hasMultipleSelection.value = docIds.value.length > 0 ? true : false;
  emit('showDeleteButton', { show: hasMultipleSelection.value, signLinkDocIds: docIds.value })
};

const updateCheckAll = () => {
  hasMultipleSelection.value = docIds.value.length - 1 >= 0 ? true : false;
  emit('showDeleteButton', { show: hasMultipleSelection.value, signLinkDocIds: docIds.value })

  isCheckAll.value = (docIds.value.length == links.value.length) ? true : false

};

const action = ref("");
const deleteDocument = (params, id) => {
  if (id != "") {
    emit('showDeleteButton', { showModal: true, signLinkDocIds: [id] })
  }

  action.value = params;
  isDeleteOrRestore.value = true;
};

const deactivateLink = (linkId) => {
  editLinkStatus({ id: linkId, payload: { active: '0' } })
};

const message = "Copied to clipboard!";
const onCopy = () => {
  return toast.default(message, {
    timeout: 5000,
    position: "top-right",
  });
};
const onError = (e) => {
  alert("Failed to copy texts", e);
};

const theSignId = ref("");
const linkUrl = ref("");
onMounted(() => {
  linkUrl.value =
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_URL_AUTH_LOCAL
      : process.env.VUE_APP_URL_SIGN_LINK;

  getLinks();
  theSignId.value = dashboard.value.status;
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#" + theSignId.value)) {
      $("#" + theSignId.value).DataTable();
    } else {
      $("#" + theSignId.value).DataTable({
        columnDefs: [{ orderable: false, targets: [0, 4] }],
        aaSorting: [],
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"],
        ],
        pageLength: 5,
      });
    }
  }, 1000);
});
</script>

<style scoped>

</style>
