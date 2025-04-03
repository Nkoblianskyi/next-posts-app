'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Post } from '@/types/types';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa6';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, post }) => {
    const baseUrl = "https://api.qumiqo.com";

    const mainImage = `${baseUrl}${post.preview.thumbnail.filename}`;

    const allImages = [mainImage, ...post.shots.map((shotId) => `${baseUrl}${shotId}.jpeg`)];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen) return null;

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
        return date.toLocaleDateString('en-GB', options).toUpperCase();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <div className="modal-header-left">
                        <h2 className="modal-title">{post.title}</h2>
                        <div className="modal-date-container">
                            <p className="modal-date">{formatDate(post.createdAt)}</p>
                            <FaCircle size={3} color='rgba(0, 0, 0, 0.3)' />
                            <span className="modal-date">{post.classifications}</span>
                        </div>
                    </div>
                    <div className="modal-header-right">
                        <button className="modal-close-button" onClick={onClose}>
                            <IoArrowRedoOutline size={16} className="modal-close-button-icon" />
                        </button>
                        <button className="modal-close-button">
                            <BsExclamationCircle size={16} className="modal-close-button-icon" />
                        </button>
                    </div>
                </header>

                <section className="modal-content-container">
                    <div className="modal-container-image">
                        <Image
                            src={allImages[currentImageIndex]}
                            alt={post.title}
                            className="modal-container-image-main"
                            layout="fill"
                            objectFit="cover"
                            unoptimized
                        />
                    </div>

                    {allImages.length > 1 && (
                        <div className="image-thumbnails">
                            <div className="thumbnail-container">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleImageClick(index)}
                                        className={`thumbnail-button ${index === currentImageIndex ? 'active' : ''}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            width={78}
                                            height={69}
                                            className="thumbnail-image"
                                            unoptimized
                                        />
                                    </button>
                                ))}
                            </div>
                            <div className="pagination-container">
                                {allImages.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`pagination-button ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => handleImageClick(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Modal;
