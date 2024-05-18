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

function Hot() {
    const [posts, setPosts] = useState([]);

    const [hot, setHot] = useState(false);

    useEffect(() => {
        setPosts(API);
    }, []);

    useEffect(() => {
        const url = window.location.pathname;

        if (url.endsWith('/hot')) {
            setHot(true);
        } else {
            setHot(false);
        }
    }, [posts]);

    //hot
    const [postshot, setPostshot] = useState([]);
    const [currentPagehot, setCurrentPagehot] = useState(1);
    const [pagesToShowhot, setPagesToShowhot] = useState(5);
    const [pagesToShowhots, setPagesToShowhots] = useState(0);

    useEffect(() => {
        setPostshot(API.sort((a, b) => b.luotxem - a.luotxem));
    }, []);

    const handlePrevPagehot = () => {
        if (currentPagehot > 1) {
            setCurrentPagehot(currentPagehot - 1);
            setPagesToShowhot(pagesToShowhot - 1);
            setPagesToShowhots(pagesToShowhots - 1);
        }
    };

    const handleOverleafhot = () => {
        if (currentPagehot < Math.ceil(postshot.length / 20)) {
            setCurrentPagehot(currentPagehot + 1);
            setPagesToShowhot(pagesToShowhot + 1);
            setPagesToShowhots(pagesToShowhots + 1);
        }
    };

    const handleTopPagehot = () => {
        setCurrentPagehot(1);
        setPagesToShowhot(5);
        setPagesToShowhots(0);
    };

    const handleBottomPagehot = () => {
        setCurrentPagehot(Math.ceil(postshot.length / 20));
        setPagesToShowhot(Math.ceil(postshot.length / 20));
        setPagesToShowhots(Math.ceil(postshot.length / 20) - 5);
    };

    const indexOfLastPosthot = currentPagehot * 20;
    const indexOfFirstPosthot = indexOfLastPosthot - 20;
    const currentPostshot = postshot.slice(indexOfFirstPosthot, indexOfLastPosthot);

    const pageNumbershot = [];
    for (let i = 1; i <= Math.ceil(postshot.length / 20); i++) {
        pageNumbershot.push(i);
    }

    return (
        <div>
            {/* hot */}
            {hot && (
                <div className={cx('grid')}>
                    {currentPostshot.map((post, index) => (
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
                                                <li>
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
            {/* hot */}
            {hot && (
                <div className={cx('pagination')}>
                    <ul className={cx('pagination-ul')}>
                        <li onClick={handleTopPagehot} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} />
                        </li>
                        <li onClick={handlePrevPagehot} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </li>
                        {pageNumbershot.slice(pagesToShowhots, pagesToShowhot).map((number) => (
                            <li
                                key={number}
                                className={cx('pagination-ul-li', { 'btn-click': number === currentPagehot })}
                                onClick={() => setCurrentPagehot(number)}
                            >
                                {number}
                            </li>
                        ))}
                        {pageNumbershot.length > pagesToShowhot && <li className={cx('pagination-ul-li')}>...</li>}
                        {pageNumbershot.length > 5 &&
                            pageNumbershot.slice(pageNumbershot.length - 1, pageNumbershot.length).map((number) => (
                                <li
                                    key={number}
                                    className={cx('pagination-ul-li', { 'btn-click': number === currentPagehot })}
                                    onClick={() => setCurrentPagehot(number)}
                                >
                                    {number}
                                </li>
                            ))}
                        <li className={cx('pagination-ul-li')} onClick={handleOverleafhot}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </li>
                        <li onClick={handleBottomPagehot} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Hot;
