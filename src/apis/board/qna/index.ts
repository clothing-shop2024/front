import axios from "axios";
import { PutQnaCommentRequestDto, PostQnaRequestDto, PutQnaRequestDto } from "./dto/request";
import ResponseDto from "../../response.dto";
import { GetQnaDetailResponseDto, GetQnaListResponseDto } from "./dto/response";
import { DELETE_QNA_URL, GET_QNA_DETAIL_URL, GET_QNA_LIST_URL, GET_SEARCH_QNA_LIST_URL, PUT_QNA_COMMENT_URL, POST_QNA_URL, PUT_QNA_URL, GET_QNA_CATEGORY_LIST_URL, GET_QNA_CATEGORY_SEARCH_LIST_URL } from "../../../constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "../..";

// function : 문의사항 작성 API 함수 
export const postQnaRequest = async(requestBody: PostQnaRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_QNA_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 문의사항 답글 작성 API 함수
export const putQnaCommentRequest = async(qnaNumber: number | string, requestBody: PutQnaCommentRequestDto, accessToken: string) => {
    const result = await axios
        .put(PUT_QNA_COMMENT_URL(qnaNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 문의사항 전체 리스트 불러오기 API 함수
export const getQnaListRequest = async() => {
    const result = await axios
        .get(GET_QNA_LIST_URL)
        .then(requestHandler<GetQnaListResponseDto>)
        .catch(requestErrorHandler)
    return result;
};

// function : 문의사항 검색 리스트 불러오기 API 함수
export const getSearchQnaListRequest = async (word: string) => {
    const config = { params: { word } }

    const result = await axios
        .get(GET_SEARCH_QNA_LIST_URL, config)
        .then(requestHandler<GetQnaListResponseDto>) 
        .catch(requestErrorHandler);
    return result;
};

// function : 문의사항 카테고리 필터 리스트 불러오기 API 함수
export const getQnaCategoryListRequest = async(qnaCategory: string) => {
    const result = await axios
        .get(GET_QNA_CATEGORY_LIST_URL(qnaCategory))
        .then(requestHandler<GetQnaListResponseDto>) 
        .catch(requestErrorHandler);
    return result;
};

// function : 문의사항 카테고리 검색 필터 리스트 불러오기 API 함수
export const getQnaCategorySearchListRequest = async(qnaCategory: string, word: string) => {
    const config = { params: { word } }

    const result = await axios
        .get(GET_QNA_CATEGORY_SEARCH_LIST_URL(qnaCategory), config)
        .then(requestHandler<GetQnaListResponseDto>) 
        .catch(requestErrorHandler);
    return result;
}

// function : 문의사항 게시물 불러오기 API 함수
export const getQnaDetailRequest = async(qnaNumber: number | string, accessToken: string) => {
    const result = await axios
        .get(GET_QNA_DETAIL_URL(qnaNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetQnaDetailResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 수정 API 함수
export const putQnaRequest = async(qnaNumber: number | string, requestBody: PutQnaRequestDto, accessToken: string) => {
    const result = await axios
        .put(PUT_QNA_URL(qnaNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 삭제 API 함수
export const deleteQnaRequest = async(qnaNumber: number | string, accessToken: string) => {
    const result = await axios
        .delete(DELETE_QNA_URL(qnaNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)  
        .catch(requestErrorHandler);       
    return result;
};



