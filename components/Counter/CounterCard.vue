<template>
  <div class="relative bg-white overflow-hidden shadow rounded-lg p-6 mt-4 m-2">
    <div
      :class="`absolute w-full top-0 left-0 h-6 w-full opacity-75 ${color}`"
    ></div>
    <h2
      v-if="!isDone"
      class="mt-8 text-2xl leading-7 font-semibold text-center text-gray-700"
    >
      to finish your counter
    </h2>
    <CounterClock :minutes="props.minutes" />

    <div v-if="props.isDone === false">
      <div v-if="false">
        <h3
          class="text-md sm:text-lg leading-6 font-medium text-center text-gray-700"
        >
          to measure munites <code class="code">start</code> chronometer /
          <code class="code">stop</code> to save
        </h3>
        <div>
          <div class="p-4">
            <CounterStartButton
              :minutes="props.minutes"
              @updateFlag="$emit('updateFlag')"
              :color="props.color"
            />
          </div>
        </div>
      </div>
      <div class="mx-4">
        <h3
          class="text-md sm:text-lg leading-6 font-medium text-center text-gray-700 mx-4 sm:mx-32"
        >
          reduce your working hours
        </h3>
        <div>
          <div class="p-4">
            <WorktimeInput
              :minutes="props.minutes"
              @updateFlag="$emit('updateFlag')"
              :id="props.id"
            />
          </div>
        </div>
      </div>
      <div class="">
        <button
          @click="infoButtonShow = !infoButtonShow"
          class="w-6 h-6 absolute top-8 right-2"
        >
          <Icon
            name="material-symbols:info-outline"
            size="24"
            class="hover:ring-2 hover:ring-gray-300 rounded-full"
            color="#343434"
          />
        </button>
        <div
          v-if="infoButtonShow"
          :class="`w-56 text-center w-full absolute top-0 left-0 rounded-md px-2 pb-1`"
        >
          <small class="text-gray-100">Created on {{ humanDate }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WorktimeInput from "./WorktimeInput.vue";
const infoButtonShow = ref(false);
const props = defineProps({
  minutes: { type: Number, required: true },
  isDone: { type: Boolean, required: true },
  id: { type: String, required: true },
  color: { type: String, required: true },
  createdAt: { type: Object, required: true },
});

const humanDate = ref("");

const convertToHumanDate = (timestamp: {
  _seconds?: number;
  _nanoseconds?: number;
}) => {
  if (
    timestamp._seconds !== undefined &&
    timestamp._nanoseconds !== undefined
  ) {
    const date = new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
    );
    return date.toLocaleString();
  }
  return "";
};

onMounted(() => {
  humanDate.value = convertToHumanDate(props.createdAt);
});
</script>
