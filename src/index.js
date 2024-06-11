// https://discourse.threejs.org/t/r2f-and-rapier-physics-to-build-floating-bubbles/64120

import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'
import Test from './Test'
import NewVersion from './NewVersion'
import TeamSection from './Team'
import FloatingImagesV5 from './Team/FloatingImagesv5'

createRoot(document.getElementById('root')).render(
  <div style={{ background: "#010313", height: "100vh" }}>

    <TeamSection />

  </div>,
)
