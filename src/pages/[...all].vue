<script setup lang="ts">
import { router } from "../main";


function goBack() {
  router.push('/')
}
</script>

<template>
  <el-space size="large" direction="vertical">
    <span>Error page</span>
    <span class="link" @click="goBack">Go back</span>
  </el-space>
</template>
