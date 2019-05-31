import React, { Component } from 'react';
import './Filter.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';

interface FilterProps {
}

interface FilterState {
}

@observer class Filter extends Component<FilterProps, FilterState> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        stores.musicStore.readFilterGenre();
        stores.musicStore.readFilterBand();
        stores.musicStore.readFilterColor();
    }

    componentWillUnmount() {
        stores.musicStore.cleanFilterGenre();
        stores.musicStore.cleanFilterBand();
        stores.musicStore.cleanFilterColor();
    }

    render() {

        if (!stores.musicStore.filterGenre) {
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        if (!stores.musicStore.filterBand) {
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        if (!stores.musicStore.filterColor) {
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        return (
            <section className="Filter">
                <div className="Filter__genre">
                    <h2 className="Filter-title">Genre</h2>
                    <div className="Filter-genres">
                        {stores.musicStore.filterGenre.map((genre: any) => {
                            return <h3 className="hvr-underline-from-right" key={genre.id} onClick={(e: any) => {
                                e.preventDefault();
                                stores.musicStore.filterByGenre(genre.id);
                            }
                            }>{genre.name}</h3>;
                        })}
                    </div>
                </div>
                <div className="Filter__band">
                    <h2 className="Filter-title">Band</h2>
                    <div className="Filter-bands">
                        {stores.musicStore.filterBand.map((band: any) => {
                            return <h3 className="hvr-underline-from-right" key={band.id} onClick={(e: any) => {
                                e.preventDefault();
                                stores.musicStore.filterByBand(band.name);
                            }
                            }>{band.name}</h3>;
                        })}
                    </div>
                </div>
                <div className="Filter__color">
                    <h2 className="Filter-title">Color</h2>
                    <div className="Filter-colors">
                        {stores.musicStore.filterColor.map((color: any) => {
                            return <div key={color.id} style={{ backgroundColor: `rgb(${color.name})` }} onClick={(e: any) => {
                                e.preventDefault();
                                stores.musicStore.filterByColor(color.id);
                            }
                            }></div>;
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Filter;
