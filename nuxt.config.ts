const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "notivue/nuxt", "nuxt-icon"],
  runtimeConfig: {
    public: {
      authCookieName: "__session",
      authCookieExpires: parseInt(ONE_WEEK.toString(), 10),
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },
  css: ["notivue/notifications.css", "notivue/animations.css"],
  notivue: {
    position: "top-right",
    limit: 4,
    enqueue: true,
    notifications: {
      global: {
        duration: 3000,
      },
    },
  },
});
