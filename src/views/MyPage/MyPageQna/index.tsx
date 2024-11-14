
import { QnaListItem } from 'src/types';
import './style.css';
import { useLocation, useNavigate } from 'react-router';
import useUserStore from 'src/stores/user.store';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, QNA_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { usePagination } from 'src/hooks';
import { GetMyQnaListResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useEffect } from 'react';
import { getMyQnaListRequest } from 'src/apis/user';
import { useCookies } from 'react-cookie';

//                    component                    //
function ListItem ({
    index,
    qnaNumber,
    qnaWriterId,
    qnaCategory,
    qnaDate,
    status
}: QnaListItem & { index: number }) {

    //                   function                 //
    const navigator = useNavigate();

    //                   state                   //
    const {loginUserId, loginUserRole} = useUserStore();

    //                  event handler                   //
    const onClickHandler = () => {

        if ((loginUserRole !== 'ROLE_ADMIN' && loginUserId !== qnaWriterId )) {

            alert("이 글은 비공개글입니다.");
            return;
        }
        navigator(QNA_DETAIL_ABSOLUTE_PATH(qnaNumber), { state: {previousPage: 'ALL_QNA_LIST'} });
    };

    const coverdWriterId = qnaWriterId !== '' && (qnaWriterId[0] + '*'.repeat(qnaWriterId.length - 1));

    //                  render                  //
    return (
        <div className='list-table-tr qna' onClick={onClickHandler}>
            <div className='qna-list-table-number'>{index + 1}</div>
            <div className='qna-list-table-title'>
                <div className='qna-list-table-category'>{qnaCategory} 문의합니다.</div>
                {status ? 
                    <div className='disable-bedge'>[1]</div> :
                    <div className='primary-bedge'>new</div>
                }
            </div>
            <div className='qna-list-table-writer-id'>{coverdWriterId}</div>
            <div className='qna-list-table-date'>{qnaDate}</div>
        </div>
    );
}

//                    component                    //
export default function MyPageQna() {

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
    } = usePagination<QnaListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    const location = useLocation();

    //                    function                     //
    const navigator = useNavigate();

    const getMyQnaListResponse = (result: GetMyQnaListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { qnaList } = result as GetMyQnaListResponseDto;
        changeBoardList(qnaList);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);
    };

    //                event handler                    //


    //                    effect                       //
    useEffect(() => {
        getMyQnaListRequest(cookies.accessToken).then(getMyQnaListResponse);
    }, []);

    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title'>Q&A</div>
            </div>

            <div className='list-table-top'>
                <div className='list-table-total-board'>전체<span className='emphasis'> {totalLength}건</span> | 페이지<span className='emphasis'> {currentPage} / {totalPage}</span>
                </div>
            </div>

            <div className='list-table'>
                <div className='list-table-th qna'>
                    <div className='qna-list-table-number'>NO</div>
                    <div className='qna-list-table-title'>TITLE</div>
                    <div className='qna-list-table-writer-id'>WRITER</div>
                    <div className='qna-list-table-date'>DATE</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.qnaNumber} />)}
            </div>
            
            <div className='list-table-pagenation'>
                <div className='list-table-page-left' onClick={onPreSectionClickHandler}></div>
                <div className='list-table-page-box'>
                    {pageList.map(page => 
                        page === currentPage ?
                        <div className='list-table-page-active' key={page}>{page}</div> :
                        <div className='list-table-page' onClick={() => onPageClickHandler(page)} key={page}>{page}</div>
                    )}
                </div>
                <div className='list-table-page-right' onClick={onNextSectionClickHandler}></div>
            </div>
        </div>
    )
}
