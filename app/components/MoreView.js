import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as allDataActionCreators from '../actions/allData';

import NavBar from './NavBar';
import { FlexView } from './common/Layout';
import { Row, RowWithArrow, Header, SectionHeader, Line } from './common/List';
import { filter as intailFilters } from '../constants/data';

class MoreView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filters: intailFilters,
      isRefreshing: true
    };
  }

  componentWillMount() {
    this.handelRefresh();
  }

  handelRefresh = () => {
    const { onFetchFilterList } = this.props;
    onFetchFilterList((res) => {
      this.setState({
        filters: [...intailFilters, ...res],
        isRefreshing: false
      });
    });
  }

  handelGoFilterResult = (item) => {
    console.log(item);
    Actions.filterResult({
      title: item.name,
      jql: item.jql
    });
  }

  renderFilterItem(item) {
    const { name, jql } = item;
    return (
      <RowWithArrow key={name} label={name} onPress={() => this.handelGoFilterResult(item)} />
    );
  }

  renderFilterList() {
    const { filters } = this.state;
    return filters.map(item => this.renderFilterItem(item));
  }

  render () {
    const { isRefreshing } = this.state;
    return (
      <FlexView>
        <NavBar
          title='更多'
          leftIcon='ios-arrow-back'
          onLeftIconPress={() => Actions.pop()}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this.handelRefresh}
              refreshing={isRefreshing}
            />
          }
        >
          <SectionHeader text='筛选器' />
          { this.renderFilterList() }
        </ScrollView>

      </FlexView>
    );
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...allDataActionCreators
  }, dispatch);

  return {
    onFetchFilterList: actions.fetchFilterList
  };
}

export default connect(null, mapDispatch2Props)(MoreView);