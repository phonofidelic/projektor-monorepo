import { Header } from '@projektor/ui'
import AuthHeader from '@/components/AuthHeader'

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings">
        <div className="flex space-x-2">
          <AuthHeader />
        </div>
      </Header>
      <div className="p-4">Settings Page</div>
    </>
  )
}
