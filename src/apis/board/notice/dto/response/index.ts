import ResponseDto from "src/apis/response.dto";
import { NoticeListItem } from "src/types";
import { PostNoticeRequestDto, PutNoticeRequestDto } from "../request";
import axios from "axios";
import { DELETE_NOTICE_URL, INCREASE_NOTICE_VIEW_COUNT_URL, POST_NOTICE_URL, PUT_NOTICE_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";

// description:  공지사항 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetNoticeListResponseDto extends ResponseDto {
    noticeList: NoticeListItem[];
};

// description:  공지사항 상세게시물 불러오기 Response Body DTO
export interface GetNoticeDetailResponseDto extends ResponseDto {
    noticeNumber: number;
    noticeTitle: string;
    noticeDate: string;
    viewCount: number;
    noticeContents: string;
    noticeImageUrl: string;
};
