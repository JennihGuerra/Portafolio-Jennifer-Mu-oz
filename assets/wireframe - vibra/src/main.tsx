import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PreviewFrame from './PreviewFrame'
import './index.css'

// `?embed=1` marks the inner <iframe> that PreviewFrame points back at this
// same page — it mounts the app directly, with no toolbar/harness, so the
// iframe's own (resizable) viewport is what drives the mobile/desktop
// breakpoint. Without that flag this is a top-level load, so it gets the
// preview toolbar wrapped around an iframe of itself.
const isEmbedded = new URLSearchParams(window.location.search).get('embed') === '1'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isEmbedded ? <App /> : <PreviewFrame />}
  </React.StrictMode>,
)
