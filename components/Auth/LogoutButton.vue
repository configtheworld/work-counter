<template>
  <div>
    <button
      title="logout"
      @click="logout"
      class="hover:scale-110 m-2 mt-2.5 mr-4"
    >
      <Icon name="fluent:sign-out-24-regular" color="#343434" size="48" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UserType } from "~/types/User";

const logout = () => {
  const userCookie = useCookie<UserType>("user");
  userCookie.value.token = "";
  push.success("Logged out! See you soon! 👋");
  navigateTo({ path: "/signin" });
};
</script>

<style scoped></style>
