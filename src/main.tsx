// Filter known Three.js r176+ deprecation warnings emitted by nested drei dependency
const _warn = console.warn.bind(console)
console.warn = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : ''
  if (msg.includes('THREE.Clock') || msg.includes('PCFSoftShadowMap')) return
  _warn(...args)
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
