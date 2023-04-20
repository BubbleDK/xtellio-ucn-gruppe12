<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue';
import HelloWorld from './components/HelloWorld.vue'
import accordion from './components/DeviceList.vue'

export default {
  name: 'App',
  el: '#app',
  components: {
    NavBar,
    accordion
  }
}
</script>

<style>

</style>
