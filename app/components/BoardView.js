
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
import Spinner from 'react-native-loading-spinner-overlay';
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
  getSlides(data) {
    if (!data) {
      return false;
    }

    return data.map((entry, index) => {
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
    const data = this.getSlidesData();


    if (allData.dataStatus==='SUCCESS' && !allData.data.issuesData) {
      return (
        <View style={styles.container}>
          <Text style={styles.loading}>No data found</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <Carousel
          style={styles.wrapper}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={1}
        >

          {this.getSlides(data)}
        </Carousel>
        <Spinner visible={allData.dataStatus === 'REQUEST'} textStyle={{ color: '#FFF' }} />

      </View>
    );
  }
};

BoardView.propTypes = {
  allData: React.PropTypes.object
}

export default BoardView;
