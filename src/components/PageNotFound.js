import React from 'react';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <div className={`container main-container ${styles.container}`}>
            <div className='row'>
                <div className='col-12'>
                    <h1>404 Page not found</h1>
                </div>
                <div className='col-12'>
                    <p>The page you are looking for was not found!</p>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;