import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array
  };

  render() {
    const { title, list = [] } = this.props;
    const priorityStyle = {
      '危险': 'priority1',
      '严重': 'priority2',
      '重要': 'priority3',
      '轻微': 'priority4'
    }
    return (
      <View
        style={styles.slideInnerContainer}
      >
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <ScrollView style={styles.itemsView}>
          {list.map((item, index) => {
            return (
              <View
                key={index}
                style={[styles.item, styles[priorityStyle[item.priorityName]]]}
              >

                <Text style={styles.itemText}>{item.summary}</Text>
                <Image
                  style={styles.itemAvatar}
                  source={{ uri: item.avatarUrl }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}