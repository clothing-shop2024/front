// description: 주문 요청 Request Body DTO
export interface PostClothRequestDto {
    clothNumber: number | string;
    sizeNumber: number;  // 사이즈 번호
    sizeName: string;  // 사이즈 이름
    colorNumber: number;  // 색상 번호
    colorName: string;  // 색상 이름
    quantity: number; // 수량
}