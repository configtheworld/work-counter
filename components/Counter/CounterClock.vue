<template>
  <div class="relative flex justify-center my-8">
    <div v-if="minutesRef === 0 && hours === 0" class="w-72 text-center">
      <span v-if="minutesRef === 0 && hours === 0">
        <span class="text-3xl sm:text-4xl z-10 text-gray-700">Completed</span>
        <Icon
          name="lets-icons:flag-finish-alt"
          size="130"
          class="absolute left-[-40px] top-[-20px] opacity-25 z-0 rotate-45"
        />
      </span>
    </div>
    <h1 class="text-xl text-gray-700">
      <span v-if="hours > 0">
        <span class="text-6xl sm:text-8xl font-bold">{{ hours }}</span>
        hrs
      </span>
      <span v-if="minutesRef > 0">
        <span class="text-6xl sm:text-8xl font-bold">{{ minutesRef }}</span>
        mins
      </span>

      <span v-if="minutesRef !== 0" class="text-2xl font-bold">left</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const hours = ref(0);
const minutesRef = ref(0);
onMounted(() => {
  CalculateMinutes();
});

function CalculateMinutes() {
  hours.value = Math.floor(props.minutes / 60);
  minutesRef.value = props.minutes % 60;
}

const props = defineProps({
  minutes: { type: Number, required: true },
});

const minutes = toRef(props, "minutes");

watch(minutes, () => {
  CalculateMinutes();
});
</script>
