<template>
  <div id="app">
    <Header />
    <div class="main-section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:  rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
* {
  margin: 0;
  list-style: none;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.main-section {
  margin: auto;
  margin-top: 40px;
  width: 1200px;
}
</style>