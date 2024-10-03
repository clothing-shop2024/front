import useUserStore from 'src/stores/user.store';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import ResponseDto from 'src/apis/response.dto';
import { deleteNoticeRequest, getNoticeDetailRequest, increaseViewCountRequest } from 'src/apis/board/notice';
import { GetNoticeDetailResponseDto, GetNoticeListResponseDto } from 'src/apis/board/notice/dto/response';

//                    component                    //
export default function NoticeDetail () {

    //                      state                      //
    const { loginUserId, loginUserRole } = useUserStore();
    const { noticeNumber } = useParams();

    const [cookies] = useCookies();

    const [noticeTitle, setNoticeTitle] = useState<string>('');
    const [noticeDate, setNoticeDate] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [noticeContents, setNoticeContents] = useState<string>('');
    const [noticeImageUrl, setNoticeImageUrl] = useState<string>('');

    //                    function                     //
    const navigator = useNavigate();

    const increaseViewCountResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }

        if (!noticeNumber) return;
        getNoticeDetailRequest(noticeNumber)
            .then(getNoticeDetailResponse);
    };

    const getNoticeDetailResponse = (result: GetNoticeListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }

        const { noticeTitle, noticeDate, viewCount, noticeContents, noticeImageUrl } = result as GetNoticeDetailResponseDto;
        setNoticeTitle(noticeTitle);
        setNoticeDate(noticeDate);
        setViewCount(viewCount);
        setNoticeContents(noticeContents);
        setNoticeImageUrl(noticeImageUrl);
    };

    const deleteNoticeDetailRequest = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(NOTICE_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onListClickHandler = () => navigator(NOTICE_LIST_ABSOLUTE_PATH);

    const onUpdateClickHandler = () => {
        if (!noticeNumber || loginUserRole !== 'ROLE_ADMIN') return;
        navigator(ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH(noticeNumber));
    } 

    const onDeleteClickHandler = () => {
        if (!noticeNumber || loginUserRole !== 'ROLE_ADMIN') return;

        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;
        
        deleteNoticeRequest(noticeNumber, cookies.accessToken).then(deleteNoticeDetailRequest);
    };

    //                    effect                       //
    useEffect(() => {
        if (!noticeNumber) return;
        getNoticeDetailRequest(noticeNumber).then(getNoticeDetailResponse);

        increaseViewCountRequest(noticeNumber).then(increaseViewCountResponse);
    }, [noticeNumber]);

    //                  render                  //
    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title' onClick={onListClickHandler}>Notice</div>
            </div>
            <div>
                <div className='board-page-detail'>
                    <div className='board-top'>
                        <div className='board-top-title'>
                            <div className='board-top-name'>TITLE</div>
                            <div className='board-top-contents'>{noticeTitle}</div>
                        </div>
                        <div className='board-detail-writer-id'>
                            <div className='board-top-name'>WRITER</div>
                            <div className='board-top-contents'>관리자</div>
                        </div>
                        <div className='board-detail-date'>
                            <div className='board-top-name'>DATE</div>
                            <div className='board-top-contents'>{noticeDate} </div>
                        </div>
                        <div className='notice-detail-view-count'>
                            <div className='board-top-name'>VIEWCOUNT</div>
                            <div className='board-top-contents'>{viewCount}</div>
                        </div>
                    </div>
                    <div className='board-detail-main'>
                        <div className='board-detail-contents'>{noticeContents}</div>
                        <div className='board-detail-image'>
                            {noticeImageUrl && <img src={noticeImageUrl} alt="Database Image" className="file-image" />}
                        </div>
                    </div>
                    <div className='board-detail-bottom'>
                        <div className='board-button' onClick={ onListClickHandler }>LIST</div>
                        { loginUserRole === 'ROLE_ADMIN' &&
                            <div className='board-detail-bottom-right'>
                                <div className='board-button' onClick={ onUpdateClickHandler }>MODIFY</div>
                                <div className='board-button' onClick={ onDeleteClickHandler }>DELETE</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
