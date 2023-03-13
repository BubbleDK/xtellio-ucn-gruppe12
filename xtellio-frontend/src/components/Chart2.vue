<script>
  defineProps({
  })

  async function getData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    finalRes.values = await res.json();
  }

  onMounted(() => {
    getData();
  })
</script>

<template>
  <div v-bind:key="item.id" v-for="item in finalRes.values">
      <p>{{item.id}}</p>
  </div>
</template>

<style>

</style>