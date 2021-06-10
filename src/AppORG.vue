<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
//body {
//  height: 100vh;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  margin: 0;
//}
html {
  overflow-y: hidden;
}

body{
  overflow: hidden;
}

//header{
//  z-index: 1000 !important;
//}
.page-background {
  background: url("../public/graphics/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

//body {
//  padding: 0;
//  margin: 0;
//}
</style>

<!--<style>-->



<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav {-->
<!--  padding: 30px;-->
<!--}-->

<!--#nav a {-->
<!--  font-weight: bold;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav a.router-link-exact-active {-->
<!--  color: #42b983;-->
<!--}-->
<!--</style>-->
