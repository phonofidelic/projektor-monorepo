import { handlers } from './handlers'

async function initMocks() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Starting mock server in nodejs runtime')
    // const { server } = await import('./mocks/server')
    const { setupServer } = await import('msw/node')
    const server = setupServer(...handlers)
    server.listen()
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    if (typeof window !== 'undefined') {
      console.log('Starting mock service worker in edge runtime')
      // const { worker } = await import('./mocks/browser')
      const { setupWorker } = await import('msw')
      const worker = setupWorker(...handlers)
      worker.start()
    } else {
      console.log('Starting mock server in edge runtime')
      // const { server } = await import('./mocks/server')
      const { setupServer } = await import('msw/node')
      const server = setupServer(...handlers)
      server.listen()
    }
  }
}
initMocks()

export {}
