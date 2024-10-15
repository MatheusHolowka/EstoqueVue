<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Adicionar Categoria</v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Nome da Categoria"
                v-model="categoria.nome"
                required
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="addCategoria">Salvar</v-btn>
            <v-btn text @click="$router.push('/dashboard')">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categoria: {
        nome: '',
      },
    };
  },
  methods: {
    async addCategoria() {
      const token = localStorage.getItem('token');
      try {
        await axios.post(
          'http://localhost:3000/categorias',
          this.categoria,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Categoria adicionada com sucesso!');
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        alert('Erro ao adicionar categoria.');
      }
    },
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
