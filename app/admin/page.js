import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '../../lib/prisma'
import UserManagement from './UserManagement'

export default async function AdminPage() {
  const session = await getServerSession()
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  // Fetch all users with their story views
  const users = await prisma.user.findMany({
    include: {
      storyViews: {
        orderBy: { viewedAt: 'desc' }
      },
      _count: {
        select: {
          storyViews: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Get story view statistics
  const storyStats = await prisma.storyView.groupBy({
    by: ['storySlug'],
    _count: {
      storySlug: true
    },
    orderBy: {
      _count: {
        storySlug: 'desc'
      }
    }
  })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage family access and view user analytics</p>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'FAMILY').length}
          </div>
          <div className="text-sm text-gray-600">Family Members</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-amber-600">
            {users.filter(u => u.role === 'GUEST').length}
          </div>
          <div className="text-sm text-gray-600">Pending Access</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.lastSignIn && u.lastSignIn > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
          </div>
          <div className="text-sm text-gray-600">Active This Week</div>
        </div>
      </div>

      {/* Story Views Statistics */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Story Views</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyStats.map((stat) => (
              <div key={stat.storySlug} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-900">
                  {stat.storySlug.replace(/^\d+-/, '').replace(/-/g, ' ')}
                </span>
                <span className="text-sm text-gray-600">{stat._count.storySlug} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Management */}
      <UserManagement users={users} />
    </div>
  )
}
