import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { getSignInUserRequest } from "src/apis/user";
import { GetMyInfoResponseDto, GetSignInUserResponseDto } from "src/apis/user/dto/response";
import { CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH, COUNT_CLOTH_LIST_PAGE, COUNT_PER_SECTION, GET_CLOTH_CATEGORY1_LIST_URL, ITEM_PER_PAGE1, MAIN_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import "./style.css";
import { ClothListItem } from "src/types";
import { usePagination } from "src/hooks";
import { GetClothListResponseDto } from "src/apis/cloth/dto/response";
import { getBestClothListRequest, getClothCategory1ListRequest, getClothListRequest } from "src/apis/cloth";

//                    component                    //
function ListItem(props: ClothListItem) {

    //                   state                   //
    const {
        clothName,
        price,
        discountPrice,
        ratingAvg,
        clothImageNumber,
        clothMainImage
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
                    <img style={{ width: '230px', height: '180px'}} src={clothMainImage} />
                </div>
                <div className='cloth-detail-bottom'>
                    <div className='cloth-detail-name'>{clothName}</div>
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

    const [curSlide, setCurSlide] = useState(0);
    const [intervalId] = useState<number | null>(null);
    const { setLoginUserId, setLoginUserRole } = useUserStore();

    const startIndex = currentPage * ITEM_PER_PAGE1;
    const endIndex = startIndex + ITEM_PER_PAGE1;

    const trainCompartment = ['', '', '', '', ''];
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = trainCompartment.length - 1;
    const MOVE_SLIDE_INDEX = 1;
    
    const [clothList, setClothList] = useState<ClothListItem[]>([]);
    const [bestItemsToShow, setBestItemsToShow] = useState<number>(8);
    const [newItemsToShow, setNewItemsToShow] = useState<number>(8);
    const [bestItems, setBestItems] = useState<ClothListItem[]>([]);
    const [newItems, setNewItems] = useState<ClothListItem[]>([]);

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

    const getBestClothListResponse = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;
        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setBestItems(clothList.slice(0, bestItemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getNewClothListResponse = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;
        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setNewItems(clothList.slice(0, newItemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    //                event handler                    //
    const bestHandleLoadMore = () => {
        const currentBestItemsToShow = Math.min(bestItemsToShow + 8, 40); // 8개씩 추가, 총 최대 40개까지
        setBestItemsToShow(currentBestItemsToShow);
        setBestItems(clothList.slice(0, currentBestItemsToShow)); // BEST ITEM 리스트 업데이트
    };
    
    const newHandleLoadMore = () => {
        const currentNewItemsToShow = Math.min(newItemsToShow + 8, 40); // 8개씩 추가, 총 최대 40개까지
        setNewItemsToShow(currentNewItemsToShow);
        setNewItems(clothList.slice(0, currentNewItemsToShow)); // NEW ITEM 리스트 업데이트
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
        getBestClothListRequest().then(getBestClothListResponse);
        getClothListRequest().then(getNewClothListResponse);
    }, []);

    //                  render                  //
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
                        {bestItems.map(item => <ListItem key={item.clothName} {...item} />)}
                    </div>
                </div>
                    {bestItemsToShow < 40 && bestItems.length < clothList.length && (
                        <div className='board-button' onClick={bestHandleLoadMore}>
                            MORE+
                        </div>
                    )}

                <div className='best-cloth-detail-list-title'>NEW ITEM</div>
                <div>
                    <div className='best-cloth-detail-list-wrap'>
                        {newItems.map(item => <ListItem key={item.clothName} {...item} />)}
                    </div>
                </div>
                    {newItemsToShow < 40 && newItems.length < clothList.length && (
                        <div className='board-button' onClick={newHandleLoadMore}>
                            MORE+
                        </div>
                    )}
            </div>
            
            
        </div>
    );
}
