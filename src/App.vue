<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";

</script>

<style scoped>
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.min-h-screen {
  min-height: 100vh;
}

.font-Roboto {
  font-family: 'Roboto', sans-serif;
}

.bg-weather-primary {
  background-color: 		pink; /* Ganti dengan warna sesuai kebutuhan Anda */
}

/* Gaya untuk transisi halaman */
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}

/* Gaya tambahan untuk RouterView */
.router-view {
  flex: 1;
  padding: 2rem;
}

/* Gaya tambahan untuk transisi */
.page-leave-active {
  transition: 600ms ease all;
}

.page-leave-to {
  opacity: 0;
}

/* Contoh media query untuk responsif */
@media (max-width: 768px) {
  .site-navigation {
    padding: 0.5rem;
  }

  .router-view {
    padding: 1rem;
  }
}
</style>