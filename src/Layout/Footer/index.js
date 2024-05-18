import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                <ul></ul>
                <ul></ul>
                <ul></ul>
            </nav>
        </div>
    );
}

export default Footer;
