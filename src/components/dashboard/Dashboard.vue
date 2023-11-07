<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, computed } from "vue"
import { useUserStore } from '../../stores/userStore';
import { useShortenerStore } from '../../stores/shortenerStore';
import { Edit, Delete, Link, DocumentCopy, InfoFilled } from '@element-plus/icons-vue'
import { showSuccessToast } from "../../modules/toastMessage";

const shortenerStore = useShortenerStore()
const userStore = useUserStore()
const { shorteners } = storeToRefs(shortenerStore)
const { username, email } = storeToRefs(userStore)
const isLoading = ref(true)
const showDialog = ref({
  create: false,
  edit: false,
  delete: false,
  info: false
})
const shortenerData = ref({
  id: '',
  url: '',
  shortValue: ''
})

onMounted(() => {
  if(!username.value || !email.value) userStore.logout()
  else getMyShorteners()
})

function getMyShorteners() {
  isLoading.value = true;
  shortenerStore.getLoggedUserShorteners().finally(() => {
    isLoading.value = false
    shorteners.value.forEach(shortener => {
      if(shortener.url.length > 70) shortener.displayValue = `${shortener.url.slice(0, 70)}...`
    });
    shorteners.value.sort((shortener1, shortener2) => {
      if(shortener1.shortValue < shortener2.shortValue)
        return -1
      else return 1
    })
  })
}

function createNewShortener() {
  shortenerStore.createNewShortener({
    url: shortenerData.value.url,
    shortValue: shortenerData.value.shortValue
  }).then(() => {
    getMyShorteners()
    closeDialog()
  })
}

function editShortener() {
  shortenerStore.editShortener(shortenerData.value).then(() => {
    getMyShorteners()
    closeDialog()
  })
}

function deleteShortener() {
  shortenerStore.deleteShortener(shortenerData.value._id).then(() => {
    getMyShorteners()
    closeDialog()
  })
}

function openDialog(shortener, option) {
  shortenerData.value = shortener
  if(option === 'delete') showDialog.value.delete = true
  else if(option === 'info') showDialog.value.info = true
  else {
    showDialog.value.edit = true
    shortenerData.value = {
      ...shortenerData.value,
      old: shortenerData.value
    }
  }
}

function closeDialog() {
  showDialog.value = {
    create: false,
    edit: false,
    delete: false,
    info: false
  }
  shortenerData.value = {
    id: '',
    url: '',
    shortValue: ''
  }
}

function openURL(url) {
  window.open(url, "_blank");
}

function copy(text) {
  navigator.clipboard.writeText(text);
  showSuccessToast("Succesfully copied")
}
</script>

