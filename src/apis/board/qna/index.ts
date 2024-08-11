import axios from "axios";
import { PostQnaCommentRequestDto, PostQnaRequestDto, PutQnaRequestDto } from "./dto/request";
import ResponseDto from "../../response.dto";
import { GetQnaDetailResponseDto, GetQnaListResponseDto, GetSearchQnaListResponseDto } from "./dto/response";
import { DELETE_QNA_URL, GET_QNA_DETAIL_URL, GET_QNA_LIST_URL, GET_SEARCH_QNA_LIST_URL, PATCH_QNA_VIEW_COUNT_URL, POST_QNA_COMMENT_URL, POST_QNA_URL, PUT_QNA_URL } from "../../../constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "../..";

// function : 문의사항 작성 API 함수 
export const PostQnaRequest = async(requestBody: PostQnaRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_QNA_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 문의사항 답글 작성 API 함수
export const PostQnaCommentRequest = async(noticeNumber: number | string, requestBody: PostQnaCommentRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_QNA_COMMENT_URL(noticeNumber), requestBody, bearerAuthorization(accessToken))
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
export const gethSearchQnaListRequest = async(word: string) => {
    const config = { params: {word}}
    const result = await axios
        .get(GET_SEARCH_QNA_LIST_URL,config)
        .then(requestHandler<GetSearchQnaListResponseDto>) 
        .catch(requestErrorHandler); 
    return result;
};

// function : 문의사항 게시물 불러오기 API 함수
export const getQnaDetailRequest = async(noticeNumber: number | string) => {
    const result = await axios
        .get(GET_QNA_DETAIL_URL(noticeNumber))
        .then(requestHandler<GetQnaDetailResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 수정 API 함수
export const putQnaRequest = async(noticeNumber: number | string, requestBody: PutQnaRequestDto, accessToken: string) =>{
    const result = await axios
        .put(PUT_QNA_URL(noticeNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 조회수 증가 API 함수
export const increaseViewCountRequest = async (noticeNumber: number | string) => {
    const result = await axios
        .patch(PATCH_QNA_VIEW_COUNT_URL(noticeNumber))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 삭제 API 함수
export const deleteQnaRequest = async(qnaNumber: number | string, accessToken: string)=>{
    const result = await axios
        .delete(DELETE_QNA_URL(qnaNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)  
        .catch(requestErrorHandler);       
    return result;
};



