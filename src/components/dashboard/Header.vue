<script setup>
import Logo from "../../assets/icon.png"
</script>

<template>
    <div class="header">
        <el-row justify="center">
            <el-col :span="4" align="center" class="fix-avatar">
                <el-avatar :size="60" shape="square" src="https://static.thenounproject.com/png/4778723-200.png" />
            </el-col>
            <el-col :span="12" align="start">
                <h2 class="header-text">URL Shortener</h2>
            </el-col>
            <el-col :span="8" align="right" class="fix-logout">
                <h3>logout</h3>
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

.fix-logout {
    margin-top: 7px;
    padding-right: 2rem;
}
</style>