import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import plugin from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    plugin(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 本地反向代理解决浏览器跨域限制
  server: {
    host: '0.0.0.0',
    port: 5177,
    open: true, // 运行自动打开浏览器
    proxy: {
      '/devApi': {
        // target: 'http://192.168.1.210:8080/',
        // target: 'http://192.168.6.135:9004/',
        target: 'https://ad-saas.top/aide-api/',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp('^/devApi'), '')
      }
    }
  }
});
