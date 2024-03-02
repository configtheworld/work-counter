import type { UserType } from "~/types/User";

export default defineNuxtRouteMiddleware((to, from) => {
  const userCookie = useCookie<UserType>("user");
  const value = userCookie.value;
  if (!value) {
    return navigateTo("/signin");
  }
  if (userCookie.value.token === "") {
    return navigateTo("/signin");
  }
});
