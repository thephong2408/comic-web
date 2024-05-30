import React from 'react';
import styles from './SearchResults.module.scss';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import ButtonTop from '~/Button/ButtonTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { API } from '~/API';
import { Link, useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function SearchResult() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation(); // Hook để lấy location hiện tại
    const currentUrl = location.pathname; // Lấy URL hiện tại

    const parts = currentUrl.split('/');

    const lastPart = parts[parts.length - 1];
    useEffect(() => {
        const parts = currentUrl.split('/');

        const lastPart = parts[parts.length - 1];
        const filteredResults = API.filter((item) => {
            return item.name.toLowerCase().includes(lastPart);
        });
        setSearchResults(filteredResults);
    }, [lastPart]);
    // [lastPart, searchResults]
    return (
        <div className={cx('wrapper')}>
            <ButtonTop />
            <h3 className={cx('title')}>Kết quả tìm kiếm</h3>
            <div className={cx('grid')}>
                {searchResults.map((item, index) => (
                    <div key={index} className={cx('wrapper1')}>
                        <div className={cx('card')}>
                            <div className={cx('img')}>
                                <Link to={`/comicbookcover/${item.name}`}>
                                    <img className={cx('img1')} alt="ảnh" src={item.url} />
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
                                <span className={cx('name')}>{item.name}</span>
                                <nav className={cx('information-nav')}>
                                    {item.sochuong.slice(-3).map((chap) => (
                                        <ul className={cx('information-ul')} key={chap.chap}>
                                            <li className={cx('chap')}>
                                                <Link to={`/comicbookcover/${item.name}/${chap.chap}`}>
                                                    <span>chap {chap.chap}</span>
                                                </Link>
                                            </li>
                                            <li className={cx('time')}>
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
        </div>
    );
}

export default SearchResult;
