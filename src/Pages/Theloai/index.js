import classNames from 'classnames/bind';
import styles from './Theloai.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEye, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import ButtonTop from '~/Button/ButtonTop';
import React, { useState, useEffect } from 'react';
import { API } from '~/API';

const cx = classNames.bind(styles);

function Theloai() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const location = useLocation();

    const url = location.pathname;
    const parts = url.split('/');
    const newTitlePart = parts.pop();
    const newTitle = decodeURIComponent(newTitlePart);
    useEffect(() => {
        // Lấy ra danh sách các bài viết có thể loại tương ứng với title
        const filteredPosts = API.filter((post) => post.theloai.includes(newTitle));
        setPosts(filteredPosts);
        setTitle(newTitle);
    }, [location]);

    // lấy ra title

    const indexOfLastPost = 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / 10); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={cx('wrapper2')}>
            <div className={cx('wrapper1')}>
                <ButtonTop />

                <div className={cx('theloai')}>
                    <h3>
                        <Link to={'/'}>Trang chủ</Link>
                    </h3>
                    <h3>
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </h3>
                    <h3>Thể Loại : {title}</h3>
                </div>

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
                                            <ul key={index} className={cx('information-ul')}>
                                                <li className={cx('chap')} key={chapterObj.chap}>
                                                    <Link to={`/comicbookcover/${post.name}/${chapterObj.chap}`}>
                                                        chap {chapterObj.chap}
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
        </div>
    );
}

export default Theloai;
