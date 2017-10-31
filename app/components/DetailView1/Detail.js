
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  ScrollView,
  Platform
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/DetailView.style';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import LoadingView from '../LoadingView';
import Spinner from 'react-native-loading-spinner-overlay';
import SvgUri from '../SvgUri';


const statusLabelColors = {
  '处理中': '#FFD065',
  '已解决': '#FFD065',
  'SELECTED FOR DEVELOPMENT': '#FFD065',
  'IN REVIEW': '#FFD065',
  '完成': '#008A39',
  '已关闭': '#008A39',
  '待办': '#476983',
  '开放': '#476983',
  '重新打开': '#476983',
  'BACKLOG': '#476983',
};

const statusTextColors = {
  '处理中': '#000000',
  '已解决': '#000000',
  'SELECTED FOR DEVELOPMENT': '#000000',
  'IN REVIEW': '#000000',
  '完成': '#ffffff',
  '已关闭': '#ffffff',
  '待办': '#ffffff',
  '开放': '#ffffff',
  '重新打开': '#ffffff',
  'BACKLOG': '#ffffff',
};


class Detail extends PureComponent {

  renderLoading() {
    return <LoadingView loading={true} />;
  }

  renderIconAndText(uri, text) {
    return (
      <View style={{flex: 1, flexDirection: 'row',alignItems: 'flex-start',}}>
        <SvgUri source={{ uri }} style={styles.fieldIcon} width={12} height={12} />
        <Text style={{marginLeft: 5}}>
          {text}
        </Text>
      </View>
    );
  }

  render() {
    const { data, status } = this.props;
    const { fields = {} } = data || {};
    // console.log(data);

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.scrollView}
        >
          <View style={styles.navRow}>
            <View style={{}}>
              <Image source={{ uri: data.projectAvatarUrl }} style={styles.proIcon} />
              <Text>{fields.summary} / {data.key}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colLabel}>
              <Text style={styles.itemLabelText}>类型 : </Text>
            </View>
            <View style={styles.colValue}>
              { data.fields ?  this.renderIconAndText(fields.issuetype.iconUrl, data.fields.issuetype.name) : null }
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colLabel}>
              <Text style={styles.itemLabelText}>优先级 : </Text>
            </View>
            <View style={styles.colValue}>
              { data.fields ?  this.renderIconAndText(fields.priority.iconUrl, data.fields.priority.name) : null }
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colLabel}>
              <Text style={styles.itemLabelText}>状态 : </Text>
            </View>
            <View style={styles.colValue}>
              {data.fields ? (
                <View style={[{}, styles.statusLabel, {
                  backgroundColor: statusLabelColors[fields.status.name],
                  borderColor: statusLabelColors[fields.status.name],
                }]}>
                  <Text style={[styles.statusText, {
                    color: statusTextColors[fields.status.name]
                  }]}>
                    {data.fields ? fields.status.name : ''}
                  </Text>
                </View>
              ) : null }
              
            </View>
          </View>

          { fields.versions && fields.versions[0] ? (
            <View style={styles.row}>
              <View style={styles.colLabel}>
                <Text style={styles.itemLabelText}>影响版本 : </Text>
              </View>
              <View style={styles.colValue}>
                <View style={{}}>
                  <Text>{data.fields ? fields.versions[0].name : ''}</Text>
                </View>
              </View>
            </View>
          ) : null }


          { fields.fixVersions && fields.fixVersions[0] ? (
            <View style={styles.row}>
              <View style={styles.colLabel}>
                <Text style={styles.itemLabelText}>修复的版本 : </Text>
              </View>
              <View style={styles.colValue}>
                <View style={{}}>
                  <Text>{data.fields ? fields.fixVersions[0].name : ''}</Text>
                </View>
              </View>
            </View>
          ) : null }
          

          { fields.description ? (
            <View style={styles.row}>
              <View style={styles.colLabel}>
                <Text style={styles.itemLabelText}>描述 : </Text>
              </View>
              <View style={styles.colValue}>
                <View style={{}}>
                  <Text>{data.fields ? fields.description : ''}</Text>
                </View>
              </View>
            </View>
          ) : null }
          

        </ScrollView>
        <Spinner visible={status === 'REQUEST'} />
      </View>
    );
  }
};

Detail.propTypes = {
  data: PropTypes.object
};

Detail.contextTypes = {
  intl: PropTypes.object.isRequired
};


export default Detail;
