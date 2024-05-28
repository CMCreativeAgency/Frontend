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
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import useWeb3forms from '@web3forms/react'

function ContactForm({ data }: ContactFormProps) {
  const { heading, subhead, button, socials, content, form, video } = data
  const { fields, thankyou }: any = form?.data?.attributes
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | boolean>(false)

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const accessKey = '59b5a90c-08f0-4472-87c4-8740c1065d61'

  // const onSubmit: SubmitHandler<any> = async (data: any) => {
  // return;
  // await fetch('https://api.web3forms.com/submit', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify(data, null, 2),
  // })
  //   .then(async (response) => {
  //     let json = await response.json()
  //     if (json.success) {
  //       reset()
  //       setError(false)
  //       setSuccess(true)

  //       setTimeout(() => {
  //         setSuccess(false)
  //       }, 4000)
  //     } else {
  //       setSuccess(false)
  //       setError(json?.message)
  //     }
  //   })
  //   .catch((error) => {
  //     setError(error?.message)
  //     console.log(error)
  //   })
  //   const resp = await contactFormHandler(data)

  //   if (resp.success === true) {
  //     reset()
  //     setError(false)
  //     setSuccess(true)

  //     setTimeout(() => {
  //       setSuccess(false)
  //     }, 4000)
  //   } else {
  //     setError(resp?.message)
  //   }
  // }

  const { submit: onSubmit } = useWeb3forms({
    access_key: accessKey,

    onSuccess: (msg, data) => {
      // console.log(data)
      setSuccess(true)
      // setResult(msg)
      reset()

      setTimeout(() => {
        setSuccess(false)
      }, 4000)
    },
    onError: (msg, data) => {
      // console.log(data)
      setSuccess(false)
      // setResult(msg)
    },
  })

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
          {!success && (
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                        error={errors[field.name] as any}
                        {...register(field.name, {
                          required: field.required,
                        })}
                        dangerously={true}
                      />
                    )
                  }

                  return (
                    <Input
                      key={i}
                      label={field.label}
                      {...register(field.name, {
                        required: field.required,
                      })}
                      error={errors[field.name] as any}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  )
                }

                if (field.__component.includes('file')) {
                  return (
                    <FileInput
                      key={i}
                      label={field.label}
                      accept={field.types}
                      setValue={setValue}
                      placeholder={field.placeholder}
                      error={errors[field.name] as any}
                      {...register(field.name, {
                        required: field.required,
                      })}
                    />
                  )
                }

                if (field.__component.includes('select')) {
                  return (
                    <SelectInput
                      key={i}
                      setValue={setValue}
                      label={field.label}
                      name={field.name}
                      register={register}
                      options={field.options}
                      required={field.required}
                      error={errors[field.name] as any}
                    />
                  )
                }

                if (field.__component.includes('button')) {
                  return <Button className="f-medium l" key={i} label={field.label} type="submit" />
                }
              })}
            </form>
          )}

          {success && (
            <div className={classes['form__message']}>
              <h2
                className="upper"
                dangerouslySetInnerHTML={{ __html: `${thankyou.heading}` }}
              ></h2>
              <p>{thankyou.content}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
