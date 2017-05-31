import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount () {
        //get the id from the url supported by react router

        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick () {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            //after delete back to home
            this.props.history.push('/');
        });
    }

    render () {
        const { post } = this.props;

        //normaly component will render first before we call any api call
        //to prevent that case we need to check if we have data to show already otherwise render loading text
        if (!post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >Delete Post</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps ({ posts }, ownProps) { //destructuring the state (state.posts)
    return ({ post: posts[ownProps.match.params.id] });
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
