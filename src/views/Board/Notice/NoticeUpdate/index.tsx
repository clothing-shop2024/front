import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { getNoticeDetailRequest, putNoticeRequest } from "src/apis/board/notice";
import { PutNoticeRequestDto } from "src/apis/board/notice/dto/request";
import { GetNoticeDetailResponseDto, GetNoticeListResponseDto } from "src/apis/board/notice/dto/response";
import { uploadFile } from "src/apis/imageUrl";
import ResponseDto from "src/apis/response.dto";
import { NOTICE_DETAIL_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import './style.css';
import QuillEditor, { QuillEditorRef } from "src/layouts/QuillEditor";

//                    component                    //
export default function NoticeUpdate() {

    //                      state                      //
    const contentsRef = useRef<QuillEditorRef | null>(null);
    const { noticeNumber } = useParams();
    const { loginUserId, loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [noticeTitle, setNoticeTitle] = useState<string>('');
    const [noticeContents, setNoticeContents] = useState<string>('');
    const [noticeImageUrl, setNoticeImageUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);

    //                    function                    //
    const navigator = useNavigate();

    const getNoticeResponse = (result: GetNoticeListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수번호입니다.':
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.':
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }

        const { noticeTitle, noticeContents, noticeImageUrl } = result as GetNoticeDetailResponseDto;

        if (loginUserRole !== 'ROLE_ADMIN') {
            alert('관리자만 수정할 수 있습니다.');
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }

        setNoticeTitle(noticeTitle);
        setNoticeContents(noticeContents);
        setNoticeImageUrl(noticeImageUrl);
        setInitialImageUrl(noticeImageUrl);

    };

    const putNoticeResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해주세요.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!noticeNumber) return;
        navigator(NOTICE_DETAIL_ABSOLUTE_PATH(noticeNumber));

    };

    //                event handler                    //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value
        setNoticeTitle(title);
    };

    const onContentsChangeHandler = (value: string) => {
        setNoticeContents(value);
    };

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const fileInput = event.target;

        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setSelectedFile(file);
            const noticeImageUrl = URL.createObjectURL(file);
            setNoticeImageUrl(noticeImageUrl);
        }
    };

    const onUpdateButtonClickHandler = async () => {

        if (!cookies.accessToken || !noticeNumber) return;
        if (!noticeTitle.trim() || !noticeContents.trim()) return;

        let imageUrlToUpdate = noticeImageUrl;

        if (selectedFile) {
            imageUrlToUpdate = await uploadFile(selectedFile);
        } else {
            imageUrlToUpdate = initialImageUrl;
        }

        const requestBody: PutNoticeRequestDto = {
            noticeTitle,
            noticeContents,
            noticeImageUrl: imageUrlToUpdate
        };
        putNoticeRequest(noticeNumber, requestBody, cookies.accessToken).then(putNoticeResponse);

    };

    const onListClickHanler = () => navigator(NOTICE_LIST_ABSOLUTE_PATH);

    //                    effect                       //
    useEffect(() => {
        if (!noticeNumber || !cookies.accessToken) return;
        if (loginUserRole !== 'ROLE_ADMIN') {
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }
        getNoticeDetailRequest(noticeNumber).then(getNoticeResponse);
    }, [loginUserRole, noticeNumber, cookies.accessToken, navigator]);

    //                    render                       //
    return (
        <div id='notice-update-wrapper'>
            <div className='page-big-title' onClick={onListClickHanler}>NOTICE</div>

            <div>
                <div className='board-detail-page'>
                    <div className='board-detail-top'>
                        <div className='board-detail-title'>
                            <div className='board-detail-top-name'>TITLE</div>
                            <input className='board-detail-top-contents notice' value={noticeTitle} onChange={onTitleChangeHandler} />
                        </div>
                    </div>

                    <QuillEditor
                        className='quill-editor'
                        ref={contentsRef}
                        value={noticeContents}
                        onChange={onContentsChangeHandler}
                    />
                    <div className='file-select'>
                        파일첨부&nbsp;&nbsp;
                        <input type='file' onChange={onFileChangeHandler} />
                        { noticeImageUrl && (
                            <div className='file-upload'>
                                <img src={noticeImageUrl} alt='Preview' className='file-image' />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className='regist-update-bottom-button'>
                    <div className='board-button' onClick={onUpdateButtonClickHandler}>OK</div>
                    <div className='board-button' onClick={onListClickHanler}>CANCEL</div>
                </div>
            </div>
        </div>
    )
}
