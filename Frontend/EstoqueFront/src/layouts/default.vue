<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <Menu @logout="deslogar" titulo="Menu principal" />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ route.name }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView /> <!-- Renderiza a página correspondente aqui -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'; // Hook para acessar a rota atual

const drawer = ref(true); // Controla o estado da drawer
const route = useRoute(); // Acessa a rota atual para mostrar o nome na App Bar

const deslogar = () => {
  localStorage.removeItem('token');
  window.location.href = '/'; // Redireciona para a tela de login após logout
};
</script>
