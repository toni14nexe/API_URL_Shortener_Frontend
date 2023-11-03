<script setup>
import { ref } from "vue"
import Signin from "./Signin.vue"
import Signup from "./Signup.vue"
import ForgotPassword from "./ForgotPassword.vue"

const tab = ref('signin')
</script>

<template>
  <el-space size="large" direction="vertical">
    <h2>URL Shortener</h2>
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
