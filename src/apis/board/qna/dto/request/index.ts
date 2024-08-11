// description: 문의사항 게시물 작성하기 Request Body DTO //
export interface PostQnaRequestDto {
    qnaTitle: string;
    qnaContents: string;
    qnaCategory: string;
    qnaPublic: boolean;
    imageUrl: string | null;
}

// description: 문의사항 답글 작성하기 Request Body DTO //
export interface PostQnaCommentRequestDto {
    qnaComment: string;
}

// description: 문의사항 게시물 수정하기 Request Body DTO //
export interface PutQnaRequestDto {
    title: string;
    contents: string;
    qnaCategory: string;
    qnaPublic: boolean;
    imageUrl: string | null;
}