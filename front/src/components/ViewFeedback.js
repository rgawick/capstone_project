import React, { Component } from 'react'
import axios from "axios"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'

const FEEDBACK_URL = 'http://localhost:8080/getFeedback/'

class ViewFeedback extends Component {

  state = {
    feedback: []
  }

  componentDidMount() {
    this.fetchFeedback()
  }

  componentWillMount() {
    if(!this.props.isAdmin){
      this.props.history.push('/')
    }
  }

  fetchFeedback = () => {
    axios.get(FEEDBACK_URL)
    .then(res => {
      const feedback = res.data;
      this.setState({ feedback })
    })
  }

    render() {

      let allPosts = null

      allPosts = this.state.feedback.map((post, index) => {

        console.log(post)
        let createdDate = post.created_at.split('').splice(0,10)

        return <li key={index}>
          <h3>{post.name}</h3>
          <label>{createdDate}</label>
          <p>{post.body}</p>
        </li>
      })

      return (
          <div className="centered">
            <h2>View all feedback</h2>
            <ul>
            {allPosts}
            </ul>
          </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated : state.isAuthenticated,
      isAdmin : state.isAdmin
    }
  }
  export default connect(mapStateToProps)(withRouter(ViewFeedback))
