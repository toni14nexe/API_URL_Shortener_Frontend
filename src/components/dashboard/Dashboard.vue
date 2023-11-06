<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue"
import { useUserStore } from '../../stores/userStore';
import { useShortenerStore } from '../../stores/shortenerStore';

const shortenerStore = useShortenerStore()
const userStore = useUserStore()
const { shorteners } = storeToRefs(shortenerStore)
const { username, email } = storeToRefs(userStore)
const isLoading = ref(true)

onMounted(() => {
  if(!username.value || !email.value) userStore.logout()
  else getMyShorteners()
})

function getMyShorteners() {
  isLoading.value = true;
  shortenerStore.getLoggedUserShorteners().finally(() => isLoading.value = false)
}
</script>

<template>
  <el-row class="w-100">
    <el-col :span="11" align="end">
      Hello, {{ username }}
    </el-col>
    <el-col :span="11" :offset="2" align="start">
      <el-button type="primary" plain>Create Shortener</el-button>
    </el-col>
    <el-scrollbar class="scrollbar mt-1">
      <div v-for="shortener in shorteners" :key="shortener._id">
        <p>{{ shortener }}</p>
      </div>
    </el-scrollbar>
  </el-row>
</template>

<style scoped>
.scrollbar {
  height: 68vh;
  width: 100%;
  border: 1px solid white;;
}
</style>
