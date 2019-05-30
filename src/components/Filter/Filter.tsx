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
        stores.dbStore.readFilterGenre();
        stores.dbStore.readFilterBand();
        stores.dbStore.readFilterColor();
    }

    componentWillUnmount() {
        stores.dbStore.cleanFilterGenre();
        stores.dbStore.cleanFilterBand();
        stores.dbStore.cleanFilterColor();
    }

    render() {

        if (!stores.dbStore.filterGenre) {
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        if (!stores.dbStore.filterBand) {
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        if (!stores.dbStore.filterColor) {
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        return (
            <section className="Filter">
                <div className="Filter__genre">
                    <h2 className="Filter-title">Genre</h2>
                    <div className="Filter-genres">
                        {stores.dbStore.filterGenre.map((genre: any) => {
                            return <h3 className="hvr-underline-from-right" key={genre.id} onClick={(e: any) => {
                                e.preventDefault();
                                stores.dbStore.filterByGenre(genre.id);
                            }
                            }>{genre.name}</h3>;
                        })}
                    </div>
                </div>
                <div className="Filter__band">
                    <h2 className="Filter-title">Band</h2>
                    <div className="Filter-bands">
                        {stores.dbStore.filterBand.map((band: any) => {
                            return <h3 className="hvr-underline-from-right" key={band.id} onClick={(e: any) => {
                                e.preventDefault();
                                stores.dbStore.filterByBand(band.name);
                            }
                            }>{band.name}</h3>;
                        })}
                    </div>
                </div>
                <div className="Filter__color">
                    <h2 className="Filter-title">Color</h2>
                    <div className="Filter-colors">
                        {stores.dbStore.filterColor.map((color: any) => {
                            return <div key={color.id} style={{ backgroundColor: `rgb(${color.name})` }} onClick={(e: any) => {
                                e.preventDefault();
                                stores.dbStore.filterByColor(color.id);
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
