<template>
  <div>
    <button
      title="delete this counter"
      @click="handleDelete"
      class="hover:scale-110 m-2 mt-3"
    >
      <Icon
        name="solar:trash-bin-minimalistic-linear"
        color="#343434"
        size="42"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { deleteCounterById } = useCounters();

const handleDelete = async () => {
  const response = await deleteCounterById(
    router.currentRoute.value.query.id as string
  );
  if (response === 204) {
    push.success("Counter successfully deleted");
    navigateTo({ path: "/" });
  } else {
    push.error("Failed to delete counter");
  }
};
</script>

<style scoped></style>
