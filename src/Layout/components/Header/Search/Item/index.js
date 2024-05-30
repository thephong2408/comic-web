// Item.jsx
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Item({ data }) {
    return (
        <>
            <Link to={`/comicbookcover/${data.name}`}>
                <div className={cx('wrapper')}>
                    <img className={cx('avt')} alt={data.name} src={data.url} />
                    <ul className={cx('name')}>
                        <li className={cx('name_1')}>
                            <h4>{data.name}</h4>
                        </li>
                        <li className={cx('chap')}> chap {data.sochuong.length}</li>
                    </ul>
                </div>
            </Link>
        </>
    );
}

export default Item;
