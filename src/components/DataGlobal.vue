<template>
  <h1 class="text-xl text-[#ff8901] mt-3 xl:text-5xl">COVID-19 tracking</h1>
  <h1 class="text-6xl font-bold text-[#ff8901] mb-8 xl:text-[88px]" @click="goHome">USA</h1>
  <div class="w-80 h-12 bg-cyan-300 bg-opacity-70 m-auto rounded-full mb-8 xl:w-[800px] xl:h-[80px] flex">
      <button class="w-56 h-10 bg-white rounded-2xl font-bold text-base mt-[4px] m-2 xl:w-[430px] xl:text-4xl xl:h-[70px] xl:rounded-[30px]" @click="goHome">Global</button>
      <button class="w-56 h-10 rounded-2xl font-bold text-base mt-[4px] m-2 xl:w-[430px] xl:text-4xl xl:h-[70px] xl:rounded-[30px]" @click="goStates">States</button>
  </div>
  <div class="mb-10">
    <p class="text-xl font-light xl:text-5xl">Monitor US COVID-19 data</p>
    <div class="mt-5 xl:mt-10">
    <div class="flex w-72 m-auto mb-5 xl:w-[650px] xl:mb-10">
      <div class="float-left w-36 h-24 bg-[#ff5959] mr-12 p-2 rounded-2xl xl:w-[350px] xl:h-52 xl:mr-16">
        <h2 class="text-[17px] text-white mb-4 xl:text-[46px] xl:mb-12">Total cases:</h2>
        <h2 class="text-white font-bold text-xl xl:text-[52px]">{{ totalCases }}</h2>
      </div>
      <div class="float-right w-36 bg-[#ffb259] p-2 rounded-2xl xl:w-[350px] xl:h-52">
        <h2 class="text-[17px] text-white mb-4 xl:text-[46px] xl:mb-12">Total deaths:</h2>
        <h2 class="text-white font-bold text-xl xl:text-[52px]">{{ totalDeaths }}</h2>
      </div>
    </div>  
    <div class="flex m-auto w-80 mb-5 xl:w-[800px] xl:mb-10">
    <div class="float-left ml-0 w-28 bg-[#9059ff] mr-4 p-2 rounded-2xl xl:w-[350px] xl:h-44 xl:mr-14">
        <h2 class="text-[17px] text-white mb-7 xl:text-[35px] xl:mb-12">Hospitalized:</h2>
        <h2 class="text-white font-bold text-xl xl:text-[52px]">{{ totalHospitalizedCumulative }}</h2>
      </div>
      <div class="float-right w-28 bg-[#4cb5ff] mr-4 p-2 rounded-2xl xl:w-[350px] xl:h-44 xl:mr-14">
        <h2 class="text-[17px] text-white mb-7 xl:text-[35px] xl:mb-12">In ICU:</h2>
        <h2 class="text-white font-bold text-xl xl:text-[52px]">{{ totalInIcuCumulative }}</h2>
      </div>
      <div class="float-right w-36 bg-[#4cd97b] p-2 rounded-2xl xl:w-[350px] xl:h-44">
        <h2 class="text-[17px] text-white mb-1 xl:text-[35px] xl:mb-12">On ventilator:</h2>
        <h2 class="text-white font-bold text-xl xl:text-[52px]">{{ totalOnVentilatorCumulative }}</h2>
      </div>
    </div>
    <div class="flex m-auto w-72 mb-10 xl:w-[650px] xl:mb-20">
      <div class="float-right w-36 bg-[#d77839] mr-12 p-2 rounded-2xl xl:w-[350px] xl:h-64 xl:mr-16">
        <h2 class="text-[17px] text-white mb-4 xl:text-[46px] xl:mb-12">Total test results:</h2>
        <span class="text-white font-bold text-xl xl:text-[52px]">{{ totalTotalTestResults }}</span>
      </div>
      <div class="float-right w-36 bg-[#502394] p-2 rounded-2xl xl:w-[350px] xl:h-64">
        <h2 class="text-[17px] text-white mb-4 xl:text-[46px] xl:mb-12">Total negative:</h2>
        <span class="text-white font-bold text-xl xl:text-[52px]">{{ totalNegative }}</span>
      </div>
    </div>
      <p class="text-sm font-extralight italic mb-3 xl:text-[45px] xl:mb-12">Graphs related to <b>covid-19</b> data in the last few months</p>
      <div class="xl:flex">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 xl:mr-28 xl:w-[600px]">
          <div>
            <canvas id="monthly-cases-chart"></canvas>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 xl:w-[600px]">
          <div>
            <canvas id="monthly-deaths-chart"></canvas>
          </div>
        </div>
      </div>
      <div class="xl:flex">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 xl:mr-28 xl:w-[600px]">
          <div>
            <canvas id="monthly-hospitalized-chart"></canvas>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 xl:w-[600px]">
          <div>
            <canvas id="monthly-inicu-chart"></canvas>
          </div>
        </div>
      </div>  
      <div class="xl:flex">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 xl:mr-28 xl:w-[600px]">
          <div>
            <canvas id="monthly-onventilator-chart"></canvas>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 xl:w-[600px]">
          <div>
            <canvas id="monthly-negative-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import axios from "axios"
