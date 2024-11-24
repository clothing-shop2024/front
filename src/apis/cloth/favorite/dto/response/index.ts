import ResponseDto from "src/apis/response.dto";
import { ClothListItem } from "src/types";

// description: 찜(저장)한 옷 내역 목록 확인 Response Body DTO
export interface GetFavoriteClothListResponseDto extends ResponseDto {
    clothFavoriteList: ClothListItem[];
}

// description: 찜(저장)한 옷 상태 확인 Response Body DTO
export interface GetFavoriteCheckResponseDto extends ResponseDto {
    userId : string;
    clothId : number;
    clothDetailNumber : string;
}

