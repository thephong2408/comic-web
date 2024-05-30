import Header from '../components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Nav from '../DefaultLayout/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                <div className={cx('div-container')}>
                    <Nav />
                    <div className={cx('warning')}>
                        <button>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </button>
                        <span>không truy cập web giả mạo để tránh mất tài khoản</span>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
