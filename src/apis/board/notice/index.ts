import axios from "axios";
import { PostNoticeRequestDto, PutNoticeRequestDto } from "./dto/request";
import { DELETE_NOTICE_URL, GET_NOTICE_LIST_URL, INCREASE_NOTICE_VIEW_COUNT_URL, POST_NOTICE_URL, PUT_NOTICE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";
import ResponseDto from "src/apis/response.dto";
import { GetNoticeListResponseDto } from "./dto/response";

// function : 공지사항 전체 리스트 불러오기 API 함수
export const getNoticeListRequest = async(accessToken: string) => {
    const result = await axios
        .get(GET_NOTICE_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetNoticeListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 공지사항 작성 API 함수 
export const PostNoticeRequest = async(requestBody: PostNoticeRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_NOTICE_URL, requestBody,bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 공지사항 게시물 수정 API 함수
export const putNoticeRequest = async(noticeNumber: number | string, requestBody: PutNoticeRequestDto, accessToken: string) => {
    const result = await axios
        .put(PUT_NOTICE_URL(noticeNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 공지사항 게시물 조회수 증가 API 함수
export const increaseViewCountRequest = async(noticeNumber: number | string, accessToken: string) => {
    const result = await axios
        .patch(INCREASE_NOTICE_VIEW_COUNT_URL(noticeNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 공지사항 게시물 삭제 API 함수
export const deleteNoticeRequest = async(noticeNumber: number | string, accessToken: string)=>{
    const result = await axios
        .delete(DELETE_NOTICE_URL(noticeNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)  
        .catch(requestErrorHandler);      
    return result; 
};