import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";
import ResponseDto from "src/apis/response.dto";
import { DELETE_FAVORITE_REQUEST_URL, GET_FAVORITE_CHECK_REQUEST_URL, GET_FAVORITE_LIST_URL, POST_FAVORITE_REQUEST_URL } from "src/constant";
import { GetFavoriteCheckResponseDto, GetFavoriteClothListResponseDto } from "./dto/response";

// function : 식당 찜 저장 API 함수
export const PostClothFavoriteRequest = async (clothNumber: number | string, accessToken: string) => {
    const result = await axios.post(POST_FAVORITE_REQUEST_URL(clothNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
} 

// function : 식당 찜 저장 삭제 API 함수
export const DeleteClothFavoriteRequest = async (clothId: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_FAVORITE_REQUEST_URL(clothId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
} 

// function : 찜(저장) 내역 확인 API 함수
export const GetFavoriteClothListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetFavoriteClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
} 

// function : 찜 상태 확인 API 함수
export const GetFavoriteCheckStatusRequest = async (clothId: number | string, accessToken: string) => {
    const result = await axios.get(GET_FAVORITE_CHECK_REQUEST_URL(clothId), bearerAuthorization(accessToken))
        .then(requestHandler<GetFavoriteCheckResponseDto>)
        .catch(requestErrorHandler);
    return result;
} 