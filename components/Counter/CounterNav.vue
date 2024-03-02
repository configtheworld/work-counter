<template>
  <div class="absolute top-0 left-0">
    <BackButton url="/" />
  </div>
  <div class="absolute top-0 right-0 flex flex-row-reverse">
    <AuthLogoutButton />
    <CounterDeleteButton />
  </div>
</template>

<script setup>
import BackButton from "../Other/BackButton.vue";
</script>

<style lang="scss" scoped></style>
