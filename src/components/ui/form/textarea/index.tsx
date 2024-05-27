import classes from './Input.module.scss'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { FieldError } from 'react-hook-form'

type TextareaProps = {
  label?: string
  error?: FieldError | undefined
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => textareaRef.current!)

    return (
      <label className={clsx(classes['label'], error && classes['error'])}>
        {label && <p>{label}</p>}

        <textarea ref={textareaRef} aria-invalid={error && true} {...props} />

        <span className={classes['border']}></span>
        {/* {error && <p className={clsx(classes['label__error'], 'xs')}>{error.message}</p>} */}
      </label>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
