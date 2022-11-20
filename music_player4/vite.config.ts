import path from 'path';
import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
// import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';

const isProduction = process.env.NODE_ENV === 'production';
// 第一个是工具类预设，第二个是属性化模式支持，第三个是icon支持
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
    vue({
      reactivityTransform: true,
    }),
    // 依赖关系图
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
    // setup语法糖配置name
    VueSetupExtend(),
    // 静态资源压缩
    // viteCompression(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': ['useDark', 'useThrottleFn', 'useDebounceFn'],
          axios: [
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
          pinia: ['storeToRefs'],
        },
      ],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(), // Auto import icon components
      ],
      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: ['./src/utils', './src/store/index'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts',
      // 在vue模板中使用
      vueTemplate: true,
      eslintrc: {
        enabled: true, // Default `false`
      },
    }),
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
    // 自动导入样式
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
    }),
    // css原子化
    Unocss({
      exclude: ['node_modules', '.git', '.github', '.husky', '.vscode', 'build', 'dist', 'mock', 'public', './stats.html'],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
    // 生成 svg 雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // icon symbolId
      // default
      symbolId: 'icon-[dir]-[name]',
    }),
    // 图片压缩
    viteImagemin({
      gifsicle: {
        // gif图片压缩
        optimizationLevel: 3, // 选择1到3之间的优化级别
        interlaced: false, // 隔行扫描gif进行渐进式渲染
        // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
      },
      optipng: {
        // png
        optimizationLevel: 7, // 选择0到7之间的优化级别
      },
      mozjpeg: {
        // jpeg
        quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
      },
      pngquant: {
        // png
        quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
        speed: 4, // 压缩速度，1(强力)到11(最快)
      },
      svgo: {
        // svg压缩
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  // 使用scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style.scss";`,
      },
    },
  },
});
