import { ChangeEvent, useRef, useState } from 'react';
import useUserStore from 'src/stores/user.store';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import { uploadFile } from 'src/apis/imageUrl';
import { PostNoticeRequestDto } from 'src/apis/board/notice/dto/request';
import { postNoticeRequest } from 'src/apis/board/notice';

import './style.css';
import QuillEditor, { QuillEditorRef } from 'src/layouts/QuillEditor';

//                    component                    //
export default function NoticeRegist () {

    //                      state                      //
    const contentsRef = useRef<QuillEditorRef | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [noticeTitle, setNoticeTitle] = useState<string>('');
    const [noticeContents, setNoticeContents] = useState<string>('');
    const [noticeImageUrl, setNoticeImageUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //                    function                    //
    const navigator = useNavigate();

    const postNoticeResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
                result.code === 'AF' ? '권한이 없습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다' : '';
        
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        };
        navigator(NOTICE_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNoticeTitle(event.target.value);
    };

    const onContentsChangeHandler = (value: string) => {
        setNoticeContents(value);
    };

    const onListClickHanler = () => navigator(NOTICE_LIST_ABSOLUTE_PATH);

    const onPostButtonClickHandler = async () => {
        if (!noticeTitle.trim() || !noticeContents.trim()) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }
        if (loginUserRole !== 'ROLE_ADMIN') {
            alert("관리자만 작성할 수 있습니다.");
            return;
        }

        let noticeImageUrl = '';
        if (selectedFile) {
            noticeImageUrl = await uploadFile(selectedFile);
        }

        const requestBody: PostNoticeRequestDto = {
            noticeTitle,
            noticeContents,
            noticeImageUrl
        };
        
        postNoticeRequest(requestBody, cookies.accessToken).then(postNoticeResponse);
    };

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const noticeImageUrl = URL.createObjectURL(file);
            setNoticeImageUrl(noticeImageUrl);
        }
    };

    //                    render                       //
    return (
        <div id='notice-regist-wrapper'>
            <div className='page-big-title' onClick={onListClickHanler}>NOTICE</div>
            <div>
                <div className='board-detail-page'>
                    <div className='board-detail-top'>
                        <div className='board-detail-title'>
                            <div className='board-detail-top-name'>TITLE</div>
                            <input className='board-detail-top-contents notice' placeholder='제목을 입력해주세요.' value={noticeTitle} onChange={onTitleChangeHandler} />
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
                
                    <div className='regist-update-bottom-button'>
                        <div className='board-button' onClick={onPostButtonClickHandler}>OK</div>
                        <div className='board-button' onClick={onListClickHanler}>CANCEL</div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
