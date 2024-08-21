import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { deleteFaqRequest, getFaqListRequest } from "src/apis/board/faq";
import { GetFaqListResponseDto } from "src/apis/board/faq/dto/response";
import ResponseDto from "src/apis/response.dto";
import { ADMIN_FAQ_REGIST_ABSOLUTE_PATH, ADMIN_FAQ_UPDATE_ABSOLUTE_PATH, COUNT_PER_PAGE,  FAQ_LIST_ABSOLUTE_PATH } from "src/constant";
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
                <div className='faq-list-table-question'>Q. {faqQuestion}</div>
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
    const { faqNumber } = useParams();
    const [openFaqNumber, setOpenFaqNumber] = useState<number | null>(null);  // 현재 열려있는 FAQ 항목 번호
    const [selectedFaqNumber, setSelectedFaqNumber] = useState<number | null>(null); // 선택된 FAQ 항목 번호
    const [filteredFaqList, setFilteredFaqList] = useState<FaqListItem[]>([]); // 필터링된 FAQ 리스트
    const [category, setCategory] = useState<string>('전체'); // 선택된 카테고리

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
        setFilteredFaqList(faqList); // 전체 목록으로 초기화
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
        window.location.reload();
        navigator(FAQ_LIST_ABSOLUTE_PATH);
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
        if (!faqNumber || loginUserRole !== 'ROLE_ADMIN') {
            alert("삭제할 리스트를 선택하세요.");
            return;
        }
    
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;
        
        deleteFaqRequest(faqNumber, cookies.accessToken).then(deleteFaqDetailRequest);
    };

    const onCategoryClickHandler = (selectedCategory: string) => {
        setCategory(selectedCategory);
        if (selectedCategory === '전체') {
            setFilteredFaqList(viewList);  // 전체 목록으로 필터링 해제
        } else {
            const filteredList = viewList.filter(item => item.faqCategory === selectedCategory);
            setFilteredFaqList(filteredList);
        }
        setCurrentPage(1); // 페이지를 첫 페이지로 초기화
        setCurrentSection(1); // 섹션을 첫 섹션으로 초기화
    };

    //                    effect                       //
    useEffect(() => {
        getFaqListRequest(cookies.accessToken).then(getFaqListResponse);
    }, []);

    //                    render                       //
    return (
        <div>
            <div>
                <div className='faq-title'>FAQ</div>
                <div className='faq-page-big-title-explanation'>자주하는 질문 안내드립니다.</div>
            </div>

            <div className='board-category'>
                <div onClick={onListClickHandler}>전체</div>
                <div onClick={() => onCategoryClickHandler('주문|배송')}>주문|배송</div>
                <div onClick={() => onCategoryClickHandler('교환|반품')}>교환|반품</div>
                <div onClick={() => onCategoryClickHandler('상품|기타')}>상품|기타</div>
            </div>

            <div className='list-table-top'>
                <div className='list-table-total-board'>전체<span className='emphasis'> {filteredFaqList.length}건</span> | 페이지<span className='emphasis'> {currentPage} / {totalPage}</span>
                </div>

                <div className='list-table-top-right'>
                { loginUserRole === 'ROLE_ADMIN' &&
                    <div className='board-detail-bottom-right'>
                        <div className='update-button' onClick={ onUpdateClickHandler }>수정</div>
                        <div className='delete-button' onClick={ onDeleteClickHandler }>삭제</div>
                        <div className='delete-button' onClick={ onWriteButtonClickHandler }>글쓰기</div>
                    </div>
                }
                </div>
            </div>

            <div className='list-table'>
                <div className='list-table-th faq'>
                    {loginUserRole === 'ROLE_ADMIN' && <div></div>} {/* 체크박스 위치 */}
                    <div className='faq-list-table-number'>순번</div>
                    <div className='faq-list-table-title'>제목</div>
                    <div className='faq-list-table-category'>카테고리</div>
                    <div className='faq-list-table-date'>작성일</div>
                </div>
                {filteredFaqList.slice((currentPage - 1) * COUNT_PER_PAGE, currentPage * COUNT_PER_PAGE).map((item, index) => (
                    <ListItem 
                        {...item} 
                        index={(currentPage - 1) * COUNT_PER_PAGE + index + 1} 
                        key={item.faqNumber} 
                        isOpen={openFaqNumber === item.faqNumber}
                        isChecked={selectedFaqNumber === item.faqNumber}
                        onClick={() => onItemClickHandler(item.faqNumber)}
                        onCheckboxChange={onCheckboxChangeHandler}
                        showCheckbox={loginUserRole === 'ROLE_ADMIN'}
                    />
                ))}
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
