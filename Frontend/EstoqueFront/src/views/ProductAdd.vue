<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">Adicionar Produto</v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Nome do Produto"
                v-model="produto.nome"
                required
              />
              <v-textarea label="Descrição" v-model="produto.descricao" />
              <v-text-field
                label="Preço de Custo"
                v-model="produto.preco_custo"
                type="number"
                required
              />
              <v-text-field
                label="Preço de Venda"
                v-model="produto.preco_venda"
                type="number"
                required
              />
              <v-text-field
                label="Estoque Mínimo"
                v-model="produto.estoque_minimo"
                type="number"
              />
              <v-text-field
                label="Estoque Máximo"
                v-model="produto.estoque_maximo"
                type="number"
              />

              <v-select
                :items="categorias"
                item-text="nome"
                item-value="id"
                label="Categoria"
                v-model="categorias.id"
                required
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="addProduto">Salvar</v-btn>
            <v-btn text @click="$router.push('/produtos')">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { ref, reactive, toRaw } from "vue";

export default {
  setup() {
    const produto = reactive({
      nome: "",
      descricao: "",
      preco_custo: 0,
      preco_venda: 0,
      estoque_minimo: 0,
      estoque_maximo: 0,
      categoria_id: null,
    });

    const categorias = ref([]);

    const fetchCategorias = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/categorias", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Verifica e mapeia categorias recebidas
        categorias.value = response.data.map((categoria) => ({
          id: categoria.id,
          nome: categoria.nome,
        }));

        console.log("Categorias formatadas:", categorias.value);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        alert("Erro ao buscar categorias.");
      }
    };

    const addProduto = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.post("http://localhost:3000/produtos", produto, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Produto adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        alert("Erro ao adicionar produto.");
      }
    };

    fetchCategorias();

    return {
      produto,
      categorias,
      addProduto,
    };
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
