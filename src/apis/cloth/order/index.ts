import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";
import ResponseDto from "src/apis/response.dto";
import { POST_ORDER_REQUEST_URL } from "src/constant";
import { PostClothRequestDto } from "./dto/request";

// function : 주문 요청 API 함수
export const PostOrderRequest = async (clothNumber:number | string, requestBody: PostClothRequestDto, accessToken: string) => {
    const result = await axios.post(POST_ORDER_REQUEST_URL(clothNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
