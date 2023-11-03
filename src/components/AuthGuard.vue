<script setup>
import { ref } from 'vue';
import { router } from '../main.js';
import cookies from 'vue-cookies';
import DashboardLayout from "./dashboard/DashboardLayout.vue"
import { useUserStore } from "../stores/userStore";
import Footer from "./Footer.vue"

const toFullPath = ref('')

router.beforeEach(async (to, from) => {
    toFullPath.value = to.fullPath
    const token = cookies.get('authorization')

    if(!token && to.fullPath !== '/') return '/'

    if(token && to.fullPath === '/') return '/dashboard'

    if(to.fullPath === '/') clearData()
})

function clearData() {
    localStorage.clear()
    cookies.remove('authorization')
}
</script>

<template>
    <el-row v-if="toFullPath === '/'" justify="center" align="middle">
        <router-view class="logged-out" />
    </el-row>
    <div v-else>
        <DashboardLayout>
            <router-view />
        </DashboardLayout>
    </div>
    <Footer />
</template>

<style scoped>
.logged-out {
  padding: 2rem;
}
</style>