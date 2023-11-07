<script setup lang="ts"></script>

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
    <span>Page doesn't exist!</span>
    <el-row>
      <router-link class="link" to="/">Go to login</router-link>
    </el-row>
  </el-space>
</template>
