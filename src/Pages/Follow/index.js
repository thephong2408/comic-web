import classNames from 'classnames/bind';
import styles from './Follow.module.scss';
import TableHistory from '../Table/TableHistory';
import TableRank from '../Table/TableRank';

const cx = classNames.bind(styles);
function Follow() {
    return (
        <div className={cx('wrapper')}>
            <TableHistory />
            <TableRank />
        </div>
    );
}

export default Follow;
