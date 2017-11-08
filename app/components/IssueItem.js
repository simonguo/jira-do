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


export default class IssueItem extends PureComponent {

  render() {
    const {item, index, onSelect} = this.props;
    const field = _.get(item, 'fields');
    if (!field) {
      return null;
    }
    // console.time(field.issuetype.iconUrl);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onSelect(item);
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
}

IssueItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onSelect: PropTypes.func
};