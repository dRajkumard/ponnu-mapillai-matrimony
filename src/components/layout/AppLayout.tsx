import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Sidebar } from '@/components/common/Sidebar'
import { Footer } from '@/components/common/Footer'
import { cn } from '@/lib/cn'

export const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main
          className={cn(
            'flex-1 transition-all duration-300',
            isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
          )}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

