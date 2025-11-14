import { useParams, useNavigate } from 'react-router-dom'
import { Heading, Button, Icon } from '@/components/ui'
import { Card } from '@/components/ui'

// This would typically come from an API or context
// For now, we'll use the same data structure
interface UserDetail {
  id: string
  name: string
  email: string
  phone: string
  age: number
  gender: 'Male' | 'Female'
  education: string
  occupation: string
  location: string
  height: string
  religion: string
  caste: string
  motherTongue: string
  bio: string
  profileImage?: string
  requestDate?: string
  acceptedDate?: string
}

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  // Fetch user data from sessionStorage
  const getUserData = (): UserDetail | null => {
    if (!userId) return null
    
    try {
      const storedData = sessionStorage.getItem(`user_${userId}`)
      if (storedData) {
        return JSON.parse(storedData) as UserDetail
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
    return null
  }

  const user = getUserData()

  // If no user data, show a message
  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <Icon size={20}>
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
            Back
          </Button>
          <Heading size="lg">User Details</Heading>
        </div>
        <Card className="p-6">
          <p className="text-gray-600">
            User details not found. Please go back and try again.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <Icon size={20}>
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
          Back
        </Button>
        <Heading size="lg">{user.name} - Details</Heading>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Image */}
          {user.profileImage && (
            <Card className="p-6">
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Basic Information */}
          <Card className="p-6">
            <Heading size="md" className="mb-4 text-[#03318C]">
              Basic Information
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailField label="Name" value={user.name} />
              <DetailField label="Email" value={user.email} />
              <DetailField label="Phone" value={user.phone} />
              <DetailField label="Age" value={`${user.age} years`} />
              <DetailField label="Gender" value={user.gender} />
              <DetailField label="Height" value={user.height} />
            </div>
          </Card>

          {/* Professional Information */}
          <Card className="p-6">
            <Heading size="md" className="mb-4 text-[#03318C]">
              Professional Information
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailField label="Education" value={user.education} />
              <DetailField label="Occupation" value={user.occupation} />
              <DetailField label="Location" value={user.location} className="md:col-span-2" />
            </div>
          </Card>

          {/* Cultural Information */}
          <Card className="p-6">
            <Heading size="md" className="mb-4 text-[#03318C]">
              Cultural Information
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailField label="Religion" value={user.religion} />
              <DetailField label="Caste" value={user.caste} />
              <DetailField label="Mother Tongue" value={user.motherTongue} />
            </div>
          </Card>

          {/* Bio */}
          {user.bio && (
            <Card className="p-6">
              <Heading size="md" className="mb-4 text-[#03318C]">
                About
              </Heading>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Information */}
          {(user.requestDate || user.acceptedDate) && (
            <Card className="p-6">
              <Heading size="md" className="mb-4 text-[#03318C]">
                Request Information
              </Heading>
              <div className="space-y-4">
                {user.requestDate && (
                  <DetailField
                    label="Request Date"
                    value={new Date(user.requestDate).toLocaleDateString()}
                  />
                )}
                {user.acceptedDate && (
                  <DetailField
                    label="Accepted Date"
                    value={new Date(user.acceptedDate).toLocaleDateString()}
                  />
                )}
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <Heading size="md" className="mb-4 text-[#03318C]">
              Quick Actions
            </Heading>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`mailto:${user.email}`, '_blank')}
              >
                <Icon size={18} className="mr-2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </Icon>
                Send Email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`tel:${user.phone}`, '_blank')}
              >
                <Icon size={18} className="mr-2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </Icon>
                Call
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface DetailFieldProps {
  label: string
  value: string | number
  className?: string
}

const DetailField = ({ label, value, className }: DetailFieldProps) => (
  <div className={className}>
    <span className="text-sm font-medium text-gray-500 block mb-1">
      {label}
    </span>
    <span className="text-base text-[#03318C] font-medium">{value}</span>
  </div>
)

export default UserDetailsPage

