<script setup>
import { onMounted, ref } from "vue"
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()
const verificated = ref(false)

onMounted(() => {
    userStore.accountValidation().then(() => verificated.value = true)
})
</script>


<template>
    <el-space size="large" direction="vertical">
        <el-row class="color-primary" v-if="verificated">
            Your account is verificated succesfully.
        </el-row>
        <el-row>
            <router-link class="link" to="/">Go to login</router-link>
        </el-row>
    </el-space>
</template>