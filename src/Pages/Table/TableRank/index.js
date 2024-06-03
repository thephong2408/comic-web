import React, { useState, useEffect } from 'react'; // Import useState and useEffect from 'react'
import classNames from 'classnames/bind'; // Import classNames properly
import styles from './Rank.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { API } from '~/API';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TableRank() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(API);
    }, []);
    return (
        <div>
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>
                    Top Bảng Xếp Hạng
                    <span>
                        <Link to={'/hot'}>xem tất cả</Link>
                    </span>
                </h2>
                <div className={cx('board')}>
                    <ul className={cx('board-ul')}>
                        {posts
                            // Lấy 10 bài đăng đầu tiên
                            .sort((a, b) => b.luotxem - a.luotxem)
                            .slice(0, 10) // Sắp xếp theo số lượt xem giảm dần
                            .map((post, index) => (
                                <Link to={`/comicbookcover/${post.name}`}>
                                    <li key={index}>
                                        <div className={cx('rank')}>
                                            <span className={cx('icon-rank')}>{index + 1}</span>{' '}
                                            {/* Số thứ tự, bắt đầu từ 1 */}
                                        </div>
                                        <img className={cx('img')} alt="ảnh" src={post.url} />
                                        <div className={cx('container')}>
                                            <span className={cx('name')}>{post.name}</span>

                                            {/* Tên bài đăng */}
                                            <p className={cx('p')}>
                                                <span> chap {post.sochuong.length}</span> {/* Số chap */}
                                                <span className={cx('times')}>
                                                    <FontAwesomeIcon icon={faEye} /> {post.luotxem} {/* Số lượt xem */}
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TableRank;
