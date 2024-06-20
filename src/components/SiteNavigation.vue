<template>
  <header class="sticky top-0 bg-gradient-to-r from-weather-primary to-weather-secondary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center justify-between gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-4xl"></i>
          <p class="text-2xl font-bold tracking-wide text-white">National and Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-4 items-center ml-auto sm:ml-0">
        <!-- Dropdown untuk Pertemuan -->
        <div class="relative sm:text-right" @click="toggleDropdown">
          <button class="text-xl hover:text-pink-200 duration-150 capitalize">
            Daftar Tugas Nadia <i class="fa-solid fa-chevron-down ml-1"></i>
          </button>
          <ul v-if="dropdownOpen" class="absolute mt-2 right-0 sm:right-auto bg-gray-800 rounded-md shadow-lg z-10">
            <li><RouterLink :to="{ name: 'Pert1' }" class="block px-4 py-2 hover:bg-gray-700">Pertemuan 1</RouterLink></li>
            <li><RouterLink :to="{ name: 'Pert2' }" class="block px-4 py-2 hover:bg-gray-700">Pertemuan 2</RouterLink></li>
            <li><RouterLink :to="{ name: 'Pert3' }" class="block px-4 py-2 hover:bg-gray-700">Pertemuan 3</RouterLink></li>
            <li><RouterLink :to="{ name: 'Pert4' }" class="block px-4 py-2 hover:bg-gray-700">Pertemuan 4</RouterLink></li>
            <li><RouterLink :to="{ name: 'Pert5' }" class="block px-4 py-2 hover:bg-gray-700">Pertemuan 5</RouterLink></li>
            <li><RouterLink :to="{ name: 'Pert6' }" class="block px-4 py-2 hover:bg-gray-700">Pertemuan 6</RouterLink></li>
          </ul>
        </div>

        <!-- Tombol Contact Person -->
        <a href="https://www.instagram.com/nadiafaadila?igsh=em9oOG50andxeDVq&utm_source=qr" target="_blank" rel="noopener noreferrer" class="flex gap-3">
          <i class="fa-solid fa-envelope text-xl hover:text-pink-200 duration-150 cursor-pointer"></i>
        </a>

        <!-- Tombol Modal Info -->
        <div>
          <i class="fa-solid fa-circle-info text-xl hover:text-pink-200 duration-150 cursor-pointer" @click="toggleModal"></i>
        </div>

        <!-- Tombol Tambah Kota -->
        <div v-if="route.query">
          <i class="fa-solid fa-plus text-xl hover:text-pink-200 duration-150 cursor-pointer" @click="addCity"></i>
        </div>
      </div>

      <!-- Modal About -->
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <!-- Konten modal disini -->
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">Informasi Tambahan</h2>
          <p>Ini adalah konten tambahan untuk modal info.</p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const route = useRoute();
const modalActive = ref(false);
const dropdownOpen = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const addCity = () => {
  // Contoh logika untuk menambah kota
  console.log('Tambah kota...');
  // Tambahkan logika lainnya sesuai kebutuhan aplikasi
};
</script>

<style scoped>
nav.container {
  max-width: 1200px;
  margin: 0 auto;
}

.fa-sun {
  color: rgb(248, 227, 187);
}

.fa-circle-info,
.fa-plus,
.fa-envelope {
  color: #fff;
  transition: color 0.2s;
}

.fa-circle-info:hover,
.fa-plus:hover,
.fa-envelope:hover {
  color: #a0aec0;
}

.BaseModal {
  z-index: 999;
}

.text-2xl {
  font-size: 2rem;
  line-height: 1.5;
  text-align: center;
  color: #fff;
}

.font-bold {
  font-weight: 700;
}

.tracking-wide {
  letter-spacing: 1px;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, rgb(139, 139, 245), #e9967a);
}
</style>
