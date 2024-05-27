import { FieldError } from 'react-hook-form'
import classes from './index.module.scss'
import ChevronDown from '@/components/svg/arrows/ChevronDown'
import { use, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'

type SelectInputProps = {
  label?: string
  options?: any[]
  error?: FieldError | undefined
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

function SelectInput({ label, options, ...props }: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const customSelectRef = useRef<HTMLElement>(null)
  const customItemsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.to(customItemsRef.current, {
      height: isOpen ? 'auto' : 0,
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }, [isOpen])

  useEffect(() => {
    const items = customItemsRef.current?.querySelectorAll('li')

    items?.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        setActiveIndex(i)
        setIsOpen(false)
      })
    })
  }, [])

  function customSelectHandler() {
    setIsOpen(!isOpen)
  }

  return (
    <label className={classes['label']}>
      {label && <p>{label}</p>}

      <select name={props.name}>
        {options?.map((option) => (
          <option key={option.id} value={option.content}>
            {option.content}
          </option>
        ))}
      </select>

      <div className={clsx(classes['custom-select'], isOpen && classes['open'])}>
        <div className={classes['custom-select__wrapper']}>
          <p className={classes['custom-select__selected']} onClick={customSelectHandler}>
            <span className="text">{options && options[activeIndex].content}</span>
            <span className="arrow">
              <ChevronDown />
            </span>
          </p>

          <div className={classes['custom-select__items']} ref={customItemsRef}>
            <ul>
              {options?.map((option, i) => (
                <li
                  className={clsx(i === activeIndex && classes['selected'])}
                  key={option.id}
                  data-value={option.content}
                >
                  <p>{option.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </label>
  )
}

export default SelectInput
