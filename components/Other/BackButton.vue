<template>
  <button title="back" @click="goBack" class="m-2 hover:scale-110">
    <Icon
      name="material-symbols:arrow-left-alt-rounded"
      color="#343434"
      size="48"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  url: { type: String, required: true },
});

function goBack() {
  navigateTo({ path: props.url });
}
</script>

<style scoped></style>
