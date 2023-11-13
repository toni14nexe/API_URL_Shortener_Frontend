<script setup lang="ts">
import { ElLoading } from 'element-plus';
import { onMounted, ref } from 'vue';
import { router } from '../main';
import { useShortenerStore } from '../stores/shortenerStore';

const shortenerStore = useShortenerStore();
const loading = ref(undefined);
const somethingWentWrong = ref(false);

onMounted(() => {
  startRedirectView();
  getShortener();
});

function startRedirectView() {
  loading.value = ElLoading.service({
    lock: true,
    text: 'Redirecting',
    background: 'rgba(36, 36, 36, 0.5)',
  });
}

function endRedirectView() {
  loading?.value?.close();
}

function getShortener() {
  shortenerStore
    .getShortener(router.currentRoute.value.params?.shortenerId)
    .then((response) => {
      endRedirectView();
      if (response?.data?.url) window.location.href = response.data.url;
    })
    .catch(() => {
      endRedirectView();
      somethingWentWrong.value = true;
    });
}
</script>

<template>
  <el-space v-if="somethingWentWrong" size="large" direction="vertical">
    <el-avatar
      :size="30"
      shape="square"
      src="https://static.thenounproject.com/png/4778723-200.png"
    />
    <h2 class="color-primary">Something went wrong</h2>
    <el-row>
      <router-link class="link" to="/">Go back</router-link>
    </el-row>
  </el-space>
</template>
