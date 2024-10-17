import axios from "axios"
import { GET_BEST_CLOTH_DETAIL_CATEGORY1_LIST_URL, GET_BEST_CLOTH_DETAIL_LIST_URL, GET_CLOTH_DETAIL_CATEGORY1_LIST_URL, GET_CLOTH_DETAIL_LIST_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetClothDetailListResponseDto } from "./dto/response"

// function : 옷 상세 전체 리스트 불러오기 API 함수
export const getClothDetailListRequest = async() => {
    const result = await axios
        .get(GET_CLOTH_DETAIL_LIST_URL)
        .then(requestHandler<GetClothDetailListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 옷 상세 인기 리스트 불러오기 API 함수
export const getBestClothDetailListRequest = async() => {
    const result = await axios
        .get(GET_BEST_CLOTH_DETAIL_LIST_URL)
        .then(requestHandler<GetClothDetailListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 옷 상세 카테고리1 리스트 불러오기 API함수
export const getClothDetailCategory1ListRequest = async(clothCategory1: string) => {
    const result = await axios
        .get(GET_CLOTH_DETAIL_CATEGORY1_LIST_URL(clothCategory1))
        .then(requestHandler<GetClothDetailListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 옷 상세 카테고리1 조회순 리스트 불러오기 API함수 
export const getBestClothDetailCategory1ListRequest = async(clothCategory1: string) => {
    const result = await axios
        .get(GET_BEST_CLOTH_DETAIL_CATEGORY1_LIST_URL(clothCategory1))
        .then(requestHandler<GetClothDetailListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};