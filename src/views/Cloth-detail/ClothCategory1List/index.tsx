import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getClothDetailCategory1ListRequest, getClothDetailListRequest } from "src/apis/clothDetail";
import { GetClothDetailListResponseDto } from "src/apis/clothDetail/dto/response";
import ResponseDto from "src/apis/response.dto";
import { CLOTH_DETAIL_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from "src/constant";
import { ClothDetailListItem } from "src/types";
import './style.css';

//                    component                    //
function ListItem (props: ClothDetailListItem) {

    //                   function                 //
    const {
        clothDetailName,
        clothImage1,
        price,
        discountPrice,
        ratingAvg
    } = props;

    //                  render                  //
    return (
        <>
            <div className='cloth-detail-list'>
                <div className='cloth-detail-image'>
                    <img src={clothImage1} />
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
export default function ClothDetailList() {

    //                      state                      //
    const [clothDetailList, setClothDetailList] = useState<ClothDetailListItem[]>([]);
    // 현재 화면에 보여지는 리스트
    const [currentItems, setCurrentItems] = useState<ClothDetailListItem[]>([]);
    // 처음에는 16개만 표시
    const [itemsToShow, setItemsToShow] = useState<number>(5);
    const { clothCategory1 } = useParams();
    // const [clothCategory1, setClothCategory1] = useState<string>('');

    const navigator = useNavigate();

    const clothDetailListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') return;

        const { clothDetailList: fetchedClothDetailList } = result as GetClothDetailListResponseDto;
        if (Array.isArray(fetchedClothDetailList)) {
            setClothDetailList(fetchedClothDetailList); // 상태 업데이트
            setCurrentItems(fetchedClothDetailList.slice(0, itemsToShow)); // 초기 화면에 보여줄 아이템 설정
        } else {
            console.error("Fetched cloth detail list is not an array");
        }

    };

    useEffect(() => {
        if (!clothCategory1) return;
        getClothDetailCategory1ListRequest(clothCategory1).then(clothDetailListResponse);
        
    }, []);

    const handleLoadMore = () => {
        const newItemsToShow = itemsToShow + 16; // 더보기 클릭 시 16개씩 추가
        setItemsToShow(newItemsToShow);
        setCurrentItems(clothDetailList.slice(0, newItemsToShow)); // 새로운 아이템 설정
    };

    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title'>CLOTH</div>
            </div>
            <div>
                <div className='cloth-detail-list-category1-title'>{clothCategory1}</div>
                <div className='cloth-detail-list-category2'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className='cloth-detail-list-wrap'>
                    {currentItems.map(item => <ListItem key={item.clothDetailName} {...item} />)}
                </div>
                {currentItems.length < clothDetailList.length && (
                <div className='board-button' onClick={handleLoadMore}>
                    더보기
                </div>
                )}
            </div>
        </div>
    )
}
