// description : 문의사항 리스트
export interface QnaListItem {
    qnaNumber: number;
    qnaTitle: string;
    qnaWriterId: string;
    qnaCategory: string;
    qnaDate: string;
    viewCount: number;
    qnaPublic: boolean;
    status: boolean;
}