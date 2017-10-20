
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
// import { PullView } from 'react-native-pull';
import styles from '../styles/Menu.style';
import Avatar from './Avatar';

class Menu extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderItem = ({item, index}) => {
    const { onItemSelected, activeItem } = this.props;
    return (
      <View>
        <Text
          onPress={() => onItemSelected(item)}
          style={[styles.item, (activeItem && activeItem.key === item.key) ? styles.itemActive : null]}
        >
          {item.name}
        </Text>
      </View>
    );
  }

  render() {

    const { activeItem, projectList, userConfig } = this.props;
    let { displayName, avatarUrls, name } = userConfig || {};

    return (
      <View style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Avatar
            style={styles.avatar}
            uri={avatarUrls && avatarUrls['48x48']}
            width={48}
            height={48}
          />
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <FlatList
          style={styles.scrollView}
          renderItem={this._renderItem}
          data={projectList}
          extraData={activeItem}
          onRefresh={this.props.onFetchProject}
          refreshing={false}
        />
      </View>
    );
  }
};

Menu.propTypes = {
  activeItem: PropTypes.object,
  onItemSelected: PropTypes.func.isRequired,
  onFetchProject: PropTypes.func
};
export default Menu;

