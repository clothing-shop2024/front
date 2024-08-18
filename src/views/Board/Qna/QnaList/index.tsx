import { ChangeEvent, useEffect, useState } from 'react';
import { QnaListItem } from 'src/types';
import { useNavigate } from 'react-router';
import useUserStore from 'src/stores/user.store';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, QNA_DETAIL_ABSOLUTE_PATH, QNA_REGIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { usePagination } from 'src/hooks';
import { GetSearchQnaListResponseDto } from 'src/apis/board/qna/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchQnaListRequest } from 'src/apis/board/qna';
import './style.css';

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
            alert("비공개글은 작성자 혹은 관리자만 볼 수 있습니다.");
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
export default function QnaList() {

    //                      state                      //
    const {loginUserRole} = useUserStore();
    // const [cookies] = useCookies();

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

    const [searchWord, setSearchWord] = useState<string>('');
    const [isToggleOn, setToggleOn] = useState<boolean>(false);

    //                    function                     //
    const navigator = useNavigate();

    const getSearchQnaListResponse = (result: GetSearchQnaListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator (MAIN_PATH);
            return;
        }

        const { qnaList } = result as GetSearchQnaListResponseDto;
        changeBoardList(qnaList, isToggleOn);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);

    };

    //                event handler                    //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN'){
            alert('Q&A 등록은 로그인 후 가능 합니다.');
            return navigator(SIGN_IN_ABSOLUTE_PATH);
        }
        
        if (loginUserRole === 'ROLE_ADMIN') {
            alert('관리자는 QNA를 작성할수 없습니다.');
            return;
        }
        
        navigator(QNA_REGIST_ABSOLUTE_PATH);
    };

    const onToggleClickHandler = () => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        setToggleOn(!isToggleOn);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };
    
    const onSearchButtonClickHandler = () => {
        getSearchQnaListRequest(searchWord).then(getSearchQnaListResponse);
    };

    //                    effect                       //
    useEffect(() => {
        getSearchQnaListRequest(searchWord).then(getSearchQnaListResponse);
    }, [isToggleOn]);

    //                  render                  //
    const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <>
            <div className='page-big-title'>문의사항</div>
            <div className='category-button'>
                <div>전체</div>
                <div>주문/배송</div>
                <div>교환/반품</div>
                <div>상품/기타</div>
                <div>검색</div>
            </div>

            <div className='list-table-top'>
                <div className='list-table-total-board'>전체<span className='emphasis'> {totalLength}건</span> | 페이지<span className='emphasis'> {currentPage} / {totalPage}</span>
                </div>
                <span className='now-board'></span>
                <div className='list-table-top-right'>
                    {loginUserRole === 'ROLE_ADMIN'?
                        <div className='list-table-top-toggle'>
                            <div className='qna-list-top-admin-text'>미완료 보기</div>
                            <div className={toggleClass} onClick={onToggleClickHandler}></div>
                        </div> : 
                        <div className='primary-button' onClick={onWriteButtonClickHandler}>글쓰기</div>
                    }
                </div>
            </div>

            <div className='list-table'>
                <div className='list-table-th qna'>
                    <div className='qna-list-table-number'>순번</div>
                    <div className='qna-list-table-category'>제목</div>
                    <div className='qna-list-table-writer-id'>작성자</div>
                    <div className='qna-list-table-date'>작성일</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.qnaNumber} />)}
            </div>

            <div className='list-table-search-box'>
                <div className='list-table-search-input-box'>
                    <input className='list-table-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
                </div>
                <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
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
        </>
    )
}
