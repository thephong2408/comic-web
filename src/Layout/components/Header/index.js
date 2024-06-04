import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleInfo, faComment, faLightbulb, faXmark } from '@fortawesome/free-solid-svg-icons';

import SearchInput from './Search/SearchInput';

const cx = classNames.bind(styles);

function Header() {
    // const [selectedFile, setSelectedFile] = useState(null);

    // const [avt, setAvt] = useState([
    //     {
    //         name: 'Phạm Thế Phong',
    //         img1: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-anh-cute-anime-002.jpg',
    //     },
    // ]);
    // const [show, setShow] = useState(false);
    // ẩn hiện menu

    // const [newAvtSelected, setNewAvtSelected] = useState(false);
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    //     setNewAvtSelected(true); // Đánh dấu là ảnh mới đã được chọn
    // };

    // const handleMouseEnter = () => {
    //     setShow(true);
    // };

    // const handleMouseLeave = () => {
    //     setShow(false);
    // };

    // const handleAvtChange = () => {
    //     document.querySelector('input[type="file"]').click();
    // };

    // const updateAvt = () => {
    //     if (newAvtSelected) {
    //         const reader = new FileReader();

    //         reader.onload = (event) => {
    //             const newAvt = [...avt];
    //             newAvt[0].img1 = event.target.result;
    //             setAvt(newAvt);
    //         };

    //         reader.readAsDataURL(selectedFile);
    //     }
    // };

    const [ismenu, setIsMenu] = useState(true);
    const location = useLocation(); // Hook to get current location
    const currentUrl = location.pathname; // Get the current URL
    const parts = currentUrl.split('/');
    const titlePart = parts.pop();
    useEffect(() => {
        if (titlePart === 'menu') {
            setIsMenu(true);
        } else {
            setIsMenu(false);
        }
    }, []);

    return (
        <div>
            <div className={cx('wapper')}>
                <div className={cx('header')}>
                    {/* logo */}
                    <div className={cx('logo')}>
                        <img
                            alt="Logo NetTruyen"
                            src="https://nettruyenco.vn/public/assets/images/logo-nettruyen.png"
                            className={cx('logo-img')}
                        />
                    </div>

                    {/* search */}
                    <div className={cx('timkiem')}>
                        <SearchInput />
                    </div>

                    {/* other-đăng kí - đăng nhập - ngôn ngữ - sáng tối-... */}
                    <div className={cx('other')}>
                        {/* {avt.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className={cx('div-avt')}
                            >
                                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                                <img className={cx('avt')} alt="phong" src={item.img1} />
                                <a href="">{item.name}</a>
                                {show && (
                                    <div className={cx('menu-avt')}>
                                        <ul className={cx('ul-avt')}>
                                            <li
                                                className={cx('li-avt')}
                                                onClick={() => {
                                                    handleAvtChange();
                                                    updateAvt();
                                                }}
                                            ></li>
                                            <li className={cx('li-avt')}>
                                                <a href="/signon">Đăng kí tài khoản mới</a>{' '}
                                            </li>
                                            <li className={cx('li-avt')}>
                                                <a href="/signin">Đăng xuất</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))} */}
                        {/* // menu */}
                        <nav className={cx('item')}>
                            <ul className={cx('item-ul')}>
                                <li className={cx('item-li-icon')}>
                                    <FontAwesomeIcon icon={faLightbulb} />
                                </li>
                                <li className={cx('item-li-icon')}>
                                    <FontAwesomeIcon icon={faComment} />
                                </li>
                            </ul>
                            <ul className={cx('item-ul')}>
                                <Link to={'/signin'}>
                                    <li className={cx('item-li')}>Đăng Nhập</li>
                                </Link>
                                <li className={cx('item-li')}>/</li>
                                <Link to={'/signon'}>
                                    <li className={cx('item-li')}>Đăng Kí</li>
                                </Link>
                            </ul>
                        </nav>

                        {!ismenu && (
                            <Link to="/menu">
                                <FontAwesomeIcon className={cx('menu')} icon={faBars} />
                            </Link>
                        )}
                        {ismenu && (
                            <Link to="/">
                                <FontAwesomeIcon className={cx('menu')} icon={faXmark} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className={cx('wapper1')}>
                <Nav />
                <div className={cx('warning')}>
                    <button>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                    <span>không truy cập web giả mạo để tránh mất tài khoản</span>
                </div>
            </div> */}
        </div>
    );
}

export default Header;
