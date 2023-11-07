<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const verificated = ref(false);

onMounted(() => {
  userStore.accountValidation().then(() => (verificated.value = true));
});
</script>

<template>
  <el-space size="large" direction="vertical">
    <el-space size="small" direction="horizontal">
      <el-avatar
        :size="30"
        shape="square"
        src="https://static.thenounproject.com/png/4778723-200.png"
      />
      <h2 class="color-primary">URL Shortener</h2>
    </el-space>
    <el-row v-if="verificated">
      Your account is verificated succesfully.
    </el-row>
    <el-row>
      <router-link class="link" to="/">Go to login</router-link>
    </el-row>
  </el-space>
</template>
