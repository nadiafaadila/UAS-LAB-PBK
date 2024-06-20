<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
    </div>
    <!-- Weather Overview -->
    <div class="weather-overview">
      <h1 class="city-name">{{ route.params.city }}</h1>
      <p class="current-time">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="current-temp">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p class="feels-like">
        Feels like
        {{ Math.round(weatherData.current.feels_like) }}&deg;
      </p>
      <p class="weather-description">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="weather-icon"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
        alt=""
      />
    </div>

    <hr class="separator" />

    <!-- Hourly Weather -->
    <div class="hourly-weather">
      <div class="hourly-header">
        <h2 class="hourly-title">Hourly Weather</h2>
        <div class="hourly-list">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="hourly-item"
          >
            <p class="hour">
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="hourly-icon"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="hourly-temp">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="separator" />

    <!-- Weekly Weather -->
    <div class="weekly-weather">
      <div class="weekly-header">
        <h2 class="weekly-title">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="daily-item"
        >
          <p class="day-name">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img
            class="daily-icon"
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <div class="daily-temps">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="remove-city"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  // Ambil data kota yang disimpan dari localStorage
  const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

  // Filter kota yang ingin dihapus berdasarkan route.query.id
  const updatedCities = savedCities.filter(city => city.id !== route.query.id);

  // Simpan kembali data kota yang sudah diperbarui ke localStorage
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));

  // Redirect kembali ke halaman utama
  router.push({ name: 'home' });
};
</script>

<style scoped>
/* Gaya umum */
.bg-weather-secondary {
  background-color: #2b6cb0; /* Warna biru yang lebih menarik */
  padding: 1rem; /* Padding agar lebih rapi */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Bayangan halus */
}

.text-white {
  color: #ffffff; /* Teks berwarna putih */
}

.separator {
  border: none; /* Hapus garis border default */
  border-bottom: 1px solid #d1d5db; /* Garis tipis abu-abu */
  opacity: 0.8; /* Kehilangan opasitas untuk efek transparansi */
  margin: 2rem 0; /* Ruang di atas dan di bawah */
}

.remove-city {
  display: flex; /* Menggunakan flexbox */
  flex-direction: column; /* Menjadikan elemen anak berorientasi kolom */
  align-items: center; /* Memusatkan item secara horizontal */
  cursor: pointer; /* Ubah kursor saat hover */

  /* Gaya tambahan */
  width: fit-content; /* Menyesuaikan lebar dengan konten di dalamnya */
  transition: color 0.2s, transform 0.2s; /* Animasi warna dan transformasi */
}

.remove-city:hover {
  color: #e3342f; /* Warna merah yang lebih terang saat dihover */
  transform: scale(1.05); /* Perbesar sedikit saat dihover */
}

.remove-city i {
  font-size: 1.5rem; /* Ukuran ikon */
}

.remove-city p {
  margin-top: 0.5rem; /* Jarak atas antara ikon dan teks */
  font-size: 0.9rem; /* Ukuran teks */
}

/* Gaya untuk overview cuaca */
.weather-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #2d3748; /* Warna teks utama */
  background-color: #edf2f7; /* Warna latar belakang abu-abu muda */
  padding: 3rem 0;
  border-radius: 8px; /* Sudut melengkung */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan halus */
}

.city-name {
  font-size: 3rem; /* Ukuran font yang lebih besar */
  font-weight: bold; /* Teks lebih tebal */
  margin-bottom: 1rem; /* Ruang bawah yang sedikit lebih kecil */
}

.current-time {
  font-size: 1.2rem; /* Ukuran font yang lebih kecil */
  margin-bottom: 2rem;
}

.current-temp {
  font-size: 6rem; /* Ukuran font besar untuk suhu saat ini */
  margin-bottom: 1rem;
}

.feels-like {
  font-size: 1.2rem;
  color: #718096; /* Warna teks abu-abu untuk feels-like */
}

.weather-description {
  text-transform: capitalize;
  font-size: 1.5rem; /* Ukuran font sedang */
}

.weather-icon {
  width: 120px; /* Ukuran ikon sedikit lebih kecil */
  height: auto;
  margin-top: 1rem; /* Ruang atas untuk ikon */
}

/* Gaya untuk cuaca per jam */
.hourly-list {
  display: flex;
  gap: 2rem; /* Jarak horizontal antara item */
  overflow-x: auto; /* Scroll horizontal untuk lebih dari satu baris */
  padding: 1rem 0;
}

.hourly-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 8px; /* Sudut melengkung */
  background-color: #f7fafc; /* Warna latar belakang abu-abu muda */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Bayangan halus */
}

.hour {
  font-size: 1.2rem;
  font-weight: bold; /* Teks lebih tebal */
}

.hourly-icon {
  width: 50px;
  height: auto;
}

.hourly-temp {
  font-size: 1.5rem; /* Ukuran font untuk suhu */
}

/* Gaya untuk cuaca mingguan */
.weekly-weather {
  max-width: 768px;
  width: 100%;
  padding: 3rem 0;
}

.weekly-header {
  margin: 0 2rem;
  color: white;
}

.weekly-title {
  margin-bottom: 1rem;
}

.daily-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 8px; /* Sudut melengkung */
  background-color: #f7fafc; /* Warna latar belakang abu-abu muda */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Bayangan halus */
}

.day-name {
  color: plum;
  font-size: 1.5rem; /* Ukuran font untuk nama hari */
  font-weight: bold; /* Teks lebih tebal */
}

.daily-icon {
  width: 50px;
  height: auto;
}

.daily-temps {
  display: flex;
  gap: 1rem;
}

.daily-temps p {
  font-size: 1.2rem; /* Ukuran font untuk suhu */
  color: #718096; /* Warna teks abu-abu untuk suhu */
}
</style>
