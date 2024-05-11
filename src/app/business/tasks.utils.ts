import { v4 as uuidv4 } from 'uuid'

import { Task } from './task.types'

export const createNewTask = (): Task => ({
  id: uuidv4(),
  done: false,
  title: '',
  targetDate: new Date().toISOString(),
})
