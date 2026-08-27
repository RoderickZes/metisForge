
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Metis Forge',
  description: 'Aprendé infraestructura, Linux y ciberseguridad desde cero.',
  lang: 'es-AR',
  cleanUrls: true,
  base: '/metisForge/',

  themeConfig: {
    siteTitle: 'Metis Forge',

    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'LAB-001', link: '/lab-001/' },
      {
        text: 'GitHub',
        link: 'https://github.com/RoderickZes/metisForge'
      }
    ],

sidebar: {
  '/lab-001/': [
    {
      text: 'LAB-001 · First Linux Server',
      items: [
        { text: 'Introducción', link: '/lab-001/' }
      ]
    },
    {
      text: 'Preparación del entorno',
      items: [
        { text: 'Windows', link: '/lab-001/deployment/windows' },
        { text: 'macOS', link: '/lab-001/deployment/macos' },
        { text: 'Linux', link: '/lab-001/deployment/linux' }
      ]
    },
    {
      text: 'Uso del laboratorio',
      items: [
        {
          text: 'Iniciar y detener el laboratorio',
          link: '/lab-001/deployment/iniciar-y-detener-el-laboratorio'
        }
      ]
    },
    {
      text: 'Ejercicios',
      items: [
        { text: '00 · Fundamentos', link: '/lab-001/00-fundamentos/' },
        { text: '01 · Entorno', link: '/lab-001/01-entorno/' },
        { text: '02 · Terminal', link: '/lab-001/02-terminal/' },
        { text: '03 · Linux', link: '/lab-001/03-linux/' },
        { text: '04 · Usuarios', link: '/lab-001/04-usuarios/' },
        { text: '05 · Permisos', link: '/lab-001/05-permisos/' },
        { text: '06 · SSH', link: '/lab-001/06-ssh/' },
        { text: '07 · Registros', link: '/lab-001/07-registros/' }
      ]
    }
  ]
},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RoderickZes/metisForge' }
    ],

    search: {
      provider: 'local'
    }
  }
})