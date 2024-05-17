import {
  faCircleLeft,
  faFloppyDisk,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton, TextArea, TextField } from 'ev-component-library'
import { useState } from 'react'

import { Template } from '@/app/business/types/templates.types'

import { Task } from '../../business/types/task.types'
import { createNewTask } from '../../business/utils/tasks.utils'
import { useStateStorage } from '../hooks/useStateStorage'

const INITIAL_TEMPLATES: Template[] = []

type TaskFormProps = {
  onSubmit: (_newTask: Task) => void
  selectedTask?: Task
  onCancel: () => void
}
export const TaskForm = ({
  onSubmit,
  selectedTask,
  onCancel,
}: TaskFormProps) => {
  const [displayTemplateForm, setDisplayTemplateForm] = useState(false)
  const [templates, setTemplates] = useStateStorage<Template[]>(
    'LETS_ROCK_TEMPLATES',
    INITIAL_TEMPLATES
  )
  const [template, setTemplate] = useState<Template>({ title: '' })
  const [task, setTask] = useState<Task>(selectedTask ?? createNewTask())

  const onSubmitTemplate = () => {
    setTemplates((prev) => [...prev, template])
    setDisplayTemplateForm(false)
    setTemplate({ title: '' })
    try {
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[355px] m-auto">
      <div className="flex justify-between">
        <IconButton onClick={onCancel}>
          <FontAwesomeIcon icon={faCircleLeft} className="text-ev-dark" />
        </IconButton>
        <Button type="submit">
          <div className="flex gap-2 items-center">
            Create
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(task)
        }}
        className="flex flex-col items-center gap-1 w-full"
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
      </form>

      <ul className="flex flex-col gap-1 overflow-y-auto">
        {templates.length === 0 && (
          <li className="grid place-items-center text-center bg-ev-light-hard p-2">
            There is no suggestion, create a template to get suggestions
          </li>
        )}
        {templates.map((cur, idx) => (
          <li
            key={idx}
            onClick={() => setTask((p) => ({ ...p, title: cur.title }))}
            className="px-2 rounded-md bg-ev-light-hard hover:bg-ev-light cursor-pointer"
          >
            {cur.title}
          </li>
        ))}
        {!displayTemplateForm && (
          <li className="w-full flex justify-center">
            <Button
              type="button"
              onClick={() => setDisplayTemplateForm(true)}
              className="bg-ev-dark mx-auto"
            >
              <div className="flex gap-2 items-center justify-center">
                New Template
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </Button>
          </li>
        )}
        {displayTemplateForm && (
          <li className="w-full">
            <form
              onSubmit={onSubmitTemplate}
              className="flex items-center gap-2"
            >
              <TextField
                value={template.title}
                onChange={(value) => setTemplate({ title: value })}
                variant="solid"
                className="flex-grow"
              />
              <Button type="submit">
                <FontAwesomeIcon icon={faFloppyDisk} />
              </Button>
            </form>
          </li>
        )}
      </ul>
    </div>
  )
}
