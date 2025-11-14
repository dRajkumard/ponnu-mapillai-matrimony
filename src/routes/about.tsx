import { Heading, Text, Card } from '@/components/ui'

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Heading size="2xl" className="mb-6">
        About
      </Heading>
      <Card>
        <Text className="mb-4">
          This is the about page for Divine Light Admin. Built with React, Vite, and TypeScript.
        </Text>
        <Text>
          The application follows best practices for modern React development with a focus on
          componentization, type safety, and maintainability.
        </Text>
      </Card>
    </div>
  )
}

export default AboutPage

