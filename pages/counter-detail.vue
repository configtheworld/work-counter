<template>
  <div class="relative">
    <Counter />
    <OtherFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
