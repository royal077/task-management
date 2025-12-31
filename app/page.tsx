import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Zap, Layout, Users } from "lucide-react"

export default async function Home() {
  const session = await auth()
  
  if (session) {
    if ((session.user as any).role === 'ADMIN') redirect("/admin")
    if ((session.user as any).role === 'INTERN') redirect("/intern")
  }
  
  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Streamline Your Internship Program
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          Manage Tasks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Precision</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          The ultimate platform for admins to assign, track, and review intern tasks. 
          Simple, powerful, and designed for productivity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <Link href="/login" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-500/20">
            Login <ArrowRight size={20} />
          </Link>
          <Link href="/register" className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
            Register as Intern
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4 border-t border-gray-100 dark:border-gray-800">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Task Assignment</h3>
          <p className="text-gray-500 dark:text-gray-400">Create and assign tasks to interns in seconds with deadlines and priorities.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Secure & Controlled</h3>
          <p className="text-gray-500 dark:text-gray-400">Admin approval workflow ensures only verified interns can access the platform.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
            <CheckCircle size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
          <p className="text-gray-500 dark:text-gray-400">Monitor task status, review submissions, and provide feedback in real-time.</p>
        </div>
      </section>
    </div>
  )
}
