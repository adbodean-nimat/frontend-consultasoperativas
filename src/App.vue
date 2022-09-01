<template>
  <header-vue></header-vue>
  <router-view/>
  <footer-vue></footer-vue>
</template>
<script>
import HeaderVue from './components/Header.vue'
import FooterVue from './components/Footer.vue'
export default{
    name: 'App',
    components: {
        HeaderVue,
        FooterVue
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  min-height: 100vh;
  margin: 0px;
  display: flex;
  flex-direction: column;
}

body{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
}
</style>
