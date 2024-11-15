import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { createCoupon } from '@/services/coupon'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateCouponMutation = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.COUPON.CREATE],
    mutationFn: createCoupon,
    onSuccess   : () => {
        toast.success('Cupon creado exitosamente')
    }
  })
}
