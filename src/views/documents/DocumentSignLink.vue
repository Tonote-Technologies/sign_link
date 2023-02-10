<template>
  <div class="card rounded-0 mb-0 p-1 d-lg-none d-sm-block d-md-block custom-position">
    <ul class="nav d-flex justify-content-between align-items-center">
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
            <a @click="affixModal = true" class="dropdown-item" role="button" id="viewSignature">My Signature</a>
          </div>
        </div>
      </li>
      <!-- other buttons  -->
      <li class="nav-item border-0">
        <button class="btn btn-sm btn-primary me-1" @click="createModal = true">
          Submit
        </button>
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
        <ul class="nav navbar-nav bookmark-icons">
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
        <li class="nav-item">
          <a class="nav-link nav-link-style">
            <button class="btn btn-sm btn-primary waves-effect" @click="createModal = true">
              Submit
            </button>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="content-area-wrapper container-xxl p-0 mt-5 overflow-x-scroll border-0"
    style="position: static !important">
    <SignLinkAsideLeft />
    <SignLinkMainContent @docId="getDocId" @open="open" />
    <SignLinkAsideRight />
  </div>

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

      <SignatureList :footer="false" @selectedSignature="savePrint" />
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

  <ModalComp :show="createModal" :size="'modal-md'" :footer="false" @close="createModal = false">
    <template #header>
      <h5 class="modal-title">Information</h5>
    </template>

    <template #body>
      <p class="text-center">Kindly fill out the form below</p>

      <form @submit.prevent="submittedForm" class="row g-1" novalidate>
        <div class="col-md-6">
          <label for="full" class="form-label">Enter full name</label>
          <input type="text" class="form-control" id="full" v-model="form.full_name" placeholder="Enter full name" />
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">Enter email</label>
          <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Enter email" />
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" id="idCheck" type="checkbox" @change="handleCheck($event)"
              :checked="isChecked" />
            <label class="form-check-label" for="idCheck">
              I agree to
              <a href="https://gettonote.com/privacy" target="_blank">privacy policy</a>
              and
              <a href="https://gettonote.com/terms" target="_blank">terms</a>
            </label>
          </div>
        </div>

        <div class="modal-footer pb-0 pe-0">
          <button type="submit" class="btn btn-sm btn-primary" :disabled="!isChecked || loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <template v-if="!loading">Submit</template>
            <template v-else> Processing...</template>
          </button>
        </div>
      </form>
    </template>
  </ModalComp>
</template>

<script setup>
import ModalComp from "@/components/ModalComp.vue";
import SignLinkAsideLeft from "@/components/Document/Edit/Left/SignLinkAsideLeft.vue";
import SignLinkAsideRight from "@/components/Document/Edit/Right/SignLinkAsideRight.vue";
import SignLinkMainContent from "@/components/Document/Edit/Main/SignLinkMainContent.vue";

import LeftTabWrapper from "@/components/Tab/TabLeftNav/LeftTabWrapper.vue";
import LeftTabList from "@/components/Tab/TabLeftNav/LeftTabList.vue";

import SignatureList from "@/components/Signature/SignatureList.vue";
import SignaturePad from "@/components/Signature/SignaturePad.vue";

import SignatureSelectFull from "@/components/Signature/SignatureTextFull.vue";
import SignatureUpload from "@/components/Signature/SignatureUpload.vue";
import SignatureSelectInitial from "@/components/Signature/SignatureTextInitial.vue";

// import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js';

import { ref, onMounted } from "vue";

import { useGetters, useActions } from "vuex-composition-helpers/dist";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { dashboard } from "@/store/dashboard";

const toast = useToast();
const route = useRouter();

const { token, link } = useGetters({
  token: "auth/token",
  link: "signLink/link",
});

const { clearPrint, publicSignCompleted, getPublicState, getUserPrints } = useActions({
  clearPrint: "printSignLink/clearPrint",
  publicSignCompleted: "signLink/publicSignCompleted",
  getPublicState: "signLink/getPublicState",
  getUserPrints: "printSignLink/getUserPrints",
});

const redirectToWebsite = ref("");
const isOpen = ref(false);
const pageId = ref("");
const createModal = ref(false);
const doneDataUrl = ref([]);
const affixModal = ref(false);
const updateSignatureModal = ref(false);
const loading = ref(false);
const hasRole = ref(false);
const uri = ref("");
const isDownload = ref(false);

const exportHTMLToPDF = async (params) => {
  isDownload.value = true
  const pages = document.getElementsByClassName('downloader');

  const opt = {
    margin: [0, 0, -2, 0],
    filename: link.value.title + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { dpi: 192, letterRendering: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compressPDF: true }
  };

  // const doc = new jsPDF(opt.jsPDF);

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    await html2pdf().set(opt).from(page).outputPdf().then(function (pdf) {
      doneDataUrl.value.push('data:application/pdf;base64,' + btoa(pdf));
    })
  }

  if (params == 'isComplete') {
    if (pages.length === doneDataUrl.value.length) isDoneEdit();
    return;
  }

  // const pdf = doc.save(opt.filename);
  // if (pdf) isDownload.value = false
  // return pdf;
};

const form = ref({ full_name: "", email: "" });
const isChecked = ref(false);
const handleCheck = (e) => {
  isChecked.value = e.target.checked ?? false;
};

const submittedForm = () => {
  if (form.value.full_name == "" || form.value.email == "")
    return toast.error("Kindly fill out the form", {
      timeout: 5000,
      position: "top-right",
    });

  loading.value = true;
  exportHTMLToPDF("isComplete");
  clearPrint();
};

const isDoneEdit = () => {
  let splittedName = form.value.full_name.split(" ");

  form.value = {
    document_id: uri.value,
    first_name: splittedName[0],
    last_name: splittedName[1],
    email: form.value.email,
    files: doneDataUrl.value,
  };

  publicSignCompleted({ id: uri.value, payload: form.value });
  form.value = { full_name: "", email: "" };
  createModal.value = loading.value = false;
};

const open = (params) => {
  isOpen.value = params;
};

const getDocId = (params) => {
  pageId.value = params;
};

const updateModal = () => {
  affixModal.value = false;
  updateSignatureModal.value = true;
};

const linkUrl = ref("");
onMounted(() => {
  redirectToWebsite.value = process.env.VUE_APP_URL_WEBSITE;
  uri.value = route.currentRoute.value.params.document_id;
  getPublicState(uri.value);

  linkUrl.value =
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_URL_AUTH_LOCAL
      : process.env.VUE_APP_URL_SIGN_LINK;

  setTimeout(() => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  }, 2000);

  if (token.value == null) return;
  if (token.value != "" || token.value != null) {
    hasRole.value = true;
    dashboard.value.setToken(token.value);
    getUserPrints(token.value);
  }
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
