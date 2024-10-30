import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBestClothDetailCategory1ListRequest, getClothDetailCategory1ListRequest, getClothDetailCategory2ListRequest, getClothDetailListRequest, getPriceAscClothDetailCategory1ListRequest, getPriceDescClothDetailCategory1ListRequest } from "src/apis/clothDetail";
import { GetClothDetailListResponseDto } from "src/apis/clothDetail/dto/response";
import ResponseDto from "src/apis/response.dto";
import { CLOTH_DETAIL_CATEGORY1_LIST_ABSOLUTE_PATH, CLOTH_DETAIL_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from "src/constant";
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
                    <img style={{ width: '230px', height: '180px'}} src={clothImage1} />
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

    // 동적 스타일 -> 해당 필터 클릭 시 진하게 표시
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // clothCategory1에 따른 clothCategory2 동적 관리
    const categories = {
        "TOP": ["티셔츠", "셔츠/블라우스", "니트", "맨투맨/후드", "슬리브리스"],
        "BOTTOM": ["데님", "슬랙스", "트레이닝팬츠", "쇼츠"],
        "OUTER": ["자켓", "점퍼", "가디건", "코트"],
        "OPS/SKI": ["원피스", "미니스커트", "미디/롱스커트"],
        "ACC": ["악세서리", "슈즈", "가방", "etc"]
    };
    const selectedCategory2 = categories[clothCategory1 as keyof typeof categories] || [];
    const [clothCategory2, setClothCategory2] = useState<string>('');
    const [activeCategory2, setActiveCategory2] = useState<string | null>(null);

    //                    function                     //
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

    const getPriceAscClothDetailCategory1ListRespone = (result: GetClothDetailListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothDetailList } = result as GetClothDetailListResponseDto;

        if (Array.isArray(clothDetailList)) {
            setClothDetailList(clothDetailList);
            setCurrentItems1(clothDetailList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getPriceDescClothDetailCategory1ListRespone = (result: GetClothDetailListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothDetailList } = result as GetClothDetailListResponseDto;

        if (Array.isArray(clothDetailList)) {
            setClothDetailList(clothDetailList);
            setCurrentItems1(clothDetailList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const clothDetailCategory2ListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '존재하지 않는 카테고리를 선택하셨습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { clothDetailList: fetchedClothDetailList } = result as GetClothDetailListResponseDto;
        if (Array.isArray(fetchedClothDetailList)) {
            setClothDetailList(fetchedClothDetailList); // 상태 업데이트
            setCurrentItems1(fetchedClothDetailList.slice(0, itemsToShow)); // 초기 화면에 보여줄 아이템 설정
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    //                event handler                    //
    const onPriceAscClickHandler = (category1: string) => {
        if (!clothCategory1) return;
        setItemsToShow(8);
        setActiveFilter('asc');
        getPriceAscClothDetailCategory1ListRequest(clothCategory1).then(getPriceAscClothDetailCategory1ListRespone);
    }
    
    const onPriceDescClickHandler = (category1: string) => {
        if (!clothCategory1) return;
        setItemsToShow(8);
        setActiveFilter('desc');
        getPriceDescClothDetailCategory1ListRequest(clothCategory1).then(getPriceDescClothDetailCategory1ListRespone);
    }

    const onAllCategory2ClickHandler = () => {
        setClothCategory2('');
        setItemsToShow(8);
        setActiveCategory2(null);
        getClothDetailCategory1ListRequest(clothCategory1!).then(clothDetailCategory1ListResponse);
    }

    const onCategory2ClickHandler = (selectedCategory2: string) => {
        setItemsToShow(8);
        setClothCategory2(selectedCategory2);
        setActiveCategory2(selectedCategory2);
    };
    
    const handleLoadMore = () => {
        const newItemsToShow = itemsToShow + 8;
        setItemsToShow(newItemsToShow);
        setCurrentItems1(clothDetailList.slice(0, newItemsToShow)); // 새로운 아이템 설정
    };

    useEffect(() => {
        setCurrentItems1(clothDetailList.slice(0, itemsToShow));
    }, [clothDetailList, itemsToShow]);

    useEffect(() => {
        if (!clothCategory1) return;
        getClothDetailCategory1ListRequest(clothCategory1).then(clothDetailCategory1ListResponse);
        getBestClothDetailCategory1ListRequest(clothCategory1).then(getBestClothDetailCategory1ListResponse);
    }, [clothCategory1]);

    useEffect(() => {
        if (!clothCategory2) return;
        getClothDetailCategory2ListRequest(clothCategory2).then(clothDetailCategory2ListResponse);
    }, [clothCategory2]);

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
                <div className='page-big-title' onClick={ () => window.location.reload() }>{clothCategory1}</div>
            </div>

            <div className='cloth-detail-list-container'>
                <div className='best-cloth-detail-list'>
                    <div className='best-cloth-detail-list-title'>best Item</div>
                    <div className='cloth-detail-list-wrap'>
                        {currentItems2.map(item => (
                            <ListItem key={item.clothDetailName} {...item} />
                        ))}
                    </div>
                </div>

                <div className='cloth-detail-list-category2'>
                    <div className='cloth-detail-list-category2-title'>
                        <div onClick={onAllCategory2ClickHandler} className={!activeCategory2 ? 'active-filter' : ''}>전체</div>
                        {selectedCategory2.map((category2) => (
                            <div
                                key={category2}
                                onClick={() => onCategory2ClickHandler(category2)}
                                className={activeCategory2 === category2 ? 'active-filter' : ''}
                            >
                                {category2}
                            </div>
                        ))}
                    </div>
                    
                    <div className='cloth-detail-list-filter'>
                        <div 
                            onClick={() => onPriceAscClickHandler(clothCategory1 || '')} 
                            className={activeFilter === 'asc' ? 'active-filter' : ''}
                        >
                            낮은가격
                        </div>
                        <div 
                            onClick={() => onPriceDescClickHandler(clothCategory1 || '')} 
                            className={activeFilter === 'desc' ? 'active-filter' : ''}
                        >
                            높은가격
                        </div>
                        <div>사용후기</div>
                    </div>
                </div>

                <div className='cloth-detail-list-wrap'>
                    {currentItems1.map(item => (
                        <ListItem key={item.clothDetailName} {...item} />
                    ))}
                </div>

                {itemsToShow < clothDetailList.length && (
                    <div className='board-button' onClick={handleLoadMore}>MORE+
                    </div>
                )}
            </div>
        </div>
    )
}
