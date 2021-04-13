import React, { Component } from 'react'

class EachComment extends Component {
  render () {
    return (
      <div className='comment'>
        <p>{this.props.comment.content}</p>
      </div>
    )
  }
}

export default EachComment