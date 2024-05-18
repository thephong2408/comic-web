import React, { useState } from 'react';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
function Comment() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() === '') {
            return;
        }
        const updatedComments = [newComment, ...comments];

        setComments(updatedComments);
        setNewComment('');
    };

    const handleDelete = (index) => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <span className={cx('title')}>Bình Luận</span>

                <form className={cx('container')} onSubmit={handleSubmit}>
                    <textarea
                        className={cx('input')}
                        value={newComment}
                        onChange={handleChange}
                        placeholder="Thêm bình luận của bạn..."
                    />
                    <button className={cx('btn-send')} type="submit">
                        Gửi
                    </button>
                    <div className={cx('container-commnet')}>
                        <ul className={cx('comment-ul')} style={{ whiteSpace: 'pre-wrap' }}>
                            {comments.map((comment, index) => (
                                <li className={cx('comment-li')} key={index}>
                                    <div className={cx('avt')}>avt</div>
                                    <ul className={cx('comment-comment')}>
                                        <li className={cx('comment-name')}>name</li>
                                        <li className={cx('comment-li1')}>
                                            <p className={cx('comment-span')}>{comment}</p>
                                        </li>
                                    </ul>
                                    <button className={cx('btn-delete')} onClick={() => handleDelete(index)}>
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
            <div className={cx('thongtin')}>
                <span>Cảm ơn bạn đã quan tâm đến Web của chúng tôi</span>
                <span>Bạn có thể theo dõi lịch phát hành truyện qua các nhóm trên các Web trên nhóm</span>
                <h4 className={cx('div-other-title')}>Nhóm mạng xã hội</h4>
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
        </div>
    );
}

export default Comment;
