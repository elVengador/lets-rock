import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, TextArea } from 'ev-component-library'
import { useState } from 'react'

import { Task } from '@/app/business/task.types'
import { createNewTask } from '@/app/business/tasks.utils'

type TaskFormProps = { onSubmit: (_newTask: Task) => void; selectedTask?: Task }
export const TaskForm = ({ onSubmit, selectedTask }: TaskFormProps) => {
  const [task, setTask] = useState<Task>(selectedTask ?? createNewTask())

  return (
    <div className="flex flex-col gap-8 w-full max-w-[355px] m-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(task)
        }}
        className="flex flex-col items-center gap-4 w-full"
      >
        <div className="flex gap-4 w-full">
          <TextArea
            variant="flat"
            label="New Task"
            value={task.title}
            onChange={(newValue) => setTask((p) => ({ ...p, title: newValue }))}
            inputClassName="border-b-2 border-ev-dark bg-ev-light-hard"
          />
        </div>
        <Button type="submit">
          <div className="flex gap-2 items-center">
            Create
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Button>
      </form>
    </div>
  )
}
