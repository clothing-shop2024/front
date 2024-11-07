import ResponseDto from "src/apis/response.dto";

// description: 주문 응답 Response Body DTO
export interface PostOrderResponseDto extends ResponseDto {
    orderNumber: string | number;  // 주문 번호
    orderStatus: string;  // 주문 상태 (예: 'SUCCESS', 'FAILED', 등)
    orderDate: string;  // 주문 일시 (ISO 8601 형식)
    estimatedDeliveryDate: string;  // 예상 배송 일자 (선택적 필드)
}