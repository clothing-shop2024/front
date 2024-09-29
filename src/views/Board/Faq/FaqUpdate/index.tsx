import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { getFaqDetailRequest, getFaqListRequest, putFaqRequest } from "src/apis/board/faq";
import { PutFaqRequestDto } from "src/apis/board/faq/dto/request";
import { GetFaqDetailResponseDto, GetFaqListResponseDto } from "src/apis/board/faq/dto/response";
import ResponseDto from "src/apis/response.dto";
import { FAQ_LIST_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";

//                    component                    //
export default function FaqUpdate() {

    //                      state                      //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null); 
    const { faqNumber } = useParams();
    const { loginUserId, loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [faqQuestion, setFaqQuestion] = useState<string>('');
    const [faqAnswer, setFaqAnswer] = useState<string>('');
    const [faqCategory, setFaqCategory] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    //                    function                    //
    const navigator = useNavigate();

    const getFaqResponse = (result: GetFaqListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수번호입니다.':
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.':
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(FAQ_LIST_ABSOLUTE_PATH);
            return;
        }

        const { faqQuestion, faqAnswer, faqCategory } = result as GetFaqDetailResponseDto;

        if (loginUserRole !== 'ROLE_ADMIN') {
            alert('관리자만 수정할 수 있습니다.');
            // navigator(FAQ_LIST_ABSOLUTE_PATH);
            return;
        }

        setFaqQuestion(faqQuestion);
        setFaqAnswer(faqAnswer);
        setFaqCategory(faqCategory);

    };

    const putFaqResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해주세요.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!faqNumber) return;
        navigator(FAQ_LIST_ABSOLUTE_PATH);

    };

    //                event handler                    //
    const onQuestionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const question = event.target.value;
        setFaqQuestion(question);
    };

    const onAnswerChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {

        const faqAnswer = event.target.value;
        if (faqAnswer.length > 1000) return;
        setFaqAnswer(faqAnswer);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;

    }

    const onCategoryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFaqCategory(event.target.value);
    };

    const onUpdateButtonClickHandler = async () => {

        if (!cookies.accessToken || !faqNumber) return;
        if (!faqQuestion.trim() || !faqAnswer.trim() || !faqCategory.trim() ) return;

        const requestBody: PutFaqRequestDto = {
            faqQuestion,
            faqAnswer,
            faqCategory
        };
        putFaqRequest(faqNumber, requestBody, cookies.accessToken).then(putFaqResponse);

    };

    const onListClickHanler = () => navigator(FAQ_LIST_ABSOLUTE_PATH);

    //                    effect                       //
    useEffect(() => {
        if (!faqNumber) return;
        getFaqDetailRequest(faqNumber).then(getFaqResponse);
    }, [faqNumber]);

    //                    render                       //
    return (
        <div id='faq-update-wrapper'>
            <div className='page-big-title' onClick={onListClickHanler}>FAQ</div>
            <div>
                <div className='board-detail-page'>
                    <div className='board-detail-top'>
                        <div className='board-detail-title'>
                            <div className='board-detail-top-name'>QUESTION</div>
                            <input className='board-detail-top-contents' value={faqQuestion} onChange={onQuestionChangeHandler} />
                        </div>

                        <div className='board-detail-title'>
                            <div className='board-detail-top-name'>CATEGORY</div>
                            <div className='board-detail-top-contents regist'>
                                <div className='faq-category-one-select'>
                                    <label className={selectedCategory === "주문|배송" ? "selected" : ""}>
                                        <input
                                            type='radio'
                                            name='category'
                                            className='category_1'
                                            value='주문|배송'
                                            checked={faqCategory === '주문|배송'}
                                            onChange={onCategoryChangeHandler} // 여기에서 핸들러 적용
                                        /> 주문|배송
                                    </label>
                                </div>

                                <div className='faq-category-one-select'>
                                    <label className={selectedCategory === "교환|반품" ? "selected" : ""}>
                                        <input
                                            type='radio'
                                            name='category'
                                            className='category_2'
                                            value='교환|반품'
                                            checked={faqCategory === '교환|반품'}
                                            onChange={onCategoryChangeHandler} // 여기에서 핸들러 적용
                                        /> 교환|반품
                                    </label>
                                </div>

                                <div className='faq-category-one-select'>
                                    <label className={selectedCategory === "상품|기타" ? "selected" : ""}>
                                        <input
                                            type='radio'
                                            name='category'
                                            className='category_3'
                                            value='상품|기타'
                                            checked={faqCategory === '상품|기타'}
                                            onChange={onCategoryChangeHandler} // 여기에서 핸들러 적용
                                        /> 상품|기타
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <textarea
                        ref={contentsRef}
                        className='faq-regist-update-contents-textarea'
                        rows={10}
                        maxLength={1000}
                        value={faqAnswer}
                        onChange={onAnswerChangeHandler}
                    />
                </div>
                
                <div className='regist-update-bottom-button'>
                    <div className='board-button' onClick={onUpdateButtonClickHandler}>OK</div>
                    <div className='board-button' onClick={onListClickHanler}>CANCEL</div>
                </div>
            </div>
        </div>
    )
}
