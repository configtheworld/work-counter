<template>
  <div class="h-[90px]">
    <div class="relative">
      <div class="absolute inset-0 flex items-center justify-center relative">
        <button
          @click="toggleCounter"
          :class="`relative w-12 h-12 focus:outline-none text-white ${color}  hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 mb-2 z-10`"
        >
          <svg
            v-if="!isRunning"
            class="w-6 h-6 mt-[1px] ml-[1px]"
            fill="white"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3l14 9L5 21V3z"
            ></path>
          </svg>
          <svg
            v-else
            class="mt-[3px] ml-[3px] w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="22"
              height="22"
              rx="2"
              ry="2"
              fill="currentColor"
            ></rect>
          </svg>
          <div
            v-if="isRunning"
            class="absolute inset-0 flex items-center justify-center z-[-1]"
          >
            <div :class="`w-8 h-8  ${color} rounded-full animate-ping`"></div>
          </div>
        </button>
      </div>
    </div>
    <div v-if="isRunning" class="mt-2 flex items-center justify-center">
      <div class="text-2xl font-bold text-gray-700">
        {{ timerHours <= 9 ? "0" : "" }}{{ timerHours }}:{{
          timerMinutes <= 9 ? "0" : ""
        }}{{ timerMinutes }}:{{ timerSeconds <= 9 ? "0" : ""
        }}{{ timerSeconds }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import type { UserType } from "~/types/User";

const emit = defineEmits(["updateFlag"]);
const props = defineProps({
  minutes: { type: Number, required: true },
  color: { type: String, required: true },
});

const isRunning = ref(false);
const timerMinutes = ref(0);
const timerSeconds = ref(0);
const timerHours = ref(0);
const onlyAsMinutes = ref(0);
let timer: ReturnType<typeof setInterval>;
const circleDashArray = 251;
let circleDashOffset = ref(circleDashArray);
const router = useRouter();
const userCookie = useCookie<UserType>("user");

const toggleCounter = () => {
  if (isRunning.value) {
    // Stop the timer if it's running
    clearInterval(timer);
    isRunning.value = false;
    timerHours.value = 0;
    timerMinutes.value = 0;
    timerSeconds.value = 0;
  } else {
    // Start a new timer
    isRunning.value = true;
    timer = setInterval(() => {
      if (timerSeconds.value === 59) {
        timerSeconds.value = 0;
        circleDashOffset.value = circleDashArray;
        onlyAsMinutes.value += 1;
        if (timerMinutes.value === 59) {
          timerMinutes.value = 0;
          timerHours.value += 1;
        } else {
          timerMinutes.value += 1;
        }
      } else {
        timerSeconds.value += 1;
        circleDashOffset.value = (circleDashArray * timerSeconds.value) / 60;
      }
    }, 1000);
  }
};

// Reset the counter when isRunning changes to false
watch(isRunning, async (newValue) => {
  if (!newValue) {
    timerHours.value = 0;
    timerMinutes.value = 0;
    timerSeconds.value = 0;
    await handleTimer(onlyAsMinutes.value, props.minutes);
    onlyAsMinutes.value = 0;
    circleDashOffset.value = circleDashArray;
  }
});

const handleTimer = async (timerMinutes: number, propsMinutes: number) => {
  if (timerMinutes > 0) {
    try {
      const counterId = router.currentRoute.value.query.id as string;
      let payload = { minutes: propsMinutes, id: counterId, isDone: false };

      if (timerMinutes >= propsMinutes) {
        payload.minutes = 0;
        payload.isDone = true;
      } else {
        push.success(
          "You have worked for " +
            timerMinutes +
            " minutes." +
            (propsMinutes - onlyAsMinutes.value) +
            " minutes left"
        );
        const reduceMinutes = propsMinutes - timerMinutes;
        payload.minutes = reduceMinutes;
      }

      const response = await axios.patch("/api/counter-id", payload, {
        headers: {
          Authorization:
            "Bearer " + userCookie.value.user.stsTokenManager.accessToken,
        },
      });

      if (response.status === 204) {
        push.success("🙌 Worktime successfully reduced!");
        emit("updateFlag");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: pulse 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
