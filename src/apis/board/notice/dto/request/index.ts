// description:  공지사항 등록하기 Request Body DTO
export interface PostNoticeRequestDto {
    noticeTitle: string;
    noticeContents: string;
    noticeImageUrl: string | null;
};

// description:  공지사항 수정하기 Request Body DTO
export interface PutNoticeRequestDto {
    noticeTitle: string;
    noticeContents: string;
    noticeImageUrl: string | null;
};

