'use client'
import classes from './index.module.scss'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { FieldError } from 'react-hook-form'

type CheckboxProps = {
  label?: string
  dangerously?: boolean
  error?: FieldError | undefined
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, dangerously, error, children, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <label className={clsx(classes['label'], error && classes['error'])}>
        <input className="md f-medium" ref={inputRef} {...props} />
        <span></span>

        {label && !dangerously && <p>{label}</p>}
        {label && dangerously && <p dangerouslySetInnerHTML={{ __html: `${label}` }}></p>}

        {/* {error && <p className={clsx(classes['label__error'], 'xs')}>{error.message}</p>} */}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
export default Checkbox

// put as a frist element of a form to
// disable text autocomplete and autofill

{
  /* <input
  autoComplete="false"
  name="hidden"
  type="text"
  style={{ display: 'none' }}
  /> */
}
