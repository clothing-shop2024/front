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
import QuillEditor from 'src/layouts/QuillEditor'; // QuillEditor 컴포넌트 임포트

export default function QnaRegist() {
    //                      state                      //
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

    //                  event handler                   //
    const onContentsChangeHandler = (value: string) => {
        if (value.length > 1000) return;
        setQnaContents(value);
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

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setQnaImageUrl(imageUrl);
        }
    };

    const onCategoryChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setQnaCategory(event.target.value);
    };

    //                    effect                       //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole, navigator]);

    //                      render                      //
    return (
        <div>
            <h1>문의 작성하기</h1>
            <select onChange={onCategoryChangeHandler} value={qnaCategory}>
                <option value="">카테고리 선택</option>
                <option value="general">일반</option>
                <option value="technical">기술</option>
                {/* 카테고리 옵션 추가 */}
            </select>
            {/* QuillEditor 컴포넌트 사용 */}
            <QuillEditor 
                value={qnaContents} 
                onChange={onContentsChangeHandler} 
            />
            <input type="file" onChange={onFileChangeHandler} />
            <button onClick={onPostButtonClickHandler}>제출하기</button>
        </div>
    );
}
