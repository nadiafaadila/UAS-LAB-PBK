<template>
  <main class="container text-white">
    <div class="flex justify-center pt-4 mb-8 relative">
      <div class="w-full max-w-md">
        <input
          type="text"
          v-model="searchQuery"
          @input="getSearchResults"
          placeholder="Cari Kota atau Negara"
          class="py-3 px-4 w-full text-lg bg-transparent border-b border-white focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] text-center"
          style="line-height: 1.5rem;"
        />
        <ul
          class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 mt-1"
          v-if="mapboxSearchResults"
        >
          <p class="py-2" v-if="searchError">
            Sorry, something went wrong, please try again.
          </p>
          <p
            class="py-2"
            v-if="!searchError && mapboxSearchResults.length === 0"
          >
            No results match your query, try a different term.
          </p>
          <template v-else>
            <li
              v-for="searchResult in mapboxSearchResults"
              :key="searchResult.id"
              class="py-2 cursor-pointer"
              @click="previewCity(searchResult)"
            >
              {{ searchResult.place_name }}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
import CityList from "../components/CityList.vue";

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

input[type="text"] {
  font-size: 1.3rem; /* Ukuran teks yang lebih besar */
  width: 100%; /* Lebar input 100% */
  max-width: 600px; /* Batasan lebar maksimum */
  margin: 0 auto; /* Posisi tengah horizontal */
  line-height: 3rem; /* Sesuaikan dengan tinggi input */
}

input[type="text"]::placeholder {
  font-size: 1.2rem; /* Ukuran teks placeholder */
}

ul {
  list-style-type: none; /* Hapus tanda bullet pada daftar */
  padding: 0;
  margin: 0;
}
</style>
