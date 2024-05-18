import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import TableFlollow from '../Table/TableFlollow';
import TableHistory from '../Table/TableHistory';
import TableRank from '../Table/TableRank';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <TableHistory />
            <TableFlollow />
            <TableRank />
        </div>
    );
}

export default Home;
