<script>
export default {
  name: 'GetDataExample',
  data() {
    return {
      finalRes: [],
    }
  },
  methods: {
    async getData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      this.finalRes = await res.json();
    },
    getNewData() {
      const result = getDb;
    }
  },
  mounted() {
    this.getData();
  },
}

</script>

<template>
  <div v-bind:key="item.id" v-for="item in finalRes">
    <p>{{ item.title }}</p>
  </div>
</template>

<style></style>