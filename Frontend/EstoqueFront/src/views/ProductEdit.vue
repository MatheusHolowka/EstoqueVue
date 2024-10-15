<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Editar Produto</v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Nome" v-model="product.nome" required />
              <v-textarea label="Descrição" v-model="product.descricao" />
              <v-text-field
                label="Preço Custo"
                v-model="product.preco_custo"
                type="number"
                required
              />
              <v-text-field
                label="Preço Venda"
                v-model="product.preco_venda"
                type="number"
                required
              />
              <v-text-field
                label="Estoque Atual"
                v-model="product.quantidade_estoque"
                type="number"
                readonly
              />
              <v-select
                :items="categorias"
                item-text="nome"
                item-value="id"
                label="Categoria"
                v-model="product.categoria_id"
                required
                :return-object="false"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="updateProduct">Salvar</v-btn>
            <v-btn text @click="$router.push('/produtos')">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { toRaw } from "vue";

export default {
  data() {
    return {
      product: {
        nome: "",
        descricao: "",
        preco_custo: 0,
        preco_venda: 0,
        quantidade_estoque: 0,
        categoria_id: null,
      },
      categorias: [], // Lista de categorias obtidas da API
    };
  },
  methods: {
    async fetchCategorias() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/categorias", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data)) {
          this.categorias = response.data.map((categoria) => toRaw(categoria));
        } else {
          console.error("Formato inesperado:", response.data);
          alert("Erro: Formato de dados inválido.");
        }

        console.log("Categorias formatadas:", this.categorias);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        alert("Erro ao buscar categorias.");
      }
    },
    async fetchProduct() {
      const { id } = this.$route.params;
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:3000/produtos/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const productData = response.data;
        this.product = {
          ...productData,
          categoria_id: productData.categoria_id,
        };

        console.log("Produto recebido:", this.product);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        alert("Erro ao buscar produto.");
      }
    },
    async updateProduct() {
      const { id } = this.$route.params;
      const token = localStorage.getItem("token");

      try {
        await axios.put(`http://localhost:3000/produtos/${id}`, this.product, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Produto atualizado com sucesso!");
        this.$router.push("/produtos");
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto.");
      }
    },
  },
  created() {
    this.fetchCategorias();
    this.fetchProduct();
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
