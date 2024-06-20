<template>
  <div>
    <div v-for="city in savedCities" :key="city.id" class="city-card-container">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>
  
    <p v-if="savedCities.length === 0" class="no-locations-message">
      Untuk memulai pelacakan lokasi, cari lokasi pada kolom di atas.
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>

<style scoped>
.city-card-container {
  margin-bottom: 16px; /* Jarak antar kartu kota */
}

.no-locations-message {
  color: red; /* Warna teks pesan jika tidak ada lokasi */
  margin-top: 16px; /* Jarak atas pesan */
}
</style>