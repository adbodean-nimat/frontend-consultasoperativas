const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/sso':{
        target: 'https://localhost:8090/',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
