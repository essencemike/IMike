<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
}

.app {
  width: 100%;
  height: 100%;
  font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
