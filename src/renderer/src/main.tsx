import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { LocaleBridge } from './i18n/LocaleBridge'
import App from './App'
import { installDebugForwarding } from './lib/debugForward'
import './styles/global.css'
// After global.css on purpose: the dialog footer alignment and the compact
// empty state override rules there and have to win on source order.
import './styles/dialogs.css'
import './styles/monitorNav.css'
import '@xterm/xterm/css/xterm.css'

// Before the tree mounts, so an error thrown during the first render is
// already being forwarded when it happens. Main drops these unless debug mode
// is on.
installDebugForwarding()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* Outside App, not inside it: App returns early for a revoked device,
          and the screen that says so is one a user has to be able to read in
          their own language. See LocaleBridge for the rest. */}
      <LocaleBridge />
      <App />
    </ErrorBoundary>
  </StrictMode>
)
