
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  ScrollView,
  Button,
  Platform
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/DetailView.style';
import { Actions } from 'react-native-router-flux';
import NavBar from './NavBar';
import LoadingView from './LoadingView';
import Spinner from 'react-native-loading-spinner-overlay';
import SvgUri from './SvgUri';

// import Detail from './Detail';
import Worklog from './Worklog';

import { Row, RowWithArrow, Header, SectionHeader, Line } from './common/List';
import { FabAddButton } from './common/Button';
import { FlexView } from './common/Layout';

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


class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'detail'
    };
  }

  showWorkLog = () => {
    const { data } = this.props;
    Actions.worklog({
      data
    });
  }

  showWorkLogForm = () => {
    const { data } = this.props;
    Actions.worklogForm({
      title: `${data.fields.summary} / ${data.key}`,
      issueId: data.id
    });
  }

  renderIconAndText(uri, text) {
    return (
      <View style={styles.row}>
        <SvgUri source={{ uri }} style={styles.fieldIcon} width={12} height={12} />
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }

  render() {
    const { data, status } = this.props;
    const { fields = {} } = data || {};
    console.log(data);
    return (
      <FlexView>
        <NavBar
          title="详情"
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />
        <ScrollView
          style={styles.scrollView}
        >
          <FlexView style={styles.scrollContent}>
            <Header text={`${fields.summary} / ${data.key}`} />
            <SectionHeader text='详情' />
            <Row label="类型">
              { data.fields ?  this.renderIconAndText(fields.issuetype.iconUrl, data.fields.issuetype.name) : null }
            </Row>
            <Line />
            <Row label="优先级">
              { data.fields ?  this.renderIconAndText(fields.priority.iconUrl, data.fields.priority.name) : null }
            </Row>
            <Line />
            <Row label="状态">
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
            </Row>
            { fields.versions && fields.versions[0] ? ([
              <Line />,
              <Row label="影响版本">
                <Text style={styles.text}>{data.fields ? fields.versions[0].name : ''}</Text>
              </Row>
            ]) : null }

            { fields.fixVersions && fields.fixVersions[0] ? ([
              <Line />,
              <Row label="修复的版本">
                <Text style={styles.text}>{data.fields ? fields.fixVersions[0].name : ''}</Text>
              </Row>
            ]) : null }

            <SectionHeader text='人员' />
            <Row label='报告人'>
              <Text style={styles.text}>{fields.creator.displayName}</Text>
            </Row>
            <Line />
            <Row label='经办人'>
              <Text style={styles.text}>{fields.assignee.displayName}</Text>
            </Row>
            <SectionHeader text='描述' />
            <SectionHeader text='活动日志' />
            <RowWithArrow label='注释' color='#999'>
              <Text style={styles.text}>{`${fields.comment.total} 条`}</Text>
            </RowWithArrow>
            <Line />
            <RowWithArrow label='工作日志' color='#999' onPress={this.showWorkLog}>
              <Text style={styles.text}>{`${fields.worklog.total} 条`}</Text>
            </RowWithArrow>
          </FlexView>
        </ScrollView>
        <FabAddButton onPress={this.showWorkLogForm} />
      </FlexView>
    );
  }
};

DetailView.propTypes = {
  data: PropTypes.object
};

DetailView.contextTypes = {
  intl: PropTypes.object.isRequired
};


export default DetailView;
