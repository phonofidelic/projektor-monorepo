export async function register() {
  if (process.env.NEXT_PUBLIC_MOCK_API === 'enabled') {
    await import('@projektor/mocks/initMocks')
  }
}
