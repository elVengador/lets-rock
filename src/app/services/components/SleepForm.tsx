'use client'

import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, TextField } from 'ev-component-library'
import { useState } from 'react'

import { SleepTime } from '@/app/business/user'

type SleepFormProps = { onSubmit: (_newValue: SleepTime) => void }
export const SleepForm = ({ onSubmit }: SleepFormProps) => {
  const [sleepTime, setSleepTime] = useState<SleepTime>({
    hour: '',
    minutes: '',
  })
  return (
    <div className="flex flex-col gap-8 max-w-[450px]">
      <h1 className="text-[20px] font-semibold">
        Hey, first time on Let’s Rock
      </h1>

      <form
        onSubmit={() => onSubmit(sleepTime)}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex gap-4">
          <TextField
            variant="flat"
            label="Hour"
            value={sleepTime.hour}
            onChange={(newValue) =>
              setSleepTime((p) => ({ ...p, hour: newValue }))
            }
            inputClassName="border-b-2 border-ev-dark bg-ev-light-hard"
          />
          <TextField
            variant="flat"
            label="Minutes"
            value={sleepTime.minutes}
            onChange={(newValue) =>
              setSleepTime((p) => ({ ...p, minutes: newValue }))
            }
            inputClassName="border-b-2 border-ev-dark bg-ev-light-hard"
          />
        </div>
        <Button type="submit">
          <div className="flex gap-2 items-center">
            Let’s rock
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </div>
        </Button>
      </form>
    </div>
  )
}
