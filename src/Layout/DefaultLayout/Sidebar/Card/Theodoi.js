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

function Theodoi() {
    const [theodoi, setTheodoi] = useState(false);
    const [poststheodoi, setPoststheodoi] = useState([]);
    const [currentPagetheodoi, setCurrentPagetheodoi] = useState(1);
    const [pagesToShowtheodoi, setPagesToShowtheodoi] = useState(5);
    const [pagesToShowtheodois, setPagesToShowtheodois] = useState(0);

    useEffect(() => {
        const url = window.location.pathname;

        if (url.endsWith('/theodoi')) {
            setTheodoi(true);
        } else {
            setTheodoi(false);
        }
    }, [poststheodoi]);

    useEffect(() => {
        setPoststheodoi(API.filter((post) => post.theodoi === 'yes'));
    }, []);

    const handlePrevPagetheodoi = () => {
        if (currentPagetheodoi > 1) {
            setCurrentPagetheodoi(currentPagetheodoi - 1);
            setPagesToShowtheodoi(pagesToShowtheodoi - 1);
            setPagesToShowtheodois(pagesToShowtheodois - 1);
        }
    };

    const handleOverleaftheodoi = () => {
        if (currentPagetheodoi < Math.ceil(poststheodoi.length / 20)) {
            setCurrentPagetheodoi(currentPagetheodoi + 1);
            setPagesToShowtheodoi(pagesToShowtheodoi + 1);
            setPagesToShowtheodois(pagesToShowtheodois + 1);
        }
    };

    const handleTopPagetheodoi = () => {
        setCurrentPagetheodoi(1);
        setPagesToShowtheodoi(5);
        setPagesToShowtheodois(0);
    };

    const handleBottomPagetheodoi = () => {
        setCurrentPagetheodoi(Math.ceil(poststheodoi.length / 20));
        setPagesToShowtheodoi(Math.ceil(poststheodoi.length / 20));
        setPagesToShowtheodois(Math.ceil(poststheodoi.length / 20) - 5);
    };

    const indexOfLastPosttheodoi = currentPagetheodoi * 20;
    const indexOfFirstPosttheodoi = indexOfLastPosttheodoi - 20;
    const currentPoststheodoi = poststheodoi.slice(indexOfFirstPosttheodoi, indexOfLastPosttheodoi);

    const pageNumberstheodoi = [];
    for (let i = 1; i <= Math.ceil(poststheodoi.length / 20); i++) {
        pageNumberstheodoi.push(i);
    }

    return (
        <div>
            {/* theodoi */}
            {theodoi && (
                <div className={cx('grid')}>
                    {currentPoststheodoi.map((post, index) => (
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
            {/* theodoi */}
            {theodoi && (
                <div className={cx('pagination')}>
                    <ul className={cx('pagination-ul')}>
                        <li onClick={handleTopPagetheodoi} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} />
                        </li>
                        <li onClick={handlePrevPagetheodoi} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </li>
                        {pageNumberstheodoi.slice(pagesToShowtheodois, pagesToShowtheodoi).map((number) => (
                            <li
                                key={number}
                                className={cx('pagination-ul-li', { 'btn-click': number === currentPagetheodoi })}
                                onClick={() => setCurrentPagetheodoi(number)}
                            >
                                {number}
                            </li>
                        ))}
                        {pageNumberstheodoi.length > pagesToShowtheodoi && (
                            <li className={cx('pagination-ul-li')}>...</li>
                        )}
                        {pageNumberstheodoi.length > 5 &&
                            pageNumberstheodoi
                                .slice(pageNumberstheodoi.length - 1, pageNumberstheodoi.length)
                                .map((number) => (
                                    <li
                                        key={number}
                                        className={cx('pagination-ul-li', {
                                            'btn-click': number === currentPagetheodoi,
                                        })}
                                        onClick={() => setCurrentPagetheodoi(number)}
                                    >
                                        {number}
                                    </li>
                                ))}
                        <li className={cx('pagination-ul-li')} onClick={handleOverleaftheodoi}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </li>
                        <li onClick={handleBottomPagetheodoi} className={cx('pagination-ul-li')}>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Theodoi;
