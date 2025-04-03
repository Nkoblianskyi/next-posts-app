'use client';

import React from 'react';
import Image from 'next/image';
import { Post } from '@/types/types';
import { RxAvatar } from 'react-icons/rx';
import { FaRegFaceSmile } from 'react-icons/fa6';


interface PostCardProps {
    post: Post;
    onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
    const baseUrl = "https://api.qumiqo.com";

    return (
        <article className="post-card" onClick={onClick}>
            <header className="post-header">
                <div className="post-header-left">
                    <RxAvatar className='post-header-avatar'/>
                    <div>
                        <p className="post-title">{post.author.name}</p>
                        <span className='post-username'>@{post.author.username}</span>
                    </div>
                </div>
                    <button className="post-header-right">
                        <FaRegFaceSmile size={14}  className='post-header-button-icon' />
                    </button>
            </header>
            <figure className="post-card-content">
                <Image
                    src={`${baseUrl}${post.preview.thumbnail.filename}`}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="post-card-content-image"
                />
            </figure>
        </article>
    );
};

export default PostCard;
