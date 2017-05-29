
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Menu.style';

class Menu extends Component {

  componentWillMount() {
    this.props.onFetchRapidViews();
  }

  render() {

    const { rapidViews, onItemSelected } = this.props;
    const views = _.get(rapidViews, 'views') || [];
    const userConfig = _.get(rapidViews, ['globalConfig', 'userConfig']) || {};
    let { displayName, avatarUrl, name } = userConfig;

    return (
      <View style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: avatarUrl ? avatarUrl.replace('xsmall', 'xlarge') : undefined }} />
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          >
          {views.map((item, index) => {
            return (
              <View
                key={index}
              >
                <Text
                  onPress={() => onItemSelected(item)}
                  style={styles.item}>
                  {item.name}
                </Text>

              </View>
            )
          })}

        </ScrollView>

      </View>
    );
  }
};

Menu.propTypes = {
  rapidViews: React.PropTypes.object,
  onFetchRapidViews: React.PropTypes.func,
  onItemSelected: React.PropTypes.func.isRequired,
};
export default Menu;

