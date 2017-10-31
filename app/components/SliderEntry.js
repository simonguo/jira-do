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

const priorityStyle = {
  'P0': 'priority1',
  'P1': 'priority2',
  'P2': 'priority3',
  'P3': 'priority4',
  'P4': 'priority5'
};

const ITEM_HEIGHT = 60 + 10;

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

  handleSelectItem(item) {
    const { onSelect } = this.props;
    onSelect(item);
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

  static propTypes = {

  };

  _renderItem = ({item, index}) => {
    let field = item.fields;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.handleSelectItem(item);
        }}
        style={{
          // flex: 1,
          // flexDirection: 'row',
          // justifyContent: 'center',
          // width: '100%'
        }}
      >
        <View
          style={[styles.item, styles[priorityStyle[field.priority.name]]]}
        >
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start',}}>
            <SvgUri
              style={styles.itemTypeIcon}
              source={{ uri: field.issuetype.iconUrl }}
              width={12}
              height={12}
            />
            <Text style={styles.itemTextKey}>{item.key}</Text>
          </View>
          <Avatar
            style={styles.itemAvatar}
            uri={_.get(field, ['assignee', 'avatarUrls', '24x24'])}
            width={22}
            height={22}
          />
          <Text style={styles.itemText} numberOfLines={2}>{field.summary}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.key;

  _getItemLayout = (item, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})

  _getItemSeparatorComponent = () => (<View style={{ height: 10 }} ></View>)

  _getListFooterComponent = () => (
    <View style={{ height: 50 }} >
      {/* <Text style={{textAlign: 'center'}} >没有更多数据</Text> */}
    </View>
  )

  _getListHeaderComponent = () => (
    <View style={{ height: 10 }} >
    </View>
  )

  _getListEmptyComponent = () => (
    <View >
      <Text style={styles.nullData}>No data found</Text>
    </View>
  )

  render() {
    const { status, onSelect, onFetchIssueList, project } = this.props;
    let { total, list, request } = this.state;

    return (
      <View style={styles.slideInnerContainer} >
        <Text style={styles.title} numberOfLines={1}>
          {`${status.name}(${total})`}
        </Text>
        { list ? <FlatList
          style={styles.itemsView}
          data={this.state.list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          refreshing={request}
          onRefresh={this.handleReload}
          onEndReached={this.handleFetchNextPage}
          ItemSeparatorComponent={this._getItemSeparatorComponent}
          ListFooterComponent={this._getListFooterComponent}
          ListHeaderComponent={this._getListHeaderComponent}
          ListEmptyComponent={this._getListEmptyComponent}
          onEndReachedThreshold={0.1}
        /> : null }

      </View>
    );
  }
}