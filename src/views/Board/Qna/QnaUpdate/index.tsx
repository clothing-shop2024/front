import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { getQnaDetailRequest, putQnaRequest } from "src/apis/board/qna";
import { PutQnaRequestDto } from "src/apis/board/qna/dto/request";
import { GetQnaDetailResponseDto, GetQnaListResponseDto } from "src/apis/board/qna/dto/response";
import ResponseDto from "src/apis/response.dto";
import { QNA_DETAIL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH } from "src/constant";
import QuillEditor, { QuillEditorRef } from "src/layouts/QuillEditor";
// import useUserStore from "src/stores/user.store";
import './style.css';

export default function QnaUpdate() {

    //                      state                      //
    const [cookies] = useCookies();
    const contentsRef = useRef<QuillEditorRef | null>(null);
    // const { loginUserId, loginUserRole } = useUserStore();
    const { qnaNumber } = useParams();
    const [qnaWriterId, setQnaWriterId] = useState<string>('');
    const [qnaContents, setQnaContents] = useState<string>('');
    const [qnaCategory, setQnaCategory] = useState<string>('');
    const [qnaImageUrl, setQnaImageUrl] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    //                    function                     //
    const navigator = useNavigate();

    const getQnaResponse = (result: GetQnaListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수번호입니다.':
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.':
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

        const { qnaCategory, qnaContents, qnaImageUrl } = result as GetQnaDetailResponseDto;

        // if (loginUserId !== qnaWriterId) {
        //     alert('작성자가 아니면 볼 수 없습니다.');
        //     navigator(QNA_LIST_ABSOLUTE_PATH);
        //     return;
        // }

        setQnaCategory(qnaCategory);
        setQnaContents(qnaContents);
        setQnaImageUrl(qnaImageUrl);
        setQnaWriterId(qnaWriterId);

    };

    const putQnaResponse = (result: ResponseDto | null) => {
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
    }

    //                event handler                    //
    const onCategoryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQnaCategory(event.target.value);
    };

    const onContentsChangeHandler = (value: string) => {
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

    const onUpdateButtonClickHandler = async () => {

        if (!cookies.accessToken || !qnaNumber) return;
        if (!qnaContents.trim()) return;

        let imageUrlToUpdate = qnaImageUrl;
        // if (selectedFile) {
        //     imageUrlToUpdate = await uploadFile(selectedFile);
        // } else {
        //     imageUrlToUpdate = initialImageUrl;
        // }

        const requestBody: PutQnaRequestDto = {
            qnaCategory,
            qnaContents,
            qnaImageUrl: imageUrlToUpdate
        };
        putQnaRequest(qnaNumber, requestBody, cookies.accessToken).then(putQnaResponse);

    };

    const onListClickHanler = () => navigator(QNA_LIST_ABSOLUTE_PATH);
    const onDetailClickHandler = () => {
        if (!qnaNumber) {
            console.error('noticeNumber is undefined');
            return;
        }
        navigator(QNA_DETAIL_ABSOLUTE_PATH(qnaNumber));
    }

    //                    effect                       //
    useEffect(() => {
        if (!qnaNumber) return;
        getQnaDetailRequest(qnaNumber, cookies.accessToken).then(getQnaResponse);
    }, [qnaNumber]);

    //                      render                      //
    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title' onClick={onListClickHanler}>Q&A</div>
            </div>
            
            <div>
                <div className='board-page-detail'>
                    <div className='board-top'>
                        <div className='board-top-title'>
                            <div className='board-top-name'>TITLE</div>
                            <div className='board-top-contents' >{qnaCategory} 문의합니다.</div>
                        </div>
                        <div className='board-top-title'>
                            <div className='board-top-name'>CATEGORY</div>    
                            <div className='board-top-contents regist'>
                                <div className='board-category-one-select'>
                                    <label className={selectedCategory === "주문|배송" ? "selected" : ""}>
                                        <input
                                            type='radio'
                                            name='category'
                                            className='category_1'
                                            value='주문|배송'
                                            checked={qnaCategory === '주문|배송'}
                                            onChange={onCategoryChangeHandler}
                                        /> 주문|배송
                                    </label>
                                </div>
                                <div className='board-category-one-select'>
                                    <label className={selectedCategory === "교환|반품" ? "selected" : ""}>
                                        <input
                                            type='radio'
                                            name='category'
                                            className='category_2'
                                            value='교환|반품'
                                            checked={qnaCategory === '교환|반품'}
                                            onChange={onCategoryChangeHandler}
                                        /> 교환|반품
                                    </label>
                                </div>
                                <div className='board-category-one-select'>
                                    <label className={selectedCategory === "상품|기타" ? "selected" : ""}>
                                        <input
                                            type='radio'
                                            name='category'
                                            className='category_3'
                                            value='상품|기타'
                                            checked={qnaCategory === '상품|기타'}
                                            onChange={onCategoryChangeHandler}
                                        /> 상품|기타
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <QuillEditor 
                        className='quill-editor'
                        ref={contentsRef} // 변경된 부분
                        value={qnaContents} 
                        onChange={onContentsChangeHandler} 
                    />
                    <div className='file-select'>
                        파일첨부&nbsp;&nbsp;
                        <input type='file' onChange={onFileChangeHandler} />
                        { qnaImageUrl && (
                            <div className='file-upload'>
                                <img src={qnaImageUrl} alt='Preview' className='file-image' />
                            </div>
                        )}
                    </div>
                    <div className='board-regist-update-button'>
                        <div className='board-button' onClick={onUpdateButtonClickHandler}>OK</div>
                        <div className='board-button' onClick={onDetailClickHandler}>CANCEL</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
