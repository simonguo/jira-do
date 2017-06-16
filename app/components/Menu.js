
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import { PullView } from 'react-native-pull';
import styles from '../styles/Menu.style';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
    this.onPullRelease = this.onPullRelease.bind(this);
    this.state = {
      pullReloadText: 'pull reload'
    }
  }
  componentWillMount() {
    this.props.onFetchRapidViews();
  }
  onPullRelease(resolve) {
    this.props.onFetchRapidViews(() => {
      resolve();
    });
  }
  topIndicatorRender(pulling, pullok, pullrelease) {
    const hide = { position: 'absolute', left: 10000 };
    const show = { position: 'relative', left: 0 };
    setTimeout(() => {
      if (pulling) {
        this.txtPulling && this.txtPulling.setNativeProps({ style: show });
        this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
        this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
      } else if (pullok) {
        this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
        this.txtPullok && this.txtPullok.setNativeProps({ style: show });
        this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
      } else if (pullrelease) {
        this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
        this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
        this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: show });
      }
    }, 1);

    return (
      <View style={styles.reloadContainer}>
        <Text ref={(c) => { this.txtPulling = c; }}>Pulling...</Text>
        <Text ref={(c) => { this.txtPullok = c; }}>Loading...</Text>
        <Text ref={(c) => { this.txtPullrelease = c; }}>Loading...</Text>
      </View>
    );
  }
  render() {

    const { rapidViews, onItemSelected, activeItem } = this.props;
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
        <PullView
          onPullRelease={this.onPullRelease}
          topIndicatorRender={this.topIndicatorRender}
          topIndicatorHeight={60}
          style={styles.scrollView}
        >
          {views.length ? views.map((item, index) => {
            return (
              <View
                key={index}
              >
                <Text
                  onPress={() => onItemSelected(item)}
                  style={[styles.item, activeItem.id === item.id ? styles.itemActive : null]}
                >
                  {item.name}
                </Text>
              </View>
            )
          }) : <View><Text style={styles.nullData}>No data found</Text></View>}

        </PullView>

      </View>
    );
  }
};

Menu.propTypes = {
  activeItem: React.PropTypes.object,
  rapidViews: React.PropTypes.object,
  onFetchRapidViews: React.PropTypes.func,
  onItemSelected: React.PropTypes.func.isRequired,
};
export default Menu;

