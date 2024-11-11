import ResponseDto from "src/apis/response.dto";
import { QnaListItem } from "src/types";


// description : 문의사항 전체 리스트 불러오기 Response Body DTO //
export interface GetQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
};

// description: 문의사항 상세 게시글 불러오기 Response Body DTO
export interface GetQnaDetailResponseDto extends ResponseDto {
    qnaNumber: number;
    status: boolean;
    qnaContents: string;
    qnaImageUrl: string;
    qnaComment: string | null;
    qnaWriterId: string;
    qnaCategory: string;
    qnaDate: string;
};
