
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Menu.style';
import Avatar from './Avatar';

class Menu extends PureComponent {
  constructor(props) {
    super(props);
  }

  handelGoSetting = () => {
    const { userConfig } = this.props;
    Actions.setting({
      userConfig
    });
  }

  renderItem = ({item, index}) => {
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

  renderListFooter = () => {
    return (
      <View style={styles.footer}>

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
          renderItem={this.renderItem}
          data={projectList}
          extraData={activeItem}
          onRefresh={this.props.onFetchProject}
          refreshing={false}
          ListFooterComponent={this.renderListFooter}
        />
        <View style={styles.bottomMenu}>
          <TouchableWithoutFeedback
            style={styles.menuItem}
            onPress={this.handelGoSetting}
          >
            <View style={styles.flexRow}>
              <Icon
                name='ios-cog'
                style={[styles.icon]}
              />
              <Text style={styles.menuText}>设置</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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

