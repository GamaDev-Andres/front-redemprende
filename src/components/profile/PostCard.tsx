// components/PostCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

interface PostCardProps {
  imageUrl?: string;
  description?: string;
}

const postCardMock = {
  imageUrl: 'https://picsum.photos/800',
  description: 'This is a sample post.',
};

const PostCard: React.FC<PostCardProps> = ({ imageUrl = postCardMock.imageUrl, description = postCardMock.description }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="rounded-lg shadow-md overflow-hidden max-w-lg w-full mx-auto">
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
