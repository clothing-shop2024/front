import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { getSignInUserRequest } from "src/apis/user";
import { GetMyInfoResponseDto, GetSignInUserResponseDto } from "src/apis/user/dto/response";
import { CLOTH_DETAIL_CATEGORY1_LIST_ABSOLUTE_PATH, COUNT_CLOTH_LIST_PAGE, COUNT_PER_SECTION, GET_CLOTH_DETAIL_CATEGORY1_LIST_URL, ITEM_PER_PAGE1, MAIN_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import "./style.css";
import { ClothDetailListItem } from "src/types";
import { usePagination } from "src/hooks";
import { GetBestClothDetailListResponseDto, GetClothDetailListResponseDto } from "src/apis/clothDetail/dto/response";
import { getBestClothDetailListRequest, getClothDetailCategory1ListRequest } from "src/apis/clothDetail";

//                    component                    //
function ListItem(props: ClothDetailListItem) {

    //                   state                   //
    const {
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
            <div className='cloth-detail-list'>
                <div className='cloth-detail-image'>
                    <img style={{ width: '180%', height: '150%'}} src={clothImage1} />
                </div>
                <div className='cloth-detail-bottom'>
                    <div className='cloth-detail-name'>{clothDetailName}</div>
                    <div className='cloth-detail-all-price'>
                        <div className='cloth-detail-price'>{price}</div>
                        <div className='cloth-detail-discount-price'>{discountPrice}</div>
                    </div>
                    <div className='cloth-detail-rating-avg'>{ratingAvg}</div>
                </div>
            </div>
        </>
    );

};

//                    component                    //
export default function Main() {

    //                   state                   //
    const [cookies] = useCookies();

    const [currentPage, setCurrentPage] = useState(0);

    const [searchWord] = useState<string>('');
    const [curSlide, setCurSlide] = useState(0);
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
    
    // best cloth slide
    const [clothDetailList, setClothDetailList] = useState<ClothDetailListItem[]>([]);
    const [currentItems, setCurrentItems] = useState<ClothDetailListItem[]>([]);
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    const ITEMS_PER_SLIDE = 4;
    const TOTAL_CLOTH_ITEMS = 8;

    // clothCategory
    const [clothCategory1, setClothCategory1] = useState<string>('');
    const outerCategory1 = "OUTER";
    const topCategory1 = "TOP";
    const bottomCategory1 = "BOTTOM";
    const opsCategory1 = "OPS/SK";
    const accCategory1 = "ACC";

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

    const getbestClothDetailListResponse = (result: GetBestClothDetailListResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') return;

        const { clothDetailList } = result as GetBestClothDetailListResponseDto;


        if (Array.isArray(clothDetailList)) {
            setClothDetailList(clothDetailList);
            setCurrentItems(clothDetailList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }

    };

    const getClothDetailCategory1ListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') return;

        const { clothDetailList } = result as GetClothDetailListResponseDto;


        if (Array.isArray(clothDetailList)) {
            setClothDetailList(clothDetailList);
            setCurrentItems(clothDetailList.slice(0, 40));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }

    };

    //  event handler //
    const onCategoryClickHandler = (category1: string) => {
        setClothCategory1(category1);
        getClothDetailCategory1ListRequest(category1).then(getClothDetailCategory1ListResponse);
        navigation(CLOTH_DETAIL_CATEGORY1_LIST_ABSOLUTE_PATH(category1));
    };

    const handleLoadMore = () => {
        const newItemsToShow = Math.min(itemsToShow + 8, 40); // 더보기 클릭 시 8개씩 추가, 총 100개
        setItemsToShow(newItemsToShow);
        setCurrentItems(clothDetailList.slice(0, newItemsToShow)); // 새로운 아이템 설정
    };

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

    useEffect(() => {
        getBestClothDetailListRequest().then(getbestClothDetailListResponse);
    }, []);

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
            <div className='cloth-detail-list-container'>
                <div className='best-cloth-detail-list-title'>BEST ITEM</div>
                <div>
                    <div className='best-cloth-detail-list-wrap'>
                        {currentItems.map(item => <ListItem key={item.clothDetailName} {...item} />)}
                    </div>
                </div>
                {itemsToShow < 40 && currentItems.length < clothDetailList.length && (
                    <div className='board-button' onClick={handleLoadMore}>
                        MORE+
                    </div>
                )}

                <div className='cloth-detail-category1-select'>
                    <div className='cloth-detail-category1' onClick={() => onCategoryClickHandler(outerCategory1)}>OUTER</div>
                    <div className='cloth-detail-category1' onClick={() => onCategoryClickHandler(topCategory1)}>TOP</div>
                    <div className='cloth-detail-category1' onClick={() => onCategoryClickHandler(bottomCategory1)}>BOTTOM</div>
                    <div className='cloth-detail-category1' onClick={() => onCategoryClickHandler(opsCategory1)}>OPS/SK</div>
                    <div className='cloth-detail-category1' onClick={() => onCategoryClickHandler(accCategory1)}>ACC</div>
                </div>
            </div>
            
            
        </div>
    );
}
