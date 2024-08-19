// description: 문의사항 게시물 작성하기 Request Body DTO //
export interface PostQnaRequestDto {
    qnaContents: string;
    qnaCategory: string;
    imageUrl: string | null;
};

// description: 문의사항 답글 작성하기 Request Body DTO //
export interface PostQnaCommentRequestDto {
    qnaComment: string;
};

// description: 문의사항 게시물 수정하기 Request Body DTO //
export interface PutQnaRequestDto {
    qnaContents: string;
    qnaCategory: string;
    imageUrl: string | null;
};