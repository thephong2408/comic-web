import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';
import { API } from '~/API';

const cx = classNames.bind(styles);

//Lấy ra API

function Nav() {
    const [posts, setPosts] = useState([]);
    // Lấy API
    useEffect(() => {
        setPosts(API);
    }, []);

    const allGenres = Array.from(new Set(posts.flatMap((post) => post.theloai)));

    //folollow
    const [isTheodoi, setIsTheodoi] = useState(false);
    const [ishome, setIsHome] = useState(false);
    //hot
    const [ishot, setHot] = useState(false);
    // lịch sử
    const [ishistory, setHistory] = useState(false);
    //tìm kiếm
    const [istimkiem, setTimkiem] = useState(false);
    // Hàm xử lý sự kiện khi button được foww

    // Sử dụng useEffect để theo dõi thay đổi của URL
    const location = useLocation(); // Hook to get current location
    const currentUrl = location.pathname; // Get the current URL
    const parts = currentUrl.split('/');
    const titlePart = parts.pop();
    useEffect(() => {
        setIsHome(titlePart === '');
        setIsTheodoi(titlePart === 'theodoi');
        setHot(titlePart === 'hot');
        setHistory(titlePart === 'lichsu');
        setTimkiem(titlePart === 'chonloc');
    }, [currentUrl]);

    const [showCategory, setShowCategory] = useState(false);

    const handleMouseEnterCategory = () => {
        setShowCategory(true);
    };

    const handleMouseLeaveCategory = () => {
        setShowCategory(false);
    };

    // kích thước màn hình
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 789);
        };

        // Kiểm tra kích thước màn hình khi component được mount
        handleResize();

        // Thêm event listener để theo dõi kích thước màn hình
        window.addEventListener('resize', handleResize);

        // Cleanup event listener khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={cx('container1')}>
            <div className={cx('nav')}>
                <nav className={cx('navbar')}>
                    <Link to="/">
                        <li className={cx({ 'onclick-btn': ishome, nav_li: !ishome }, 'home')}>
                            <FontAwesomeIcon icon={faHouse} />
                        </li>
                    </Link>
                    <Link to="/hot">
                        <li id="hot" className={cx({ 'onclick-btn': ishot, nav_li: !ishot })}>
                            HOT
                        </li>
                    </Link>
                    <Link to="/theodoi">
                        <li id="theodoi" className={cx({ 'onclick-btn': isTheodoi, nav_li: !isTheodoi })}>
                            THEO DÕI
                        </li>
                    </Link>
                    <Link to="/lichsu">
                        <li className={cx({ 'onclick-btn': ishistory, nav_li: !ishistory })}>LỊCH SỬ</li>
                    </Link>
                    {isDesktop && (
                        <li
                            id="theloai"
                            className={cx('nav_li', 'category-li', 'theloai')}
                            onMouseEnter={handleMouseEnterCategory}
                            onMouseLeave={handleMouseLeaveCategory}
                        >
                            THỂ LOẠI
                            {showCategory && (
                                <div className={cx('div-category')}>
                                    <nav className={cx('nav1')}>
                                        {allGenres.map((genre, index) => (
                                            <Link to={`/${genre}`} key={index}>
                                                <li className={cx('list')}>{genre}</li>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </li>
                    )}
                    {/* <li
                        className={cx('nav_li', 'category-li', 'rank-li')}
                        onMouseEnter={handleMouseEnterRank}
                        onMouseLeave={handleMouseLeaveRank}
                    >
                        XẾP HẠNG
                        {showRank && (
                            <div className={cx('div-rank')}>
                                <nav className={cx('nav1')}>
                                    <ul>
                                        <li className={cx('list')}>Thể Loại</li>
                                    </ul>
                                    <ul>
                                        <li className={cx('list')}>Thể Loại</li>
                                    </ul>
                                    <ul>
                                        <li className={cx('list')}>Thể Loại</li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </li> */}
                    {isDesktop && (
                        <Link to="/chonloc">
                            <li
                                id="timtruyen"
                                className={cx({ 'onclick-btn': istimkiem, nav_li: !istimkiem }, 'timtruyen')}
                            >
                                TÌM TRUYỆN
                            </li>
                        </Link>
                    )}
                    {/* <li className={cx('girl', 'nav_li')}>
                            <a href="/">CON GÁI</a>
                        </li>
                        <li className={cx('men', 'nav_li')}>
                            <a href="/">CON TRAI</a>
                        </li> */}
                </nav>
            </div>
        </div>
    );
}

export default Nav;
