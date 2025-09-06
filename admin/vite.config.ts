import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap({
    hostname: 'https://admin.sirz.co.uk',
    dynamicRoutes: [
      '/',
      '/login',
      '/register',
      '/users',
      '/users/:id',
      '/blogs',
      '/newsletters',

      'agent/contentCreation',
      'agent/leadClassifier',
      'agent/logoCreator',
      'agent/dataAnalyst',
      'agent/chat',

      '/ai-inquiries',
      '/brandcom-inquiries',
      '/lead-scoring',
      '/landing-page-inquiries',
      '/content-agent-inquiries',
      '/chatbot-inquiries',
      '/web-form-inquiries',
      '/schedule-demo-inquiries',
      '/demo-entries',

      '/assets',
      '/roles',
      '/analytics',
      '/settings',
      '/courses',
      
    ],
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date()
  })],
})
