'use client'

import {
  faCircleCheck,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton } from 'ev-component-library'
import { useState } from 'react'

import { DAYS_OF_WEEK } from './business/constants/days.constants'
import { Task } from './business/types/task.types'
import { TaskForm } from './services/components/TaskForm'
import { useStateStorage } from './services/hooks/useStateStorage'

const INITIAL_TASKS: Task[] = []

export default function Home() {
  // const [userData, setUserData] = useState<UserData>({
  //   username: '',
  //   sleepTime: { hour: '', minutes: '' },
  // })

  const [currentDate] = useState(new Date())
  const [tasks, setTasks] = useStateStorage<Task[]>(
    'LETS_ROCK_TASKS',
    INITIAL_TASKS
  )

  const [displayTaskForm, setDisplayTaskForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // const [viewForm, setViewForm] = useState<
  //   'USER_FORM' | 'SLEEP_FORM' | 'APPLICATION'
  // >('APPLICATION')

  // const onSubmitUserForm = (username: string) => {
  //   setUserData((p) => ({ ...p, username }))
  //   setViewForm('SLEEP_FORM')
  // }

  // const onSubmitSleepForm = (sleepTime: SleepTime) => {
  //   setUserData((p) => ({ ...p, sleepTime }))
  //   setViewForm('APPLICATION')
  // }

  const onSubmitNewTask = (newTask: Task) => {
    setTasks((p) => [...p, newTask])
    setDisplayTaskForm(false)
  }

  const onSubmitUpdateTask = (newTask: Task) => {
    setTasks((p) => p.map((c) => (c.id === newTask.id ? newTask : c)))
    setSelectedTask(null)
  }

  const onDeleteTask = ({ id }: Task) => {
    const confirm = window.confirm('Are you sure you want to remove the task?')
    if (!confirm) return
    setTasks((p) => p.filter((c) => c.id !== id))
  }

  return (
    <main className="w-full h-full min-h-[100dvh] bg-ev-light">
      {/* grid place-items-center */}
      {/* {viewForm === 'USER_FORM' && <UserForm onSubmit={onSubmitUserForm} />}
      {viewForm === 'SLEEP_FORM' &&
       <SleepForm onSubmit={onSubmitSleepForm} />} */}
      {/* {viewForm === 'APPLICATION' && ( */}
      <div className="h-full w-full  min-h-[100dvh] relative">
        <div className="mb-2 mx-auto w-full max-w-[355px] sticky bg-ev-light top-0">
          <div className="mb-2 flex flex-col gap-1 items-center bg-ev-primary ">
            <div>{DAYS_OF_WEEK[currentDate.getDay()]}</div>
            <div className="text-[30px] font-bold">{currentDate.getDate()}</div>
          </div>
          <div className="flex justify-between items-center p-2">
            <span>
              State: {tasks.filter((cur) => cur.done).length}/{tasks.length}
            </span>
            <Button onClick={() => setDisplayTaskForm(true)}>
              Add <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </div>
        <ul className="px-2 mx-auto w-full  max-w-[355px] flex flex-col gap-2">
          {tasks.map((cur) => (
            <li
              key={cur.id}
              className="p-[8px] flex justify-between items-center gap-1 rounded-lg border-2 border-ev-dark"
            >
              <h3>{cur.title}</h3>
              <div className="flex gap-1">
                <IconButton onClick={() => onDeleteTask(cur)} className="p-0">
                  <FontAwesomeIcon icon={faTrash} className="text-ev-dark" />
                </IconButton>
                <IconButton
                  onClick={() => setSelectedTask(cur)}
                  className="p-0"
                >
                  <FontAwesomeIcon icon={faPen} className="text-ev-dark" />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setTasks((p) =>
                      p.map((c) => (c.id === cur.id ? { ...c, done: true } : c))
                    )
                  }
                  className="p-0"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-ev-dark"
                  />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>

        {displayTaskForm && (
          <div className="sticky left-0 right-0 bottom-0 bg-ev-light-harder p-2">
            <TaskForm onSubmit={onSubmitNewTask} />
          </div>
        )}
        {selectedTask && (
          <div className="sticky left-0 right-0 bottom-0 bg-ev-light-harder p-2">
            <TaskForm
              onSubmit={onSubmitUpdateTask}
              selectedTask={selectedTask}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </main>
  )
}
