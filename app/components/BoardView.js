
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  Platform
} from 'react-native';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import Spinner from 'react-native-loading-spinner-overlay';
import styles, { sliderWidth, itemWidth } from '../styles/BoardView.style';

class BoardView extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(item) {
    this.props.onItemSelect(item);
  }

  handelCarouselDidMount = (c) => {
    c && setTimeout(() => c.snapToItem(1), 100);
  }

  _renderSlide = ({item, index}) => {
    return (
      <SliderEntry
        onSelect={this.handleSelect}
        onFetchIssueList={this.props.onFetchIssueList}
        project={this.props.project}
        status={item}
      />
    );
  }

  render() {
    const { statusConfig, project } = this.props;
    return (
      <View style={styles.container} >
        { statusConfig ? 
          <Carousel
            data={statusConfig}
            renderItem={this._renderSlide}
            style={styles.wrapper}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={1}
            ref={(c) => this.handelCarouselDidMount(c)}
            extraData={project}
          />
          : null 
        }

        <Spinner visible={!statusConfig} textStyle={{ color: '#FFF' }} />

      </View>
    );
  }
};

BoardView.propTypes = {
  onItemSelect: PropTypes.func,
  project: PropTypes.string,
  statusConfig: PropTypes.array
};

export default BoardView;
