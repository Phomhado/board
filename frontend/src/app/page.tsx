'use client'

import { useEffect, useState } from 'react'
import { Board } from '@/components/Board'
import type { Task } from '@/types/task'
import { getTasks } from '@/services/taskService'

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks().then(setTasks).catch(() => setTasks([]))
  }, [])

  return (
    <main>
      <Board>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map(t => (
            <div key={t.id} data-testid={`task-${t.id}`}>
              {String(t.title ?? t.id)}
            </div>
          ))
        ) : (
          <div data-testid="empty">Sem tarefas</div>
        )}
      </Board>
    </main>
  )
}
