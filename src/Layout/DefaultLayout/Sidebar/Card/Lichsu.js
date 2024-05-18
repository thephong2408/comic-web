import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faHeart,
    faComment,
    faEye,
    faCircleChevronRight,
    faCircleChevronLeft,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { API } from '~/API';

const cx = classNames.bind(styles);

function Lichsu() {
    // lịch sử
    const [lichsu, setlichsu] = useState(false);

    const [postslichsu, setPostslichsu] = useState([]);
    useEffect(() => {
        const url = window.location.pathname;

        if (url.endsWith('/lichsu')) {
            setlichsu(true);
        } else {
            setlichsu(false);
        }
    }, [postslichsu]);

    useEffect(() => {
        setPostslichsu(API.filter((post) => post.lichsu.some((item) => item.xem === 'yes')));
    }, []);
    const [currentPagelichsu, setCurrentPagelichsu] = useState(1);
    const [pagesToShowlichsu, setPagesToShowlichsu] = useState(5);
    const [pagesToShowlichsus, setPagesToShowlichsus] = useState(0);

    useEffect(() => {
        setPostslichsu(API.sort((a, b) => b.luotxem - a.luotxem));
    }, []);

    const handlePrevPagelichsu = () => {
        if (currentPagelichsu > pagesToShowlichsu) {
            setCurrentPagelichsu(currentPagelichsu - pagesToShowlichsu);
            setPagesToShowlichsu(pagesToShowlichsu - 5);
            setPagesToShowlichsus(pagesToShowlichsus - 5);
        }
    };

    const handleOverleaflichsu = () => {
        if (currentPagelichsu < pageNumberslichsu.length) {
            setCurrentPagelichsu(currentPagelichsu + pagesToShowlichsu);
            setPagesToShowlichsu(pagesToShowlichsu + 5);
            setPagesToShowlichsus(pagesToShowlichsus + 5);
        }
    };

    const handleTopPagelichsu = () => {
        setCurrentPagelichsu(1);
        setPagesToShowlichsu(5);
        setPagesToShowlichsus(0);
    };

    const handleBottomPagelichsu = () => {
        setCurrentPagelichsu(pageNumberslichsu.length);
        setPagesToShowlichsu(pageNumberslichsu.length);
        setPagesToShowlichsus(pageNumberslichsu.length - 5);
    };

    const indexOfLastPostlichsu = currentPagelichsu * 20;
    const indexOfFirstPostlichsu = indexOfLastPostlichsu - 20;
    const currentPostslichsu = postslichsu.slice(indexOfFirstPostlichsu, indexOfLastPostlichsu);

    const pageNumberslichsu = [];
    for (let i = 1; i <= Math.ceil(postslichsu.length / 20); i++) {
        pageNumberslichsu.push(i);
    }

    return (
        <div>
            {lichsu && (
                <div className={cx('grid')}>
                    {currentPostslichsu.map((post, index) => (
                        <div key={index} className={cx('wrapper')}>
                            <div className={cx('card')}>
                                <div className={cx('img')}>
                                    <Link to={`/comicbookcover/${post.name}`}>
                                        <img className={cx('img1')} alt="ảnh" src={post.url} />
                                    </Link>
                                    <div className={cx('hits')}>
                                        <span>
                                            <FontAwesomeIcon icon={faEye} />
                                        </span>
                                        <span>
                                            <FontAwesomeIcon icon={faComment} />
                                        </span>
                                        <span>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('information')}>
                                    <span className={cx('name')}>{post.name}</span>
                                    <nav className={cx('information-nav')}>
                                        {post.sochuong.slice(-3).map((chapterObj, index) => (
                                            <ul key={index} className={cx('information-ul')}>
                                                <li key={chapterObj.chap}>
                                                    <Link to={`/comicbookcover/${post.name}/${chapterObj.chap}`}>
                                                        chap {chapterObj.chap}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <span> thời gian</span>
                                                </li>
                                            </ul>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {lichsu && (
                <div className={cx('pagination')}>
                    <ul className={cx('pagination-ul')}>
                        <li onClick={handleTopPagelichsu} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} />
                        </li>
                        <li onClick={handlePrevPagelichsu} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </li>
                        {pageNumberslichsu.slice(pagesToShowlichsus, pagesToShowlichsu).map((number) => (
                            <li
                                key={number}
                                className={cx('pagination-ul-li', { 'btn-click': number === currentPagelichsu })}
                                onClick={() => setCurrentPagelichsu(number)}
                            >
                                {number}
                            </li>
                        ))}
                        {pageNumberslichsu.length > pagesToShowlichsu && (
                            <li className={cx('pagination-ul-li')}>...</li>
                        )}
                        {pageNumberslichsu.length > 5 &&
                            pageNumberslichsu
                                .slice(pageNumberslichsu.length - 1, pageNumberslichsu.length)
                                .map((number) => (
                                    <li
                                        key={number}
                                        className={cx('pagination-ul-li', {
                                            'btn-click': number === currentPagelichsu,
                                        })}
                                        onClick={() => setCurrentPagelichsu(number)}
                                    >
                                        {number}
                                    </li>
                                ))}
                        <li className={cx('pagination-ul-li')} onClick={handleOverleaflichsu}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </li>
                        <li onClick={handleBottomPagelichsu} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Lichsu;
