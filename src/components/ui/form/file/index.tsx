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
  setValue: any
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, description, error, setValue, children, ...props }, ref) => {
    const [fileUploaded, setFileUploaded] = useState<any>(false)
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const placeholderRef = useRef<HTMLParagraphElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    function onInput(e: any) {
      const data = e.target.files[0]

      if (data) {
        setFileUploaded(data)
        setValue(props.name, data)
      } else {
        setFileUploaded(false)
        setValue(props.name, '')
      }
    }

    function onDragOver(e: BaseSyntheticEvent) {
      e.preventDefault()
      setDragOver(true)
    }

    function onDrop(e: any) {
      e.preventDefault()
      const data = e.dataTransfer.files

      if (data[0]) {
        setFileUploaded(data[0])
        setValue(props.name, data[0])
      } else {
        setFileUploaded(false)
        setValue(props.name, '')
      }
    }

    function onDragEnd(e: BaseSyntheticEvent) {
      e.preventDefault()
      setDragOver(false)
    }

    return (
      <label
        className={clsx(
          classes['label'],
          error && classes['error'],
          dragOver && classes['over'],
          fileUploaded && classes['uploaded']
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragLeave={onDragEnd}
      >
        {label && <p className="f-medium">{label}</p>}

        <span className={clsx(classes['label__input'], props['disabled'] && 'disabled')}>
          <input
            ref={inputRef}
            type="file"
            className="md"
            onInput={onInput}
            // onChange={onInput}
            {...props}
          />
          <UploadIcon />
          <p
            className="placeholder"
            ref={placeholderRef}
            dangerouslySetInnerHTML={{ __html: `${fileUploaded.name || props.placeholder}` }}
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
