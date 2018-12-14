import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { shallow, mount } from 'enzyme';
import Histogram from './index.js';
import mockData from './mockData.js'

const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}

// const HistogramWrapper = ({ ...restProps }) => shallow(<Histogram {...restProps} />);
// describe('get mockDta', () => {
//   it('console logs', () => {
//     console.log("mockData", mockData)
//   })
// })
// const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 1000));

describe('<Histogram/> with mockData', async () => {
  let screen
  let postsByMonth = {}
  let postsByMonthSorted
  beforeEach(async () => {
    let posts = mockData.data.allPosts
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
    postsByMonthSorted = Object.keys(postsByMonth).map(month => ({month, posts: postsByMonth[month]})).sort((a,b) => months[a.month]-months[b.month])
    screen = mount(
      <Histogram data={postsByMonthSorted} width={1000} height={600}/>
    )
    // await asyncFlush();
  })
  it('it should be defined', () => {
    expect(Histogram).toBeDefined();
  });

  it('it should have three .vx-group class', () => {
    expect(screen.find('.vx-group')).to.have.lengthOf(3)
  });
})
