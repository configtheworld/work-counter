<template>
  <div>
    <div
      class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
    >
      <CounterNav />
      <CounterTitle
        v-if="counterInfo.length > 0"
        :name="counterInfo[0].name"
        :color="counterInfo[0].color"
      />
      <div
        v-if="counterInfo.length > 0"
        class="max-w-4xl mx-auto sm:px-6 lg:px-8"
      >
        <CounterCard
          :minutes="counterInfo[0].minutes"
          :isDone="counterInfo[0].isDone"
          :id="counterQueryId"
          @updateFlag="handleUpdateFlag"
          :color="counterInfo[0].color"
          :createdAt="counterInfo[0].createdAt"
        />
      </div>

      <div v-else>
        <OtherLoadingSpinner />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Counter } from "../../types/Counter";
const counterInfo = ref<Counter[]>([]);
const updateFlag = ref(false);
const { getCounterById } = useCounters();
const router = useRouter();
const counterQueryId = ref("");

onMounted(async () => {
  counterQueryId.value = router.currentRoute.value.query.id as string;
  counterInfo.value = await getCounterById(
    router.currentRoute.value.query.id as string
  );
});

watch(updateFlag, async () => {
  counterInfo.value = await getCounterById(
    router.currentRoute.value.query.id as string
  );
});

const handleUpdateFlag = () => {
  updateFlag.value = !updateFlag.value;
};
</script>