<template>
  <el-row class="w-100">
    <el-col :span="8" />
    <el-col :span="8" align="center">
      Hello, <span class="color-primary">{{ username }}</span>
    </el-col>
    <el-col :span="8" align="right">
      <el-button type="primary" @click="showDialog.create = true">Create Shortener</el-button>
    </el-col>
    <el-scrollbar
      class="scrollbar mt-1"
      v-loading="isLoading"
      element-loading-text="Loading"
      element-loading-background="#242424"
      always
    >
      <el-row v-if="!isLoading && shorteners.length">
        <el-col v-for="shortener in shorteners" :key="shortener._id" :sm="12" :md="8" :lg="6">
          <div class="card">
            <el-row justify="end">
              <el-space size="small">
                <el-tooltip content="Delete shortener" placement="top-start">
                  <el-icon :size="22" class="delete-icon" @click="openDialog(shortener, 'delete')"><Delete /></el-icon>
                </el-tooltip>
                <el-tooltip content="Edit shortener" placement="top-start">
                  <el-icon :size="22" class="not-delete-icon" @click="openDialog(shortener, 'edit')"><Edit /></el-icon>
                </el-tooltip>
                <el-tooltip content="Show info" placement="top-start">
                  <el-icon :size="22" class="not-delete-icon" @click="openDialog(shortener, 'info')"><InfoFilled /></el-icon>
                </el-tooltip>
                <el-tooltip content="Open URL in new tab" placement="top-start">
                  <el-icon :size="22" class="not-delete-icon" @click="openURL(shortener.url)"><Link /></el-icon>
                </el-tooltip>
              </el-space>
            </el-row>
            <el-space size="large" direction="vertical">
              <el-tooltip  placement="top-start">
                <template #content>
                  <el-row class="hover-pointer" @click="copy(shortener.shortValue)"><el-space size="small">
                    <el-icon :size="20"><DocumentCopy /></el-icon>
                    <span>Copy shorthand</span>
                  </el-space></el-row>
                </template>
                <div class="hover-pointer" @click="copy(shortener.shortValue)">
                  <el-row justify="center" class="color-primary mt-1"><b>{{ shortener.shortValue }}</b></el-row>
                </div>
              </el-tooltip>
              <el-tooltip placement="top-start">
                <template #content>
                  <el-row class="hover-pointer" @click="copy(shortener.url)"><el-space size="small">
                    <el-icon :size="20"><DocumentCopy /></el-icon>
                    <span>Copy URL</span>
                  </el-space></el-row>
                </template>
                <div class="hover-pointer" @click="copy(shortener.url)">
                  <el-row justify="center"><span class="color-primary">URL</span></el-row>
                  <el-row justify="center"><span>{{ shortener.displayValue || shortener.url }}</span></el-row>
                </div>
              </el-tooltip>
            </el-space>
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-1" v-else justify="center">Theres no available shorteners yet!</el-row>
    </el-scrollbar>
  </el-row>

  <!-- CREATE new shortener dialog -->
  <el-dialog 
    v-model="showDialog.create"
    destroy-on-close
    :show-close="false"
    :close-on-click-modal="false"
    :align-center="true"
  >
    <template #header>
      <h3 class="color-primary">Create new shortener</h3>
    </template>
    <el-space size="large" direction="vertical">
      <div>
        <el-row justify="center"><span class="color-primary">Shorthand</span></el-row>
        <el-row><el-input v-model="shortenerData.shortValue" @keyup.enter="createNewShortener" placeholder="Shorthand" /></el-row>
      </div>
      <div>
        <el-row justify="center"><span class="color-primary">URL</span></el-row>
        <el-row><el-input v-model="shortenerData.url" @keyup.enter="createNewShortener" placeholder="URL" /></el-row>
      </div>
    </el-space>
    <template #footer>
      <el-button type="danger" @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="createNewShortener">Create</el-button>
    </template>
  </el-dialog>

  <!-- EDIT existing shortener dialog -->
  <el-dialog 
    v-model="showDialog.edit"
    destroy-on-close
    :show-close="false"
    :close-on-click-modal="false"
    :align-center="true"
  >
    <template #header>
      <h3 class="color-primary">Edit shortener</h3>
    </template>
    <el-space size="large" direction="vertical">
      <div>
        <el-row justify="center"><span class="color-primary">Shorthand</span></el-row>
        <el-row><el-input v-model="shortenerData.shortValue" @keyup.enter="editShortener" placeholder="Shorthand" /></el-row>
      </div>
      <div>
        <el-row justify="center"><span class="color-primary">URL</span></el-row>
        <el-row><el-input v-model="shortenerData.url" @keyup.enter="editShortener" placeholder="URL" /></el-row>
      </div>
    </el-space>
    <template #footer>
      <el-button type="danger" @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="editShortener">Edit</el-button>
    </template>
  </el-dialog>

  <!-- DELETE existing shortener dialog -->
  <el-dialog 
    v-model="showDialog.delete"
    destroy-on-close
    :show-close="false"
    :close-on-click-modal="false"
    :align-center="true"
  >
    <template #header>
      <h3 class="color-primary">Edit shortener</h3>
    </template>
      <el-space size="large" direction="vertical">
        <el-row justify="center">
          <span>Are you sure to <span class="color-danger"><b>delete</b></span> shortener?</span>
        </el-row>
        <div>
          <el-row justify="center"><span class="color-primary">Shorthand</span></el-row>
          <el-row justify="center"><span>{{ shortenerData.shortValue }}</span></el-row>
        </div>
        <div>
          <el-row justify="center"><span class="color-primary">URL</span></el-row>
          <el-row justify="center"><span>{{ shortenerData.displayValue || shortenerData.url }}</span></el-row>
        </div>
      </el-space>
    <template #footer>
      <el-button type="primary" @click="closeDialog">Cancel</el-button>
      <el-button type="danger" @click="deleteShortener">Delete</el-button>
    </template>
  </el-dialog>

  <!-- INFO shortener dialog -->
  <el-dialog 
    v-model="showDialog.info"
    destroy-on-close
    :show-close="false"
    :close-on-click-modal="false"
    :align-center="true"
  >
    <template #header>
      <h3 class="color-primary">Shortener info</h3>
    </template>
      <el-space size="large" direction="vertical">
        <div>
          <el-row justify="center"><span class="color-primary">Shorthand</span></el-row>
          <el-row justify="center"><span>{{ shortenerData.shortValue }}</span></el-row>
        </div>
        <div>
          <el-row justify="center"><span class="color-primary">URL</span></el-row>
          <el-row justify="center"><span>{{ shortenerData.url }}</span></el-row>
        </div>
      </el-space>
    <template #footer>
      <el-button type="primary" @click="closeDialog">Cancel</el-button>
      <el-button type="danger" @click="deleteShortener">Delete</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.scrollbar {
  height: 68vh;
  width: 100%;
  border-top: 2px solid var(--color-light-background);
  border-bottom: 2px solid var(--color-light-background);
}
.card {
  border: 2px solid var(--color-light-background);
  margin: var(--spacing-1);
  padding: var(--spacing-1);
  border-radius: calc(var(--spacing-1));
  transition: 200ms ease;
  height: 200px;
  word-break: break-all;
}
.card:hover {
  border-color: var(--color-second-background);
  transition: 200ms ease;
}
.not-delete-icon:hover {
  cursor: pointer;
  color: var(--el-color-primary);
  transition: 200ms ease;
}
.delete-icon:hover {
  cursor: pointer;
  color: var(--el-color-danger);
  transition: 200ms ease;
}
.color-danger {
  color: var(--el-color-danger);
}
</style>
