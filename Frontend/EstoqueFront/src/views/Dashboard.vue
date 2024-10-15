<template>
  <v-container>
    <v-row>
      <!-- Card: Preço Total do Estoque -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Preço Total do Estoque</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-alert type="info" dense>
                  R$ {{ totalEstoque.toFixed(2) }}
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Card: Lucro Potencial -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Lucro Potencial do Estoque</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-alert type="success" dense>
                  R$ {{ lucroEstoque.toFixed(2) }}
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Gráfico: Estoque Atual dos Produtos -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Estoque Atual dos Produtos</v-card-title>
          <v-card-text>
            <BarChart
              v-if="stockData.labels.length"
              :chart-data="stockData"
              :chart-options="chartOptions"
            />
            <p v-else>Carregando dados do estoque...</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Gráfico: Histórico de Movimentações -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Histórico de Movimentações</v-card-title>
          <v-card-text>
            <LineChart
              v-if="movementData.labels.length"
              :chart-data="movementData"
              :chart-options="chartOptions"
            />
            <p v-else>Carregando dados das movimentações...</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import BarChart from "../components/BarChart.vue";
import LineChart from "../components/LineChart.vue";
import { parseISO, format } from "date-fns"; // Adicionei date-fns para formatar a data corretamente

export default {
  components: {
    BarChart,
    LineChart,
  },
  setup() {
    const products = ref([]);
    const stockData = ref({ labels: [], datasets: [] });
    const movementData = ref({ labels: [], datasets: [] });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const totalEstoque = computed(() =>
      products.value.reduce(
        (total, produto) =>
          total + produto.preco_custo * produto.quantidade_estoque,
        0
      )
    );

    const lucroEstoque = computed(() =>
      products.value.reduce(
        (total, produto) =>
          total +
          (produto.preco_venda - produto.preco_custo) * produto.quantidade_estoque,
        0
      )
    );

    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const [productsResponse, movementsResponse] = await Promise.all([
          axios.get("http://localhost:3000/produtos", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/movimentacoes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        products.value = productsResponse.data || [];
        const movements = movementsResponse.data || [];

        stockData.value = {
          labels: products.value.map((p) => p.nome),
          datasets: [
            {
              label: "Quantidade em Estoque",
              backgroundColor: "#42A5F5",
              data: products.value.map((p) => p.quantidade_estoque),
            },
          ],
        };

        const movementLabels = movements
          .map((m) => parseISO(m.createdAt)) // Converte para objeto Date
          .sort((a, b) => a - b) // Ordena cronologicamente
          .map((date) => format(date, "dd/MM/yyyy")); // Formata para dd/MM/yyyy

        movementData.value = {
          labels: movementLabels,
          datasets: [
            {
              label: "Entradas",
              borderColor: "#66BB6A",
              data: movements
                .filter((m) => m.tipo === "entrada")
                .map((m) => m.quantidade),
              fill: false,
            },
            {
              label: "Saídas",
              borderColor: "#EF5350",
              data: movements
                .filter((m) => m.tipo === "saida")
                .map((m) => m.quantidade),
              fill: false,
            },
          ],
        };
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    onMounted(fetchDashboardData);

    return {
      products,
      stockData,
      movementData,
      chartOptions,
      totalEstoque,
      lucroEstoque,
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
