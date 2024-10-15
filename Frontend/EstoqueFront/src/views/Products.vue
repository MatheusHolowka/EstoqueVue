<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Produtos em Estoque</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goToAddProduct">Novo Produto</v-btn>
          </v-card-title>

          <!-- Tabela Manual com Colunas para Editar e Ações -->
          <table class="custom-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço Custo</th>
                <th>Preço Venda</th>
                <th>Estoque Atual</th>
                <th>Editar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td>{{ item.nome }}</td>
                <td>{{ item.descricao }}</td>
                <td>R$ {{ item.preco_custo }}</td>
                <td>R$ {{ item.preco_venda }}</td>
                <td>{{ item.quantidade_estoque }}</td>

                <!-- Coluna para Editar -->
                <td>
                  <v-btn color="secondary" @click="editProduct(item)">
                    Editar
                  </v-btn>
                </td>

                <!-- Coluna para Ativar/Inativar -->
                <td>
                  <v-btn
                    v-if="item.ativo"
                    color="red"
                    @click="inactivateProduct(item)"
                  >
                    Inativar
                  </v-btn>
                  <v-btn
                    v-else
                    color="green"
                    @click="activateProduct(item)"
                  >
                    Ativar
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
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
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      const token = localStorage.getItem('token');
      axios
        .get('http://localhost:3000/produtos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error('Erro ao buscar produtos:', error);
          alert('Erro ao buscar produtos');
        });
    },
    goToAddProduct() {
      this.$router.push('/produtos/add');
    },
    launchProduct(product) {
      this.$router.push(`/produtos/lancamento/${product.id}`);
    },
    editProduct(product) {
      this.$router.push(`/produtos/editar/${product.id}`);
    },
    activateProduct(product) {
      const token = localStorage.getItem('token');
      axios
        .put(`http://localhost:3000/produtos/${product.id}/ativar`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.fetchProducts();
        })
        .catch((error) => {
          console.error('Erro ao ativar produto:', error);
          alert('Erro ao ativar produto');
        });
    },
    inactivateProduct(product) {
      const token = localStorage.getItem('token');
      axios
        .put(`http://localhost:3000/produtos/${product.id}/inativar`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.fetchProducts();
        })
        .catch((error) => {
          console.error('Erro ao inativar produto:', error);
          alert('Erro ao inativar produto');
        });
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
.custom-table th,
.custom-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}
.custom-table th {
  background-color: #1e1e1e;
  color: white;
  text-align: left;
}
</style>
