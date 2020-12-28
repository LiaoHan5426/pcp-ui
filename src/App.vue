<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #f6f6f6;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #747474;
  }

  ::-webkit-scrollbar-corner {
    background: #f6f6f6;
  }

  a {
    outline: none;
  }

  a:link,a:focus,a:hover, a:visited {
    text-decoration: none !important;
  }

  a:link, a:visited {
    color: #4f4f4f;
  }
</style>