import Chart from "chart.js/auto"
import moment from "moment"
import { useRouter, } from 'vue-router'


export default {
  name: "DataGlobal",

  setup() {
    const router = useRouter()
    const totalCases = ref(0);
    const totalDeaths = ref(0);
    const totalHospitalizedCumulative = ref(0);
    const totalInIcuCumulative = ref(0);
    const totalOnVentilatorCumulative = ref(0);
    const totalTotalTestResults = ref(0);
    const totalNegative = ref(0);
    const dailyCases = ref(0);
    const dailyDeaths = ref(0);
    const allDate = ref([])

    const fetchTotals = async () => {
      try {
        const resCurrent = await axios.get(
          "https://api.covidtracking.com/v1/us/current.json"
        );
        totalCases.value = resCurrent.data[0].positive
        totalDeaths.value = resCurrent.data[0].death
        totalHospitalizedCumulative.value = resCurrent.data[0].hospitalizedCumulative
        totalInIcuCumulative.value = resCurrent.data[0].inIcuCumulative
        totalOnVentilatorCumulative.value = resCurrent.data[0].onVentilatorCumulative
        totalTotalTestResults.value = resCurrent.data[0].totalTestResults
        totalNegative.value = resCurrent.data[0].negative
        // console.log(response.data)
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDaily = async () => {
      try {
        const resDaily = await axios.get(
          "https://api.covidtracking.com/v1/us/daily.json"
        );
        const today = resDaily.data[0];
        const OneMonthAgo = resDaily.data[30];
        const TwoMonthAgo = resDaily.data[60];
        const ThreeMonthAgo = resDaily.data[90];
        const FourMonthAgo = resDaily.data[120];
        const dateToday = moment(today.date, "YYYYMMDD").format("DD/MM/YYYY");
        const dateOneMonthAgo = moment(OneMonthAgo.date, "YYYYMMDD").format(
          "DD/MM/YYYY"
        );
        const dateTwoMonthAgo = moment(TwoMonthAgo.date, "YYYYMMDD").format(
          "DD/MM/YYYY"
        );
        const dateThreeMonthAgo = moment(ThreeMonthAgo.date, "YYYYMMDD").format(
          "DD/MM/YYYY"
        );
        const dateFourMonthAgo = moment(FourMonthAgo.date, "YYYYMMDD").format(
          "DD/MM/YYYY"
        );
        console.log(resDaily.data[0]);
        dailyCases.value = today.positiveIncrease;
        dailyDeaths.value = today.deathIncrease;

        const monthlyCasesChart = new Chart(
          document.getElementById("monthly-cases-chart"),
          {
            type: "line",
            data: {
                labels: [
                  dateFourMonthAgo,
                  dateThreeMonthAgo,
                  dateTwoMonthAgo,
                  dateOneMonthAgo,
                  dateToday,
              ],
              datasets: [
                {
                  label: "Cases monthly",
                  data: [today.positive, OneMonthAgo.positive, TwoMonthAgo.positive, ThreeMonthAgo.positive, FourMonthAgo.positive],
                  fill: true,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        )

        const monthlyDeathsChart = new Chart(
          document.getElementById("monthly-deaths-chart"),
          {
            type: "line",
            data: {
              labels: [
                dateFourMonthAgo,
                  dateThreeMonthAgo,
                  dateTwoMonthAgo,
                  dateOneMonthAgo,
                  dateToday,
              ],
              datasets: [
                {
                  label: "Deaths monthly",
                  data: [today.death, OneMonthAgo.death, TwoMonthAgo.death, ThreeMonthAgo.death, FourMonthAgo.death],
                  fill: true,
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        )

        const monthlyInIcuChart = new Chart(
          document.getElementById("monthly-inicu-chart"),
          {
            type: "line",
            data: {
              labels: [
                dateFourMonthAgo,
                  dateThreeMonthAgo,
                  dateTwoMonthAgo,
                  dateOneMonthAgo,
                  dateToday,
              ],
              datasets: [
                {
                  label: "In ICU monthly",
                  data: [today.inIcuCurrently, OneMonthAgo.inIcuCurrently, TwoMonthAgo.inIcuCurrently, ThreeMonthAgo.inIcuCurrently, FourMonthAgo.inIcuCurrently],
                  fill: true,
                  backgroundColor: "rgba(200, 60, 0, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        )

        const monthlyonVentilatorChart = new Chart(
          document.getElementById("monthly-onventilator-chart"),
          {
            type: "line",
            data: {
              labels: [
                dateFourMonthAgo,
                  dateThreeMonthAgo,
                  dateTwoMonthAgo,
                  dateOneMonthAgo,
                  dateToday,
              ],
              datasets: [
                {
                  label: "On ventilator monthly",
                  data: [today.onVentilatorCurrently, OneMonthAgo.onVentilatorCurrently, TwoMonthAgo.onVentilatorCurrently, ThreeMonthAgo.onVentilatorCurrently, FourMonthAgo.onVentilatorCurrently],
                  fill: true,
                  backgroundColor: "rgba(255, 255, 0, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        )
        const monthlyHospitalizedChart = new Chart(
          document.getElementById("monthly-hospitalized-chart"),
          {
            type: "line",
            data: {
              labels: [
                dateFourMonthAgo,
                  dateThreeMonthAgo,
                  dateTwoMonthAgo,
                  dateOneMonthAgo,
                  dateToday,
              ],
              datasets: [
                {
                  label: "Hospitalized monthly",
                  data: [today.hospitalizedCurrently, OneMonthAgo.hospitalizedCurrently, TwoMonthAgo.hospitalizedCurrently, ThreeMonthAgo.hospitalizedCurrently, FourMonthAgo.hospitalizedCurrently],
                  fill: true,
                  backgroundColor: "rgba(0, 192, 50, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        )
        
        const monthlyNegativeChart = new Chart(
          document.getElementById("monthly-negative-chart"),
          {
            type: "line",
            data: {
              labels: [
                dateToday,
                dateOneMonthAgo,
                dateTwoMonthAgo,
                dateThreeMonthAgo,
                dateFourMonthAgo,
              ],
              datasets: [
                {
                  label: "Negative monthly",
                  data: [today.negative, OneMonthAgo.negative, TwoMonthAgo.negative, ThreeMonthAgo.negative, FourMonthAgo.negative],
                  fill: true,
                  backgroundColor: "rgba(75, 0, 192, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        )
      } catch (error) {
        console.error(error);
      }
    };

     function goStates(){
        router.push('/states')
      }

    onMounted(() => {
      fetchTotals();
      fetchDaily();

    });

    return {
      totalCases,
      totalDeaths,
      dailyCases,
      dailyDeaths,
      totalHospitalizedCumulative,
      totalInIcuCumulative,
      totalOnVentilatorCumulative,
      totalTotalTestResults,
      totalNegative,
      goStates,
    };
  },
};
</script>
