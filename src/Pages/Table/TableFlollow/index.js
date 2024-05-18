import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TableFlollow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { API } from '~/API'; // Import API từ file khác

const cx = classNames.bind(styles);

function TableFlollow() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Sử dụng slice để cắt một phần của API và cập nhật state
        setPosts(API.slice(0, 10)); // Hiển thị chỉ 10 phần tử ban đầu
    }, []);

    const handleRemoveItem = (index) => {
        setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts.splice(index, 1);
            return updatedPosts;
        });
    };
    return (
        <div>
            {/* theo dõi */}
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>
                    Truyện đang theo dõi
                    <span>
                        <a href={'/theodoi'}>xem tất cả</a>
                    </span>
                </h2>

                <div className={cx('board')}>
                    <ul className={cx('board-ul')}>
                        {posts
                            .filter((post) => post.theodoi === 'yes')
                            .map((post, index) => (
                                <li className={cx('board-li')} key={index}>
                                    <Link to={`/comicbookcover/${post.name}`}>
                                        <img className={cx('img')} alt="ảnh" src={post.url} />
                                    </Link>
                                    <div className={cx('container')}>
                                        <a href="/">
                                            <span className={cx('name')}>{post.name}</span>
                                        </a>
                                        <p>
                                            <span>{post.chap}</span>
                                            <span className={cx('times')} onClick={() => handleRemoveItem(index)}>
                                                <span>xóa</span> <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TableFlollow;
