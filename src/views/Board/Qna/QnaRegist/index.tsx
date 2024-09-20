import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import useUserStore from 'src/stores/user.store';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { QNA_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostQnaRequestDto } from 'src/apis/board/qna/dto/request';
import { postQnaRequest } from 'src/apis/board/qna';
import { uploadFile } from 'src/apis/imageUrl';
import QuillEditor, { QuillEditorRef } from 'src/layouts/QuillEditor'; // QuillEditor 컴포넌트 임포트

export default function QnaRegist() {

    //                      state                      //
    const contentsRef = useRef<QuillEditorRef | null>(null); // 변경된 부분
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();

    const [qnaContents, setQnaContents] = useState<string>('');
    const [qnaDate, setQnaDate] = useState<string>('');
    const [qnaCategory, setQnaCategory] = useState<string>('');
    const [qnaWriterId, setQnaWriterId] = useState<string>('');
    const [qnaImageUrl, setQnaImageUrl] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //                    function                     //
    const navigator = useNavigate();

    const postQnaResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }
        navigator(QNA_LIST_ABSOLUTE_PATH);
    };

    useEffect(() => {
        const firstText = `
            * CS 업무 시간은 1:00 PM ~ 6:00 PM 입니다.</br></br>문의해주실 상품명 : </br>성함 : </br>연락처 : </br>주문번호 : </br></br>문의 내용 : </br></br>
        `;
        setQnaContents(firstText);
    }, []);

    //                  event handler                   //
    const onContentsChangeHandler = (value: string) => {
        // if (value.length > 1000) return;
    
        // HTML 콘텐츠를 그대로 상태에 저장
        setQnaContents(value);
    };

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setQnaImageUrl(imageUrl);
        }
    };

    const onCategoryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQnaCategory(event.target.value);
    };

    const onPostButtonClickHandler = async () => {
        if (!qnaContents.trim()) return;
        if (!cookies.accessToken) return;

        let qnaImageUrl = '';
        if (selectedFile) {
            qnaImageUrl = await uploadFile(selectedFile);
        }

        const requestBody: PostQnaRequestDto = {
            qnaContents,
            qnaCategory,
            qnaImageUrl
        };

        postQnaRequest(requestBody, cookies.accessToken).then(postQnaResponse);
    };

    const onListClickHanler = () => navigator(QNA_LIST_ABSOLUTE_PATH);

    //                    effect                       //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole, navigator]);

    //                      render                      //
    return (
        <div id='qna-write-wrapper'>
            <div className='page-big-title'  onClick={onListClickHanler}>Q&A</div>
            <div className='qna-write-top'>
                <div className='qna-write-title'>
                    <div>TITLE</div>
                    <div>{qnaCategory} 문의합니다.</div>
                </div>
                <div>
                    <div className='faq-category-select'>
                        <div className='faq-regist-update-title'>Category</div>    
                        <div className='faq-category-one-select'>
                            <input
                                type='radio'
                                name='category'
                                className='category_1'
                                value='주문|배송'
                                onChange={onCategoryChangeHandler}
                            />
                            <div>주문|배송</div>
                        </div>

                        <div className='faq-category-one-select'>
                            <input
                                type='radio'
                                name='category'
                                className='category_2'
                                value='교환|반품'
                                onChange={onCategoryChangeHandler}
                            />
                            <div>교환|반품</div>
                        </div>

                        <div className='faq-category-one-select'>
                            <input
                                type='radio'
                                name='category'
                                className='category_3'
                                value='상품|기타'
                                onChange={onCategoryChangeHandler}
                            />
                            <div>상품|기타</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* QuillEditor 컴포넌트 사용 */}
            <QuillEditor 
                ref={contentsRef} // 변경된 부분
                value={qnaContents} 
                onChange={onContentsChangeHandler} 
                className='quill-editor'
            />
            <input type="file" onChange={onFileChangeHandler} className='file-select' />
            <div>
            </div>
            <div className='regist-bottom-button'>
                <div className='board-button' onClick={onPostButtonClickHandler}>OK</div>
                <div className='board-button' onClick={onListClickHanler}>CANCEL</div>
            </div>
        </div>
    );
}
