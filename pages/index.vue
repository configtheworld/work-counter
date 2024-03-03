<template>
  <div class="relative min-h-screen bg-gray-100">
    <div class="relative">
      <div class="absolute top-0 left-0">
        <OtherAppLogo />
      </div>
      <div class="absolute top-0 right-0 flex flex-row-reverse">
        <AuthLogoutButton />
      </div>
    </div>
    <div class="flex justify-center items-center w-screen pt-9">
      <div class="flex-row justify-center w-full p-8">
        <CreateCounterCard
          v-if="showCreateForm"
          @updateFlag="handleUpdateFlag"
          @openCreateForm="openCreateForm"
        />
        <ListCountersCard
          :counters="counters"
          @openCreateForm="openCreateForm"
        />
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

const showCreateForm = ref(false);
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

const openCreateForm = () => {
  showCreateForm.value = showCreateForm.value ? false : true;
};
</script>

<style scoped></style>
