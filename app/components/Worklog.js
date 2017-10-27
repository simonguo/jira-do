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
import { Actions } from 'react-native-router-flux';

import Avatar from './Avatar';
import NavBar from './NavBar';
import { FlexView } from './common/Layout';

import styles from '../styles/Worklog.style';

function formatSecond(time) {
  if (time % 3600 === 0) {
    return time / 3600 + ' 小时';
  } else {
    return (time / 3600).toFixed(1) + ' 小时';
  }
}

class Worklog extends PureComponent {

  _renderItem = ({item, index}) => {
    console.log(item);
    return (
      <TouchableHighlight style={styles.card}>
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

  _keyExtractor = (item, index) => item.id

  _getItemSeparatorComponent = () => (<View style={{ height: 5 }} ></View>)

  render() {
    const { data } = this.props;
    const worklog = _.get(data, ['fields', 'worklog', 'worklogs']);
    console.log(worklog);
    return (
      <FlexView>
        <NavBar
          title="详情"
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />
        <FlatList
          style={{flex: 1, width: '100%'}}
          data={worklog}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._getItemSeparatorComponent}
        />
      </FlexView>

    );
  }
}



export default Worklog;