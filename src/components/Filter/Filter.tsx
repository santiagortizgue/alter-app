import React, { Component } from 'react';
import './Filter.scss';

import { observer } from 'mobx-react';
import dbStore from '../../stores/DBStore';

interface FilterProps {
}

interface FilterState {
    fGenre?: any
    fBand?: any
    fColor?: any
}

@observer class Filter extends Component<FilterProps, FilterState> {

    constructor(props: any) {
        super(props);

        this.state = {
            fGenre: null,
            fBand: null,
            fColor: null
        }

    }

    componentDidMount() {
        dbStore.readFilterGenre();
        dbStore.readFilterBand();
        dbStore.readFilterColor();
    }

    componentWillUnmount() {
        dbStore.cleanFilterGenre();
        dbStore.cleanFilterBand();
        dbStore.cleanFilterColor();
    }

    render() {

        if (this.state.fGenre === null) {
            if (dbStore.filterGenre) {
                this.setState({
                    fGenre: dbStore.filterGenre
                });
            }
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        if (this.state.fBand === null) {
            if (dbStore.filterBand) {
                this.setState({
                    fBand: dbStore.filterBand
                });
            }
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        if (this.state.fColor === null) {
            if (dbStore.filterColor) {
                this.setState({
                    fColor: dbStore.filterColor
                });
            }
            return <div className="Filter"><div className="Loading"><p>Loading Filter...</p></div></div>;
        }

        return (
            <div className="Filter">
                <div className="Filter__genre">
                    <h2 className="Filter-title">Genre</h2>
                    <div className="Filter-genres">
                        {this.state.fGenre.map((genre: any) =>{
                            return <h3 className="hvr-underline-from-right" key={genre.id} onClick={(e:any)=>{
                                e.preventDefault();
                                dbStore.filterByGenre(genre.id);
                            }
                            }>{genre.name}</h3>;
                        })}
                    </div>
                </div>
                <div className="Filter__band">
                    <h2 className="Filter-title">Band</h2>
                    <div className="Filter-bands">
                        {this.state.fBand.map((band: any) =>{
                            return <h3 className="hvr-underline-from-right"  key={band.id} onClick={(e:any)=>{
                                e.preventDefault();
                                dbStore.filterByBand(band.name);
                            }
                            }>{band.name}</h3>;
                        })}
                    </div>
                </div>
                <div className="Filter__color">
                    <h2 className="Filter-title">Color</h2>
                    <div className="Filter-colors">
                        {this.state.fColor.map((color: any) =>{
                            return <div key={color.id} style={{backgroundColor: `rgb(${color.name})`}} onClick={(e:any)=>{
                                e.preventDefault();
                                dbStore.filterByColor(color.id);
                            }
                            }></div>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
