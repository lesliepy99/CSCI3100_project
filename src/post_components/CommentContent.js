/*
*Comment content MODULE
*PROGRAMMER: XU Haoran
*VERSION: 1.0 (30 April 2021)
*PURPOSE: Provide the comment content interface for users to comment under each post.
*/

import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import './comment_index.css'

class CommentContent extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  // Deal with submission of comments
  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('Please Type Username')
    if (!comment.content) return alert('Please Comment Here')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({ comments })
    this._saveComments(comments)
  }
  
  // Deal with deletion of comments
  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)} />
      </div>
    )
  }
}

export default CommentContent