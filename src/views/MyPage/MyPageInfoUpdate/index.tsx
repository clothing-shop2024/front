import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { GetMyInfoResponseDto } from "src/apis/user/dto/response";
import { MAIN_ABSOLUTE_PATH } from "src/constant";
import "./style.css";

// component : 마이페이지 //
export default function MyPageInfoUpdate() {

  // state //
  const [cookies] = useCookies();
  const [userRole, setUserRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userBirthDay, setUserBirthDay] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');


  // function //
  const navigator = useNavigate();

  const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
    const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        alert(message);

        if (result?.code === 'AF') {
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        };
        
        return;
    };

    const { userId, userName, nickname, userEmail, userAddress, userBirthDay, joinDate } = result as GetMyInfoResponseDto;
    
};

  return (
    <div>회원정보 수정페이지</div>
  )
}
