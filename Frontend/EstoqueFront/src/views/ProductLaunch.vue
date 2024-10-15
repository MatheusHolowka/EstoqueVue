<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Lançamento de Estoque</v-card-title>

          <v-card-text>
            <v-radio-group v-model="type" row>
              <v-radio label="Entrada" value="entrada"></v-radio>
              <v-radio label="Saída" value="saida"></v-radio>
            </v-radio-group>

            <v-text-field
              label="Quantidade"
              v-model="quantity"
              type="number"
              min="1"
              required
            ></v-text-field>

            <v-text-field
              label="Motivo"
              v-model="motivo"
              required
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="submitLaunch">Lançar</v-btn>
            <v-btn text @click="$router.push('/produtos')">Cancelar</v-btn>
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
      type: 'entrada', // Entrada ou Saída
      quantity: 1, // Quantidade do produto
      motivo: '', // Motivo do lançamento
    };
  },
  methods: {
    submitLaunch() {
      const { id } = this.$route.params;
      const token = localStorage.getItem('token');
      const usuario_id = 1; // Defina o usuário (em uma aplicação real, isso viria do login)

      const data = {
        produto_id: parseInt(id, 10), // Converter para número
        quantidade: parseInt(this.quantity, 10), // Converter para número
        usuario_id, // Usuário responsável
        motivo: this.motivo, // Motivo do lançamento
      };

      axios
        .post(`http://localhost:3000/movimentacoes/${this.type}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          alert('Lançamento realizado com sucesso!');
          this.$router.push('/produtos');
        })
        .catch((error) => {
          console.error('Erro na requisição:', error.response.data);
          alert('Erro ao realizar lançamento');
        });
    },
  },
};
</script>
