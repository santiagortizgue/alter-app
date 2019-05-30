import React, { Component } from 'react';
import { observer } from 'mobx-react';

import CommentStore from '../../stores/CommentStore';

let commentStore: CommentStore;

interface CommentProps {
    doc?: any
}

interface CommentState {
}

@observer export default class Comment extends Component<CommentProps, CommentState> {
    constructor(props: any) {
        super(props);

        commentStore = new CommentStore(getRandomInt(0, 10));
    }

    componentDidMount() {
        commentStore.findCommentAutor(this.props.doc.uid);
    }

    componentWillMount(){
        commentStore.cleanAutor();
    }

    render() {

        if (commentStore.autor == null || !commentStore.autor.color ) {
            return (<div className="Game-comment">
                <h5> Loading... </h5>
            </div>);
        }

        return (
            <div className="Game-comment">
                <h5 style={{ color: `rgb(${commentStore.autor.color })` }}> {commentStore.autor.displayName} </h5>
                <p> {this.props.doc.data} </p>
            </div>
        );
    }
}


function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
