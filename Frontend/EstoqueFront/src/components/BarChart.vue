<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController, // Adicionado: Registro do controlador "bar"
} from 'chart.js';
import { onMounted, watch, defineComponent } from 'vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController // Registrando o controlador do gráfico de barras
);

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
      }),
    },
  },
  setup(props) {
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) chartInstance.destroy(); // Destrói instância anterior

      const ctx = document.querySelector('canvas').getContext('2d');
      chartInstance = new ChartJS(ctx, {
        type: 'bar', // Tipo do gráfico
        data: props.chartData,
        options: props.chartOptions,
      });
    };

    onMounted(renderChart);
    watch(() => props.chartData, renderChart, { deep: true });

    return {};
  },
});
</script>
