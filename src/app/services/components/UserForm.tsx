'use client'

import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, TextField } from 'ev-component-library'
import { useState } from 'react'

type UserFromProps = {
  onSubmit: (_newValue: string) => void
}
export const UserForm = ({ onSubmit }: UserFromProps) => {
  const [username, setUsername] = useState('')
  return (
    <div className="flex flex-col gap-8 max-w-[450px]">
      <h1 className="text-[20px] font-semibold">
        Hey, first time on Let’s Rock
      </h1>

      <form
        onSubmit={() => onSubmit(username)}
        className="flex flex-col items-center gap-4"
      >
        <TextField
          variant="flat"
          label="What is your name?"
          value={username}
          onChange={setUsername}
          inputClassName="border-b-2 border-ev-dark bg-ev-light-hard"
        />
        <Button type="submit">
          <div className="flex gap-2 items-center">
            Continue
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </div>
        </Button>
      </form>
    </div>
  )
}
