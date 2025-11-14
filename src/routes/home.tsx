import { Heading, Text, Card, Button } from '@/components/ui'

const HomePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <Heading size="3xl" className="mb-4">
          Welcome to Divine Light Admin
        </Heading>
        <Text size="lg" className="mb-8 text-gray-600">
          Your admin dashboard is ready to use.
        </Text>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <Heading size="md" className="mb-2">
            Feature 1
          </Heading>
          <Text className="mb-4 text-gray-600">Description of feature 1</Text>
          <Button>Get Started</Button>
        </Card>
        <Card>
          <Heading size="md" className="mb-2">
            Feature 2
          </Heading>
          <Text className="mb-4 text-gray-600">Description of feature 2</Text>
          <Button variant="secondary">Learn More</Button>
        </Card>
        <Card>
          <Heading size="md" className="mb-2">
            Feature 3
          </Heading>
          <Text className="mb-4 text-gray-600">Description of feature 3</Text>
          <Button variant="outline">Explore</Button>
        </Card>
      </div>
    </div>
  )
}

export default HomePage

