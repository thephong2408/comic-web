import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

import { API } from '~/API';

const cx = classNames.bind(styles);

function Upload() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts(API);
    }, []);

    const allGenres = Array.from(new Set(posts.flatMap((post) => post.theloai)));

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    return (
        <div className={cx('wrapper1')}>
            <div className={cx('wrapper')}>
                <nav>
                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/" aria-label="Link Description">
                                TRANG CHỦ
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/hot" aria-label="Link Description">
                                HOT
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/theodoi" aria-label="Link Description">
                                THEO DÕI
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/lichsu" aria-label="Link Description">
                                LỊCH SỬ
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className={cx('li-li', 'theloai')}>
                            <span
                                onClick={() => setShow(!show)}
                                className={cx('title', 'theloai1')}
                                aria-label="Link Description"
                            >
                                THỂ LOẠI
                            </span>
                            {show && (
                                <div>
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr>
                                                {allGenres.map((genre, index) => (
                                                    <Link to={`/${genre}`} key={index}>
                                                        <td>{genre}</td>
                                                    </Link>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </li>
                    </ul>
                    <ul>
                        <li className={cx('li-li', 'theloai')}>
                            <span
                                onClick={() => setShow1(!show1)}
                                className={cx('title', 'theloai1')}
                                aria-label="Link Description"
                            >
                                XẾP HẠNG
                            </span>
                            {show1 && (
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Top ngày</th>
                                                <th>Top tuần</th>
                                                <th>Top tháng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>top ngày</td>
                                                <td>top tháng</td>
                                                <td>top lượt xem</td>
                                            </tr>
                                            <tr>
                                                <td>top theo dõi</td>
                                                <td>top lượt xem</td>
                                                <td>top đánh giá</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </li>
                    </ul>

                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/chonloc" aria-label="Link Description">
                                TÌM TRUYỆN
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav className={cx('sign')}>
                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/signin">
                                Đăng nhập
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className={cx('li-li')}>
                            <Link className={cx('title')} to="/signon">
                                Đăng Kí
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Upload;
