<template>
  <v-list>
    <v-list-subheader>
      {{ titulo }}
    </v-list-subheader>

    <v-list-item prepend-icon="mdi-home" title="Dashboard" to="/dashboard" />
    <v-list-item prepend-icon="mdi-cart" title="Produtos" to="/produtos" />
    <v-list-item prepend-icon="mdi-folder-plus" title="Adicionar Categoria" to="/categorias/add" />

    <v-divider></v-divider>

    <v-list-item prepend-icon="mdi-logout" title="Logout" @click="$emit('logout')" />
  </v-list>
</template>

<script setup>
const props = defineProps({
  titulo: String,
});
</script>
