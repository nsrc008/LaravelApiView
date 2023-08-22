<template>
    <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'; 
import DashboardView from "@/views/DashboardView.vue";

export default {
    name: "App",
    router,
    components: {
      DashboardView,
    },
}
</script>

<style>
  #app {
    padding: 0;
    margin: 0;
    width: 100%;
    grid-template-columns: 150% 100%;
  }
</style>
