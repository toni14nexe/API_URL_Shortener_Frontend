<script setup>
import Header from "./Header.vue"
</script>

<template>
    <Header />
    <div class="slot">
        <slot />
    </div>
</template>

<style scoped>
.slot {
    padding-top: 7rem;
    display: flex;
}
</style>