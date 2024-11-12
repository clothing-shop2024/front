// 옷 리스트
export interface ClothDetailListItem {
    clothDetailNumber: string;
    clothDetailName: string;
    clothCategory1: string;
    clothCategory2: string;
    price: number;
    discountPrice: number;
    ratingAvg: number;
    clothImage1: string;
    // clothNumber형식이 number이고 string형식은 받을 수 없음
    clothNumber : number;
}

// description : 옷 정보 리스트
export interface ClothListItem {
    clothNumber : number | string;
    clothName : string;
    clothImage : string;
    clothCategory1: string;
    clothCategory2: string;
}

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

// 관리자페이지 - 회원리스트
export interface UserListItem {
    userId: string;
    userName: string;
    nickname: string;
    userEmail: string;
    joinDate: string;
    grade: string;
    points: number;
}