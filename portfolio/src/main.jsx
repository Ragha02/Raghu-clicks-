import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './index.css'
import App from './App.jsx'

// Register GSAP plugins once at app root
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Global GSAP defaults — smooth, premium feel
gsap.defaults({ ease: 'power3.out', duration: 0.85 })

// ScrollTrigger: refresh when fonts/images load
window.addEventListener('load', () => ScrollTrigger.refresh())

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)
