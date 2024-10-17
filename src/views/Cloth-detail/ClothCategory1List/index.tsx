import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBestClothDetailCategory1ListRequest, getClothDetailCategory1ListRequest, getClothDetailListRequest } from "src/apis/clothDetail";
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
    const [bestClothDetailList, setBestClothDetailList] = useState<ClothDetailListItem[]>([]);
    const [clothDetailList, setClothDetailList] = useState<ClothDetailListItem[]>([]);
    // 현재 화면에 보여지는 리스트
    const [currentItems1, setCurrentItems1] = useState<ClothDetailListItem[]>([]);
    // 처음에는 16개만 표시
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    const { clothCategory1 } = useParams();
    // const [clothCategory1, setClothCategory1] = useState<string>('');

    // best 슬라이드 관리
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentItems2, setCurrentItems2] = useState<ClothDetailListItem[]>([]);

    const navigator = useNavigate();

    const clothDetailCategory1ListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') return;

        const { clothDetailList: fetchedClothDetailList } = result as GetClothDetailListResponseDto;
        if (Array.isArray(fetchedClothDetailList)) {
            setClothDetailList(fetchedClothDetailList); // 상태 업데이트
            setCurrentItems1(fetchedClothDetailList.slice(0, itemsToShow)); // 초기 화면에 보여줄 아이템 설정
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getBestClothDetailCategory1ListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothDetailList } = result as GetClothDetailListResponseDto;

        if (Array.isArray(clothDetailList)) {
            setBestClothDetailList(clothDetailList);
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    //                event handler                    //
    const onListClickHandler = (category1: string) => {
        // navigator(CLOTH_DETAIL_LIST_ABSOLUTE_PATH(category1));
    }
    
    const handleLoadMore = () => {
        const newItemsToShow = itemsToShow + 16; // 더보기 클릭 시 16개씩 추가
        setItemsToShow(newItemsToShow);
        setCurrentItems1(clothDetailList.slice(0, newItemsToShow)); // 새로운 아이템 설정
    };


    useEffect(() => {
        if(!clothCategory1) return;
        getClothDetailCategory1ListRequest(clothCategory1).then(clothDetailCategory1ListResponse);
        getBestClothDetailCategory1ListRequest(clothCategory1).then(getBestClothDetailCategory1ListResponse);
    }, [clothCategory1]);

    // 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                (prevIndex + 1) % bestClothDetailList.length
            );
        }, 3000); // 3초마다 슬라이드

        return () => clearInterval(interval); // Clean up
    }, [bestClothDetailList]);

    useEffect(() => {
        // 슬라이드로 현재 4개의 아이템을 표시
        const visibleItems = bestClothDetailList.slice(currentIndex, currentIndex + 4);
        if (visibleItems.length < 4) {
            visibleItems.push(...bestClothDetailList.slice(0, 4 - visibleItems.length)); // 리스트 끝에 도달하면 처음부터 가져옴
        }
        setCurrentItems2(visibleItems);
    }, [currentIndex, bestClothDetailList]);

    //                  render                  //
    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title'>{clothCategory1}</div>
            </div>
            <div className='cloth-detail-list-container'>
                <div className='best-cloth-detail-list'>
                    <div className='best-cloth-detail-list-title'>best Item</div>
                    <div className='cloth-detail-list-wrap'>
                        {currentItems2.map(item => <ListItem key={item.clothDetailName} {...item} />)}
                    </div>
                </div>

                <div className='cloth-detail-list-category2'>
                    { clothCategory1 === 'TOP' &&
                        <div className='cloth-detail-list-category2-title'>
                            <div>전체</div>
                            <div>티셔츠</div>
                            <div>셔츠/블라우스</div>
                            <div>니트</div>
                            <div>맨투맨/후드</div>
                            <div>슬리브리스</div>
                        </div>
                    }
                    { clothCategory1 === 'BOTTOM' &&
                        <div className='cloth-detail-list-category2-title'>
                            <div>전체</div>
                            <div>데님</div>
                            <div>슬랙스</div>
                            <div>트레이닝팬츠</div>
                            <div>쇼츠</div>
                        </div>
                    }
                    { clothCategory1 === 'OUTER' &&
                        <div className='cloth-detail-list-category2-title'>
                            <div>전체</div>
                            <div>자켓</div>
                            <div>점퍼</div>
                            <div>가디건</div>
                            <div>코트</div>
                        </div>
                    }
                    { clothCategory1 === 'ACC' &&
                        <div className='cloth-detail-list-category2-title'>
                            <div>전체</div>
                            <div>악세서리</div>
                            <div>슈즈</div>
                            <div>가방</div>
                            <div>etc</div>
                        </div>
                    }
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className='cloth-detail-list-wrap'>
                    {currentItems1.map(item => <ListItem key={item.clothDetailName} {...item} />)}
                </div>
                {currentItems1.length < clothDetailList.length && (
                <div className='board-button' onClick={handleLoadMore}>
                    더보기
                </div>
                )}
            </div>
        </div>
    )
}
