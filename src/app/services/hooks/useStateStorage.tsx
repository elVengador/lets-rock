import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type SetValue<T> = T | ((_prevValue: T) => T)

/**
 * 🚨 This is used only to objects and arrays, send T as an object  { [key: string]: unknown }
 * you need to send a const in the initial value
 */

// eslint-disable-next-line comma-spacing
export const useStateStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const valueSaved = localStorage.getItem(key)
      const newValue = valueSaved ? JSON.parse(valueSaved) : initialValue
      setState(newValue)
    } catch (error) {
      localStorage.removeItem(key)
    }
  }, [initialValue, key]) //<-- this runs only the first render

  const customSetState: Dispatch<SetStateAction<T>> = (params: SetValue<T>) => {
    setState((prev) => {
      const updatedValue = params instanceof Function ? params(prev) : params
      localStorage.setItem(key, JSON.stringify(updatedValue))
      return updatedValue
    })
  }

  return [state, customSetState]
}
