import { useEffect, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { API } from '~/API';
const cx = classNames.bind(styles);
export default function Swiper1() {
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            // Lấy kích thước hiện tại của màn hình
            const screenWidth = window.innerWidth;

            // Xác định số lượng slidesPerView dựa trên kích thước của màn hình
            let newSlidesPerView;
            if (screenWidth >= 1200) {
                newSlidesPerView = 6;
            } else if (screenWidth >= 1000 && screenWidth < 1400) {
                newSlidesPerView = 5;
            } else if (screenWidth >= 800 && screenWidth < 100) {
                newSlidesPerView = 4;
            } else if (screenWidth >= 600 && screenWidth < 800) {
                newSlidesPerView = 3;
            } else {
                newSlidesPerView = 2;
            }

            // Cập nhật số lượng slidesPerView
            setSlidesPerView(newSlidesPerView);
        };

        // Lắng nghe sự kiện thay đổi kích thước màn hình
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // API
    const [posts, setPosts] = useState([]);
    // lấy API
    useEffect(() => {
        setPosts(API);
    }, []);

    return (
        <>
            <h3>Đề cử truyện</h3>
            <Swiper
                modules={[Virtual, Navigation, Pagination]}
                slidesPerView={slidesPerView}
                spaceBetween={30}
                navigation={true}
                names
                loop={true}
                virtual
            >
                {posts
                    .filter((post) => post.luotxem > 1000)
                    .slice(0, 10)
                    .map((post, index) => (
                        <SwiperSlide key={index}>
                            <div className={cx('wrapper')}>
                                <div>
                                    <Link to={`/comicbookcover/${post.name}`}>
                                        <img className={cx('img')} alt="/" src={post.url} />
                                    </Link>
                                    <div className={cx('name')}>
                                        <p>
                                            <span className={cx('names')}>{post.name}</span>
                                            <span className={cx('chap')}> số chap {post.sochuong.length}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    );
}
