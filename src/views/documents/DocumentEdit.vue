<template>
  <div class="card rounded-0 mb-0 p-1 d-lg-none d-sm-block d-md-block custom-position">
    <ul class="nav d-flex justify-content-between align-items-center" v-show="hasRole">
      <!-- more buttons dropdown  -->
      <li class="nav-item">
        <div class="btn-group">
          <button type="button" class="extra__button waves-effect waves-float waves-light" data-bs-toggle="dropdown"
            aria-expanded="true">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
          <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-start">
            <a class="dropdown-item btn d-flex align-items-center" role="button" @click="addParticipantModal = true">
              <Icon icon="akar-icons:plus" class="me-1" />
              Add participants
            </a>

            <a class="dropdown-item btn d-flex align-items-center" role="button" @click="editSignerModal = true">
              <Icon icon="ep:view" class="me-1" />
              Manage signers
            </a>

            <div class="dropdown-divider"></div>

            <a @click="affixModal = true" class="dropdown-item" role="button" id="viewSignature">My Signature</a>
          </div>
        </div>
      </li>
      <!-- other buttons  -->
      <li class="nav-item border-0">
        <button class="btn btn-sm btn-primary me-1" @click="doneModal = true">
          Finish
        </button>

        <button class="btn btn-sm btn-primary" @click="createModal = true">Share</button>
      </li>
    </ul>
  </div>

  <nav class="header-navbar navbar navbar-expand-lg floating-nav navbar-shadow container-xxl" style="z-index: 102">
    <div class="navbar-container d-flex justify-content-between content">
      <div class="bookmark-wrapper d-flex align-items-center">
        <ul class="nav navbar-nav d-xl-none">
          <li class="nav-item d-none">
            <a class="nav-link menu-toggle" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="feather feather-menu ficon">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg></a>
          </li>
        </ul>
        <ul class="nav navbar-nav bookmark-icons" v-show="hasRole">
          <li class="nav-item d-none d-sm-block">
            <div class="btn-group">
              <button type="button" class="btn btn-primary btn-sm waves-effect waves-float waves-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-settings spinner">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                  </path>
                </svg>
                Signature tools
              </button>
              <button type="button"
                class="btn btn-outline-primary btn-sm dropdown-toggle dropdown-toggle-split waves-effect waves-float waves-light"
                data-bs-toggle="dropdown" aria-expanded="true">
                <span class="visually-hidden"></span>
              </button>
              <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-start">
                <a @click="affixModal = true" class="dropdown-item" href="#" id="viewSignature">My Signature</a>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <ul class="nav navbar-nav align-items-center">
        <li class="nav-item" v-if="canCancel">
          <a class="nav-link nav-link-style">
            <button class="btn btn-sm btn-outline-primary waves-effect" @click="cancel">
              Cancel
            </button>
          </a>
        </li>
        <li class="nav-item d-none d-sm-block">
          <a class="nav-link nav-link-style">
            <button class="btn btn-sm btn-primary waves-effect waves-float waves-light" @click="createModal = true"
              style="margin-right: 5px">
              Create Link
            </button>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="content-area-wrapper container-xxl p-0 mt-5 overflow-x-scroll border-0"
    style="position: static !important">
    <AsideLeft :chunkFileId="pageId" :isOpen="editSignerModal" @close="editSignerModal = false" />
    <MainContent @docId="getDocId" @open="open" />
    <AsideRight />
  </div>

  <div class="fixed-bottom bg-white shadow-lg custom-sm">
    <AsideBottom :chunkFileId="pageId" :isOpen="addParticipantModal" @close="addParticipantModal = false" />
  </div>

  <ModalComp :show="createModal" :size="'modal-md'" :footer="false" @close="createModal = false">
    <template #header>
      <h5 class="modal-title">Created Link</h5>
    </template>

    <template #body>
      <p class="text-center">Kindly find the generated link below</p>

      <div class="mb-2">
        <p class="text-center" style="font-size: 10px">
          <code class="text-center">{{ linkUrl + "/to-sign/" + uri }}</code>
        </p>
        <button type="button" class="btn btn-sm btn-outline-dark waves-effect d-block mx-auto"
          v-clipboard:copy="linkUrl + '/to-sign/' + uri" v-clipboard:success="onCopy" v-clipboard:error="onError">
          Copy link
        </button>
      </div>

      <div class="modal-footer pb-0 pe-0">
        <button type="button" class="btn btn-sm btn-primary" @click="done">Done</button>
      </div>
    </template>
  </ModalComp>

  <ModalComp :show="affixModal" :footer="false" :size="'modal-sm'" @close="affixModal = false">
    <template #header>
      <h4 class="modal-title">My Signatures</h4>
    </template>

    <template #body>
      <div class="row">
        <div class="col-md-4 ms-auto">
          <button @click="updateModal" class="float-end btn btn-outline-secondary btn-sm waves-effect"
            id="updateSignature">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-edit">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Update
          </button>
        </div>
      </div>

      <div class="divider"></div>

      <SignatureList @selectedSignature="savePrint" />
    </template>
  </ModalComp>

  <ModalComp :show="updateSignatureModal" :footer="false" @close="updateSignatureModal = false">
    <template #header>
      <h4 class="modal-title">Update your signature</h4>
    </template>

    <template #body>
      <LeftTabWrapper>
        <LeftTabList title="Draw">
          <SignaturePad @close="updateSignatureModal = false" />
        </LeftTabList>

        <LeftTabList title="Select">
          <SignatureSelectFull @close="updateSignatureModal = false" />
        </LeftTabList>

        <LeftTabList title="Initial">
          <SignatureSelectInitial @close="updateSignatureModal = false" />
        </LeftTabList>

        <LeftTabList title="Upload">
          <div class="row">
            <div class="col-md-12 mx-auto position-relative">
              <SignatureUpload @close="updateSignatureModal = false" />
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

  <ModalComp :show="cancelModal" :size="'modal-sm'" @close="cancelModal = false">
    <template #header>
      <h4 class="modal-title text-danger mb-0">
        <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" />
        Alert
      </h4>
    </template>

    <template #body>
      <h3 class="text-center">Are you sure?</h3>
      <p class="text-center"><i>Any changes will not be saved!</i></p>
    </template>

    <template #footer>
      <button class="btn btn-sm btn-primary" @click="deletePermanently">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        Proceed
      </button>
    </template>
  </ModalComp>

  <ModalComp :show="doneModal" :size="'modal-sm'" @close="doneModal = false">
    <template #header>
      <h4 class="modal-title text-danger mb-0">
        <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" />
        Alert
      </h4>
    </template>

    <template #body>
      <p class="text-center"><i>Please confirm that you are done signing.</i></p>
    </template>

    <template #footer>
      <button class="btn btn-sm btn-primary" @click="confirmEdit">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        Confirm
      </button>
    </template>
  </ModalComp>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import ModalComp from "@/components/ModalComp.vue";
