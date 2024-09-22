import { ChangeEvent, useEffect, useState } from 'react';
import { QnaListItem } from 'src/types';
import { useLocation, useNavigate } from 'react-router';
import useUserStore from 'src/stores/user.store';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, QNA_DETAIL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, QNA_REGIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { usePagination } from 'src/hooks';
import { GetQnaCategoryListResponseDto, GetQnaListResponseDto, GetSearchQnaListResponseDto } from 'src/apis/board/qna/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getQnaCategoryListRequest, getQnaCategorySearchListRequest, getQnaListRequest, getSearchQnaListRequest } from 'src/apis/board/qna';
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
export default function QnaList() {

    //                      state                      //
    const {loginUserRole} = useUserStore();

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
    const queryParams = new URLSearchParams(location.search);
    const initialSearchWord = queryParams.get('search') || '';
    const [searchWord, setSearchWord] = useState<string>(initialSearchWord);
    const [qnaCategory, setQnaCategory] = useState<string>('');
    const qnaCategory1 = '주문|배송';
    const qnaCategory2 = '교환|반품';
    const qnaCategory3 = '상품|기타';
    const [isToggleOn, setToggleOn] = useState<boolean>(false);

    //                    function                     //
    const navigator = useNavigate();

    const getQnaListResponse = (result: GetQnaListResponseDto | ResponseDto | null) => {
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

        const { qnaList } = result as GetQnaListResponseDto;
        changeBoardList(qnaList, isToggleOn);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);
    };


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

    const getQnaCategoryListResponse = (result: GetQnaCategoryListResponseDto | ResponseDto | null) => {

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

        const { qnaList } = result as GetQnaCategoryListResponseDto;
        changeBoardList(qnaList, isToggleOn);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);

    };

    //                event handler                    //
    const onListClickHandler = () => {
        setSearchWord('');
        setQnaCategory('');
        navigator(QNA_LIST_ABSOLUTE_PATH);
        getQnaListRequest().then(getQnaListResponse);
    }

    // qnaCategory 필터
    const onCategory1ClickHandler = () => {
        setQnaCategory(qnaCategory1);
        getQnaCategoryListRequest(qnaCategory1).then(getQnaCategoryListResponse);
        navigator(QNA_LIST_ABSOLUTE_PATH + `?category=${qnaCategory1}`);
    };
    const onCategory2ClickHandler = () => {
        setQnaCategory(qnaCategory2);
        getQnaCategoryListRequest(qnaCategory2).then(getQnaCategoryListResponse);
        navigator(QNA_LIST_ABSOLUTE_PATH + `?category=${qnaCategory2}`);
    };
    const onCategory3ClickHandler = () => {
        setQnaCategory(qnaCategory3);
        getQnaCategoryListRequest(qnaCategory3).then(getQnaCategoryListResponse);
        navigator(QNA_LIST_ABSOLUTE_PATH + `?category=${qnaCategory3}`);
    };

    const onWriteButtonClickHandler = () => {

        if (loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN'){
            alert('로그인 후 Q&A 작성 할 수 있습니다.');
            return navigator(SIGN_IN_ABSOLUTE_PATH);
        }
        
        if (loginUserRole === 'ROLE_ADMIN') {
            alert('관리자는 QNA를 작성할 수 없습니다.');
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
        
        if (qnaCategory !== '') {
            navigator(QNA_LIST_ABSOLUTE_PATH + `?category=${qnaCategory}` + `&search=${searchWord}`);
            getQnaCategorySearchListRequest(qnaCategory, searchWord).then(getSearchQnaListResponse);
        } else {
            navigator(QNA_LIST_ABSOLUTE_PATH + `?search=${searchWord}`);
            getSearchQnaListRequest(searchWord).then(getSearchQnaListResponse);
        }
    };

    //                    effect                       //
    useEffect(() => {
        getQnaListRequest().then(getQnaListResponse);
    }, []);


    //                  render                  //
    const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <>
            <div className='page-big-title' onClick={onListClickHandler}>Q&A</div>
            <div className='category-button'>
                <div onClick={onListClickHandler}>전체</div>
                <div onClick={onCategory1ClickHandler}>주문|배송</div>
                <div onClick={onCategory2ClickHandler}>교환|반품</div>
                <div onClick={onCategory3ClickHandler}>상품|기타</div>
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
                        <div className='board-button' onClick={onWriteButtonClickHandler}>WRITE</div>
                    }
                </div>
            </div>

            <div className='list-table'>
                <div className='list-table-th qna'>
                    <div className='qna-list-table-number'>NO</div>
                    <div className='qna-list-table-category'>TITLE</div>
                    <div className='qna-list-table-writer-id'>WRITER</div>
                    <div className='qna-list-table-date'>DATE</div>
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
