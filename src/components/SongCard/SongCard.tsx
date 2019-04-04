import React, { Component } from 'react';
import './SongCard.scss';

import { Link } from 'react-router-dom';

const SongCard = function (props: any) {
    return (
        <div className="SongCard">
            <Link to={`/song/${props.song.id}`}>
                <svg viewBox="0 0 50 50">
                    <path d="M17.3,33.88V16.12L32.7,25Zm2-14.3V30.42L28.68,25Z" />
                </svg>
                <div className="SongCard-title"><h3>{props.song.name}</h3></div>
            </Link>
        </div>

    );
}

export default SongCard;
