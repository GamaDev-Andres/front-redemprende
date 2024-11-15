'use client'

import { useGetCouponsQuery } from '@/queries/coupon'

export default function CouponsList ({ businessId }: { businessId: string }) {
  const { data: coupons, isLoading } = useGetCouponsQuery(Number(businessId))
  if (isLoading) return <p>Cargando cupones...</p>

  if (!coupons || coupons.length === 0) {
    return <p>No hay cupones disponibles.</p>
  }

  return (
    <div className='space-y-4'>
      {coupons.map(coupon => (
        <div key={coupon.id} className='p-4 border rounded shadow'>
          <h3 className='font-bold'>{coupon.title}</h3>
          <p>{coupon.description}</p>
          <p className='text-sm text-gray-500'>
            Código: <strong>{coupon.code}</strong>
          </p>
          <p className='text-sm text-gray-500'>
            Válido hasta: {new Date(coupon.expiresAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
