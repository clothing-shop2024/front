import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import ResponseDto from '../../../apis/response.dto';
import { GetMyInfoResponseDto } from '../../../apis/user/dto/response';

// component: 아이디 찾기 //
export default function FindId() {

  // state //
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<string>('');
  const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

  const findIdButtonClass = `${userName && userEmail ? 'primary' : 'disable'}-button full-width`;

  // function //
  const navigator = useNavigate();

  const findIdResponse = (result: ResponseDto | null) => {

    const message = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'NF' ? '사용자 정보가 불일치합니다.' :
      result.code === 'NU' ? '사용자 정보가 없습니다.' : 
      result.code === 'AF' ? '존재하지 않는 이메일 입니다.' :
      result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { userId } = result as GetMyInfoResponseDto;
  }


  return (
    <div>FindId</div>
  )
}
