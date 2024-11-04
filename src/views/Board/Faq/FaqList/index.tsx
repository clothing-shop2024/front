import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { deleteFaqRequest, getFaqCategoryListRequest, getFaqListRequest } from "src/apis/board/faq";
import { GetFaqListResponseDto } from "src/apis/board/faq/dto/response";
import ResponseDto from "src/apis/response.dto";
import { ADMIN_FAQ_REGIST_ABSOLUTE_PATH, ADMIN_FAQ_UPDATE_ABSOLUTE_PATH, COUNT_PER_PAGE,  FAQ_LIST_ABSOLUTE_PATH, MAIN_PATH } from "src/constant";
import { usePagination } from "src/hooks";
import useUserStore from "src/stores/user.store";
import { FaqListItem } from "src/types";
import './style.css';

//                    component                    //
function ListItem({
    index,
    faqNumber,
    faqQuestion,
    faqAnswer,
    faqCategory,
    faqDate,
    isOpen,
    isChecked,
    onClick,
    onCheckboxChange,
    showCheckbox
}: FaqListItem & { 
    index: number, 
    isOpen: boolean, 
    isChecked: boolean,
    onClick: () => void, 
    onCheckboxChange: (faqNumber: number) => void,
    showCheckbox: boolean
}) {

    //                    render                       //
    const itemClass = `list-table-tr faq ${isChecked ? 'list-item-checked' : ''}`; // 선택된 리스트 글씨 진하게 바꿈

    return (
        <div>
            <div className={itemClass} onClick={onClick}>
                {showCheckbox && (
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => onCheckboxChange(faqNumber)} 
                    />
                )}
                <div className='faq-list-table-number'>{index}</div> {/* index 직접 사용 */}
                <div className='faq-list-table-title'>Q. {faqQuestion}</div>
                <div className='faq-list-table-category'>{faqCategory}</div>
                <div className='faq-list-table-date'>{faqDate}</div>
            </div>
            {isOpen && <div className='faq-list-table-answer'>
                <div>A.</div>
                <div>{faqAnswer}</div>
            </div>}
        </div>
    );
}

