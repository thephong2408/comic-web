import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    children,
    className,
    // class thêm cho từng loại nút
    follow = false,
    unfollow = false,
    start = false,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx(
        'wrapper',
        // thêm class cho từng loại nút
        {
            // lấy gái trị của class name của thẻ button để thêm vào
            [className]: className,
            follow,
            unfollow,
            start,
        },
    );
    return (
        <Comp className={classes} {...props}>
            <span className={cx('color-btn')}>{children}</span>
        </Comp>
    );
}

export default Button;
