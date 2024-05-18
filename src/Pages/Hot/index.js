import classNames from 'classnames/bind';
import styles from './Hot.module.scss';

import TableFlollow from '../Table/TableFlollow';
import TableHistory from '../Table/TableHistory';

const cx = classNames.bind(styles);
function Hot() {
    return (
        <div className={cx('wrapper')}>
            <TableHistory />
            <TableFlollow />
        </div>
    );
}

export default Hot;
