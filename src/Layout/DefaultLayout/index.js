import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

// import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Swiper1 from './Swiper';

import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import Nav from './Nav';
import ButtonTop from '~/Button/ButtonTop';
import Comment from '~/Pages/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('div-container')}>
                <Nav />
                <div className={cx('warning')}>
                    <button>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                    <span>không truy cập web giả mạo để tránh mất tài khoản</span>
                </div>
                <div className={cx('wrapper-container')}>
                    <ButtonTop />
                    <Swiper1 />
                </div>
                <div className={cx('container')}>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                    <div className={cx('content')}>{children}</div>
                </div>
                <div className={cx('footer')}>
                    <Comment />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