//                    component                    //
export default function FaqList() {

    //                      state                      //
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    // const { faqNumber } = useParams();
    const [openFaqNumber, setOpenFaqNumber] = useState<number | null>(null);  // 현재 열려있는 FAQ 항목 번호
    const [selectedFaqNumber, setSelectedFaqNumber] = useState<number | null>(null); // 선택된 FAQ 항목 번호
    const [faqCategory, setFaqCategory] = useState<string>('');
    const faqCategory1 = '주문|배송';
    const faqCategory2 = '교환|반품';
    const faqCategory3 = '상품|기타';
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
    } = usePagination<FaqListItem>(COUNT_PER_PAGE, COUNT_PER_PAGE);

    //                    function                     //
    const navigator = useNavigate();

    const getFaqListResponse = (result: GetFaqListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { faqList } = result as GetFaqListResponseDto;
        changeBoardList(faqList);

        setCurrentPage(!faqList.length ? 0 : 1);
        setCurrentSection(!faqList.length ? 0 : 1);
    };

    const getFaqCategoryListResponse = (result: GetFaqListResponseDto | ResponseDto | null) => {

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

        const { faqList } = result as GetFaqListResponseDto;
        changeBoardList(faqList);

        setCurrentPage(!faqList.length ? 0 : 1);
        setCurrentSection(!faqList.length ? 0 : 1);

    };

    const deleteFaqDetailRequest = (result: ResponseDto | null) => {
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

        // navigator(FAQ_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onItemClickHandler = (faqNumber: number) => {
        setOpenFaqNumber(openFaqNumber === faqNumber ? null : faqNumber);
        onCheckboxChangeHandler(faqNumber);  // 리스트 항목 클릭 시 체크박스도 변경되도록 수정
    };

    const onCheckboxChangeHandler = (faqNumber: number) => {
        setSelectedFaqNumber(faqNumber === selectedFaqNumber ? null : faqNumber);
    };

    const onListClickHandler = () => {
        setFaqCategory('');
        setActiveFilter(null);
        setOpenFaqNumber(null);
        navigator(FAQ_LIST_ABSOLUTE_PATH);
        getFaqListRequest().then(getFaqListResponse);
    };

    const onCategory1ClickHandler = () => {
        setFaqCategory(faqCategory1);
        setActiveFilter(faqCategory1);
        setOpenFaqNumber(null);
        getFaqCategoryListRequest(faqCategory1).then(getFaqCategoryListResponse);
        navigator(FAQ_LIST_ABSOLUTE_PATH + `?category=${faqCategory1}`);
    };
    const onCategory2ClickHandler = () => {
        setFaqCategory(faqCategory2);
        setActiveFilter(faqCategory2);
        setOpenFaqNumber(null);
        getFaqCategoryListRequest(faqCategory2).then(getFaqCategoryListResponse);
        navigator(FAQ_LIST_ABSOLUTE_PATH + `?category=${faqCategory2}`);
    };
    const onCategory3ClickHandler = () => {
        setFaqCategory(faqCategory3);
        setActiveFilter(faqCategory3);
        setOpenFaqNumber(null);
        getFaqCategoryListRequest(faqCategory3).then(getFaqCategoryListResponse);
        navigator(FAQ_LIST_ABSOLUTE_PATH + `?category=${faqCategory3}`);
    };

    const onWriteButtonClickHandler = () => {
        navigator(ADMIN_FAQ_REGIST_ABSOLUTE_PATH);
    };

    const onUpdateClickHandler = () => {
        if (!selectedFaqNumber || loginUserRole !== 'ROLE_ADMIN') {
            alert("수정할 리스트를 선택하세요.");
            return;
        }
        navigator(ADMIN_FAQ_UPDATE_ABSOLUTE_PATH(selectedFaqNumber));
    };

    const onDeleteClickHandler = () => {
        if (!selectedFaqNumber || loginUserRole !== 'ROLE_ADMIN') {
            alert("삭제할 리스트를 선택하세요.");
            return;
        }
    
        const isConfirm = window.confirm('삭제하시겠습니까?');
        if (!isConfirm) return;
        
        deleteFaqRequest(selectedFaqNumber, cookies.accessToken).then(deleteFaqDetailRequest);
    };

    //                    effect                       //
    useEffect(() => {
        getFaqListRequest().then(getFaqListResponse);
    }, []);

    //                    render                       //
    return (
        <div>
            <div>
                <div className='faq-title' onClick={onListClickHandler}>FAQ</div>
                <div className='faq-title-explanation'>자주하는 질문 안내드립니다.</div>
            </div>

            <div className='category-button'>
                <div className='category-filter' onClick={onListClickHandler}>전체</div>
                <div className='category-filter' onClick={onCategory1ClickHandler} style={{ fontWeight: activeFilter === '주문|배송' ? 'bold' : 'normal' }}>주문|배송</div>
                <div className='category-filter' onClick={onCategory2ClickHandler} style={{ fontWeight: activeFilter === '교환|반품' ? 'bold' : 'normal' }}>교환|반품</div>
                <div className='category-filter' onClick={onCategory3ClickHandler} style={{ fontWeight: activeFilter === '상품|기타' ? 'bold' : 'normal' }}>상품|기타</div>
            </div>

            <div className='list-table-top'>
                <div className='list-table-total-board'>전체<span className='emphasis'> {totalLength}건</span> | 페이지<span className='emphasis'> {currentPage} / {totalPage}</span>
                </div>

                <div className='list-table-top-right'>
                { loginUserRole === 'ROLE_ADMIN' &&
                    <div className='board-detail-bottom-right'>
                        <div className='board-button' onClick={ onUpdateClickHandler }>MODIFY</div>
                        <div className='board-button' onClick={ onDeleteClickHandler }>DELETE</div>
                        <div className='board-button' onClick={ onWriteButtonClickHandler }>WRITE</div>
                    </div>
                }
                </div>
            </div>

            <div className='list-table'>
                <div className='list-table-th faq'>
                    {loginUserRole === 'ROLE_ADMIN' && <div></div>} {/* 체크박스 위치 */}
                    <div className='faq-list-table-number'>NO</div>
                    <div className='faq-list-table-title'>TITLE</div>
                    <div className='faq-list-table-category'>CATEGORY</div>
                    <div className='faq-list-table-date'>DATE</div>
                </div>
                {viewList.map((item, index) => <ListItem 
                    {...item} 
                    index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index)} 
                    key={item.faqNumber} 
                    isOpen={openFaqNumber === item.faqNumber}
                    isChecked={selectedFaqNumber === item.faqNumber}
                    onClick={() => onItemClickHandler(item.faqNumber)}
                    onCheckboxChange={onCheckboxChangeHandler}
                    showCheckbox={loginUserRole === 'ROLE_ADMIN'}
                />)}
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
