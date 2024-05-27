'use client'
import UploadIcon from '@/components/svg/upload'
import classes from './index.module.scss'
import clsx from 'clsx'
import React, { BaseSyntheticEvent, useImperativeHandle, useRef, useState } from 'react'
import { FieldError } from 'react-hook-form'

type FileInputProps = {
  label?: string
  description?: string
  error?: FieldError | undefined
  children?: React.ReactNode
  tooltip?: string
  tooltipContent?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, description, error, children, tooltip, tooltipContent, ...props }, ref) => {
    const [fileUploaded, setFileUploaded] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const placeholderRef = useRef<HTMLParagraphElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    function onInput(e: BaseSyntheticEvent) {
      const files = e.target.files

      if (files[0]) {
        setFileUploaded(true)
        placeholderRef.current!.innerText = files[0].name
      } else {
        setFileUploaded(false)
        placeholderRef.current!.innerText = props.placeholder!
      }
    }

    return (
      <label
        className={clsx(
          classes['label'],
          error && classes['error'],
          fileUploaded && classes['uploaded']
        )}
      >
        {label && <p className="f-medium">{label}</p>}

        <span className={clsx(classes['label__input'], props['disabled'] && 'disabled')}>
          <input className="md" ref={inputRef} onInput={onInput} {...props} />
          <UploadIcon />
          <p
            className="placeholder"
            ref={placeholderRef}
            dangerouslySetInnerHTML={{ __html: `${props.placeholder}` }}
          ></p>
        </span>

        {/* <span className={classes['border']}></span> */}
        {/* {error && <p className={clsx(classes['label__error'], 'xs')}>{error.message}</p>} */}
      </label>
    )
  }
)

FileInput.displayName = 'FileInput'
export default FileInput

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
