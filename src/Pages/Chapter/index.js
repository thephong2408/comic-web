import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Chapter.module.scss';
import Comment from '../Comment';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAnglesRight,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faHouse,
} from '@fortawesome/free-solid-svg-icons';

import { API } from '~/API';
import ButtonTop from '~/Button/ButtonTop';

const cx = classNames.bind(styles);

function Chapter() {
    const { name, chap } = useParams(); // Lấy tham số từ URL
    const [isVisible, setIsVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [chaptop, setChaptop] = useState(parseInt(chap) + 1);
    const [chapbtoot, setChapbtoot] = useState(parseInt(chap) - 1);

    useEffect(() => {
        const filteredPosts = API.filter(
            (post) => post.name === name && post.sochuong.some((chapter) => chapter.chap === parseInt(chap)),
        );
        setPosts(filteredPosts);
    }, [name, chap]); // Sử dụng name và chap làm dependency

    useEffect(() => {
        if (posts.length > 0) {
            const maxChapter = Math.max(...posts[0].sochuong.map((chapter) => chapter.chap));
            if (parseInt(chap) < maxChapter) {
                setChaptop(parseInt(chap) + 1);
            }
        }
    }, [chap, posts]);

    useEffect(() => {
        if (parseInt(chap) >= 2) {
            setChapbtoot(parseInt(chap) - 1);
        }
    }, [chap]);

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 200;
            const currentScrollY = window.scrollY;

            if (currentScrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [show, setShow] = useState(false);
    const handleButtonClick = () => {
        setShow(!show);
    };
    const handleButtonClick1 = () => {
        setShow(false);
    };

    const [isFollowing, setIsFollowing] = useState(false);
    const handleFlollowing = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <>
            {posts.map((post, index) => (
                <div key={index} className={cx('wrapper')}>
                    <ButtonTop />
                    <nav className={cx('nav-title')}>
                        <ul className={cx('nav-title-ul')}>
                            <li className={cx('nav-title-li1', 'nav-title-li-home')}>
                                <a href="/">Trang chủ</a>
                            </li>
                            <li className={cx('nav-title-li1')}>
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </li>

                            <li className={cx('nav-title-li1', 'nav-title-li-home')}>
                                <Link to={`/comicbookcover/${post.name}`}>{post.name}</Link>
                            </li>
                        </ul>
                        <ul className={cx('nav-title-ul')}>
                            <li className={cx('nav-title-li2')}>chap : {chap}</li>
                            <li className={cx('nav-title-li2')}>[ thời gian cập nhập ]</li>
                        </ul>
                    </nav>
                    <ul className={cx({ ultoolbar: isVisible }, { 'chap-ul': !isVisible })}>
                        <li className={cx('li-home', 'li-chap')}>
                            <a href="/">
                                <FontAwesomeIcon icon={faHouse} />
                            </a>
                        </li>
                        <li className={cx('li-chap')}>
                            <Link to={`/comicbookcover/${post.name}/${chapbtoot}`}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Link>
                        </li>
                        <li
                            onMouseEnter={handleButtonClick}
                            onMouseLeave={handleButtonClick1}
                            className={cx('li-chapter', 'li-chap')}
                        >
                            <span>chap {chap}</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                            {show && (
                                <div className={cx('div-chapter')}>
                                    <ul className={cx('ul-chapters')}>
                                        {post.sochuong.map((chapter) => (
                                            <a href={`/comicbookcover/${post.name}/${chapter.chap}`} key={chapter.chap}>
                                                <li key={index} className={cx('li-chapters')}>
                                                    <span> chap {chapter.chap}</span>
                                                </li>
                                            </a>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className={cx('li-chap')}>
                            <Link to={`/comicbookcover/${post.name}/${chaptop}`}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </li>
                        <li className={cx('li-btn', { following: isFollowing })} onClick={handleFlollowing}>
                            {isFollowing ? 'Đã Theo Dõi' : 'Theo Dõi'}
                        </li>
                    </ul>
                    <div className={cx('container')}>
                        {/* ảnh */}
                        <div className={cx('div-img')}>
                            {post.sochuong.map((chapter) => {
                                if (chapter.chap === parseInt(chap)) {
                                    return (
                                        <div key={chapter.chap}>
                                            {chapter.src.map((src, srcIndex) => (
                                                <img key={srcIndex} alt={`ảnh ${srcIndex}`} src={src} />
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className={cx('comment')}>
                        <Comment />
                    </div>
                </div>
            ))}
        </>
    );
}

export default Chapter;
