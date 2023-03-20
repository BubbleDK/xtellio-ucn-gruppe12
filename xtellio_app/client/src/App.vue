<template>
  <NavBar />
  <router-view />

  <HelloWorld />
</template>

<script>
import NavBar from './components/NavBar.vue';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    HelloWorld
  }
}
</script>

<style>

</style>
