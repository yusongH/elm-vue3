import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
import postCssPxToRem from 'postcss-pxtorem'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 为了解决在vite下less的@import问题，把下面的'@/assets'改成绝对路径
      assets: path.resolve(__dirname, './src/assets'),
      utils: '@/utils',
      api: '@/api'
    }
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `vant/es/${name}/style`
        }
      ]
    })
  ],
  // Vite自身已经集成PostCSS，无需再次安装。另外也无需单独创建PostCSS配置文件，已集成到vite.config.js的css选项中
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*']
        })
      ]
    },
    preprocessorOptions: {
      less: {
        // 注入全局less变量
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            __dirname,
            './src/assets/styles/mixin.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8001'
      },
      '/v2': {
        target: 'http://localhost:8001'
      }
    }
  }
})
