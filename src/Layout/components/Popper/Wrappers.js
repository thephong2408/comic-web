import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Wrappers({ children }) {
    return <div className={cx('wrappers')}>{children}</div>;
}

export default Wrappers;
