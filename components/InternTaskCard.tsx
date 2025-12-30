'use client'
import { useState, useEffect } from "react"
import { respondToTask, startTask, pauseTask, resumeTask, completeTask } from "@/app/actions"
import { format, differenceInSeconds } from "date-fns"
import { Play, Pause, CheckCircle, XCircle, Clock } from "lucide-react"

export default function InternTaskCard({ task }: { task: any }) {
  const [elapsed, setElapsed] = useState(0)
  const [responseLeft, setResponseLeft] = useState(0)
  const [declineReason, setDeclineReason] = useState("")
  const [showDecline, setShowDecline] = useState(false)

  // Calculate initial elapsed time
  useEffect(() => {
    const calculateElapsed = () => {
      let total = 0
      task.timeLogs.forEach((log: any) => {
        if (log.type === 'WORK') {
          const end = log.endTime ? new Date(log.endTime) : new Date()
          total += differenceInSeconds(end, new Date(log.startTime))
        }
      })
      setElapsed(total)
    }
    
    calculateElapsed()
    const interval = setInterval(calculateElapsed, 1000)
    return () => clearInterval(interval)
  }, [task.timeLogs, task.status])

  // Calculate response deadline countdown
  useEffect(() => {
    if (task.status !== 'PENDING') return
    
    const updateCountdown = () => {
      const deadline = new Date(new Date(task.createdAt).getTime() + 30 * 60000)
      const left = differenceInSeconds(deadline, new Date())
      setResponseLeft(left > 0 ? left : 0)
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [task.createdAt, task.status])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}h ${m}m ${s}s`
  }

  const handleRespond = async (response: 'ACCEPTED' | 'DECLINED') => {
    if (response === 'DECLINED' && !declineReason) {
      alert("Please provide a reason")
      return
    }
    try {
      await respondToTask(task.id, response, declineReason)
    } catch (e) {
      alert("Error responding")
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-1 h-full ${
          task.priority === 'HIGH' ? 'bg-red-500' :
          task.priority === 'MEDIUM' ? 'bg-yellow-500' :
          'bg-green-500'
      }`} />
      
      <div className="flex justify-between items-start mb-4 pl-2">
        <div>
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{task.title}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{task.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
          task.priority === 'HIGH' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
          task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center mt-6 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
        <div className="text-sm text-gray-500 flex flex-col">
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Deadline</span>
          <span className="font-medium">{format(new Date(task.deadline), 'MMM d, HH:mm')}</span>
        </div>
        <div className="font-mono text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Clock size={20} className="animate-pulse" />
          {formatTime(elapsed)}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        {task.status === 'PENDING' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-3 text-sm font-bold flex items-center gap-2 text-orange-600 bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
              <Clock size={14} />
              Response required in: {Math.floor(responseLeft / 60)}m {responseLeft % 60}s
            </div>
            {!showDecline ? (
              <div className="flex gap-3">
                <button onClick={() => handleRespond('ACCEPTED')} className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg shadow-green-500/20">Accept Task</button>
                <button onClick={() => setShowDecline(true)} className="flex-1 bg-white border border-red-200 text-red-600 p-3 rounded-lg hover:bg-red-50 transition-colors font-medium">Decline</button>
              </div>
            ) : (
              <div className="space-y-3 animate-in zoom-in-95 duration-200">
                <textarea 
                  placeholder="Reason for declining..." 
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none"
                  value={declineReason}
                  onChange={e => setDeclineReason(e.target.value)}
                />
                <div className="flex gap-3">
                  <button onClick={() => handleRespond('DECLINED')} className="flex-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors">Confirm</button>
                  <button onClick={() => setShowDecline(false)} className="flex-1 bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {task.status === 'ACCEPTED' && (
          <button onClick={() => startTask(task.id)} className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 transform hover:scale-[1.02]">
            <Play size={18} fill="currentColor" /> Start Task
          </button>
        )}

        {task.status === 'IN_PROGRESS' && (
          <div className="flex gap-3">
            <button onClick={() => pauseTask(task.id)} className="flex-1 bg-yellow-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/30">
              <Pause size={18} fill="currentColor" /> Pause
            </button>
            <button onClick={() => completeTask(task.id)} className="flex-1 bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30">
              <CheckCircle size={18} /> Complete
            </button>
          </div>
        )}

        {task.status === 'PAUSED' && (
          <button onClick={() => resumeTask(task.id)} className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
            <Play size={18} fill="currentColor" /> Resume Work
          </button>
        )}

        {task.status === 'COMPLETED' && (
          <div className="text-center text-green-600 font-bold flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <CheckCircle size={20} /> Completed
          </div>
        )}
        
        {task.status === 'NO_RESPONSE' && (
           <div className="text-center text-red-600 font-bold flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <XCircle size={20} /> No Response
          </div>
        )}
      </div>
    </div>
  )
}
