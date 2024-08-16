import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import useUserStore from "src/stores/user.store"

//                    component                    //
export default function QnaDetail() {

    //                      state                      //
    const { loginUserId, loginUserRole } = useUserStore();
    const { qnaNumber } = useParams();

    const [cookies] = useCookies();


    //                      state                      //
    return (
        <div id='qna-detail-wrapper'>
            <div className='qna-detail-title'>Q&A</div>
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
