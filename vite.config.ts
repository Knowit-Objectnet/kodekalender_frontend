import { defineConfig } from "vite"
import svgr from "@svgr/rollup"
import { visualizer } from "rollup-plugin-visualizer"
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin"
import { resolve } from "path"
import react from "@vitejs/plugin-react"


const projectRootDir = resolve(__dirname)

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true
  },
  plugins: [
    react(),
    svgr({
      memo: true,
      exportType: "named",
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params:{
              overrides:{
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                cleanupIds: false,
                cleanupNumericValues: { floatPrecision: 2 },
                convertPathData: { floatPrecision: 2 },
                convertTransform: { floatPrecision: 2 }
              }
            }
          }
        ]
      }
    }),
    process.env.NODE_ENV == 'production' && optimizeLodashImports(),
    visualizer()
  ],
  resolve: {
    alias: {
      // "@": resolve(projectRootDir, 'src')
    }
  },
  build: {
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("framer-motion"))
            return "framer-motion"
        }
      }
    }
  }
})
