import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getAllInterns } from "@/app/actions"
import AdminInternList from "@/components/AdminInternList"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AdminInternsPage() {
  const session = await auth()
  if (!session || (session.user as any).role !== 'ADMIN') redirect("/")

  const interns = await getAllInterns()

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600 rounded-xl shadow-lg shadow-purple-500/30">
            <Users className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Intern Management
          </h1>
        </div>
        <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
      </div>

      <AdminInternList interns={interns} />
    </div>
  )
}
