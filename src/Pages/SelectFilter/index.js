import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEye } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { API } from '~/API';
import { Link } from 'react-router-dom';
import ButtonTop from '~/Button/ButtonTop';

import styles from './SelectFilter.module.scss';

const cx = classNames.bind(styles);

function SelectFilter() {
    const [posts, setPosts] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setPosts(API);
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedGenres([...selectedGenres, value]);
        } else {
            setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
        }
    };

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) => selectedGenres.length === 0 || selectedGenres.every((genre) => post.theloai.includes(genre)),
        );
        setFilteredPosts(filteredResults);

        // Kiểm tra nếu không có thể loại nào được chọn
        setShow(filteredResults.length === 0);
    }, [selectedGenres, posts]);

    // useEffect(() => {
    //     const allGenres = API.reduce((acc, story) => [...acc, ...story.theloai], []);
    //     const uniqueGenres = Array.from(new Set(allGenres));
    //     // Kiểm tra nếu không có thể loại nào
    //     setShow(uniqueGenres.length === 0);
    // }, []);

    const allGenres = API.reduce((acc, story) => [...acc, ...story.theloai], []);
    const uniqueGenres = Array.from(new Set(allGenres));

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Hãy chọn các thể loại mà bạn muốn vào ô sau đây</h3>

            <div>
                <div className={cx('menu')}>
                    <nav className={cx('menu-nav')}>
                        {uniqueGenres.map((name, index) => (
                            <ul key={index} className={cx('menu-ul')}>
                                <li className={cx('menu-item')}>
                                    <input
                                        type="checkbox"
                                        value={name}
                                        checked={selectedGenres.includes(name)}
                                        onChange={handleCheckboxChange}
                                    />
                                </li>
                                <li className={cx('menu-theloai')}>{name}</li>
                            </ul>
                        ))}
                    </nav>
                </div>
            </div>

            <ButtonTop />
            <h3 className={cx('title')}>Kết quả tìm kiếm</h3>
            {show && (
                <span className={cx('no-result')}>
                    <span>Không có kết quả tìm kiếm</span>
                </span>
            )}
            <div className={cx('grid')}>
                {filteredPosts.map((post, index) => (
                    <div key={index} className={cx('wrapper1')}>
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
                                    {post.sochuong.slice(-3).map((chap) => (
                                        <ul className={cx('information-ul')} key={chap.chap}>
                                            <li className={cx('chap')}>
                                                <Link to={`/comicbookcover/${post.name}/${chap.chap}`}>
                                                    {' '}
                                                    chap {chap.chap}
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

export default SelectFilter;
