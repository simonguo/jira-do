import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  Platform,
  StyleSheet
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import Avatar from './Avatar';

function formatSecond(time) {
  if (time % 3600 === 0) {
    return time / 3600 + ' 小时';
  } else {
    return (time / 3600).toFixed(1) + ' 小时';
  }
}

class WorklogItem extends PureComponent {
  render() {
    const { item, index, onLongPress } = this.props;
    return (
      <TouchableHighlight
        style={styles.card}
        /* onLongPress={(e) => onLongPress(e, item.id)} */
      >
        <View >
          <View style={styles.info}>
            <Avatar uri={item.author.avatarUrls['24x24']} width={24} height={24} style={styles.avatar} />
            <Text style={styles.authorName}>{item.author.displayName}</Text>
            <Text style={styles.time}>{moment(item.started).format('YYYY-MM-DD HH:mm')}</Text>
            <Text style={styles.timeSpend}>{formatSecond(item.timeSpentSeconds)}</Text>
          </View>
          {item.comment ? <Text style={styles.comment}>
            {item.comment}
          </Text> : null}
          
        </View>
      </TouchableHighlight>
    );
  }
}

export default WorklogItem;