<template>
    <div class="chart">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue'
  import Chart from 'chart.js/auto'
  
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      labels: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const canvasRef = ref(null)
      const chartRef = ref(null)
  
      watch(
        () => props.data,
        (newData, oldData) => {
          if (oldData && oldData.length === newData.length) {
            chartRef.value.data.datasets[0].data = newData
            chartRef.value.update()
          }
        }
      )
  
      watch(
        () => props.labels,
        (newLabels, oldLabels) => {
          if (oldLabels && oldLabels.length === newLabels.length) {
            chartRef.value.data.labels = newLabels
            chartRef.value.update()
          }
        }
      )
  
      const mounted = () => {
        if (canvasRef.value && !chartRef.value) {
          chartRef.value = new Chart(canvasRef.value, {
            type: 'line',
            data: {
              labels: props.labels,
              datasets: [
                {
                  label: props.title,
                  data: props.data,
                  backgroundColor: 'rgba(70, 130, 180, 0.2)',
                  borderColor: 'rgba(70, 130, 180, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: 'rgba(70, 130, 180, 1)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  xAlign: 'center',
                  yAlign: 'bottom',
                  displayColors: false,
                  callbacks: {
                    label: (tooltipItem) => tooltipItem.yLabel.toLocaleString(),
                    title: (tooltipItem) => {
                      const date = new Date(tooltipItem[0].label)
                      return `${date.toLocaleDateString()}`
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    callback: (value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString()
                    },
                  },
                },
                y: {
                  ticks: {
                    callback: (value) => value.toLocaleString(),
                  },
                },
              },
            },
          })
        }
      }
  
      return {
        canvasRef,
        mounted,
      }
    },
    mounted() {
      this.mounted()
    },
  }
  </script>
  
  