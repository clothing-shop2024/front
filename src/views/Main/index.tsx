import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { getSignInUserRequest } from "src/apis/user";
import { GetMyInfoResponseDto, GetSignInUserResponseDto } from "src/apis/user/dto/response";
import { ITEM_PER_PAGE1, MAIN_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import "./style.css";
import { ClothDetailListItem } from "src/types";

//                    component                    //
function ListItem(props: ClothDetailListItem) {

    //                   state                   //
    const {
        clothDetailNumber,
        clothDetailName,
        price,
        discountPrice,
        ratingAvg,
        clothImage1
    } = props;

    //                   function                 //
    const navigator = useNavigate();

    //                  event handler                   //
    // const onClickHandler = ()

    //                  render                  //
    return (
        <>
            <div></div>
        </>
    );

};

export default function Main() {

    // state //
    const [cookies] = useCookies();
    const [searchWord] = useState<string>('');
    const [curSlide, setCurSlide] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [intervalId] = useState<number | null>(null);
    const { setLoginUserId, setLoginUserRole } = useUserStore();
    // const [noticeList, SetNoticeList] = useState<NoticeListItem[]>([]);

    const startIndex = currentPage * ITEM_PER_PAGE1;
    const endIndex = startIndex + ITEM_PER_PAGE1;
    // const totalPages = Math.ceil(noticeList.length / ITEM_PER_PAGE1);

    const trainCompartment = ['', '', '', '', ''];
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = trainCompartment.length - 1;
    const MOVE_SLIDE_INDEX = 1;

    // function // 
    const navigation = useNavigate();

    const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') {
            return;
        }

        const { userId, userRole } = result as GetMyInfoResponseDto;
        setLoginUserId(userId);
        setLoginUserRole(userRole);
    };

    const autoMoveSlide = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }

        const id = setInterval(() => {
            setCurSlide((prevState) =>
                prevState < LAST_SLIDE_INDEX
                    ? prevState + MOVE_SLIDE_INDEX
                    : FIRST_SLIDE_INDEX
            );
        }, 3000)
    };

    //  event handler //

    // effect //
    useEffect(() => {
        if (!cookies.accessToken) {
            navigation(MAIN_ABSOLUTE_PATH);
            return;
        }

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
    }, []);

    let effectFlag1 = false;
    useEffect(() => {
        if (effectFlag1) return;
        effectFlag1 = true;

    }, []);

    useState(() => {
        autoMoveSlide();
    },);

    // render //
    return (
        <div className='main-banner' >
            <div className='main-show'>
                {
                    trainCompartment.map((index) => (
                        <div
                            className='compartment'
                            key={index}
                            style={{
                                transform: `translateX(${-100 * curSlide}%)`,
                                transition: 'all 0.4s ease-in-out',
                            }}
                        >
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
