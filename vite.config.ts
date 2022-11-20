import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import plugins from './config/plugins'

const isProduction = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? './' : '',
  server: {
    host: 'localhost',
    open: true,
    cors: true,
    hmr: true,
  },
  resolve: {
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
      '@v': path.resolve(__dirname, './src/views'),
      '@h': path.resolve(__dirname, './src/hooks'),
    },
    extensions: ['.ts', '.js', '.mjs', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    ...plugins,
    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
      // 指定组件位置，默认是src/components
      dirs: ['src/components', 'src/views', 'src/layout'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
    }),
    // 生成 svg 雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // icon symbolId
      // default
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  // 使用scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style.scss";',
      },
    },
  },
})
