"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Target } from "lucide-react"

interface ProgressTrackerProps {
  totalUnits?: number
  completedUnits?: number
  timeRemaining?: string
}

export function ProgressTracker({
  totalUnits = 5,
  completedUnits = 0,
  timeRemaining = "12 hours",
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((completedUnits / totalUnits) * 100)
    }, 500)
    return () => clearTimeout(timer)
  }, [completedUnits, totalUnits])

  return (
    <Card className="bg-slate-800/50 border-purple-500/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Study Progress</h3>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-purple-300">{timeRemaining} left</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-300">Overall Progress</span>
              <span className="text-sm text-purple-300">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Units Completed</span>
            </div>
            <Badge variant="secondary" className="bg-green-800/50 text-green-200">
              {completedUnits}/{totalUnits}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Exam Readiness</span>
            </div>
            <Badge
              variant="secondary"
              className={`${
                progress >= 80
                  ? "bg-green-800/50 text-green-200"
                  : progress >= 60
                    ? "bg-yellow-800/50 text-yellow-200"
                    : "bg-red-800/50 text-red-200"
              }`}
            >
              {progress >= 80 ? "Ready" : progress >= 60 ? "Almost" : "Keep Going"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
