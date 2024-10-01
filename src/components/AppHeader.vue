<script>
export default {
  name: "AppHeader",
};
</script>

<template>
  <h1>Ciao sono l'Header</h1>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }"> Home </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about' }"> About Us </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