import AsideLeft from "@/components/Document/Edit/Left/AsideLeft.vue";
import AsideRight from "@/components/Document/Edit/Right/AsideRight.vue";
import MainContent from "@/components/Document/Edit/Main/MainContent.vue";

import AsideBottom from "@/components/Document/Edit/Mobile/AsideBottom.vue";

import LeftTabWrapper from "@/components/Tab/TabLeftNav/LeftTabWrapper.vue";
import LeftTabList from "@/components/Tab/TabLeftNav/LeftTabList.vue";

import SignatureList from "@/components/Signature/SignatureList.vue";
import SignaturePad from "@/components/Signature/SignaturePad.vue";

import SignatureSelectFull from "@/components/Signature/SignatureTextFull.vue";
import SignatureUpload from "@/components/Signature/SignatureUpload.vue";
import SignatureSelectInitial from "@/components/Signature/SignatureTextInitial.vue";

import { ref, onMounted, onUnmounted } from "vue";

import { useGetters, useActions } from "vuex-composition-helpers/dist";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { dashboard } from "@/store/dashboard";

const toast = useToast();
const route = useRouter();

const { token, teams, canCancel } = useGetters({
  token: "auth/token",
  teams: "team/teams",
  canCancel: "signLink/canCancel",
});

const { removeCancel, removeDocument, getUserPrints } = useActions({
  getLink: "signLink/getLink",
  removeCancel: "signLink/removeCancel",
  removeDocument: "signLink/removeDocument",
  getUserPrints: "print/getUserPrints",
});

