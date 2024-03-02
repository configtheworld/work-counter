<template>
  <div class="relative">
    <div class="relative">
      <div class="absolute top-0 left-0">
        <OtherAppLogo />
      </div>
      <div class="absolute top-0 right-0 flex flex-row-reverse">
        <AuthLogoutButton />
      </div>
    </div>
    <div class="flex justify-center items-center w-screen bg-gray-100 pt-9">
      <div class="flex-row justify-center w-full p-8">
        <CreateCounterCard @updateFlag="handleUpdateFlag" />
        <ListCountersCard :counters="counters" />
      </div>
    </div>
    <OtherFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import CreateCounterCard from "~/components/Counter/CreateCounterCard.vue";
import ListCountersCard from "~/components/Counter/ListCountersCard.vue";
import type { Counter } from "~/types/Counter";

const counters = ref<Counter[]>([]);
const { getCounters } = useCounters();
const updateFlag = ref(false);
definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  counters.value = await getCounters();
});

watch(updateFlag, async () => {
  counters.value = await getCounters();
});

const handleUpdateFlag = () => {
  updateFlag.value = !updateFlag.value;
};
</script>

<style scoped></style>
