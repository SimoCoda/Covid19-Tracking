<template>
  <h1 class="text-xl text-[#ff8901] mt-3 xl:text-5xl">COVID-19 tracking</h1>
  <h1 class="text-6xl font-bold text-[#ff8901] mb-8 xl:text-[88px]" @click="goHome">USA</h1>
  <div class="w-80 h-12 bg-cyan-300 bg-opacity-70 m-auto rounded-full mb-8 xl:w-[800px] xl:h-[80px] flex">
      <button class="w-56 h-10 rounded-2xl font-bold text-base mt-[4px] m-2 xl:w-[430px] xl:text-4xl xl:h-[70px] xl:rounded-[30px]" @click="goHome">Global</button>
      <button class="w-56 h-10 bg-white rounded-2xl font-bold text-base mt-[4px] m-2 xl:w-[430px] xl:text-4xl xl:h-[70px] xl:rounded-[30px]" @click="goStates">States</button>
  </div>
  <div class="">
    <div class="xl:mt-16 mb-8">
      <h1 class="text-3xl m-3 font-bold mb-8 xl:text-7xl xl:mb-16"> {{ nameState }} ({{ stateData.state }}) </h1>
      <div>
        <div class="flex w-72 m-auto mb-7  xl:w-[650px] xl:mb-10">
            <div class="w-36 bg-[#ff5959] mr-6 p-2 rounded-2xl xl:w-[350px] xl:h-52 xl:mr-14">
                <h2 class="text-[17px] text-white mb-6 xl:text-[46px] xl:mb-12">Total cases:</h2>
                <h2 v-if="stateData.positive != null" class="text-white font-bold text-xl xl:text-[52px]">{{ stateData.positive }}</h2>
                <h2 v-else class="text-white font-bold text-xl xl:text-[52px]">0</h2>
            </div>
            <div class="w-36 bg-[#4cb5ff] p-2 rounded-2xl xl:w-[350px] xl:h-52">
                <h2 class="text-[17px] text-white mb-5 xl:text-[46px] xl:mb-12">Total deaths:</h2>
                <h2 v-if="stateData.death != null" class="text-white font-bold text-xl xl:text-[52px]">{{ stateData.death }}</h2>
                <h2 v-else class="text-white font-bold text-xl xl:text-[52px]">0</h2>
            </div>
        </div>
        <div class="flex w-[350px] m-auto mb-5 xl:w-[800px] xl:mb-10">
            <div class="ml-0 w-32 bg-[#d77839] mr-5 p-2 rounded-2xl xl:w-[350px] xl:h-44 xl:mr-14">
                <h2 class="text-[17px] text-white mb-10 xl:text-[35px] xl:mb-12">In ICU:</h2>
                <h2 v-if="stateData.inIcuCurrently != null" class="text-white font-bold text-xl xl:text-[52px]">{{ stateData.inIcuCurrently }}</h2>
                <h2 v-else class="text-white font-bold text-xl xl:text-[52px]">0</h2>    
            </div>
            <div class="ml-0 w-32 bg-[#4cd97b] mr-5 p-2 rounded-2xl xl:w-[350px] xl:h-44 xl:mr-14">                
                <h2 class="text-[17px] text-white mb-10 xl:text-[35px] xl:mb-12">Hospitalized:</h2>
                <h2 v-if="stateData.hospitalizedCurrently != null" class="text-white font-bold text-xl xl:text-[52px]">{{ stateData.hospitalizedCurrently }}</h2>
                <h2 v-else class="text-white font-bold text-xl xl:text-[52px]">0</h2>
            </div>
            <div class="ml-0 w-32 bg-[#9059ff] p-2 rounded-2xl xl:w-[350px] xl:h-44">
                <h2 class="text-[17px] text-white mb-4 xl:text-[35px] xl:mb-12">On ventilator:</h2>
                <h2 v-if="stateData.onVentilatorCurrently != null" class="text-white font-bold text-xl xl:text-[52px]">{{ stateData.onVentilatorCurrently }}</h2>
                <h2 v-else class="text-white font-bold text-xl xl:text-[52px]">0</h2>
            </div>
        </div>
      </div>
    </div>
    <p class="text-[15px] font-extralight italic mb-7 xl:text-[40px] xl:mb-12 xl:mt-16">Graphs related to <b>covid-19</b> data in the last few months</p>
    <div class="flex">
        <img src="../assets/image/info.png" class="h-4 mb-6 mr-1 xl:h-7 xl:mb-10 xl:mr-3 xl:ml-3"><p class="text-xs xl:text-base font-thin underline">If there is no data, there is no reference graph either</p>
    </div>
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
            <canvas id="monthly-test-chart"></canvas>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import moment from "moment";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

