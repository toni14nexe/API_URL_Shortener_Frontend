<script setup>
import { ref } from 'vue'
import { SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/userStore'

const userStore = useUserStore()
const loginHover = ref(false)

function logout() {
    userStore.logout()
}
</script>

<template>
    <div class="header">
        <el-row justify="center">
            <el-col :span="4" align="center" class="fix-avatar">
                <el-avatar :size="60" shape="square" src="https://static.thenounproject.com/png/4778723-200.png" />
            </el-col>
            <el-col :span="12" align="start">
                <h2 class="header-text color-primary">URL Shortener</h2>
            </el-col>
            <el-col :span="8" align="right">
                <el-row justify="end">
                    <span class="fix-logout-text link" @click="logout">
                        <SwitchButton class="fix-logout-icon" />
                        logout
                    </span>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.header {
    background-color: var(--color-second-background);
    position: absolute;
    left: 0;
    width: 100vw;
    height: 80px;
    padding-top: 5px;
}
.header-text {
    margin-top: 18px;
}
.fix-avatar {
    margin-top: 7px;
}
.fix-logout-text {
    margin-top: -5px;
    padding-right: 2rem;
}
.fix-logout-icon {
    width: 18px;
    margin-top: 28px;
    padding-right: 0.2rem;
}
</style>