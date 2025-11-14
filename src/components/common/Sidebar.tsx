import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@/components/ui'
import { cn } from '@/lib/cn'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    ),
  },
  {
    label: 'Matrimony Requests',
    path: '/matrimony-requests',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    label: 'Home',
    path: '/',
    icon: (
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    ),
  },
  {
    label: 'About',
    path: '/about',
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white transition-all duration-300',
        'hidden md:block',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        <div className="flex items-center justify-end border-b border-gray-200 p-4">
          <button
            onClick={onToggle}
            className="rounded-md p-2 hover:bg-gray-100"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon size={20} className="text-gray-600">
              {isCollapsed ? (
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </Icon>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  className={cn(
                    'flex-shrink-0',
                    isActive ? 'text-blue-700' : 'text-gray-500'
                  )}
                >
                  {item.icon}
                </Icon>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t border-gray-200 p-4">
            <p className="text-xs text-gray-500">Divine Light Admin</p>
          </div>
        )}
      </div>
    </aside>
  )
}

