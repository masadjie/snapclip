import { Suspense, lazy, useState } from 'react'
import { AppShell, type Tab } from './components/AppShell'
import { GeneratePage } from './features/generate/GeneratePage'
import { isMobileDevice } from './lib/device'

const ScanPage = lazy(() =>
  import('./features/scan/ScanPage').then((m) => ({ default: m.ScanPage })),
)

function App() {
  // Mobile users usually open SnapClip to scan a code someone else is
  // showing; on desktop, generating a code to show is the more likely need.
  const [tab, setTab] = useState<Tab>(() => (isMobileDevice() ? 'scan' : 'generate'))

  return (
    <AppShell active={tab} onChange={setTab}>
      {tab === 'generate' ? (
        <GeneratePage />
      ) : (
        <Suspense fallback={null}>
          <ScanPage />
        </Suspense>
      )}
    </AppShell>
  )
}

export default App
