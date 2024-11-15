'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useCreateCouponMutation } from '@/mutations/coupons'
import { ICouponFormData } from '@/types'

export default function CouponForm ({
  businessId,
  onClose
}: {
  businessId: string
  onClose: () => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ICouponFormData>()
  const { mutateAsync } = useCreateCouponMutation()

  const onSubmit = async (data: ICouponFormData) => {
    const body = { ...data, businessId }

    const res = await mutateAsync({
      data: body,
      businessId: Number(businessId)
    })

    if (res.id) {
      reset()
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <Label htmlFor='title'>Título</Label>
        <Input
          id='title'
          placeholder='Ej. 10% de descuento'
          {...register('title', { required: 'El título es obligatorio.' })}
        />
        {errors.title && (
          <p className='text-red-500 text-sm'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='description'>Descripción</Label>
        <Textarea
          id='description'
          placeholder='Ej. Válido para compras mayores a $50,000'
          {...register('description', {
            required: 'La descripción es obligatoria.'
          })}
        />
        {errors.description && (
          <p className='text-red-500 text-sm'>{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='code'>Código</Label>
        <Input
          id='code'
          placeholder='Ej. DESCUENTO10'
          {...register('code', { required: 'El código es obligatorio.' })}
        />
        {errors.code && (
          <p className='text-red-500 text-sm'>{errors.code.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='expiresAt'>Fecha de Expiración</Label>
        <Input
          id='expiresAt'
          type='date'
          {...register('expiresAt', {
            required: 'La fecha de expiración es obligatoria.'
          })}
        />
        {errors.expiresAt && (
          <p className='text-red-500 text-sm'>{errors.expiresAt.message}</p>
        )}
      </div>

      <Button type='submit' variant='default' className='w-full'>
        Crear Cupón
      </Button>
    </form>
  )
}
