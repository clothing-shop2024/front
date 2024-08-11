import { QnaListItem } from "../../../../../types";
import ResponseDto from "../../../../response.dto";


// description : 문의사항 전체 리스트 불러오기 Response Body DTO //
export interface GetQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
}

// description: 문의사항 검색 리스트 불러오기 Response Body DTO
export interface GetSearchQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
}

export interface GetQnaDetailResponseDto extends ResponseDto {
    qnaNumber: number;
    viewCount: number;
    qnaTitle: string;
    qnaContents: string;
    qnaImageUrl: string;
    comment: string | null;
    writerId: string;
    qnaCategory: string;
    qnaDate: string;
    qnaPublic: boolean;
}
