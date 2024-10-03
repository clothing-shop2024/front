import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { getNoticeListRequest } from "src/apis/board/notice";
import { GetNoticeListResponseDto } from "src/apis/board/notice/dto/response";
import ResponseDto from "src/apis/response.dto";
import { ADMIN_NOTICE_REGIST_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, NOTICE_DETAIL_ABSOLUTE_PATH } from "src/constant";
import { usePagination } from "src/hooks";
import useUserStore from "src/stores/user.store";
import { NoticeListItem } from "src/types";
import './style.css';

//                    component                    //
function ListItem ({
    index,
    noticeNumber,
    noticeTitle,
    noticeDate,
    viewCount
}:NoticeListItem & { index: number }) {

    //                    function                     //
    const navigator = useNavigate();

    //                event handler                    //
    const onClickHandler = () => navigator(NOTICE_DETAIL_ABSOLUTE_PATH(noticeNumber));

    //                    render                       //
    return (
        <div className='list-table-tr notice' onClick={onClickHandler}>
            <div className='notice-list-table-number'>{index + 1}</div>
            <div className='notice-list-table-title'>{noticeTitle}</div>
            <div className='notice-list-table-view-count'>{viewCount}</div>
            <div className='notice-list-table-date'>{noticeDate}</div>
        </div>
    );
};

//                    component                    //
export default function NoticeList() {

    //                      state                      //
    const {loginUserRole} = useUserStore();

    const [cookies] = useCookies();

    const {
        viewList,
        pageList,
        totalPage,
        currentPage,
        totalLength,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<NoticeListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    //                    function                     //
    const navigator = useNavigate();

    const getNoticeListResponse = (result: GetNoticeListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            // if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { noticeList } = result as GetNoticeListResponseDto;
        changeBoardList(noticeList);

        setCurrentPage(!noticeList.length ? 0 : 1);
        setCurrentSection(!noticeList.length ? 0 : 1);

    };

    //                event handler                    //
    const onWriteButtonClickHandler = () => {
        navigator(ADMIN_NOTICE_REGIST_ABSOLUTE_PATH);
    };

    //                    effect                       //
    useEffect (() => {
        getNoticeListRequest(cookies.accessToken).then(getNoticeListResponse);
    }, []);

    //                    render                       //
     return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title'>NOTICE</div>
            </div>

            <div className='list-table-top'>
                <div className='list-table-total-board'>전체<span className='emphasis'> {totalLength}건</span> | 페이지<span className='emphasis'> {currentPage} / {totalPage}</span>
                </div>
                <span className='now-board'></span>

                <div className='list-table-top-right'>
                {loginUserRole === 'ROLE_ADMIN' ? 
                    <div className='board-button' onClick={onWriteButtonClickHandler}>WRITE</div> : ''
                }
                </div>
            </div>
            
            <div className='list-table'>
                <div className='list-table-th notice'>
                    <div className='notice-list-table-number'>NO</div>
                    <div className='notice-list-table-title'>TITLE</div>
                    <div className='notice-list-table-view-count'>VIEWCOUNT</div>
                    <div className='notice-list-table-date'>등록일</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.noticeNumber} />)}
            </div>
            
            <div className='list-table-pagenation'>
                <div className='list-table-page-left' onClick={onPreSectionClickHandler}></div>
                <div className='list-table-page-box'>
                    {pageList.map(page => 
                        page === currentPage ?
                        <div className='list-table-page-active'>{page}</div> :
                        <div className='list-table-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                    )}
                </div>
                <div className='list-table-page-right' onClick={onNextSectionClickHandler}></div>
            </div>
        </div>
    )
}
