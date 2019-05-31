import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Comment.scss';

import stores from '../../stores/Stores';

interface CommentProps {
    doc?: any
}

interface CommentState {
    autor?: any,
    listenerAutor?: any
}

@observer export default class Comment extends Component<CommentProps, CommentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            autor: null,
            listenerAutor: null
        }

        this.getAutor = this.getAutor.bind(this);
    }

    componentDidMount() {
        stores.commentStore.findCommentAutor(this.props.doc.uid, this.getAutor);
    }

    componentWillUnmount() {
        stores.commentStore.cleanListernerCommentAutor(this.state.listenerAutor);
    }

    getAutor(a: any, listener: any): void {
        this.setState({
            autor: a,
            listenerAutor: listener
        });
    }

    render() {

        if (this.state.autor == null) {
            return (<div className="Comment">
                <h5> Loading... </h5>
                <p> {this.props.doc.data} </p>
            </div>);
        }

        return (
            <div className="Comment">
                <h5 style={{ color: `rgb(${this.state.autor.color})` }}> {this.state.autor.displayName} </h5>
                <p> {this.props.doc.data} </p>
            </div>
        );
    }
}
