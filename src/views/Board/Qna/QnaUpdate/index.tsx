import { ChangeEvent, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { GetQnaDetailResponseDto, GetQnaListResponseDto } from "src/apis/board/qna/dto/response";
import ResponseDto from "src/apis/response.dto";
import { QNA_LIST_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";


export default function QnaUpdate() {

    //                      state                      //
    const [cookies] = useCookies();
    const { qnaNumber } = useParams();
    const { loginUserId, loginUserRole } = useUserStore();
    const [qnaWriterId, setQnaWriterId] = useState<string>('');
    const [qnaContents, setQnaContents] = useState<string>('');
    const [qnaCategory, setQnaCategory] = useState<string>('');
    const [qnaImageUrl, setQnaImageUrl] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

        if (loginUserId !== qnaWriterId) {
            alert('작성자가 아니면 볼 수 없습니다.');
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

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

        
    }

    //                      render                      //
    return (
        <div>index</div>
    )
}
