<template>
  <div>
    <Notivue v-slot="item">
      <Notifications :item="item" :theme="pastelTheme" />
    </Notivue>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Notivue, Notifications, pastelTheme } from "notivue";
</script>
