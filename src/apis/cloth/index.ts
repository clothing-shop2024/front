import axios from "axios"
import { GET_BEST_CLOTH_CATEGORY1_LIST_URL, GET_BEST_CLOTH_LIST_URL, GET_CLOTH_CATEGORY1_LIST_URL, GET_CLOTH_CATEGORY2_LIST_URL, GET_CLOTH_LIST_URL, GET_CLOTH_SEARCH_LIST_URL, GET_PRICE_ASC_CLOTH_CATEGORY1_LIST_URL, GET_PRICE_ASC_CLOTH_CATEGORY2_LIST_URL, GET_PRICE_DESC_CLOTH_CATEGORY1_LIST_URL, GET_PRICE_DESC_CLOTH_CATEGORY2_LIST_URL } from "src/constant"
import { bearerAuthorization, requestErrorHandler, requestHandler } from ".."
import { GetClothListResponseDto } from "./dto/response"

// function : 옷 전체 리스트 불러오기 API 함수
export const getClothListRequest = async() => {
    const result = await axios
        .get(GET_CLOTH_LIST_URL)
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 옷 상세 인기 리스트 불러오기 API 함수
export const getBestClothListRequest = async() => {
    const result = await axios
        .get(GET_BEST_CLOTH_LIST_URL)
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 옷 상세 카테고리1 리스트 불러오기 API함수
export const getClothCategory1ListRequest = async(category1: string) => {
    const result = await axios
        .get(GET_CLOTH_CATEGORY1_LIST_URL(category1))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 옷 상세 카테고리1 조회순 리스트 불러오기 API함수 
export const getBestClothCategory1ListRequest = async(category1: string) => {
    const result = await axios
        .get(GET_BEST_CLOTH_CATEGORY1_LIST_URL(category1))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 옷 상세 카테고리1 가격 낮은순 리스트 불러오기 API함수 
export const getPriceAscClothCategory1ListRequest = async(category1: string) => {
    const result = await axios
        .get(GET_PRICE_ASC_CLOTH_CATEGORY1_LIST_URL(category1))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 옷 상세 카테고리1 가격 낮은순 리스트 불러오기 API함수 
export const getPriceDescClothCategory1ListRequest = async(category1: string) => {
    const result = await axios
        .get(GET_PRICE_DESC_CLOTH_CATEGORY1_LIST_URL(category1))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 옷 상세 카테고리2 리스트 보기
export const getClothCategory2ListRequest = async(category2: string) => {
    const result = await axios
        .get(GET_CLOTH_CATEGORY2_LIST_URL(category2))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 옷 상세 카테고리2 가격 낮은순 리스트 불러오기 API함수 
export const getPriceAscClothCategory2ListRequest = async(category2: string) => {
    const result = await axios
        .get(GET_PRICE_ASC_CLOTH_CATEGORY2_LIST_URL(category2))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 옷 상세 카테고리2 가격 낮은순 리스트 불러오기 API함수 
export const getPriceDescClothCategory2ListRequest = async(category2: string) => {
    const result = await axios
        .get(GET_PRICE_DESC_CLOTH_CATEGORY2_LIST_URL(category2))
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 메인에서 옷 상세 검색 리스트 불러오기 API함수 
export const getClothSearchListRequest = async (word: string) => {
    const config = { params: { word } }

    const result = await axios
        .get(GET_CLOTH_SEARCH_LIST_URL, config)
        .then(requestHandler<GetClothListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};