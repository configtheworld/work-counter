<template>
  <div class="absolute inset-0 w-full h-full z-40">
    <div class="flex flex-row lg:flex-row w-full h-full">
      <div
        class="w-0 h-full order-1 md:w-1/2 lg:w-2/3 bg-gray-500 opacity-50 overflow-hidden whitespace-nowrap"
        @click="toggleSideMenu"
      ></div>
      <div
        class="w-full h-full order-2 md:w-1/2 lg:w-1/3 bg-white p-4 shadow-md rounded-md overflow-hidden whitespace-nowrap"
      >
        <h2 class="text-2xl font-semibold mb-4 text-center text-gray-600">
          Create Counter
        </h2>

        <button
          title="back"
          @click="toggleSideMenu"
          class="absolute md:hidden top-0 left-0 m-2 hover:scale-110"
        >
          <Icon
            name="material-symbols:arrow-left-alt-rounded"
            color="#343434"
            size="48"
          />
        </button>

        <div>
          <form
            class="max-w-sm mx-auto flex flex-col"
            @submit.prevent="submitForm"
          >
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Name:</label
              >
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="name"
                v-model="formData.name"
                required
              />
            </div>

            <div class="mb-5">
              <label
                for="color"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Counter Color:</label
              >
              <div class="relative inline-block text-left">
                <div>
                  <button
                    @click="toggleDropdown"
                    type="button"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35vh] p-2.5"
                  >
                    <span
                      :class="`flex w-30 h-5 me-3 ${selectedColor} rounded-md opacity-75`"
                    ></span>
                  </button>
                </div>
                <div
                  v-show="dropdownOpen"
                  @click="toggleDropdown"
                  class="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
                ></div>
                <div
                  v-show="dropdownOpen"
                  class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div
                    class="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      v-for="(color, index) in colors"
                      :key="index"
                      @click="selectColor(color)"
                      class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      role="menuitem"
                    >
                      <span
                        :class="`flex w-3 h-3 me-3 ${color} rounded-full`"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <label
                class="block mb-2 text-sm font-medium text-gray-900"
                for="minutes"
                >Minutes:</label
              >

              <div class="w-full">
                <input
                  v-for="(n, index) in code"
                  :id="'input_' + index"
                  :key="index"
                  v-model="code[index]"
                  type="number"
                  pattern="\d*"
                  class="border-2 border-gray-300 text-center rounded-lg max-w-[90px] m-1"
                  maxlength="1"
                  @input="handleInput"
                  @keypress="isNumber"
                  @keydown.delete="handleDelete"
                  @paste="onPaste"
                />
              </div>
            </div>

            <button
              type="submit"
              class="py-2.5 px-5 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { UserType } from "~/types/User";
const userCookie = useCookie<UserType>("user");
const code: string[] = Array(4).fill("");
let dataFromPaste: string[] | undefined;
const { minutesCalculator } = useCounters();
const emit = defineEmits(["updateFlag", "openCreateForm"]);
const keysAllowed: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const wrongInputErrorMessage = ref(false);
const timeArr = ref(Array(4).fill(""));
function isNumber(event: Event) {
  (event.currentTarget as HTMLInputElement).value = "";
  const keyPressed: string = (event as KeyboardEvent).key;
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  } else {
    const inputId = (event.target as HTMLInputElement).id;
    if (inputId === "input_2" && keyPressed >= "6") {
      wrongInputErrorMessage.value = true;
    } else {
      wrongInputErrorMessage.value = false;
    }
  }
}
function handleInput(event: Event) {
  const inputType = (event as InputEvent).inputType;
  let currentActiveElement = event.target as HTMLInputElement;

  if (inputType === "insertText")
    (currentActiveElement.nextElementSibling as HTMLElement)?.focus();

  if (inputType === "insertFromPaste" && dataFromPaste) {
    for (const num of dataFromPaste) {
      const id: number = parseInt(currentActiveElement.id.split("_")[1]);
      currentActiveElement.value = num;
      code[id] = num;
      if (currentActiveElement.nextElementSibling) {
        currentActiveElement =
          currentActiveElement.nextElementSibling as HTMLInputElement;
        (currentActiveElement.nextElementSibling as HTMLElement)?.focus();
      }
    }
  }
  checkTimeValue(code);
}

function checkTimeValue(code: Array<string>) {
  if (code.some((element) => element !== "0" && element !== "")) {
    timeArr.value = code;
  }
}

function handleDelete(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const currentActiveElement = event.target as HTMLInputElement;
  if (!value)
    (currentActiveElement.previousElementSibling as HTMLElement)?.focus();
}

function onPaste(event: Event) {
  dataFromPaste = (event as ClipboardEvent).clipboardData
    ?.getData("text")
    .trim()
    .split("");

  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) event.preventDefault();
    }
  }
}

interface FormData {
  name: string;
  color: string;
  minutes: number;
}

const formData = ref<FormData>({
  name: "",
  color: "",
  minutes: 0,
});

const colors = [
  "bg-gray-200",
  "bg-gray-900",
  "bg-blue-600",
  "bg-green-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-yellow-300",
  "bg-teal-500",
];

const selectedColor = ref<string>(colors[0]);
const dropdownOpen = ref<boolean>(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectColor = (color: string) => {
  selectedColor.value = color;
  dropdownOpen.value = false;
};
const submitForm = async () => {
  const previewMinutes = minutesCalculator(timeArr.value);
  if (previewMinutes > 0) {
    await createCounterHandler(
      formData.value.name,
      selectedColor.value,
      previewMinutes
    );
  } else {
    push.info("Please enter a valid time");
  }
};

const createCounterHandler = async (
  name: string,
  color: string,
  minutes: number
) => {
  try {
    let payload = { minutes: minutes, name: name, color: color };

    const response = await axios.post("/api/counters", payload, {
      headers: {
        Authorization:
          "Bearer " + userCookie.value.user.stsTokenManager.accessToken,
      },
    });

    if (response.data.status === 200) {
      push.success("🙌 Counter successfully created!");
      emit("updateFlag");
      // reset form
      formData.value = {
        name: "",
        color: "",
        minutes: 0,
      };
      emit("openCreateForm");
    }
  } catch (error) {
    console.log(error);
  }
};

const toggleSideMenu = () => {
  emit("openCreateForm");
};
</script>

<style scoped></style>
