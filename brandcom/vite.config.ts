import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sitemap({
    hostname: 'https://brandcom.sirz.co.uk',
    dynamicRoutes: [
      '/',
      '/branding',
      '/digital-marketing',
      '/ecommerce',
      '/services',
      '/services/aiContentCreator',
      '/services/websiteGrader',
      '/services/websiteBuilder',
      '/services/landingPageBuilder',
      '/services/seoBomber',
      '/services/brandkitGenerator',
      '/services/marketingAnalytics',
      '/services/smartChatbot',
      '/services/crmSync',
      '/services/leadScoringAgent',
      '/contact',
    ],
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date()
  })],
})
