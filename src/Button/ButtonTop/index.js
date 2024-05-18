import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import styles from './ButtonTop.module.scss';

const cx = classNames.bind(styles);
function ButtonTop() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const threshold = 200;
        const currentScrollY = window.scrollY;

        if (currentScrollY > threshold) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <button className={cx({ visible: isVisible }, { 'btn-top': !isVisible })} onClick={scrollToTop}>
                <FontAwesomeIcon icon={faChevronUp} />
            </button>
        </>
    );
}

export default ButtonTop;
