<template>
  <div class="relative bg-gray-100 h-screen flex flex-col items-center">
    <OtherAppLogo />
    <OtherFooter />
    <div class="h-2/3 w-2/3 flex flex-col items-center justify-center">
      <div
        class="text-center w-full h-screen z-15 absolute flex items-center justify-center bg-gray-100 py-20"
        v-if="loadingRef"
      >
        <div>
          <OtherLoadingSpinner />
          <br />
          Waiting Google Auth
        </div>
      </div>
      <h1
        class="font-bold mb-4 text-center leading-tight text-transparent text-4xl sm:text-5xl bg-clip-text bg-gradient-to-r from-gray-500 via-gray-700 to-gray-500"
      >
        Manage your working hours <br />
        <span
          class="bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500"
          >free</span
        >
        and
        <span
          class="bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400"
          >simple</span
        >
        way
      </h1>
      <h2 class="text-2xl my-4 text-gray-700 text-center">
        Signin with your Google Account
      </h2>
      <div>
        <ul>
          <li>
            <button
              @click="handleLogin"
              class="hover:scale-110 hover:shadow-lg rounded-full ring-4 p-1 ring-gray-200 hover:ring-8"
            >
              <Icon name="logos:google-icon" size="48" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppAuth } from "~/composables/useAppAuth";
const { loginWithGoogle } = useAppAuth();
const router = useRouter();
const loadingRef = ref(false);
const userCookie = useCookie("user");
definePageMeta({
  middleware: "notauth",
});
const handleLogin = async () => {
  try {
    loadingRef.value = true;
    const user = await loginWithGoogle();

    if (user) {
      userCookie.value = JSON.stringify(user);
      push.success(
        "You have successfully logged in! Let's track your working & studying hours!🥳"
      );
      router.push("/");
      loadingRef.value = false;
    } else {
      loadingRef.value = false;
    }
  } catch (error) {
    console.error(error);
    loadingRef.value = false;
    push.error("Something went wrong...Try again!");
  }
};
</script>

<style scoped></style>
