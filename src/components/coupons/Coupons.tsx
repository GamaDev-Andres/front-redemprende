'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import CouponForm from './CouponsForm'
import CouponsList from './CouponsList'

export default function Coupons ({
  businessId,
  isSameUser
}: {
  businessId: string
  isSameUser: boolean
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  return (
    <div className='space-y-4'>
      {/* Botón para crear cupones */}
      {isSameUser && (
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant='default'>Crear Cupón</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Cupón</DialogTitle>
            </DialogHeader>
            <CouponForm
              businessId={businessId}
              onClose={() => setIsCreateOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Botón para ver cupones */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>Ver Cupones</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cupones Disponibles</DialogTitle>
          </DialogHeader>
          <div className='my-4'>
            <CouponsList businessId={businessId} />
          </div>
          <DialogFooter>
            <Button variant='default' onClick={() => setIsViewOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
