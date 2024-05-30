import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ComicBookCover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Commmet from '../Comment';
import Button from '~/Button';
import ButtonTop from '~/Button/ButtonTop';
import {
    faStar,
    faChevronDown,
    faUser,
    faLayerGroup,
    faEye,
    faAnglesRight,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { API } from '~/API';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function ComicBookCover() {
    const [posts, setPosts] = useState([]);
    const location = useLocation(); // Hook to get current location
    const currentUrl = location.pathname; // Get the current URL

    useEffect(() => {
        const parts = currentUrl.split('/comicbookcover/'); // Split the URL by '/comicbookcover/'
        const titlePart = parts.pop(); // Get the last part of the array, which is the title
        const title = decodeURIComponent(titlePart);
        const filteredPosts = API.filter((post) => post.name === title);
        setPosts(filteredPosts);
    }, [currentUrl]); // Dependency array with currentUrl ensures it runs when URL changes

    const [monitor, setMonitor] = useState(true);
    const handleMonior = () => {
        setMonitor(!monitor);
    };

    const [removeWrapperClass, setRemoveWrapperClass] = useState(true);
    const handleClick = () => {
        setRemoveWrapperClass(false);
    };
    const handleClick1 = () => {
        setRemoveWrapperClass(true);
    };

    const [show, setShow] = useState(false);

    const arr = [1, 2, 3, 4, 5];
    const [selectedStars, setSelectedStars] = useState([]);

    // Check if the newly selected star is right after the last selected star
    const handleStarClick = (index) => {
        // If the user selects the first star or the new star is the next star of the last selected star
        if (index === 1 || selectedStars.includes(index - 1)) {
            const selectedIndex = selectedStars.indexOf(index);
            if (selectedIndex === -1) {
                // If the star is not yet selected, add it to the array
                setSelectedStars([...selectedStars, index]);
            } else {
                // If the star is already selected, remove it from the array
                const newSelectedStars = selectedStars.slice(0, selectedIndex);
                setSelectedStars(newSelectedStars);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ButtonTop />
            {posts.map((post, index) => (
                <div key={index} className={cx('book')}>
                    <ul className={cx('ul-first-part')}>
                        <li className={cx('ul-first-part-li', 'ul-first-part-li-home')}>
                            <Link to={'/'}>Trang chủ</Link>
                        </li>
                        <li className={cx('ul-first-part-li')}>
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </li>
                        <li className={cx('ul-first-part-li')}>{post.name}</li>
                        <li className={cx('ul-first-part-li')}>
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </li>
                    </ul>
                    <div className={cx('wrapper1')}>
                        <img className={cx('avt')} src={post.url} alt="truyện" />
                        <div className={cx('wrapper2')}>
                            <h3 className={cx('name')}>{post.name}</h3>
                            <span className={cx('time')}> Cập nhập thời gian</span>
                            <nav className={cx('nav')}>
                                <ul className={cx('ul-information')}>
                                    <li className={cx('ul-information-li1')}>
                                        <FontAwesomeIcon icon={faUser} /> <span>Tên tác giả</span>
                                    </li>
                                    <li className={cx('ul-information-li')}>{post.tacgia}</li>
                                </ul>
                                <ul className={cx('ul-information', 'ul-information-theloai')}>
                                    <li className={cx('ul-information-li1')}>
                                        <FontAwesomeIcon icon={faLayerGroup} /> <span>Thể lại</span>
                                    </li>
                                    <li className={cx('ul-information-li')}>
                                        {post.theloai.map((genre, index) => (
                                            <span key={index}>
                                                <span key={index}>{genre}</span>
                                            </span>
                                        ))}
                                    </li>
                                </ul>
                                <ul className={cx('ul-information')}>
                                    <li className={cx('ul-information-li1')}>
                                        <FontAwesomeIcon icon={faEye} /> <span>Lượt xem</span>
                                    </li>
                                    <li className={cx('ul-information-li')}>
                                        <span>{post.luotxem}</span>
                                    </li>
                                </ul>
                            </nav>

                            <ul className={cx('ul-evaluate')}>
                                <li className={cx('ul-evaluate-li', 'ul-evaluate-li1')}>Đánh giá</li>
                                {arr.map((index) => (
                                    <li
                                        key={index}
                                        className={cx('ul-evaluate-li', {
                                            selected: selectedStars.includes(index),
                                        })}
                                        onClick={() => handleStarClick(index)}
                                    >
                                        <FontAwesomeIcon className={cx('faStar')} icon={faStar} />
                                    </li>
                                ))}
                            </ul>

                            <nav className={cx('nav-btn')}>
                                <ul className={cx('nav-btn-ul')}>
                                    <li className={cx('nav-btn-li')}>
                                        <Button follow={monitor} unfollow={!monitor} onClick={handleMonior}>
                                            {monitor ? 'Theo dõi' : 'Hủy Theo dõi'}
                                        </Button>
                                    </li>
                                    <li className={cx('nav-text')}>Lượt theo dõi</li>
                                </ul>
                                <ul className={cx('nav-btn-ul')}>
                                    <li className={cx('nav-btn-li')}>
                                        <Link to={`/comicbookcover/${post.name}/1`}>
                                            <Button start>Đọc từ đầu</Button>
                                        </Link>
                                    </li>
                                    <li className={cx('nav-btn-li')}>
                                        <Link
                                            to={`/comicbookcover/${post.name}/${post.sochuong.reduce(
                                                (maxChap, currentChap) => {
                                                    return currentChap.chap > maxChap ? currentChap.chap : maxChap;
                                                },
                                                -Infinity,
                                            )}`}
                                        >
                                            <Button start> Kết thúc</Button>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={cx('wrapper3')}>
                        <span className={cx('noidung')} onClick={() => setShow(!show)}>
                            NỘI DUNG
                        </span>
                        {show && <p>{post.noidung}</p>}
                    </div>
                    <div className={cx('wrapper5')}>
                        <span className={cx('list-title-span')}>Danh sách chương</span>
                        <ul className={cx('ul-list-title')}>
                            <li className={cx('li-list')}>Số chương</li>
                            <li className={cx('li-list', 'li-list1')}>Cập nhập</li>
                            <li className={cx('li-list', 'li-list1')}>Xem</li>
                        </ul>
                        <div className={cx('div-list', { wrapper4: removeWrapperClass })}>
                            {post.sochuong.map((chap, index) => (
                                <Link key={index} to={`/comicbookcover/${post.name}/${chap.chap}`}>
                                    <ul className={cx('ul-list')}>
                                        <li className={cx('li-list')}> chap {chap.chap}</li>
                                        <li className={cx('li-list', 'li-list2')}>thời gian</li>
                                        <li className={cx('li-list', 'li-list2')}>
                                            {post.luotxem > 1000 ? `${post.luotxem / 1000}k` : post.luotxem}
                                        </li>
                                    </ul>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={cx('div-extend')}>
                        {removeWrapperClass && (
                            <button className={cx('extend')} onClick={handleClick}>
                                <span> Xem Thêm</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        )}
                        {!removeWrapperClass && (
                            <button className={cx('extend')} onClick={handleClick1}>
                                <span>Thu Gọn</span>
                                <FontAwesomeIcon icon={faChevronUp} />
                            </button>
                        )}
                    </div>
                    <div className={cx('comment')}>
                        <Commmet />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ComicBookCover;
