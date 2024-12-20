<script setup>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <header>
    <NavbarComponent />
  </header>
  <router-view />
  <footer>
    <FooterComponent />
  </footer>
</template>

<style scoped></style>
