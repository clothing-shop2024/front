import ResponseDto from "src/apis/response.dto";
import { FaqListItem } from "src/types";

// description:  자주하는 질문 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetFaqListResponseDto extends ResponseDto {
    faqList: FaqListItem[];
};

// description:  자주하는 질문 상세 게시물 불러오기 Response Body DTO
export interface GetFaqDetailResponseDto extends ResponseDto {
    faqNumber: number;
    faqQuestion: string;
    faqAnswer: string;
    faqCategory: string;
}