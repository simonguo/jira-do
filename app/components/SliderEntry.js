import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as allDataActionCreators from '../actions/allData';
import styles from '../styles/SliderEntry.style';
import Avatar from './Avatar';
import SvgUri from './SvgUri';
import IssueList from './IssueList';

import withFetchList from './hoc/withFetchList';

const listKey = ['issues'];


class SliderEntry extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const { project, handleReload } = this.props;
    if (nextProps.project !== this.props.project) {
      handleReload();
    }
  }

  static getParams(props) {
    const { project, status } = props;
    return {
      project: project,
      status: status.id,
    };
  }

  render() {
    const { status } = this.props;
    let { total, data, handleReload, handleFetchNextPage, isRefreshing, isEnd } = this.props;
    return (
      <View style={styles.slideInnerContainer} >
        <Text style={styles.title} numberOfLines={1}>
          {`${status.name}(${total})`}
        </Text>
        { data ? <IssueList
          onRefresh={handleReload}
          onEndReached={handleFetchNextPage}
          refreshing={isRefreshing}
          list={data}
          total={total}
          isEnd={isEnd}
        /> : null }
        
      </View>
    );
  }
}


function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...allDataActionCreators
  }, dispatch);

  return {
    fetchFunc: actions.fetchIssueList,
  };
}

const fetchParams = {
  listKey
};

export default connect(null, mapDispatch2Props)(withFetchList(SliderEntry, fetchParams));
