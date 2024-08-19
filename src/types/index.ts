// description : 공지사항 리스트
export interface NoticeListItem {
    noticeNumber: number;
    noticeTitle: string;
    noticeDate: string;
    viewCount: number;
}

// description : 문의사항 리스트
export interface QnaListItem {
    qnaNumber: number;
    qnaWriterId: string;
    qnaCategory: string;
    qnaDate: string;
    status: boolean;
}

// description: 자주하는 질문 리스트
export interface FaqListItem {
    faqNumber: number;
    faqQuestion: string;
    faqAnswer: string;
    faqCategory: string;
    faqDate: string;
}
