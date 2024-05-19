import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import styles from './Nav.module.scss';
import { API } from '~/API';

const cx = classNames.bind(styles);

//Lấy ra API

function Nav() {
    const [posts, setPosts] = useState([]);

    const allGenres = posts.reduce((acc, current) => {
        current.theloai.forEach((genre) => {
            if (!acc.includes(genre)) {
                acc.push(genre);
            }
        });
        return acc;
    }, []);

    // Lấy API
    useEffect(() => {
        setPosts(API);
    }, []);

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
    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const titlePart = parts.pop();

        setIsHome(titlePart === '');
        setIsTheodoi(titlePart === 'theodoi');
        setHot(titlePart === 'hot');
        setHistory(titlePart === 'lichsu');
        setTimkiem(titlePart === 'chonloc');
    }, []); // Bỏ trống dependency array để chỉ gọi useEffect khi component mount

    // ẩn hiện div
    // const [showRank, setShowRank] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    const handleMouseEnterCategory = () => {
        setShowCategory(true);
    };

    const handleMouseLeaveCategory = () => {
        setShowCategory(false);
    };

    return (
        <div className={cx('container1')}>
            <div className={cx('nav')}>
                <nav className={cx('navbar')}>
                    <a href="/">
                        <li className={cx({ 'onclick-btn': ishome, nav_li: !ishome }, 'home')}>
                            <FontAwesomeIcon icon={faHouse} />
                        </li>
                    </a>
                    <a href="/hot">
                        <li className={cx({ 'onclick-btn': ishot, nav_li: !ishot })}>HOT</li>
                    </a>
                    <a href="/theodoi">
                        <li className={cx({ 'onclick-btn': isTheodoi, nav_li: !isTheodoi })}>THEO DÕI</li>
                    </a>
                    <a href="/lichsu">
                        <li className={cx({ 'onclick-btn': ishistory, nav_li: !ishistory })}>LỊCH SỬ</li>
                    </a>
                    <li
                        className={cx('nav_li', 'category-li')}
                        onMouseEnter={handleMouseEnterCategory}
                        onMouseLeave={handleMouseLeaveCategory}
                    >
                        THỂ LOẠI
                        {showCategory && (
                            <div className={cx('div-category')}>
                                <nav className={cx('nav1')}>
                                    {allGenres.map((genre, index) => (
                                        <a href={`/${genre}`} key={index}>
                                            <li className={cx('list')}>{genre}</li>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </li>
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

                    <a href="/chonloc">
                        <li className={cx({ 'onclick-btn': istimkiem, nav_li: !istimkiem })}>TÌM TRUYỆN</li>
                    </a>
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
