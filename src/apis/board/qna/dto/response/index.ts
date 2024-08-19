import { QnaListItem } from "src/types";
import ResponseDto from "src/apis/response.dto";


// description : 문의사항 전체 리스트 불러오기 Response Body DTO //
export interface GetQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
};

// description: 문의사항 검색 리스트 불러오기 Response Body DTO
export interface GetSearchQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
};

export interface GetQnaDetailResponseDto extends ResponseDto {
    qnaNumber: number;
    qnaContents: string;
    qnaImageUrl: string;
    qnaComment: string | null;
    qnaWriterId: string;
    qnaCategory: string;
    qnaDate: string;
};
