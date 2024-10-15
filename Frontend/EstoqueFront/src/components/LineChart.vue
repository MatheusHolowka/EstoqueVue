<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale, // Escala de tempo para eixo X
  LineController,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Adaptador para lidar com datas
import { format } from 'date-fns'; // Para formatar a data corretamente
import { onMounted, watch, defineComponent, onBeforeUnmount, ref, nextTick } from 'vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  LineController
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
        scales: {
          x: {
            type: 'time', // Escala de tempo no eixo X
            time: {
              unit: 'day', // Agrupar por dia
              displayFormats: {
                day: 'dd/MM/yyyy', // Formatar como dd/MM/yyyy
              },
            },
            title: {
              display: true,
              text: 'Data',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantidade',
            },
          },
        },
      }),
    },
  },
  setup(props) {
    const canvasRef = ref(null); // Ref para o canvas
    let chartInstance = null;

    const renderChart = () => {
      // Destruir instância anterior, se existir
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = canvasRef.value?.getContext('2d'); // Verificação segura
      if (!ctx) {
        console.error('Erro: Canvas não encontrado.');
        return;
      }

      chartInstance = new ChartJS(ctx, {
        type: 'line',
        data: props.chartData,
        options: props.chartOptions,
      });
    };

    onMounted(async () => {
      await nextTick(); // Garante que o canvas esteja no DOM
      renderChart();
    });

    watch(
      () => props.chartData,
      () => renderChart(),
      { deep: true }
    );

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      canvasRef,
    };
  },
});
</script>
