<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <AppHeader />
  <main>
    <router-view></router-view>
  </main>
  <AppFooter />
</template>

<style lang="scss"></style>
