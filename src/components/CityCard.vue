<template>
  <div class="city-card">
    <div class="city-info">
      <h2 class="city-name">{{ city.city }}</h2>
      <h3 class="city-state">{{ city.state }}</h3>
    </div>

    <div class="weather-info">
      <p class="current-temp">{{ Math.round(city.weather.main.temp) }}&deg;</p>
      <div class="temp-range">
        <span class="temp-max">H: {{ Math.round(city.weather.main.temp_max) }}&deg;</span>
        <span class="temp-min">L: {{ Math.round(city.weather.main.temp_min) }}&deg;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  city: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped>
.city-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #2d3748; /* Warna latar belakang */
  border-radius: 8px; /* Sudut melengkung */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan */
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.city-card:hover {
  transform: translateY(-4px); /* Efek mengangkat saat dihover */
}

.city-info {
  flex: 1;
  padding-right: 16px; /* Padding kanan untuk memisahkan dari weather-info */
}

.city-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff; /* Warna teks nama kota */
  margin-bottom: 4px; /* Ruang bawah yang sedikit lebih besar */
}

.city-state {
  font-size: 1rem;
  color: #a0aec0; /* Warna teks negara/bagian */
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.current-temp {
  font-size: 2rem;
  color: #ffffff; /* Warna teks suhu saat ini */
}

.temp-range {
  display: flex;
  align-items: center;
}

.temp-max,
.temp-min {
  font-size: 0.875rem;
  color: #cbd5e0; /* Warna teks suhu maksimum dan minimum */
  margin-left: 8px;
}
</style>
