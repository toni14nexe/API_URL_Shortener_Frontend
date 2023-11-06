<script setup>
import { computed, ref } from "vue"
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()
const mainView = ref(true)
const password = ref({
    password: '',
    confirmation: ''
})

function resetPassword() {
    if(!btnDisabled.value)
        userStore.resetPassword(password.value.password).then((response) => {
            if(response.data?.debt)
                mainView.value = false
        })
}

const btnDisabled = computed(() => {
    if(
        password.value.password === password.value.confirmation &&
        password.value.password.length >= 8
    )
        return false
    return true
})
</script>


<template>
    <el-space v-if="mainView" size="large" direction="vertical">
        <el-space size="small" direction="horizontal">
            <el-avatar :size="30" shape="square" src="https://static.thenounproject.com/png/4778723-200.png" />
            <h2 class="color-primary">URL Shortener</h2>
        </el-space>
        <el-row class="color-primary">Password reset</el-row>
        <el-row>
            <el-input v-model="password.password" type="password" @keyup.enter="resetPassword" placeholder="Password" />
        </el-row>
        <el-row>
            <el-input v-model="password.confirmation" type="password" @keyup.enter="resetPassword" placeholder="Confirm Password" />
        </el-row>
        <el-row>
            <el-button type="primary" @click="resetPassword" :disabled="btnDisabled">Sign up</el-button>
        </el-row>
    </el-space>
    <el-space v-else size="large" direction="vertical">
        <el-row class="color-primary">
            Password succesfully changed.
        </el-row>
        <el-row>
            <router-link class="link" to="/">Go to login</router-link>
        </el-row>
    </el-space>
</template>