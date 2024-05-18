import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Signin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { hashed_password } from '~/taikhoanmatkhau';

const cx = classNames.bind(styles);

function Signon() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [check, setCheck] = useState('');

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts(hashed_password);
    }, []);

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!posts.find((post) => post.account === username && post.password === password)) {
            setCheck('Tài khoản hoặc mật khẩu không chính xác');
            return;
        }
    };

    const handleUsernameChange = (value) => {
        setUsername(value);
        setCheck('');
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setCheck('');
    };
    // ẩn hiện mậu khẩu :
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cx('wrapper')}>
            {/* Đăng kí */}
            <div className={cx('sign-on')}>
                <a href="/">
                    <button className={cx('return')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </a>
                <form onSubmit={handleSignUp}>
                    <h2>Đăng Nhập</h2>

                    <input
                        className={cx('input', {
                            name: !check,
                            sai: check,
                        })}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nhập tên đăng nhập của bạn"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        required
                    />

                    <input
                        className={cx('input', {
                            name: !check,
                            sai: check,
                        })}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu của bạn"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                    />
                    {check && <p className={cx('warning')}>{check}</p>}

                    <div className={cx('div-button')}>
                        <button type="button" onClick={toggleShowPassword} className={cx('showPasswordButton')}>
                            {showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        </button>
                        <button type="submit" className={cx('button')}>
                            Đăng Nhập
                        </button>
                    </div>
                    <div className={cx('div-other-links')}>
                        <h4 className={cx('div-other-title')}>Bạn có thể đăng nhập bằng</h4>
                        <div className={cx('link-icon')}>
                            <div className={cx('icon-icon')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </div>
                            <div className={cx('icon-icon')}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </div>
                            <div className={cx('icon-icon')}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </div>
                            <div className={cx('icon-icon')}>
                                <FontAwesomeIcon icon={faDiscord} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signon;
