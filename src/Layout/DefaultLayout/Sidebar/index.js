import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Card from './Card';
import React, { useState, useEffect } from 'react';
import { API } from '~/API';

const cx = classNames.bind(styles);

function Sidebar() {
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(API);
    }, []);

    useEffect(() => {
        const url = window.location.pathname; // Define url before using it

        if (url.endsWith('/theodoi')) {
            setTitle('Truyện Đang Theo Dõi');
        } else if (url.endsWith('/hot')) {
            setTitle('Truyện Đang Hot');
        } else if (url.endsWith('/lichsu')) {
            setTitle('Lịch Sử Đọc Truyện');
        } else {
            setTitle('Truyện Mới Cập Nhập');
        }
    }, [posts]); // Cập nhật khi đường dẫn thay đổi

    return (
        <div className={cx('wapper')}>
            <h3>{title}</h3>
            <Card />
        </div>
    );
}

export default Sidebar;
