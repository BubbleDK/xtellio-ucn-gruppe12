<script>
import GetDataExample from './components/GetDataExample.vue';
import NavBar from './components/NavBar.vue';
import Chart from './components/Chart.vue';

const routes = {
  '/': GetDataExample,
}

export default {
  name: 'App',
  components: {
    GetDataExample,
    NavBar,
    Chart
  },
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  methods: {
    
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
    })
  },
}

</script>

<template>
  <NavBar/>
  <!-- <GetDataExample /> -->
  <Chart />
  <component :is="currentView" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
