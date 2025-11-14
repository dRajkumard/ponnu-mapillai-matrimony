import { Text } from '@/components/ui'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Text size="sm" className="text-center text-gray-600">
          © {new Date().getFullYear()} Divine Light Admin. All rights reserved.
        </Text>
      </div>
    </footer>
  )
}

