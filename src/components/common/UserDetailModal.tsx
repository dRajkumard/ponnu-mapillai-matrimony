import { Icon } from '@/components/ui'
import { cn } from '@/lib/cn'

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

interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserDetail | null
  title?: string
}

export const UserDetailModal = ({
  isOpen,
  onClose,
  user,
  title = 'User Details',
}: UserDetailModalProps) => {
  if (!isOpen || !user) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#03318C]">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close"
          >
            <Icon size={24} className="text-gray-600">
              <path
                d="M18 6L6 18M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            {user.profileImage && (
              <div className="md:col-span-2 flex justify-center mb-4">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#03318C] border-b pb-2">
                Basic Information
              </h3>
              <DetailRow label="Name" value={user.name} />
              <DetailRow label="Email" value={user.email} />
              <DetailRow label="Phone" value={user.phone} />
              <DetailRow label="Age" value={`${user.age} years`} />
              <DetailRow label="Gender" value={user.gender} />
              <DetailRow label="Height" value={user.height} />
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#03318C] border-b pb-2">
                Professional Information
              </h3>
              <DetailRow label="Education" value={user.education} />
              <DetailRow label="Occupation" value={user.occupation} />
              <DetailRow label="Location" value={user.location} />
            </div>

            {/* Cultural Information */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-[#03318C] border-b pb-2">
                Cultural Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailRow label="Religion" value={user.religion} />
                <DetailRow label="Caste" value={user.caste} />
                <DetailRow label="Mother Tongue" value={user.motherTongue} />
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-lg font-semibold text-[#03318C] border-b pb-2">
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Request Dates */}
            {(user.requestDate || user.acceptedDate) && (
              <div className="md:col-span-2 space-y-2 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-[#03318C]">
                  Request Information
                </h3>
                {user.requestDate && (
                  <DetailRow
                    label="Request Date"
                    value={new Date(user.requestDate).toLocaleDateString()}
                  />
                )}
                {user.acceptedDate && (
                  <DetailRow
                    label="Accepted Date"
                    value={new Date(user.acceptedDate).toLocaleDateString()}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string | number
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-500 mb-1">{label}</span>
    <span className="text-base text-[#03318C]">{value}</span>
  </div>
)


