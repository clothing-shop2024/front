import ResponseDto from "src/apis/response.dto";
import { ClothListItem } from "src/types";

// description: 옷 상세 테이블 전체 리스트 불러오기 Response Body DTO
export interface GetClothListResponseDto extends ResponseDto {
    clothList: ClothListItem;
}
