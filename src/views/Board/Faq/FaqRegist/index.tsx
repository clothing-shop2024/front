import { ChangeEvent, useRef, useState } from "react";


import './style.css';
import useUserStore from "src/stores/user.store";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { FAQ_LIST_ABSOLUTE_PATH } from "src/constant";
import { PostFaqRequestDto } from "src/apis/board/faq/dto/request";
import { postFaqReuqest } from "src/apis/board/faq";

//                    component                    //
export default function FaqRegist() {

    //                      state                      //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [faqQuestion, setFaqQuestion] = useState<string>('');
    const [faqAnswer, setFaqAnswer] = useState<string>('');
    const [faqCategory, setFaqCategory] = useState<string>('');

    //                    function                    //
    const navigator = useNavigate();

    const postFaqResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
                result.code === 'AF' ? '권한이 없습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        };
        navigator(FAQ_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onQuestionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFaqQuestion(event.target.value);
    };

    const onAnswerChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const faqAnswer = event.target.value;
        if (faqAnswer.length > 1000) return;
        setFaqAnswer(faqAnswer);
        
        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onCategoryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFaqCategory(event.target.value);
    };

    const onListClickHanler = () => navigator(FAQ_LIST_ABSOLUTE_PATH);

    const onPostButtonClickHandler = async () => {
        if (!faqQuestion.trim() || !faqAnswer.trim()) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }
        if (loginUserRole !== 'ROLE_ADMIN') {
            alert("관리자만 작성할 수 있습니다.");
            return;
        }

        const requestBody: PostFaqRequestDto = {
            faqQuestion,
            faqAnswer,
            faqCategory
        };
        
        postFaqReuqest(requestBody, cookies.accessToken).then(postFaqResponse);
    };

    //                    Render                       //
    return (
        <div id='faq-regist-wrapper'>
            <div className='page-big-title' onClick={onListClickHanler}>FAQ</div>

            <div className='faq-regist-update-main'>
                <div className='faq-regist-update-top'>
                    <div className='faq-regist-update-title'>
                        <div className='faq-top-regist-update-name'>Question</div>
                        <input className='faq-top-regist-update-input' placeholder='제목을 입력해주세요.' value={faqQuestion} onChange={onQuestionChangeHandler} />
                    </div>

                    <div className='faq-category-select'>
                        <div className='faq-regist-update-title'>Category</div>    
                        <div className='faq-category-one-select'>
                            <input
                                type='radio'
                                name='category'
                                className='category_1'
                                value='주문|배송'
                                onChange={onCategoryChangeHandler} // 여기에서 핸들러 적용
                            />
                            <div>주문|배송</div>
                        </div>

                        <div className='faq-category-one-select'>
                            <input
                                type='radio'
                                name='category'
                                className='category_2'
                                value='교환|반품'
                                onChange={onCategoryChangeHandler} // 여기에서 핸들러 적용
                            />
                            <div>교환|반품</div>
                        </div>

                        <div className='faq-category-one-select'>
                            <input
                                type='radio'
                                name='category'
                                className='category_3'
                                value='상품|기타'
                                onChange={onCategoryChangeHandler} // 여기에서 핸들러 적용
                            />
                            <div>상품|기타</div>
                        </div>
                    </div>
                    
                </div>

                <div className='faq-regist-update-contents'>
                    <textarea
                        ref={contentsRef}
                        className='faq-regist-update-contents-textarea'
                        rows={10}
                        placeholder='내용을 입력해주세요 / 1000자'
                        maxLength={1000}
                        value={faqAnswer}
                        onChange={onAnswerChangeHandler}
                    />
                </div>
            </div>
            
            <div className='regist-bottom-button'>
                <div className='regist-button' onClick={onPostButtonClickHandler}>OK</div>
                <div className='cancel-button' onClick={onListClickHanler}>CANCEL</div>
            </div>
        </div>
    )
}
