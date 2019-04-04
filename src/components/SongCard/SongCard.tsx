import React, { Component } from 'react';
import './SongCard.scss';

import { Link } from 'react-router-dom';

const SongCard = function (props: any) {
    return (
        <div className="SongCard">
            <Link to={`/song/${props.song.id}`}>
                <svg className="playSvg" viewBox="0 0 50 50">
                    <path d="M18.32,20.88H13.57V18.13h4.75Zm-4-.75h3.25V18.88H14.32Z" />
                    <path d="M19.32,28.21H15.57V25.46h3.75Zm-3-.75h2.25V26.21H16.32Z" />
                    <path d="M20.32,24.54H17.57V21.79h2.75Zm-2-.75h1.25V22.54H18.32Z" />
                    <path d="M20.32,31.88H13.57V29.13h6.75Zm-6-.75h5.25V29.88H14.32Z" />
                    <path d="M22.67,33.88V16.12L38.06,25Zm2-14.3V30.42L34.05,25Z" />
                </svg>
                <div className="SongCard-title"><h3>{props.song.name}</h3></div>
            </Link>
        </div>

    );
}

export default SongCard;
