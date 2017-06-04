
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';

import styles, { sliderWidth, itemWidth } from '../styles/BoardView.style';

class BoardView extends Component {

  getSlidesData() {
    const { allData } = this.props;
    const issues = _.get(allData, ['data', 'issuesData', 'issues']) || [];
    const mappedColumns = _.get(allData, ['config', 'rapidListConfig', 'mappedColumns']) || []

    return mappedColumns.map(item => {

      let statuses = item.mappedStatuses.map(s => s.id);
      let list = issues.filter(i => _.includes(statuses, i.statusId));
      return {
        title: `${item.name} (${list.length})`,
        list
      }
    }) || [];

    // 1 开始, 4 重新打开, 10100 To Do ,10000  Backlog,
    // 10001: Selected for Development
    // 3 进行中
    // 5 已解决 6 关闭 10002 Done

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

    const data = this.getSlidesData();

    return (
      <View style={styles.container}>

        {
          data.length ? (
            <Carousel
              style={styles.wrapper}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
            >

              {this.getSlides(data)}
            </Carousel>
          ) : <Text style={styles.loading}>Loading...</Text>
        }

      </View>
    );
  }
};

BoardView.propTypes = {
  allData: React.PropTypes.object
}

export default BoardView;
