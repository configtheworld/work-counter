<template>
  <div>
    <h1
      class="flex justify-center text-4xl sm:text-6xl font-bold pt-8 sm:pt-0 text-center mt-5 text-gray-700 break-words overflow-hidden p-3"
    >
      {{ props.name }}
      <div class="relative">
        <span
          :class="`absolute right-[-20px] top-0 flex w-3 h-3 me-3 ${color} rounded-full`"
        ></span>
      </div>
    </h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

computed(() => {
  return props.color;
});
</script>
