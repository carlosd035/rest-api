'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addEntry } from '@/components/actions'

// Define the UserSchema with email, password, and name
const UserSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  name: z.string().optional()
})

// Infer the Inputs type from the schema
type Inputs = z.infer<typeof UserSchema>

export default function RhfWithAction() {
  const [data, setData] = useState<Inputs>()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(UserSchema)
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await addEntry(data)

    if (!result) {
      console.log('Something went wrong')
      return
    }

    if (result.error) {
      // set local error state
      console.log(result.error)
      return
    }

    reset()
    setData(result.data)
  }

  return (
    <section className='flex gap-6'>
      <form
        onSubmit={handleSubmit(processForm)}
        className='flex flex-1 flex-col gap-4 sm:w-1/2'
      >
        <input
          placeholder='Email'
          className='rounded-lg'
          {...register('email')}
        />
        {errors.email?.message && (
          <p className='text-sm text-red-400'>{errors.email.message}</p>
        )}

        <input
          type='password'
          placeholder='Password'
          className='rounded-lg'
          {...register('password')}
        />
        {errors.password?.message && (
          <p className='text-sm text-red-400'>{errors.password.message}</p>
        )}

        <input
          placeholder='Name'
          className='rounded-lg'
          {...register('name')}
        />
        {errors.name?.message && (
          <p className='text-sm text-red-400'>{errors.name.message}</p>
        )}

        <button className='rounded-lg bg-black py-2 text-white'>Submit</button>
      </form>

      <div className='flex-1 rounded-lg bg-cyan-600 p-8 text-white'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  )
}
