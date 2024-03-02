<template>
  <div class="flex flex-row items-center justify-center gap-8 w-[190px] m-1">
    <div class="flex items-center justify-center h-16">
      <Icon
        class="absolute"
        name="ph:circle-dashed"
        size="60"
        color="#646464"
      />

      <Icon
        class="absolute"
        name="ri:hourglass-2-fill"
        size="30"
        color="#343434"
      />
    </div>

    <div v-if="pageType === '/signin'">
      <h1
        class="font-bold text-start leading-tight text-transparent text-2xl bg-clip-text bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500"
      >
        Work<br class="h-0" />Counter
      </h1>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const pageType = ref("");
onMounted(() => {
  pageType.value = router.currentRoute.value.path;
});
</script>

<style lang="scss" scoped></style>
