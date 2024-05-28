import IconInfo from '@/components/svg/info'
import classes from '../input/index.module.scss'
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

        {error && (
          <span className={clsx(classes['label__error'], 'xs')}>
            <IconInfo />
            <span className="m f-roman">Please fill in this field.</span>
          </span>
        )}
      </label>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
