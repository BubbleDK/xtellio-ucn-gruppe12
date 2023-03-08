<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  numbers: Number,
})

const count = ref(0)

const clickFunc = () => {
  count.value++;
}

</script>

<template>
  <button @click="clickFunc();">Hello</button>
  <p>{{ count }}</p>
  <p>{{ msg }}</p>

  <p>{{ count > 5 ? "hello" : "Dont know" }}</p>

  <p>{{ numbers }}</p>
</template>

<style scoped>
  
</style>
