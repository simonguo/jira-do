import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as allDataActionCreators from '../actions/allData';

import withFetchList from './hoc/withFetchList';

import NavBar from './NavBar';
import IssueList from './IssueList';
import { FlexView } from './common/Layout';
import { Row, RowWithArrow, Header, SectionHeader, Line } from './common/List';

class FilterResult extends PureComponent {

  static getParams(props) {
    const { jql } = props;
    return {
      jql
    };
  }


  render () {
    let { total, data, handleReload, handleFetchNextPage, isRefreshing, isEnd, title } = this.props;
    return (
      <FlexView>
        <NavBar
          title={title}
          leftIcon='ios-arrow-back'
          onLeftIconPress={() => Actions.pop()}
        />
        <IssueList
          list={data}
          onRefresh={handleReload}
          onEndReached={handleFetchNextPage}
          refreshing={isRefreshing}
          list={data}
          total={total}
          isEnd={isEnd}
        />

      </FlexView>
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
  listKey: ['issues']
};

export default connect(null, mapDispatch2Props)(withFetchList(FilterResult, fetchParams));