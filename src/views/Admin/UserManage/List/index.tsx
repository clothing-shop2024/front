import { UserListItem } from 'src/types';
import './style.css';
import { useLocation, useNavigate } from 'react-router';
import useUserStore from 'src/stores/user.store';
import { useCookies } from 'react-cookie';
import { usePagination } from 'src/hooks';
import { ADMIN_USER_DETAIL_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { GetAdminUserListResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useEffect, useState } from 'react';
import { getUserAscListRequest, getUserGradeSearchListRequest, getUserIdSearchListRequest, getUserListRequest, getUserNameSearchListRequest } from 'src/apis/user';

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
    const onClickHandler = () => navigator(ADMIN_USER_DETAIL_ABSOLUTE_PATH(nickname));

    //                     render                       //
    return (
        <div className='list-table-tr user' onClick={onClickHandler}>
            <div className='user-list-table-number'>{index + 1}</div>
            <div className='user-list-table-user-id'>{userId}</div>
            <div className='user-list-table-user-name'>{userName}</div>
            <div className='user-list-table-nickname'>{nickname}</div>
            <div className='user-list-table-email'>{userEmail}</div>
            <div className='user-list-table-grade'>{grade}</div>
            <div className='user-list-table-points'>{points}</div>
            <div className='user-list-table-joindate'>
                { joinDate && joinDate.length >= 8 
                    ? `${joinDate.slice(0, 4)}-${joinDate.slice(4, 6)}-${joinDate.slice(6, 8)}`
                    : joinDate
                }
            </div>
        </div>
    );
};

//                    component                    //
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

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearchWord = queryParams.get('search') || '';
    const [searchWord, setSearchWord] = useState<string>(initialSearchWord);
    const [searchType, setSearchType] = useState<string>('ID');

    //                    function                     //
    const navigator = useNavigate();

    const getUserListResponse = (result: GetAdminUserListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(MAIN_ABSOLUTE_PATH);
        }

        const { userList } = result as GetAdminUserListResponseDto;
        changeBoardList(userList);

        setCurrentPage(!userList.length ? 0 : 1);
        setCurrentSection(!userList.length ? 0 : 1);

    }

    const getSearchUserListResponse = (result: GetAdminUserListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            // if (result?.code === 'AF') navigator (MAIN_PATH);
            return;
        }

        const { userList } = result as GetAdminUserListResponseDto;
        changeBoardList(userList);
        setCurrentPage(!userList.length ? 0 : 1);
        setCurrentSection(!userList.length ? 0 : 1);

    };

    //                event handler                    //
    const onSearchClickHandler = () => {
        if (!searchWord) {
            alert('검색어를 입력하세요');
            return;
        }

        if (searchType === 'ID') {
            navigator(ADMIN_USER_LIST_ABSOLUTE_PATH + `?id=${searchWord}`);
            getUserIdSearchListRequest(cookies.accessToken, searchWord).then(getSearchUserListResponse);
        } else if (searchType === 'NAME') {
            navigator(ADMIN_USER_LIST_ABSOLUTE_PATH + `?name=${searchWord}`);
            getUserNameSearchListRequest(cookies.accessToken, searchWord).then(getSearchUserListResponse);
        } else if (searchType === 'GRADE') {
            navigator(ADMIN_USER_LIST_ABSOLUTE_PATH + `?grade=${searchWord}`);
            getUserGradeSearchListRequest(cookies.accessToken, searchWord).then(getSearchUserListResponse);
        } else {
            alert('잘못된 검색 유형입니다.');
            return;
        }
    }

    const onJoinDateDescClickHandler = () => {
        getUserListRequest(cookies.accessToken).then(getUserListResponse);
    }

    const onJoinDateAscClickHandler = () => {
        getUserAscListRequest(cookies.accessToken).then(getUserListResponse);
    }

    //                    effect                       //
    useEffect (() => {
        getUserListRequest(cookies.accessToken).then(getUserListResponse);
    }, []);

    //                  render                  //
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <div>
            <div className='user-list-table-search-box'>
                <select
                    className='user-list-select-box'
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="ID">ID</option>
                    <option value="NAME">NAME</option>
                    <option value="GRADE">GRADE</option>
                </select>
                <div className='list-table-search-input-box'>
                        <input 
                            className='list-table-search-input'
                            placeholder='검색어를 입력하세요.'
                            value={searchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        />
                </div>
                <div className={searchButtonClass} onClick={onSearchClickHandler}>검색</div>
            </div>
            <div className='user-list-table-top'>
                <div className='list-table-top'>
                    <div className='list-table-total-board'>전체<span className='emphasis'> {totalLength}건</span> | 페이지<span className='emphasis'> {currentPage} / {totalPage}</span>
                    </div>
                </div>
                <div className='user-list-filter'>
                    <div onClick={onJoinDateDescClickHandler}>신규 회원</div>
                    <div onClick={onJoinDateAscClickHandler}>오래된 회원</div>
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
                    <div className='user-list-table-joindate'>JOINDATE</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} />)}
            </div>
            <div className='list-table-pagenation'>
                <div className='list-table-page-left' onClick={onPreSectionClickHandler}></div>
                <div className='list-table-page-box'>
                    {pageList.map(page => 
                        page === currentPage ?
                        <div className='list-table-page-active' key={page}>{page}</div> :
                        <div className='list-table-page' onClick={() => onPageClickHandler(page)} key={page}>{page}</div>
                    )}
                </div>
                <div className='list-table-page-right' onClick={onNextSectionClickHandler}></div>
            </div>
        </div>
    )
}
