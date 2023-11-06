<script setup>
import { ref } from "vue"
import Signin from "./Signin.vue"
import Signup from "./Signup.vue"
import ForgotPassword from "./ForgotPassword.vue"

const tab = ref('signin')
</script>

<template>
  <el-space size="large" direction="vertical">
    <el-space size="small" direction="horizontal">
      <el-avatar :size="30" shape="square" src="https://static.thenounproject.com/png/4778723-200.png" />
      <h2 class="color-primary">URL Shortener</h2>
    </el-space>
    <el-row>
      <el-tabs v-model="tab">
        <el-tab-pane label="Sign in" name="signin" />
        <el-tab-pane label="Sign up" name="signup" />
      </el-tabs>
    </el-row>
    <Signup v-if="tab === 'signup'" />
    <ForgotPassword v-if="tab === 'forgot-password'" />
    <Signin v-if="tab === 'signin'" @go-to-forgot-password="tab = 'forgot-password'" />
  </el-space>
</template>

<style scoped>
</style>
