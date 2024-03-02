<template>
  <div class="p-4 m-4">
    <h2
      class="text-3xl sm:text-4xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400"
    >
      Your Counters
      <Icon
        name="streamline:interface-setting-menu-2-alternate-button-parallel-horizontal-lines-menu-navigation-staggered-thick"
        size="32"
        class="mb-2"
        color="#646464"
      />
    </h2>

    <div class="container mx-auto">
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <li
          v-for="counter in counters"
          :key="counter.id"
          class="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <nuxt-link
            :to="{ path: '/counter-detail', query: { id: counter.id } }"
          >
            <div
              class="relative min-h-[140px] px-6 py-4 flex flex-col text-center z-2"
            >
              <div class="relative h-10">
                <div v-if="!counter.isDone" class="opacity-50">
                  <Icon
                    class="absolute top-0 left-[-53px] z-[0]"
                    name="streamline:interface-time-midnight-whole-midnight-hour-clock-time"
                    size="100"
                    color="#949494"
                  />

                  <Icon
                    class="absolute top-[22px] left-[-30px] z-[0]"
                    name="ri:hourglass-2-fill"
                    size="55"
                    color="#848484"
                  />
                </div>

                <div v-else class="opacity-50">
                  <Icon
                    class="absolute top-[-7px] left-[-56px] z-[0]"
                    name="mynaui:circle-dashed"
                    size="115"
                    color="#949494"
                  />

                  <Icon
                    class="absolute top-[18px] left-[-30px] z-[0]"
                    name="material-symbols:alarm-on-outline-rounded"
                    size="65"
                    color="#848484"
                  />
                </div>

                <div
                  v-if="!counter.isDone"
                  class="mt-2 flex items-center justify-center"
                >
                  <div class="text-xl text-gray-700 z-10">
                    {{ calculateTime(counter.minutes) }}
                  </div>
                </div>
                <div v-else class="mt-2 flex items-center justify-center">
                  <div class="text-xl text-gray-700 z-10">Done!</div>
                </div>
              </div>

              <div class="font-bold text-gray-700 text-xl mb-2 z-10">
                {{ counter.name.slice(0, 30) }}
              </div>
              <span
                :class="`absolute bottom-0 left-0 flex w-full h-3 me-3 opacity-75 ${counter.color}`"
              ></span>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Counter } from "~/types/Counter";

defineProps({
  counters: { type: Array as PropType<Counter[]>, required: true },
});

function calculateTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesRef = minutes % 60;

  return (
    (hours > 0 ? hours + " h " : "") +
    (minutesRef > 0 ? minutesRef + " mins left" : "")
  );
}
</script>

<style scoped></style>
