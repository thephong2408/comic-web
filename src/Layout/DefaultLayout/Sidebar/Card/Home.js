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

function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesToShow, setPagesToShow] = useState(5);
    const [pagesToShows, setPagesToShows] = useState(0);

    const [home, setHome] = useState(false);

    useEffect(() => {
        setPosts(API);
    }, []);

    useEffect(() => {
        const url = window.location.pathname;

        if (url.endsWith('/theodoi')) {
            setHome(false);
        } else if (url.endsWith('/hot')) {
            setHome(false);
        } else if (url.endsWith('/lichsu')) {
            setHome(false);
        } else {
            setHome(true);
        }
    }, [posts]);

    // home
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPagesToShow(pagesToShow - 1);
            setPagesToShows(pagesToShows - 1);
        }
    };

    const handleOverleaf = () => {
        if (currentPage < Math.ceil(posts.length / 20)) {
            setCurrentPage(currentPage + 1);
            setPagesToShow(pagesToShow + 1);
            setPagesToShows(pagesToShows + 1);
        }
    };

    const handleTopPage = () => {
        setCurrentPage(1);
        setPagesToShow(5);
        setPagesToShows(0);
    };

    const handleBottomPage = () => {
        setCurrentPage(Math.ceil(posts.length / 20));
        setPagesToShow(Math.ceil(posts.length / 20));
        setPagesToShows(Math.ceil(posts.length / 20) - 5);
    };

    const indexOfLastPost = currentPage * 20;
    const indexOfFirstPost = indexOfLastPost - 20;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / 20); i++) {
        pageNumbers.push(i);
    }

    const currentUrl1 = window.location.href;
    // Thêm chuỗi "page" vào cuối của currentUrl
    const page2Url = currentUrl1 + '/page';

    return (
        <div>
            {/* home */}
            {home && (
                <div className={cx('grid')}>
                    {currentPosts.map((post, index) => (
                        <div key={index} className={cx('wrapper')}>
                            <div className={cx('card')}>
                                <div className={cx('img')}>
                                    <Link to={`/comicbookcover/${post.name}`}>
                                        <img className={cx('img1')} alt="ảnh" src={post.url} />
                                    </Link>
                                    <div className={cx('hits')}>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faEye} /> <span>1k</span>
                                        </span>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faComment} /> <span>100</span>
                                        </span>
                                        <span className={cx('icon')}>
                                            <FontAwesomeIcon icon={faHeart} /> <span>1k</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('information')}>
                                    <span className={cx('name')}>{post.name}</span>
                                    <nav className={cx('information-nav')}>
                                        {post.sochuong.slice(-3).map((chapterObj, index) => (
                                            <Link key={index} to={`/comicbookcover/${post.name}/${chapterObj.chap}`}>
                                                <ul className={cx('information-ul')}>
                                                    <li>
                                                        <a href="/" className={cx('chapter')}>
                                                            chap {chapterObj.chap}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span> thời gian</span>
                                                    </li>
                                                </ul>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* home */}
            {home && (
                <div className={cx('pagination')}>
                    <ul className={cx('pagination-ul')}>
                        <li onClick={handleTopPage} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} />
                        </li>
                        <li onClick={handlePrevPage} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </li>
                        {pageNumbers.slice(pagesToShows, pagesToShow).map((number) => (
                            <li
                                href={page2Url}
                                key={number}
                                className={cx('pagination-ul-li', { 'btn-click': number === currentPage })}
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </li>
                        ))}
                        {pageNumbers.length > pagesToShow && <li className={cx('pagination-ul-li')}>...</li>}
                        {pageNumbers.length > 5 &&
                            pageNumbers.slice(pageNumbers.length - 1, pageNumbers.length).map((number) => (
                                <li
                                    key={number}
                                    className={cx('pagination-ul-li', { 'btn-click': number === currentPage })}
                                    onClick={() => setCurrentPage(number)}
                                >
                                    {number}
                                </li>
                            ))}
                        <li className={cx('pagination-ul-li')} onClick={handleOverleaf}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </li>
                        <li onClick={handleBottomPage} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Home;
