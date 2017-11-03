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
import styles from '../styles/SliderEntry.style';
import Avatar from './Avatar';
import SvgUri from './SvgUri';
import IssueItem from './IssueItem';
import IssueList from './IssueList';


export default class SliderEntry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      nextAt: 0,
      maxResults: 25,
      list: [],
      request: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { status, onSelect, onFetchIssueList, project } = this.props;
    if (nextProps.project !== this.props.project) {
      // this.setState({
      //   request: true
      // });
      this.handleFetch(0, nextProps.project);
    }
  }

  componentWillMount() {
    this.handleReload();
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

  handleFetch(startAt, projectKey) {
    const { onFetchIssueList, project, status } = this.props;
    let { maxResults, request } = this.state;
    onFetchIssueList({
      project: projectKey || project,
      status: status.id,
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


  render() {
    const { status, onSelect, onFetchIssueList, project } = this.props;
    let { total, list, request } = this.state;

    return (
      <View style={styles.slideInnerContainer} >
        <Text style={styles.title} numberOfLines={1}>
          {`${status.name}(${total})`}
        </Text>
        { list ? <IssueList
          onRefresh={this.handleReload}
          onEndReached={this.handleFetchNextPage}
          refreshing={request}
          list={list}
          total={total}
        /> : null }

      </View>
    );
  }
}