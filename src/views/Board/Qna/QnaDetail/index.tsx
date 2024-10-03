import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router";
import { deleteQnaRequest, getQnaDetailRequest, putQnaCommentRequest } from "src/apis/board/qna";
import { GetQnaDetailResponseDto, GetQnaListResponseDto } from "src/apis/board/qna/dto/response";
import ResponseDto from "src/apis/response.dto";
import { MAIN_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, QNA_UPDATE_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store"
import './style.css';
import { PutQnaCommentRequestDto } from "src/apis/board/qna/dto/request";

//                    component                    //
export default function QnaDetail() {

    //                      state                      //
    const { loginUserId, loginUserRole } = useUserStore();
    const { qnaNumber } = useParams();

    const [cookies] = useCookies();

    const [status, setStatus] = useState<boolean>(false);
    const [qnaContents, setQnaContents] = useState<string>('');
    const [qnaDate, setQnaDate] = useState<string>('');
    const [qnaCategory, setQnaCategory] = useState<string>('');
    const [qnaWriterId, setQnaWriterId] = useState<string>('');
    const [qnaImageUrl, setQnaImageUrl] = useState<string>('');
    const [qnaComment, setQnaComment] = useState<string | null>(null);

    //                    function                     //
    const navigator = useNavigate();
    const location = useLocation();

    const getQnaResponse = (result: GetQnaListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

        const { qnaContents, qnaCategory, qnaDate, qnaWriterId, qnaImageUrl, qnaComment } = result as GetQnaDetailResponseDto;
        setQnaContents(qnaContents);
        setQnaCategory(qnaCategory);
        setQnaDate(qnaDate);
        setQnaWriterId(qnaWriterId);
        setQnaImageUrl(qnaImageUrl);
        setQnaComment(qnaComment);

    };

    const putQnaCommentResponse = (result: ResponseDto | null) => {
        
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!qnaNumber) return;
        getQnaDetailRequest(qnaNumber).then(getQnaResponse);
    };

    const deleteQnaDetailRequest = (result: ResponseDto | null) => {
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

    //                  event handler                   //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        const qnaComment = event.target.value;
        setQnaComment(qnaComment);
        setStatus(true);
    };

    const onCommentClickHandler = () => {
        if (!qnaNumber || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken || !qnaComment || !qnaComment.trim()) return;

        const requestBody: PutQnaCommentRequestDto = { qnaComment };
        putQnaCommentRequest(qnaNumber, requestBody, cookies.accessToken).then(putQnaCommentResponse);
        alert('답변이 수정되었습니다.');
    };

    const onUpdateClickHandler = () => {
        if (qnaComment !== null) {
            alert('답변이 있는 상태에서는 수정할 수 없습니다.');
            return;
        }
        if (!qnaNumber) return;
        navigator(QNA_UPDATE_ABSOLUTE_PATH(qnaNumber));

        // const previousPage = location.state?.previousPage;
        // navigator(`/shop/qna/update/${qnaNumber}`, { state: { previousPage }});
    };

    const onDeleteClickHanler = () => {
        if (!qnaNumber || (loginUserId !== qnaWriterId && loginUserRole !== 'ROLE_ADMIN') || !cookies.accessToken) return;
        const isConfirm = window.confirm('삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteQnaRequest(qnaNumber, cookies.accessToken).then(deleteQnaDetailRequest);
        
        navigator(QNA_LIST_ABSOLUTE_PATH);
    };

    const onListClickHandler = () => navigator(QNA_LIST_ABSOLUTE_PATH);

    //                    effect                       //
    useEffect(() => {
        if (!qnaNumber) return;
        getQnaDetailRequest(qnaNumber).then(getQnaResponse);
    }, []);

    //                      render                      //
    const modifyButtonClass = qnaComment ? 'board-primary-button' : 'board-disable-button';
    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title' onClick={onListClickHandler}>Q&A</div>
            </div>
            
            <div>
                <div className='board-page-detail'>
                    <div className='board-top'>
                        <div className='board-top-title'>
                            <div className='board-top-name'>TITLE</div>
                            <div className='board-top-contents'>{qnaCategory} 문의합니다.</div>
                        </div>
                        <div className='board-detail-writer-id'>
                            <div className='board-top-name'>WRITER</div>
                            <div className='board-top-contents'>{qnaWriterId}</div>
                        </div>
                        <div className='board-top-category'>
                            <div className='board-top-name'>CATEGORY</div>
                            <div className='board-top-contents'>{qnaCategory}</div>
                        </div>
                        <div className='board-detail-date'>
                            <div className='board-top-name'>DATE</div>
                            <div className='board-top-contents'>{qnaDate}</div>
                        </div>
                    </div>
                    <div className='board-detail-main qna'>
                        <div className='board-detail-contents' dangerouslySetInnerHTML={{ __html: qnaContents }}></div>
                        <div className='board-detail-image-url'>
                            {qnaImageUrl && <img src={qnaImageUrl} alt="Database Image" className="file-image" />}
                        </div>
                    </div>
                    { loginUserRole === 'ROLE_ADMIN' &&
                        <div className='qna-comment-write-box'>
                            <div className='qna-comment-textarea-box'>
                                <textarea className='qna-detail-comment-textarea' placeholder='답글을 작성해주세요.' value={qnaComment === null ? '' : qnaComment} onChange={onCommentChangeHandler} />
                            </div>
                            <div className='qna-answer-button' onClick={onCommentClickHandler}>ANSWER WRITE</div>
                        </div>
                    }
                    { qnaComment !== null && loginUserRole === 'ROLE_USER' &&
                        <div className='qna-detail-comment-box'>
                            <div>&nbsp;<strong> ANSWER</strong></div>
                            <div className='qna-detail-comment'>{qnaComment}</div>
                        </div>
                    }
                    <div className='board-detail-bottom'>
                        <div className='board-button' onClick={onListClickHandler}>LIST</div>
                        <div className='board-detail-bottom-right'>
                                
                            { loginUserRole === 'ROLE_USER' &&
                                <div className={modifyButtonClass} onClick={onUpdateClickHandler}>MODIFY</div>
                            }
                            <div className='board-button' onClick={onDeleteClickHanler}>DELETE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
