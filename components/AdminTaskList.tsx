'use client'
import { format } from "date-fns"
import { MoreHorizontal, Calendar, Clock, AlertCircle } from "lucide-react"

export default function AdminTaskList({ tasks }: { tasks: any[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold text-xs">
            <tr>
              <th className="p-4">Task Details</th>
              <th className="p-4">Assigned To</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Deadline</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                <td className="p-4">
                  <div className="font-bold text-gray-900 dark:text-gray-100">{task.title}</div>
                  <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{task.description}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      {task.assignedTo.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{task.assignedTo.name}</div>
                      <div className="text-xs text-gray-500">{task.assignedTo.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    task.status === 'NO_RESPONSE' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
                    task.priority === 'HIGH' ? 'text-red-600' :
                    task.priority === 'MEDIUM' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'HIGH' ? 'bg-red-500' :
                      task.priority === 'MEDIUM' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    {task.priority}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col text-xs">
                    <span className="flex items-center gap-1 text-gray-900 dark:text-gray-100 font-medium">
                      <Calendar size={12} />
                      {format(new Date(task.deadline), 'MMM d')}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 mt-0.5">
                      <Clock size={12} />
                      {format(new Date(task.deadline), 'HH:mm')}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
