import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    sitemap({
      hostname: 'https://www.sirz.co.uk',
      dynamicRoutes: [
        '/',
        '/about',
        '/services',
        '/services-branding',
        '/services-digital-marketing',
        '/services-ecommerce',
        '/contact',
        '/privacy-policy',
        '/terms-and-conditions',
        '/projects',
        '/blog',
        '/agents',
        '/case-study',
        '/case-study-moss-glow-beauty',
        '/case-study-wellness_studio',
        '/case-study-brandcom',
        '/case-study-dentiq',
        '/case-study-nureva',
        '/case-study-purvia',
      ],
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date()
    })
],
})
