<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import TodoPage from "./components/TodoPage"
import Navbar from "./components/Navbar"

export default {
  name: 'App',

  components: {
    TodoPage: TodoPage,
    Navbar: Navbar
  },

  data: () => ({
    //
  }),
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
}

.main-image {
  height: 350px;
  width: 370px;
}
</style>
