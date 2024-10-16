import ResponseDto from "src/apis/response.dto";
import { ClothDetailListItem } from "src/types";

// description: 옷 상세 테이블 전체 리스트 불러오기 Response Body DTO
export interface GetClothDetailListResponseDto extends ResponseDto {
    clothDetailList: ClothDetailListItem;
}

// description: 옷 상세 테이블 인기 리스트 불러오기 Response Body DTO
export interface GetBestClothDetailListResponseDto extends ResponseDto {
    clothDetailList: ClothDetailListItem;
}
