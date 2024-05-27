import classes from './index.module.scss'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { FieldError } from 'react-hook-form'

type InputProps = {
  label?: string
  dangerously?: boolean
  error?: FieldError | undefined
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, children, dangerously, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <label className={clsx(classes['label'], error && classes['error'])}>
        {label && !dangerously && <p>{label}</p>}
        {label && dangerously && <p dangerouslySetInnerHTML={{ __html: `${label}` }}></p>}

        <input ref={inputRef} {...props} />

        <span className={classes['border']}></span>
        {/* {error && <p className={clsx(classes['label__error'], 'xs')}>{error.message}</p>} */}
      </label>
    )
  }
)

Input.displayName = 'Input'
export default Input

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
