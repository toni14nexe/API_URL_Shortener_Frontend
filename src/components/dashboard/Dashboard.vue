<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue"
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore()
const { username, email } = storeToRefs(userStore)
const signinData = ref({
  username: '',
  password: ''
})
const emits = defineEmits(['goToForgotPassword'])

onMounted(() => {
  if(!username.value || !email.value) userStore.logout()
})

function getAllUsers() {
  userStore.getUser('6540eed797201515e2005bd4')
}

function goToForgotPassword() {
  emits('goToForgotPassword')
}
</script>

<template>
  <el-space size="large" direction="vertical">
    <el-row>{{ username }}</el-row>
    <el-row>
      <el-button type="primary" plain @click="getAllUsers">users</el-button>
    </el-row>
  </el-space>
</template>

<style scoped>
</style>
