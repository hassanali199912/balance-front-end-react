import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500, // رفع حد التحذير إلى 1.5MB
    rollupOptions: {
      output: {
        // تقسيم CSS منفصل عن JS
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks: (id) => {
          // React core libraries
          // if (id.includes('react') && !id.includes('react-router') && !id.includes('react-i18next')) {
          //   return 'react-vendor';
          // }
          
          // Router
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Internationalization
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          
          // Animation libraries
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          
          // Maps libraries
          if (id.includes('leaflet') || id.includes('google-auth') || id.includes('google-one-tap')) {
            return 'external-services';
          }
          
          // CSS Modules and Styles
          if (id.includes('.module.css') || id.includes('styles/')) {
            return 'styles';
          }
          
          // UI Components - تقسيم مكونات UI إلى chunks منفصلة
          if (id.includes('src/components/ui/home')) {
            return 'ui-home';
          }
          if (id.includes('src/components/ui/projects')) {
            return 'ui-projects';
          }
          if (id.includes('src/components/ui/properties')) {
            return 'ui-properties';
          }
          if (id.includes('src/components/ui/project-details')) {
            return 'ui-project-details';
          }
          if (id.includes('src/components/ui/property-details')) {
            return 'ui-property-details';
          }
          if (id.includes('src/components/ui/dashboard')) {
            return 'ui-dashboard';
          }
          if (id.includes('src/components/ui/common') || id.includes('src/components/shared')) {
            return 'ui-common';
          }
          
          // Pages - تقسيم الصفحات
          if (id.includes('src/pages/public')) {
            return 'pages-public';
          }
          if (id.includes('src/pages/dashboard')) {
            return 'pages-dashboard';
          }
          if (id.includes('src/pages/auth')) {
            return 'pages-auth';
          }
          
          // Services & API
          if (id.includes('src/services')) {
            return 'services';
          }
          
          // Contexts & Hooks
          if (id.includes('src/contexts')) {
            return 'contexts';
          }
          
          // Types & Utils
          if (id.includes('src/types') || id.includes('src/utils')) {
            return 'utils';
          }
          
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  }
})
