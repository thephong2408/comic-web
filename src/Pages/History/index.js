import classNames from 'classnames/bind';
import styles from './History.module.scss';
import TableFlollow from '../Table/TableFlollow';
import TableRank from '../Table/TableRank';

const cx = classNames.bind(styles);
function History() {
    return (
        <div className={cx('wrapper')}>
            <TableFlollow />
            <TableRank />
        </div>
    );
}

export default History;
