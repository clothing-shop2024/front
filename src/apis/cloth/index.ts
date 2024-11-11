import axios from "axios";
import { GET_CLOTH_INFO_URL, POST_CLOTH_INFO_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { PostClothInfoRequestDto } from "./dto/request";
import { GetClothInfoResponseDto } from "./dto/response";

// function : 특정 옷 정보 API 함수
export const GetClothInfoRequest = async (clothNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_CLOTH_INFO_URL(clothNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetClothInfoResponseDto>)
        .catch(requestErrorHandler)
    return result;
}

// function : 옷 정보 요청 API 함수 
export const PostClothInfoRequest = async (requestBody: PostClothInfoRequestDto, accessToken: string) => {
    const result = await axios.post(POST_CLOTH_INFO_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
}