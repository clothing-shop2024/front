export interface PostClothInfoRequestDto {
    clothNumber: string;  // 상품ID (고유식별코드)
    clothName : string // 상품 이름
    stock: number;  // 재고 수량
    sizeNumber: number;  // 사이즈 번호
    sizeName: string;  // 사이즈 이름
    colorNumber: number;  // 색상 번호
    colorName: string;  // 색상 이름
    clothPrice: number;  // 상품 가격
    clothCategory: string;  // 상품 카테고리
    clothFeatures: string;  // 상품의 상세 설명
    clothStatus: 'available' | 'sold-out' | 'coming-soon';  // 상품 상태 (판매 중, 품절, 예약 판매 등)
    quantity: number; // 수량 
    clothImage : string;
    // couponCode?: string; // 쿠폰 코드 (선택적 필드)
}