export default {
  name: "StateInfo",
  setup() {
    const stateData = ref({});
    const route = useRoute();
    const nameState = ref();
    const router = useRouter();

    onMounted(async () => {
      const state = route.params.state.toLowerCase();

      try {
        let resStateDaily = await axios.get(
          `https://api.covidtracking.com/v1/states/${state}/daily.json`
        );
        stateData.value = resStateDaily.data[0];
        console.log(resStateDaily.data[120]);

        const resStateInfo = await axios.get(
          `https://api.covidtracking.com/v1/states/info.json`
        );
        const stateAbbreviation = route.params.state;
        let nameFilter = resStateInfo.data.filter(
          (state) => state.state === stateAbbreviation
        );
        nameState.value = nameFilter[0].name;

        const today = resStateDaily.data[0];
        const OneMonthAgo = resStateDaily.data[30];
        const TwoMonthAgo = resStateDaily.data[60];
        const ThreeMonthAgo = resStateDaily.data[90];
        const FourMonthAgo = resStateDaily.data[120];
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
                  data: [
                    today.positive,
                    OneMonthAgo.positive,
                    TwoMonthAgo.positive,
                    ThreeMonthAgo.positive,
                    FourMonthAgo.positive,
                  ],
                  fill: true,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        );

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
                  data: [
                    today.death,
                    OneMonthAgo.death,
                    TwoMonthAgo.death,
                    ThreeMonthAgo.death,
                    FourMonthAgo.death,
                  ],
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
        );

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
                  data: [
                    today.inIcuCurrently,
                    OneMonthAgo.inIcuCurrently,
                    TwoMonthAgo.inIcuCurrently,
                    ThreeMonthAgo.inIcuCurrently,
                    FourMonthAgo.inIcuCurrently,
                  ],
                  fill: true,
                  backgroundColor: "rgba(200, 60, 0, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        );

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
                  data: [
                    today.onVentilatorCurrently,
                    OneMonthAgo.onVentilatorCurrently,
                    TwoMonthAgo.onVentilatorCurrently,
                    ThreeMonthAgo.onVentilatorCurrently,
                    FourMonthAgo.onVentilatorCurrently,
                  ],
                  fill: true,
                  backgroundColor: "rgba(255, 255, 0, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        );
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
                  data: [
                    today.hospitalizedCurrently,
                    OneMonthAgo.hospitalizedCurrently,
                    TwoMonthAgo.hospitalizedCurrently,
                    ThreeMonthAgo.hospitalizedCurrently,
                    FourMonthAgo.hospitalizedCurrently,
                  ],
                  fill: true,
                  backgroundColor: "rgba(0, 192, 50, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        );

        const monthlyTestChart = new Chart(
          document.getElementById("monthly-test-chart"),
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
                  label: "Viral test monthly",
                  data: [
                    today.totalTestResults,
                    OneMonthAgo.totalTestResults,
                    TwoMonthAgo.totalTestResults,
                    ThreeMonthAgo.totalTestResults,
                    FourMonthAgo.totalTestResults,
                  ],
                  fill: true,
                  backgroundColor: "rgba(75, 0, 192, 0.2)",
                },
              ],
            },
            options: {
              responsive: true
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    })

    function goHome(){
        router.push('/')
    }
    function goStates(){
        router.push('/states')
    }

    return {
      stateData,
      nameState,
      goHome,
      goStates,
    };
  },
};
</script>
