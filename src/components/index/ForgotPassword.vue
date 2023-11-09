<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const emits = defineEmits(['goToForgotPassword']);
const email = ref('');
const mainView = ref(true);
const btnLoading = ref(false);

function sendResetEmail() {
  btnLoading.value = true;
  userStore
    .resetPasswordRequest(email.value)
    .then(() => (mainView.value = false))
    .finally(() => (btnLoading.value = false));
}
</script>

<template>
  <el-space v-if="mainView" size="large" direction="vertical">
    <el-row class="color-primary"> Password reset </el-row>
    <el-row>
      <el-input
        v-model="email"
        @keyup.enter="sendResetEmail"
        placeholder="Email"
      />
    </el-row>
    <el-row>
      <el-button
        type="primary"
        plain
        @click="sendResetEmail"
        :loading="btnLoading"
        >Send email</el-button
      >
    </el-row>
  </el-space>
  <el-space v-else size="large" direction="vertical">
    <el-row class="color-primary">
      Reset password link was sent to email.
    </el-row>
  </el-space>
</template>

<style scoped></style>