const redirectToUserDashboard = ref("");
const addParticipantModal = ref(false);
const editSignerModal = ref(false);
const isOpen = ref(false);
const pageId = ref("");
const doneModal = ref(false);
const cancelModal = ref(false);
const createModal = ref(false);
const affixModal = ref(false);
const updateSignatureModal = ref(false);
const loading = ref(false);
const plan = ref(null);
const hasRole = ref(false);
const uri = ref("");

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

const open = (params) => {
  isOpen.value = params;
};

const cancel = () => {
  cancelModal.value = true;
};

const deletePermanently = () => {
  removeDocument({ documents: [{ document_id: uri.value, permanent_delete: true }] });
  route.push({ name: "Document" });
};

const getDocId = (params) => {
  pageId.value = params;
};

const updateModal = () => {
  affixModal.value = false;
  updateSignatureModal.value = true;
};

const done = () => {
  route.push({ name: "Document", query: { status: "sign" } });
};

const confirmEdit = () => {
  window.location.href = redirectToUserDashboard.value + "/redirecting?qt=" + token.value;

  doneModal.value = false;
  toast.success("Document edited successfully", { timeout: 5000, position: "top-right" });
  window.location.href = redirectToUserDashboard.value + "/redirecting?qt=" + token.value;
};

const linkUrl = ref("");
onMounted(() => {
  redirectToUserDashboard.value = process.env.VUE_APP_URL_AUTH_LIVE;
  uri.value = route.currentRoute.value.params.document_id;

  linkUrl.value =
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_URL_AUTH_LOCAL
      : process.env.VUE_APP_URL_SIGN_LINK;

  if (token.value == null) return;
  if (token.value != "" || token.value != null) {
    hasRole.value = true;
    dashboard.value.setToken(token.value);
    getUserPrints(token.value);

    if (teams.value.length > 0) {
      plan.value = teams.value[0].subscription.plan.name;
    }
  }

  setTimeout(() => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  }, 2000);
});

onUnmounted(() => {
  removeCancel();
});
</script>

<style scoped>
.overflow-x-scroll {
  overflow-x: scroll !important;
}

.custom-position {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 101;
}

.extra__button {
  padding: 1rem 0.5rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #dbe7ff;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.header-navbar.floating-nav {
  top: 75px;
}

.dropdown-toggle::after,
.dropup .dropdown-toggle::after {
  vertical-align: 0 !important;
  height: 7px !important;
}

.btn-outline-primary:hover:not(.disabled):not(:disabled) {
  background-color: #003bb3;
  color: #fff;
}

.hover-remove.dropdown-item:focus,
.hover-remove.dropdown-item:hover {
  color: #000;
  background-color: #fff;
}

.dropdown-menu .hover-remove.dropdown-item {
  cursor: default;
}

.is-center {
  transform: translate3d(-45px, 34px, 0px) !important;
}

.custom-sm {
  display: none;
}

.coming-soon {
  display: inline-block;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 700;
}

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media screen and (max-width: 991.5px) {
  .header-navbar {
    display: none !important;
  }

  .custom-sm {
    display: block;
  }

  .content-area-wrapper {
    margin-top: 1em !important;
    margin-bottom: 7rem !important;
  }
}
</style>
