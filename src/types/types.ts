export interface Post {
    _id: string;
    author: {
        id: string;
        username: string;
        name: string;
        title: null,
        email: string;
    },
    title: string;
    preview: {
        thumbnail: {
            _id: string;
            mimetype: string;
            extension: string;
            size: number;
            filename: string;
            width: number;
            height: number;
        };
        size: string;
        xCoordinate: number;
        yCoordinate: number;
    };
    tags: {
        _id: string;
        name: string;
    }[];
    classifications: string[];
    shots: string[];
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
}

export interface PostApiResponse {
    data: Post[];
    total: number;
}
