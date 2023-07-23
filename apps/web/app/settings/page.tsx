import { Header } from '@projektor/ui'
import AuthHeader from '@/components/AuthHeader'

type Props = {}

export default function SettingsPage(props: Props) {
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
