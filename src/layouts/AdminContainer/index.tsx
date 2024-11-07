import { Outlet, useLocation } from 'react-router';
import './style.css';
import { useEffect, useState } from 'react';
import { ADMIN_COUPON_LIST_ABSOLUTE_PATH, ADMIN_ORDER_LIST_ABSOLUTE_PATH, ADMIN_PRODUCT_LIST_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH } from 'src/constant';

type Path = '회원관리' | '상품관리' | '주문관리' |  '쿠폰관리' | '';
interface Props {
    path: Path;
}

//                    component                    //
function Top () {

    //                    render                        //
    return (
        <div className='page-title-outside'>
            <div className='page-big-title'>회원관리</div>
        </div>
    )
}


//                    component                    //
function SideBar ({ path } : Props) {

    //                    render                        //
    return (
        <div className='admin-select'>
            <div className='admin-container'>
                <div className='admin-navigator'>회원관리</div>
                <div className='admin-navigator'>상품관리</div>
                <div className='admin-navigator'>주문관리</div>
                <div className='admin-navigator'>후기관리</div>
                <div className='admin-navigator'>쿠폰관리</div>
            </div>
        </div>
    );
}

//                    component                    //
export default function AdminContainer() {

    //                      state                      //
    const { pathname } = useLocation();
    const [path, setPath] = useState<Path>('');

    //                    effect                       //
    useEffect(() => {
        const path =
            pathname.startsWith(ADMIN_USER_LIST_ABSOLUTE_PATH) ? '회원관리' :
            pathname.startsWith(ADMIN_PRODUCT_LIST_ABSOLUTE_PATH) ? '상품관리' :
            pathname.startsWith(ADMIN_ORDER_LIST_ABSOLUTE_PATH) ? '주문관리' :
            pathname.startsWith(ADMIN_COUPON_LIST_ABSOLUTE_PATH) ? '쿠폰관리' : '';

        setPath(path);
    }, [pathname]);

    //                    render                        //
    return (
        <div id='admin-wrapper'>
            <Top />
            <SideBar path={path} />
            <div className='admin-main'>
                <Outlet />
            </div>
        </div>
    );
}
