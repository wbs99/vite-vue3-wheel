<template>
  <div>
    <Pagination :totalPage="20" v-model:currentPage="currentPage" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Pagination from "../lib/Pagination.vue";

const currentPage = ref(10)
</script>

<style lang="scss" scoped></style>
