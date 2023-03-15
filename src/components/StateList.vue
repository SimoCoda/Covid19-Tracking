<template>
  <h1 class="text-xl text-[#ff8901] mt-3 xl:text-5xl  md:text-5xl">COVID-19 tracking</h1>
  <h1 class="text-6xl font-bold text-[#ff8901] mb-8 xl:text-[88px] md:text-[80px]" @click="goHome">USA</h1>
  <div class="w-80 h-12 bg-cyan-300 bg-opacity-70 m-auto rounded-full mb-8 xl:w-[800px] xl:h-[80px] flex md:w-[650px] md:h-[60px]">
      <button class="w-56 h-10 rounded-2xl font-bold text-base mt-[4px] m-2 xl:w-[430px] xl:text-4xl xl:h-[70px] xl:rounded-[30px] md:w-[340px] md:text-3xl md:h-[50px] md:rounded-[30px]" @click="goHome">Global</button>
      <button class="w-56 h-10 bg-white rounded-2xl font-bold text-base mt-[4px] m-2 xl:w-[430px] xl:text-4xl xl:h-[70px] xl:rounded-[30px] md:w-[340px] md:text-3xl md:h-[50px] md:rounded-[30px]" @click="goStates">States</button>
  </div>
    <div class="mb-10">
      <h1 class="text-3xl mb-5 xl:text-5xl xl:mb-16 md:text-5xl md:mb-12">List of states in the USA</h1>
      <div class="text-left ml-5 xl:-ml-10">
        <div class="xl:w-[1550px] md:w-[800px]">
          <h2 class="mb-3 font-extralight italic text-base xl:text-3xl xl:mb-8 md:text-3xl md:mb-6 md:ml-8">Select a state:</h2>
          <div class="columns-2 xl:columns-5 md:columns-3 md:ml-8">
            <ul>
              <li v-for="state in states" :key="state.state" class="text-lg xl:text-3xl xl:mb-5 xl:mr-10 md:text-2xl md:mb-3 md:mr-8">
                <router-link :to="'/states/' + state.state">{{ state.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, } from 'vue-router';
import axios from "axios"

export default {
  name: "StateList",
  setup() {
    const router = useRouter()
    const states = ref([])

    onMounted(async () => {
      let statesList = await axios.get(`https://api.covidtracking.com/v1/states/info.json`)
      states.value = statesList.data
      console.log()
    })

    function goHome(){
        router.push('/')
    }

    return {
      states,
      goHome,
    };
  },
};
</script>
