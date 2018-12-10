import React, {Fragment} from 'react'
import ReactDOM from 'react-dom';
import './styles.css';

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import gql from 'graphql-tag';
import ApolloClient, { gql } from 'apollo-boost';

import { Query, Mutation } from 'react-apollo';
import axios from 'axios';
import {client} from 'index'

const GET_POSTS = gql`{
  allPosts(count: 100) {
	  id,
    createdAt
	}
}`
// const axiosGraphQL = axios.create({
//   baseURL: 'http://localhost:4000',
// });
const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  June: 6,
  July: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    let postsByMonth = {}
    client
      .query({
        query: GET_POSTS,
        // variables: {
        //   organization: 'the-road-to-learn-react',
        // },
      })
      .then(response => {
        console.log("===GET_POSTS QUERY RESULT data", response)
        let posts = response.data.allPosts
        posts.forEach(post => {
          let month = post.createdAt.split(' ')[1]
          let year = post.createdAt.split(' ')[3]
          if(year === '2018') {
            if(!postsByMonth[month]) {
              postsByMonth[month] = [post]
            } else {
              postsByMonth[month].push(post)
            }
          }
        })


        // posts.sort((a,b) => months[a.month] - months[b.month])

        this.setState({postsByMonth})
      });
  }
  render() {
    if(this.state.postsByMonth) {
      return (
        <Fragment>
          <h1>React GraphQL D3</h1>
          {
            Object.keys(this.state.postsByMonth).map((month) => {
              return <div key={month}>{this.state.postsByMonth[month].length}</div>
            })
          }
        </Fragment>
      );
    }
    return <h1>Loading</h1>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
