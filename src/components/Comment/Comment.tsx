import React, { Component } from 'react';
import { observer } from 'mobx-react';

import stores from '../../stores/Stores';

interface CommentProps {
    doc?: any
}

interface CommentState {
    autor?: any
}

@observer export default class Comment extends Component<CommentProps, CommentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            autor: null,
        }

        this.getAutor = this.getAutor.bind(this);
    }

    componentDidMount() {
        stores.commentStore.findCommentAutor(this.props.doc.uid, this.getAutor);
    }

    componentWillMount(){
    }

    getAutor(a: any): void{
        this.setState({autor: a});
    }

    render() {

        if (this.state.autor == null) {
            return (<div className="Game-comment">
                <h5> Loading... </h5>
            </div>);
        }

        return (
            <div className="Game-comment">
                <h5 style={{ color: `rgb(${this.state.autor.color })` }}> {this.state.autor.displayName} </h5>
                <p> {this.props.doc.data} </p>
            </div>
        );
    }
}
