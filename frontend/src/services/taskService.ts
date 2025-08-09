import api from './api'
import type { Task } from '@/types/task'

export async function getTasks(): Promise<Task[]> {
  const res = await api.get('/tasks')
  let d: unknown = res.data
  if (typeof d === 'string') {
    try { d = JSON.parse(d) } catch {}
  }
  const x = d as any
  if (Array.isArray(x)) return x
  if (x && Array.isArray(x.tasks)) return x.tasks
  if (x && Array.isArray(x.data)) return x.data
  if (x && Array.isArray(x.items)) return x.items
  return []
}
