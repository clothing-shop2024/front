

import { UserListItem } from 'src/types';
import './style.css';
import { useNavigate } from 'react-router';
import useUserStore from 'src/stores/user.store';
import { useCookies } from 'react-cookie';
import { usePagination } from 'src/hooks';
import { COUNT_PER_PAGE, COUNT_PER_SECTION } from 'src/constant';
import { GetAdminUserListResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useEffect } from 'react';
import { getUserListRequest } from 'src/apis/user';

//                    component                    //
function ListItem ({
    index,
    userId,
    userName,
    nickname,
    userEmail,
    joinDate,
    grade,
    points
}:UserListItem & { index: number }) {

    //                    function                     //
    const navigator = useNavigate();

    //                event handler                    //

    //                    render                       //
    return (
        <div className='list-table-tr user'>
            <div className='user-list-table-number'>{index + 1}</div>
            <div className='user-list-table-user-id'>{userId}</div>
            <div className='user-list-table-user-name'>{userName}</div>
            <div className='user-list-table-nickname'>{nickname}</div>
            <div className='user-list-table-email'>{userEmail}</div>
            <div className='user-list-table-grade'>{grade}</div>
            <div className='user-list-table-points'>{points}</div>
            <div className='user-list-table-joindate'>{joinDate}</div>
        </div>
    );
};

export default function UserManageList() {

    //                      state                      //
    const {loginUserRole} = useUserStore();

    const [cookies] = useCookies();

    const {
        viewList,
        pageList,
        totalPage,
        currentPage,
        totalLength,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<UserListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    //                    function                     //
    const navigator = useNavigate();

    const getUserListResponse = (result: GetAdminUserListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { userList } = result as GetAdminUserListResponseDto;
        changeBoardList(userList);

        setCurrentPage(!userList.length ? 0 : 1);
        setCurrentSection(!userList.length ? 0 : 1);

    }

    //                event handler                    //

    //                    effect                       //
    useEffect (() => {
        getUserListRequest(cookies.accessToken).then(getUserListResponse);
    }, []);

    return (
        <div>
            <div className='list-table-search-box'>
                <div className='list-table-search-input-box'>
                    <input className='list-table-search-input' placeholder='검색어를 입력하세요.'/>
                </div>
                <div>검색</div>
            </div>
            <div>
                <div className='list-table-top'>
                    <div className='list-table-total-board'>전체<span className='emphasis'> 건</span> | 페이지<span className='emphasis'>  / </span>
                    </div>
                </div>
                <div>
                    <div>신규 회원</div>
                    <div>오래된 회원</div>
                    <div>주문순</div>
                </div>
            </div>
            <div className='list-table'>
                <div className='list-table-th user'>
                    <div className='user-list-table-number'>NO</div>
                    <div className='user-list-table-user-id'>ID</div>
                    <div className='user-list-table-user-name'>NAME</div>
                    <div className='user-list-table-nickname'>NICKNAME</div>
                    <div className='user-list-table-email'>EMAIL</div>
                    <div className='user-list-table-grade'>GRADE</div>
                    <div className='user-list-table-points'>POINT</div>
                    <div className='user-list-table-join-date'>JOINDATE</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} />)}
            </div>
        </div>
    )
}
