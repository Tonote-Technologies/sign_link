<template>
  <template v-if="!onLine">
    <div class="grid">
      <div class="access">
        <Icon icon="ic:round-signal-wifi-statusbar-connected-no-internet-4" style="font-size:4rem;" />
        <h1>No internet</h1>
        <p>Try:</p>
        <ul>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
        </ul>
      </div>
    </div>
  </template>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const onLine = ref(navigator.onLine)

const updateOnlineStatus = (e) => {
  const { type } = e;
  onLine.value = type === "online";
}

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus.value);
  window.addEventListener("offline", updateOnlineStatus.value);
})

onBeforeUnmount(() => {
  window.removeEventListener("online", updateOnlineStatus.value);
  window.removeEventListener("offline", updateOnlineStatus.value);
})
</script>

<style scoped>
.grid {
  display: grid;
  place-items: center;
  height: 50vh;
}
</style>