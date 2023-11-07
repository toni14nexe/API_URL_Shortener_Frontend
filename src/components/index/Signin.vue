<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const signinData = ref({
  username: '',
  password: '',
});
const emits = defineEmits(['goToForgotPassword']);

function signin() {
  userStore.signin(signinData.value);
}

function goToForgotPassword() {
  emits('goToForgotPassword');
}
</script>

<template>
  <el-space size="large" direction="vertical">
    <el-row class="color-primary"> Sign in </el-row>
    <el-row>
      <el-input
        v-model="signinData.username"
        @keyup.enter="signin"
        placeholder="Username"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="signinData.password"
        type="password"
        @keyup.enter="signin"
        placeholder="Password"
      />
    </el-row>
    <el-row>
      <el-button type="primary" @click="signin">Sign in</el-button>
    </el-row>
    <el-row>
      <span class="link" @click="goToForgotPassword">Forgot password?</span>
    </el-row>
  </el-space>
</template>

<style scoped></style>
