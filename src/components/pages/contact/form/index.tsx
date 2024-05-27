'use client'
import { ContactFormProps } from '@/lib/types/pages'
import classes from './index.module.scss'
import Button from '@/components/ui/button'
import ArrowTopRight from '@/components/svg/arrows/TopRight'
import Input from '@/components/ui/form/input'
import FileInput from '@/components/ui/form/file'
import SelectInput from '@/components/ui/form/select'
import Video from '@/components/ui/media/video'
import Checkbox from '@/components/ui/form/checkbox'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import useWeb3forms from '@web3forms/react'
import { contactFormHandler } from '@/app/actions'

function ContactForm({ data }: ContactFormProps) {
  const { heading, subhead, button, socials, content, form, video } = data
  const { fields }: any = form?.data?.attributes
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | boolean>(false)

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const resp = await contactFormHandler(data)

    console.log(resp)

    if (resp.success === true) {
      reset()
      setError(false)
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 4000)
    } else {
      setError(resp?.message)
    }
  }

  return (
    <section className={classes['form']}>
      <div className="wrapper">
        <div className={classes['form__content']}>
          <h2 className="xl f-roman h1m">{heading}</h2>
          <h3 className="o5 m f-roman">{subhead}</h3>
          <Button
            className="xl"
            label={button?.label}
            Icon={<ArrowTopRight />}
            href={button?.href}
          />

          <ul>
            {socials?.map((item, i) => (
              <li key={item.id}>
                <Button
                  className="button__brackets"
                  label={item.label}
                  href={item.href}
                  double={true}
                  target="_blank"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={classes['form__description']}>
          <p className="l">{content}</p>

          {video && (
            <Video figclass="mw" video={video} playsInline={true} muted={true} loop={true} />
          )}
        </div>

        <div className={classes['form__items']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type={'hidden'}
              {...register('access_key', {
                value: '4b309318-8141-4ca3-9f45-84c072f38a34',
              })}
            />

            <input
              type={'hidden'}
              {...register('subject', {
                value: 'CMCA - Contact form submission',
              })}
            />

            <input
              id=""
              type={'checkbox'}
              {...register('botcheck')}
              style={{
                display: 'none',
              }}
            />

            {fields?.map((field: any, i: number) => {
              if (field.__component.includes('input')) {
                if (field.type === 'checkbox') {
                  return (
                    <Checkbox
                      key={i}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      name={field.name}
                      dangerously={true}
                    />
                  )
                }

                return (
                  <Input
                    key={i}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    name={field.name}
                  />
                )
              }

              if (field.__component.includes('file')) {
                return (
                  <FileInput
                    key={i}
                    label={field.label}
                    placeholder={field.placeholder}
                    name={field.name}
                  />
                )
              }

              if (field.__component.includes('select')) {
                return (
                  <SelectInput
                    key={i}
                    label={field.label}
                    name={field.name}
                    options={field.options}
                  />
                )
              }

              if (field.__component.includes('button')) {
                return <Button className="f-medium l" key={i} label={field.label} type="submit" />
              }
            })}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
