import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router";
import { deleteQnaRequest, getQnaDetailRequest } from "src/apis/board/qna";
import { GetQnaDetailResponseDto, GetQnaListResponseDto } from "src/apis/board/qna/dto/response";
import ResponseDto from "src/apis/response.dto";
import { MAIN_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store"
import './style.css';

//                    component                    //
export default function QnaDetail() {

    //                      state                      //
    const { loginUserId, loginUserRole } = useUserStore();
    const { qnaNumber } = useParams();

    const [cookies] = useCookies();

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

    const postCommentResponse = (result: ResponseDto | null) => {
        
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'WC' ? '이미 답글이 작성된 게시물입니다.' :
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

        const previousPage = location.state?.previousPage;
        // if (previousPage === 'MY_QNA_LIST') {
        //     navigator()
        // }
    };

    //                  event handler                   //
    const onComentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        const qnaComment = event.target.value;
        setQnaComment(qnaComment);
    };

    const onCommentSubmitClickHandler = () => {
        if (!qnaComment || !qnaComment.trim()) return;
        if (!qnaNumber || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
    };

    const onListClickHandler = () => {
        const previousPage = location.state?.previousPage;
        if (previousPage === 'MY_QNA_LIST') {
            // navigator()
        } else {
            navigator(QNA_LIST_ABSOLUTE_PATH);
        }
    };

    const onUpdateClickHandler = () => {
        if (!qnaNumber || loginUserId !== qnaWriterId) return;

        const previousPage = location.state?.previousPage;
        navigator(`/shop/qna/update/${qnaNumber}`, { state: { previousPage }});
    };

    const onDeleteClickHanler = () => {
        if (!qnaNumber || loginUserId !== qnaWriterId || !cookies.accessToken) return;
        const isConfirm = window.confirm('삭제하시겠습니다?');
        if (!isConfirm) return;

        deleteQnaRequest(qnaNumber, cookies.accessToken).then(deleteQnaDetailRequest);
    }

    //                    effect                       //
    useEffect(() => {
        if (!qnaNumber) return;
        getQnaDetailRequest(qnaNumber).then(getQnaResponse);
    }, []);

    //                      render                      //
    const coverdWriterId = qnaWriterId !== '' && (qnaWriterId[0] + '*'.repeat(qnaWriterId.length - 1));

    return (
        <div id='qna-detail-wrapper'>
            <div className='page-big-title'>문의사항</div>
            <div className='qna-detail-top'>
                <div className='qna-detail-title'>제목</div>
                <div className='qna-detail-category'>유형</div>
                <div className='qna-detail-public'>공개여부</div>
                <div className='qna-detail-public'>아이디</div>
                <div className='qna-detail-date'>날짜</div>
            </div>
            <div className='qna-detail-contents'>본문</div>
            <div className='qna-detail-image-url'></div>
        </div>
    )
}
