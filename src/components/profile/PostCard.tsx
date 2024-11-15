// components/PostCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { IPostResponse } from '@/types';

const PostCard: React.FC<IPostResponse> = ({ imageUrl, description, title }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = () => {
    // Lógica para editar el post
    console.log('Editar post');
  };

  const handleDelete = () => {
    // Lógica para eliminar el post
    console.log('Eliminar post');
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden max-w-lg w-full mx-auto">
      <div className="flex justify-between items-center p-2 bg-background">
        <h3 className="text-lg font-semibold">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v.01M12 12v.01M12 18v.01"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="relative w-full aspect-square cursor-pointer">
            <Image
              src={imageUrl}
              alt="Post Image"
              layout="fill"
              objectFit="cover"
              className="w-full h-full aspect-square object-cover"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="relative w-full h-[80vh]">
            <Image
              src={imageUrl}
              alt="Post Image Expanded"
              layout="fill"
              objectFit="contain"
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
      <div className="p-4 bg-background">
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
