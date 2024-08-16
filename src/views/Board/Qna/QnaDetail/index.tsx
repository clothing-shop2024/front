
export default function QnaDetail() {


    //                      state                      //
    return (
        <div id='qna-detail-wrapper'>
            <div className='qna-detail-title'>Q&A</div>
            <div className='qna-detail-top'>
                <div className='qna-detail-title'>제목</div>
                <div className='qna-detail-category'>유형</div>
                <div className='qna-detail-public'>공개?</div>
            </div>
            <div className='qna-detail-contents'>본문</div>
            <div className='qna-detail-image-url'></div>
        </div>
    )
}
