'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useCreatePostMutation } from '@/mutations/post'
import { useSession } from 'next-auth/react'
const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET

interface IFormPost {
  title: string
  description: string
  imageUrl: string
}
const AddPostModal: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<IFormPost>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { mutateAsync } = useCreatePostMutation()
  const {data:session} = useSession()
  const uploadImage = async (file: File) => {
    setImageUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset as string) // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      setImageUrl(response.data.secure_url)
    } catch (error) {
      console.error('Error uploading image', error)
    } finally {
      setImageUploading(false)
    }
  }
  useEffect(() => {
    if (!isDialogOpen) {
      reset()
      setImageUrl(null)
    }
  }, [isDialogOpen])
  const handleFormSubmit = async (data: IFormPost) => {
    if (!imageUrl) return
    const res = await mutateAsync({ ...data, imageUrl ,userId:session?.user?.id ?? 0})
    if (res.id) {
      setIsDialogOpen(false)
      setImageUrl(null)
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className='px-4 py-2 my-4  rounded'>
            Agregar Publicación
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
            <div>
              <Label>Título</Label>
              <Input {...register('title', { required: true })} type='text' />
            </div>

            <div>
              <Label>Descripción</Label>
              <Textarea
                {...register('description', { required: true })}
                rows={4}
              />
            </div>

            <div>
              <Label>Foto</Label>
              <Input
                type='file'
                accept='image/*'
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    uploadImage(e.target.files[0])
                  }
                }}
              />
              {imageUploading && (
                <p className='text-sm text-gray-500'>Subiendo imagen...</p>
              )}
              {imageUrl && (
                <p className='text-sm text-green-500'>
                  Imagen subida exitosamente.
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='disabled:opacity-50'
              disabled={imageUploading}
            >
              Crear Publicación
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddPostModal
