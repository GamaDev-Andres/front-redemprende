// components/PostCard.tsx
import React from 'react';
import Image from 'next/image';

interface PostCardProps {
  imageUrl?: string;
  description?: string;
}
const postCardMock = {
  imageUrl: 'https://picsum.photos/800',
  description: 'This is a sample post.',
}
const PostCard: React.FC<PostCardProps> = ({ imageUrl =postCardMock.imageUrl, description = postCardMock.description }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden max-w-lg w-full mx-auto">
      <div className="relative w-full aspect-square ">
        <Image
          src={imageUrl}
          
          alt="Post Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full aspect-square object-cover"
        />
      </div>
      <div className="p-4 bg-background">
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
