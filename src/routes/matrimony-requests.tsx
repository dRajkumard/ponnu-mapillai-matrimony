import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterableDataTable } from '@/components/common/FilterableDataTable'
import { Heading } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/cn'

// Matrimony Request Types
interface MatrimonyRequest {
  id: string
  girlId: string
  girlName: string
  girlEmail: string
  girlPhone: string
  girlAge: number
  girlEducation: string
  girlOccupation: string
  girlLocation: string
  girlHeight: string
  girlReligion: string
  girlCaste: string
  girlMotherTongue: string
  girlBio: string
  boyId: string
  boyName: string
  boyEmail: string
  boyPhone: string
  boyAge: number
  boyEducation: string
  boyOccupation: string
  boyLocation: string
  boyHeight: string
  boyReligion: string
  boyCaste: string
  boyMotherTongue: string
  boyBio: string
  requestDate: string
  acceptedDate?: string
  status: 'both-accepted' | 'girl-requested' | 'boy-requested'
}

type TabType = 'both-accepted' | 'girl-requested' | 'boy-requested'

const MatrimonyRequestsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('both-accepted')

  // Dummy data for matrimony requests
  const allRequests: MatrimonyRequest[] = useMemo(
    () => [
      {
        id: 'MR-001',
        girlId: 'G-001',
        girlName: 'Priya Sharma',
        girlEmail: 'priya@example.com',
        girlPhone: '+91 98765 43210',
        girlAge: 28,
        girlEducation: 'M.Sc. Computer Science',
        girlOccupation: 'Software Engineer',
        girlLocation: 'Mumbai, Maharashtra',
        girlHeight: "5'4\"",
        girlReligion: 'Hindu',
        girlCaste: 'Brahmin',
        girlMotherTongue: 'Hindi',
        girlBio: 'Looking for a compatible life partner who values family and career.',
        boyId: 'B-001',
        boyName: 'Rahul Verma',
        boyEmail: 'rahul@example.com',
        boyPhone: '+91 98765 43211',
        boyAge: 30,
        boyEducation: 'M.Tech. Engineering',
        boyOccupation: 'Senior Developer',
        boyLocation: 'Mumbai, Maharashtra',
        boyHeight: "5'10\"",
        boyReligion: 'Hindu',
        boyCaste: 'Brahmin',
        boyMotherTongue: 'Hindi',
        boyBio: 'Professional with strong family values and career focus.',
        requestDate: '2024-01-15',
        acceptedDate: '2024-01-20',
        status: 'both-accepted',
      },
      {
        id: 'MR-002',
        girlId: 'G-002',
        girlName: 'Anjali Patel',
        girlEmail: 'anjali@example.com',
        girlPhone: '+91 98765 43212',
        girlAge: 26,
        girlEducation: 'B.Com',
        girlOccupation: 'Accountant',
        girlLocation: 'Ahmedabad, Gujarat',
        girlHeight: "5'3\"",
        girlReligion: 'Hindu',
        girlCaste: 'Patel',
        girlMotherTongue: 'Gujarati',
        girlBio: 'Traditional values with modern outlook.',
        boyId: 'B-002',
        boyName: 'Karan Shah',
        boyEmail: 'karan@example.com',
        boyPhone: '+91 98765 43213',
        boyAge: 29,
        boyEducation: 'MBA',
        boyOccupation: 'Business Manager',
        boyLocation: 'Ahmedabad, Gujarat',
        boyHeight: "5'9\"",
        boyReligion: 'Hindu',
        boyCaste: 'Patel',
        boyMotherTongue: 'Gujarati',
        boyBio: 'Business professional seeking life partner.',
        requestDate: '2024-02-10',
        acceptedDate: '2024-02-15',
        status: 'both-accepted',
      },
      {
        id: 'MR-003',
        girlId: 'G-003',
        girlName: 'Sneha Reddy',
        girlEmail: 'sneha@example.com',
        girlPhone: '+91 98765 43214',
        girlAge: 27,
        girlEducation: 'M.D. Medicine',
        girlOccupation: 'Doctor',
        girlLocation: 'Hyderabad, Telangana',
        girlHeight: "5'5\"",
        girlReligion: 'Hindu',
        girlCaste: 'Reddy',
        girlMotherTongue: 'Telugu',
        girlBio: 'Medical professional looking for understanding partner.',
        boyId: 'B-003',
        boyName: 'Vikram Rao',
        boyEmail: 'vikram@example.com',
        boyPhone: '+91 98765 43215',
        boyAge: 32,
        boyEducation: 'M.D. Medicine',
        boyOccupation: 'Surgeon',
        boyLocation: 'Hyderabad, Telangana',
        boyHeight: "5'11\"",
        boyReligion: 'Hindu',
        boyCaste: 'Reddy',
        boyMotherTongue: 'Telugu',
        boyBio: 'Dedicated medical professional.',
        requestDate: '2024-03-05',
        status: 'girl-requested',
      },
      {
        id: 'MR-004',
        girlId: 'G-004',
        girlName: 'Meera Nair',
        girlEmail: 'meera@example.com',
        girlPhone: '+91 98765 43216',
        girlAge: 25,
        girlEducation: 'B.Tech',
        girlOccupation: 'IT Professional',
        girlLocation: 'Bangalore, Karnataka',
        girlHeight: "5'2\"",
        girlReligion: 'Hindu',
        girlCaste: 'Nair',
        girlMotherTongue: 'Malayalam',
        girlBio: 'Tech enthusiast with traditional values.',
        boyId: 'B-004',
        boyName: 'Arjun Menon',
        boyEmail: 'arjun@example.com',
        boyPhone: '+91 98765 43217',
        boyAge: 28,
        boyEducation: 'M.Tech',
        boyOccupation: 'Tech Lead',
        boyLocation: 'Bangalore, Karnataka',
        boyHeight: "5'8\"",
        boyReligion: 'Hindu',
        boyCaste: 'Nair',
        boyMotherTongue: 'Malayalam',
        boyBio: 'Technology professional.',
        requestDate: '2024-03-20',
        status: 'girl-requested',
      },
      {
        id: 'MR-005',
        girlId: 'G-005',
        girlName: 'Divya Iyer',
        girlEmail: 'divya@example.com',
        girlPhone: '+91 98765 43218',
        girlAge: 29,
        girlEducation: 'Ph.D. Chemistry',
        girlOccupation: 'Research Scientist',
        girlLocation: 'Chennai, Tamil Nadu',
        girlHeight: "5'6\"",
        girlReligion: 'Hindu',
        girlCaste: 'Iyer',
        girlMotherTongue: 'Tamil',
        girlBio: 'Academic professional seeking intellectual match.',
        boyId: 'B-005',
        boyName: 'Suresh Iyer',
        boyEmail: 'suresh@example.com',
        boyPhone: '+91 98765 43219',
        boyAge: 31,
        boyEducation: 'Ph.D. Physics',
        boyOccupation: 'Professor',
        boyLocation: 'Chennai, Tamil Nadu',
        boyHeight: "5'9\"",
        boyReligion: 'Hindu',
        boyCaste: 'Iyer',
        boyMotherTongue: 'Tamil',
        boyBio: 'Academician with research background.',
        requestDate: '2024-04-10',
        status: 'boy-requested',
      },
      {
        id: 'MR-006',
        girlId: 'G-006',
        girlName: 'Kavya Desai',
        girlEmail: 'kavya@example.com',
        girlPhone: '+91 98765 43220',
        girlAge: 24,
        girlEducation: 'B.A. English',
        girlOccupation: 'Content Writer',
        girlLocation: 'Pune, Maharashtra',
        girlHeight: "5'3\"",
        girlReligion: 'Hindu',
        girlCaste: 'Desai',
        girlMotherTongue: 'Marathi',
        girlBio: 'Creative professional with love for literature.',
        boyId: 'B-006',
        boyName: 'Amit Desai',
        boyEmail: 'amit@example.com',
        boyPhone: '+91 98765 43221',
        boyAge: 27,
        boyEducation: 'M.A. Literature',
        boyOccupation: 'Editor',
        boyLocation: 'Pune, Maharashtra',
        boyHeight: "5'10\"",
        boyReligion: 'Hindu',
        boyCaste: 'Desai',
        boyMotherTongue: 'Marathi',
        boyBio: 'Literary professional.',
        requestDate: '2024-04-25',
        status: 'boy-requested',
      },
    ],
    []
  )

  // Filter requests based on active tab
  const filteredRequests = useMemo(() => {
    return allRequests.filter((req) => req.status === activeTab)
  }, [allRequests, activeTab])

  // Handle row click to navigate to user details page
  const handleRowClick = (request: MatrimonyRequest) => {
    // Determine which user to show based on the tab
    // For both-accepted, show girl by default (can be enhanced to show both)
    // For girl-requested, show girl (the requester)
    // For boy-requested, show boy (the requester)
    let userData
    let userId

    if (activeTab === 'both-accepted' || activeTab === 'girl-requested') {
      // Show girl details
      userId = request.girlId
      userData = {
        id: request.girlId,
        name: request.girlName,
        email: request.girlEmail,
        phone: request.girlPhone,
        age: request.girlAge,
        gender: 'Female' as const,
        education: request.girlEducation,
        occupation: request.girlOccupation,
        location: request.girlLocation,
        height: request.girlHeight,
        religion: request.girlReligion,
        caste: request.girlCaste,
        motherTongue: request.girlMotherTongue,
        bio: request.girlBio,
        requestDate: request.requestDate,
        acceptedDate: request.acceptedDate,
      }
    } else if (activeTab === 'boy-requested') {
      // Show boy details
      userId = request.boyId
      userData = {
        id: request.boyId,
        name: request.boyName,
        email: request.boyEmail,
        phone: request.boyPhone,
        age: request.boyAge,
        gender: 'Male' as const,
        education: request.boyEducation,
        occupation: request.boyOccupation,
        location: request.boyLocation,
        height: request.boyHeight,
        religion: request.boyReligion,
        caste: request.boyCaste,
        motherTongue: request.boyMotherTongue,
        bio: request.boyBio,
        requestDate: request.requestDate,
      }
    }

    if (userData && userId) {
      // Store user data in sessionStorage to pass to details page
      sessionStorage.setItem(`user_${userId}`, JSON.stringify(userData))
      // Navigate to details page
      navigate(`/user-details/${userId}`)
    }
  }

  // Columns for both-accepted table
  const bothAcceptedColumns: ColumnDef<MatrimonyRequest>[] = useMemo(
    () => [
      {
        accessorKey: 'girlName',
        header: 'Girl Name',
      },
      {
        accessorKey: 'boyName',
        header: 'Boy Name',
      },
      {
        accessorKey: 'girlAge',
        header: 'Girl Age',
      },
      {
        accessorKey: 'boyAge',
        header: 'Boy Age',
      },
      {
        accessorKey: 'girlLocation',
        header: 'Location',
      },
      {
        accessorKey: 'requestDate',
        header: 'Request Date',
        cell: ({ row }) =>
          new Date(row.original.requestDate).toLocaleDateString(),
      },
      {
        accessorKey: 'acceptedDate',
        header: 'Accepted Date',
        cell: ({ row }) =>
          row.original.acceptedDate
            ? new Date(row.original.acceptedDate).toLocaleDateString()
            : '-',
      },
    ],
    []
  )

  // Columns for girl-requested table
  const girlRequestedColumns: ColumnDef<MatrimonyRequest>[] = useMemo(
    () => [
      {
        accessorKey: 'girlName',
        header: 'Girl Name',
      },
      {
        accessorKey: 'boyName',
        header: 'Boy Name',
      },
      {
        accessorKey: 'girlAge',
        header: 'Girl Age',
      },
      {
        accessorKey: 'boyAge',
        header: 'Boy Age',
      },
      {
        accessorKey: 'girlLocation',
        header: 'Location',
      },
      {
        accessorKey: 'requestDate',
        header: 'Request Date',
        cell: ({ row }) =>
          new Date(row.original.requestDate).toLocaleDateString(),
      },
    ],
    []
  )

  // Columns for boy-requested table
  const boyRequestedColumns: ColumnDef<MatrimonyRequest>[] = useMemo(
    () => [
      {
        accessorKey: 'boyName',
        header: 'Boy Name',
      },
      {
        accessorKey: 'girlName',
        header: 'Girl Name',
      },
      {
        accessorKey: 'boyAge',
        header: 'Boy Age',
      },
      {
        accessorKey: 'girlAge',
        header: 'Girl Age',
      },
      {
        accessorKey: 'boyLocation',
        header: 'Location',
      },
      {
        accessorKey: 'requestDate',
        header: 'Request Date',
        cell: ({ row }) =>
          new Date(row.original.requestDate).toLocaleDateString(),
      },
    ],
    []
  )

  // Get columns based on active tab
  const columns = useMemo(() => {
    switch (activeTab) {
      case 'both-accepted':
        return bothAcceptedColumns
      case 'girl-requested':
        return girlRequestedColumns
      case 'boy-requested':
        return boyRequestedColumns
      default:
        return bothAcceptedColumns
    }
  }, [activeTab, bothAcceptedColumns, girlRequestedColumns, boyRequestedColumns])

  // Search keys for filtering
  const searchKeys: (keyof MatrimonyRequest)[] = useMemo(
    () => ['girlName', 'boyName', 'girlEmail', 'boyEmail', 'girlLocation', 'boyLocation'],
    []
  )

  const tabs = [
    { id: 'both-accepted' as TabType, label: 'Both Accepted', count: allRequests.filter(r => r.status === 'both-accepted').length },
    { id: 'girl-requested' as TabType, label: 'Girl Requested (Not Accepted)', count: allRequests.filter(r => r.status === 'girl-requested').length },
    { id: 'boy-requested' as TabType, label: 'Boy Requested (Not Accepted)', count: allRequests.filter(r => r.status === 'boy-requested').length },
  ]

  return (
    <div className="space-y-6">
      <Heading size="lg">Matrimony Requests</Heading>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <FilterableDataTable
        title={
          activeTab === 'both-accepted'
            ? 'Both Accepted Requests'
            : activeTab === 'girl-requested'
            ? 'Girl Requested - Not Accepted'
            : 'Boy Requested - Not Accepted'
        }
        columns={columns}
        data={filteredRequests}
        searchPlaceholder="Search by name, email, or location..."
        searchKeys={searchKeys}
        onRowClick={handleRowClick}
      />

    </div>
  )
}

export default MatrimonyRequestsPage

