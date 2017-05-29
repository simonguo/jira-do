
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';

import styles from '../styles/LoginView.style';

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;




class BoardView extends Component {
  getSlidesData() {
    const { allData } = this.props;
    const nextData = [{
      title: 'Backlog',
      list: []
    }, {
      title: 'In progress',
      list: []
    }, {
      title: 'Done',
      list: []
    }];
    const issues = _.get(allData, ['data', 'issuesData', 'issues']) || [];

    nextData[0].list = issues.filter(item => item.statusId === '10000') || [];
    nextData[1].list = issues.filter(item => item.statusId === '3') || [];
    nextData[2].list = issues.filter(item => item.statusId === '10002') || [];
    return nextData;
  }
  getSlides(entries) {
    if (!entries) {
      return false;
    }

    return entries.map((entry, index) => {
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          {...entry}
        />
      );
    });
  }
  render() {

    const { allData } = this.props;
    const issues = _.get(allData, ['data', 'issuesData', 'issues']);

    return (
      <View style={styles.container}>
        <Carousel
          style={styles.wrapper}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={1}
        >

          {this.getSlides(this.getSlidesData())}
        </Carousel>
      </View>
    );
  }
};

BoardView.propTypes = {
  allData: React.PropTypes.object
}

export default BoardView;
