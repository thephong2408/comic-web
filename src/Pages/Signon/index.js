import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Signon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { hashed_password } from '~/taikhoanmatkhau';

const cx = classNames.bind(styles);

function Signon() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts(hashed_password);
    }, []);

    const handleUsernameChange = (value) => {
        setUsername(value);
        setUsernameError('');
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        // Kiểm tra tên đăng nhập có phải là Gmail hay không
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(username)) {
            // Địa chỉ email không hợp lệ
            setUsernameError('Tài khoản đăng nhập cần là Gmail');
            return;
        }
        if (posts.find((post) => post.account === username)) {
            setUsernameError('Tài khoản của bạn đã tồn tại vui lòng nhập tài khoản khác');
            return;
        }

        // Kiểm tra độ dài của mật khẩu
        if (password.length < 8) {
            setPasswordError('Mật khẩu cần có ít nhất 8 kí tự');
            return;
        }

        // Kiểm tra xác nhận mật khẩu có khớp với mật khẩu đã nhập hay không
        if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu nhập lại không chính xác');
            return;
        }
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
                    <h2>Đăng Kí</h2>

                    <input
                        className={cx('input', {
                            name: !usernameError,
                            sai: usernameError,
                        })}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nhập tên đăng nhập của bạn"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        required
                    />
                    {usernameError && <p className={cx('warning')}>{usernameError}</p>}

                    <input
                        className={cx('input', {
                            name: !passwordError,
                            sai: passwordError,
                        })}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu của bạn"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                    />
                    {passwordError && <p className={cx('warning')}>{passwordError}</p>}

                    <input
                        className={cx('input', {
                            name: !confirmPasswordError,
                            sai: confirmPasswordError,
                        })}
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu của bạn"
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        required
                    />
                    {confirmPasswordError && <p className={cx('warning')}>{confirmPasswordError}</p>}
                    <div className={cx('div-button')}>
                        <button type="button" onClick={toggleShowPassword} className={cx('showPasswordButton')}>
                            {showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        </button>
                        <button type="submit" className={cx('button')}>
                            Xác Nhận Đăng Kí
                        </button>
                    </div>
                    <div className={cx('div-other-links')}>
                        <h4 className={cx('div-other-title')}>Bạn có thể đăng kí bằng</h4>
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
