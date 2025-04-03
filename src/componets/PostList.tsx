'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post, PostApiResponse } from "@/types/types";
import Modal from "./Modal";
import PostCard from "./PostCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const API_BASE_URL = "https://api.qumiqo.com/api/posts?_limit=16&type=newest&page=";

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const openModal = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    const fetchPosts = async (page: number) => {
        try {
            const response = await axios.get<PostApiResponse>(`${API_BASE_URL}${page}`);
            console.log(response.data);

            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                setPosts(response.data.data);
                setTotalPages(Math.ceil(response.data.total / 16));
            } else {
                console.error("Error: response data is not an array", response.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <>
            <div className="post-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} onClick={() => openModal(post)} />
                    ))
                ) : (
                    <div>No posts available.</div>
                )}

                {selectedPost && (
                    <Modal isOpen={isModalOpen} onClose={closeModal} post={selectedPost} />
                )}
            </div>
            <div className="pagination">
                <button
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <IoIosArrowBack className="pagination-button-icon" />
                </button>

                {currentPage > 2 && (
                    <>
                        <button className="pagination-button" onClick={() => handlePageChange(1)}>
                            1
                        </button>
                        <span>...</span>
                    </>
                )}
                {currentPage > 1 && (
                    <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)}>
                        {currentPage - 1}
                    </button>
                )}
                <button className="pagination-button active">{currentPage}</button>
                {currentPage < totalPages && (
                    <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)}>
                        {currentPage + 1}
                    </button>
                )}
                {currentPage < totalPages - 1 && (
                    <>
                        <span>...</span>
                        <button className="pagination-button" onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <IoIosArrowForward className="pagination-button-icon" />
                </button>
            </div>
        </>
    );
};

export default PostList;
