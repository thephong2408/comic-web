import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TableHistory.module.scss';
import { API } from '~/API';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TableHistory() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(API);
    }, []);
    // chap

    return (
        <div>
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>
                    Lịch Sử Đọc Truyện
                    <span>
                        <Link to={'/lichsu'}>xem tất cả</Link>
                    </span>
                </h2>

                <div className={cx('board')}>
                    <ul className={cx('board-ul')}>
                        {posts
                            .filter((post) => post.lichsu.some((item) => item.xem === 'yes'))
                            .map((post, index) => (
                                <Link key={index} to={`/comicbookcover/${post.name}`}>
                                    <li key={index}>
                                        <img className={cx('img')} alt="ảnh" src={post.url} />
                                        <div className={cx('container')}>
                                            <Link to="/">
                                                <span className={cx('name')}>{post.name}</span>
                                            </Link>
                                            <p>
                                                <span className={cx('chap')}>
                                                    <span> chap</span>
                                                    {post.lichsu.some((item) => item.chap)
                                                        ? post.lichsu.find((item) => item.chap).chap
                                                        : null}
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

export default TableHistory;
