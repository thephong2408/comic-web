import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Item from '../Item';
import styles from './SearchInput.module.scss';
import { API } from '~/API';
import { Link, useLocation } from 'react-router-dom';
import SearchResult from '~/Pages/SearchResult';

const cx = classNames.bind(styles);

function SearchInput() {
    const url = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };
    const handleDelete = () => {
        setSearchValue('');
    };

    useEffect(() => {
        const filteredResults = API.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setSearchResults(filteredResults);
    }, [searchValue]);
    const to = searchValue.length > 0 ? `/searchresult/${searchValue}` : url;

    return (
        <>
            <span className={cx('search_results1')}>
                <div className={cx('search_results')}>
                    <SearchResult data={searchResults} />
                </div>
            </span>
            <div className={cx('search')}>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Tìm truyện..."
                    autoComplete="off"
                    value={searchValue}
                    onChange={handleInputChange}
                />
                {isLoading ? (
                    <FontAwesomeIcon className={cx('icon-loading', 'delete')} icon={faSpinner} />
                ) : (
                    searchValue.length > 0 && (
                        <FontAwesomeIcon onClick={handleDelete} className={cx('icon-loading')} icon={faXmark} />
                    )
                )}

                <button className={cx('search-btn')}>
                    <Link to={to}>
                        <FontAwesomeIcon
                            onClick={handleDelete}
                            className={cx('search-btn-btn')}
                            icon={faMagnifyingGlass}
                        />
                    </Link>
                </button>

                {searchResults && searchResults.length > 0 && searchValue.length > 0 && (
                    <div className={cx('search_results')}>
                        {searchResults.map((result, index) => (
                            <Item key={index} data={result} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchInput;
