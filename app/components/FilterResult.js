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

import NavBar from './NavBar';
import IssueList from './IssueList';
import { FlexView } from './common/Layout';
import { Row, RowWithArrow, Header, SectionHeader, Line } from './common/List';

class FilterResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      total: 0,
      nextAt: 0,
      maxResults: 25,
      request: true
    };
  }
  componentWillMount() {
    this.handleReload(0);
  }

  handleReload = () => {
    this.handleFetch(0);
  }

  handleFetchNextPage = () => {
    const { total, list, request } = this.state;
    if (total > list.length) {
      this.handleFetch(this.state.nextAt);
    }
  }

  handleFetch = (startAt) => {
    const { jql, onFetchIssueList } = this.props;
    const { maxResults } = this.state;
    onFetchIssueList({
      jql,
      startAt,
      maxResults
    }, (resp) => {
      this.setState({
        total: resp.total,
        nextAt: startAt + resp.issues.length,
        list: startAt === 0 ? resp.issues : [...this.state.list, ...resp.issues],
        request: false
      });
    });
  }


  render () {
    const { list, request, total } = this.state;
    const { title } = this.props;
    return (
      <FlexView>
        <NavBar
          title={title}
          leftIcon='ios-arrow-back'
          onLeftIconPress={() => Actions.pop()}
        />
        <IssueList
          list={list}
          onRefresh={this.handleReload}
          onEndReached={this.handleFetchNextPage}
          refreshing={request}
          total={total}
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
    onFetchIssueList: actions.fetchIssueList,
  };
}

export default connect(null, mapDispatch2Props)(FilterResult);