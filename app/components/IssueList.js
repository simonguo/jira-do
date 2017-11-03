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
import { PaddingHorizontal } from './common/Layout';

const ITEM_HEIGHT = 60 + 10;

export default class IssueList extends PureComponent {

  handleSelectItem(item) {
    Actions.detail({
      item
    });
  }

  _renderItem = ({item, index}) => {
    return (
      <IssueItem
        item={item}
        index={index}
        onSelect={this.handleSelectItem}
      />
    );
  }

  _keyExtractor = (item, index) => item.key;

  _getItemLayout = (item, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})

  _getItemSeparatorComponent = () => (<View style={styles.separator} ></View>)

  _getListFooterComponent = () => {
    const { total, list } = this.props;
    return (
      <View style={styles.footer} >
        { list.length >= total ? <Text style={{textAlign: 'center'}} >没有更多数据</Text> : null }
      </View>
    );
  }

  _getListHeaderComponent = () => (
    <View style={styles.header} >
    </View>
  )

  _getListEmptyComponent = () => (
    <View >
      <Text style={styles.nullData}>No data found</Text>
    </View>
  )

  render() {
    const { list, onRefresh, onEndReached, refreshing, total } = this.props;

    return (
      <PaddingHorizontal
        paddingHorizontal={10}
        backgroundColor='#fff'
      >
        <FlatList
          style={styles.itemsView}
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          ItemSeparatorComponent={this._getItemSeparatorComponent}
          ListFooterComponent={this._getListFooterComponent}
          ListHeaderComponent={this._getListHeaderComponent}
          ListEmptyComponent={this._getListEmptyComponent}
          onEndReachedThreshold={0.1}
          extraData={total}
        />
      </PaddingHorizontal>
      
    );
  }
}