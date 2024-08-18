

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import useUserStore from 'src/stores/user.store';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import { uploadFile } from 'src/apis/imageUrl';
import { PostNoticeRequestDto } from 'src/apis/board/notice/dto/request';
import { postNoticeRequest } from 'src/apis/board/notice';

//                    component                    //
export default function NoticeRegist () {

    //                      state                      //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
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
    }

    //                event handler                    //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNoticeTitle(event.target.value);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const noticeContents = event.target.value;
        if (noticeContents.length > 1000) return;
        setNoticeContents(noticeContents);
        
        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
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

    //                    effect                       //
    // useEffect (() => {
    //     if (loginUserRole === 'ROLE_USER') {
    //         navigator(NOTICE_LIST_ABSOLUTE_PATH);
    //     }
    // }, [loginUserRole, navigator]);

    //                    Render                       //
    return (
        <div id='notice-regist-wrapper'>
            <div className='page-big-title' onClick={onListClickHanler}>공지사항</div>

            <div className='notice-regist-main'>
                <div className='notice-regist-title'>
                    <div className='notice-regist-top-name'>title</div>
                    <input className='notice-regist-top-input' placeholder='제목을 입력해주세요.' value={noticeTitle} onChange={onTitleChangeHandler} />
                </div>

                <div className='notice-regist-contents'>
                    <textarea
                        ref={contentsRef}
                        className='qna-write-contents-textarea'
                        rows={10}
                        placeholder='내용을 입력해주세요 / 1000자'
                        maxLength={1000}
                        value={noticeContents}
                        onChange={onContentsChangeHandler}
                    />
                </div>

                <div className='file-select'>
                    파일첨부
                    <input type='file' onChange={onFileChangeHandler} />
                    { noticeImageUrl && (
                        <div className='file-upload'>
                            <img src={noticeImageUrl} alt='Preview' className='file-image' />
                        </div>
                    )}
                </div>
            </div>
            
            <div className='regist-bottom-button'>
                <div className='regist-button' onClick={onPostButtonClickHandler}>OK</div>
                <div className='cancel-button' onClick={onListClickHanler}>CANCEL</div>
            </div>
        </div>
    )
}




