<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '../stores/store';

const store = useStore()
const { state } = storeToRefs(store);

function increaseStoreState() {
  store.stateIncrement()
}

function decreaseStoreState() {
  store.stateDecrement()
}
</script>

<template>
  <el-space size="small" direction="vertical">
    <el-row>
      {{ state }}
    </el-row>
    <el-row>
      <el-button @click="increaseStoreState">Increase store state</el-button>
    </el-row>
    <el-row>
      <el-button @click="decreaseStoreState">Decrease store state</el-button>
    </el-row>
  </el-space>
</template>

<style scoped>
</style>
