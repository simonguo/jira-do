
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  ScrollView,
  RefreshControl,
  Button,
  Picker,
  ActionSheetIOS,
  Platform
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as allDataActionCreators from '../actions/allData';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/DetailView.style';
import { Actions } from 'react-native-router-flux';
import NavBar from './NavBar';
import LoadingView from './LoadingView';
import Spinner from 'react-native-loading-spinner-overlay';
import SvgUri from './SvgUri';
import { SwipeRow } from 'react-native-swipe-list-view';

// import Detail from './Detail';
import Worklog from './Worklog';

import { Row, RowWithArrow, Header, SectionHeader, Line, EditButton, ButtonRow } from './common/List';
import { FabAddButton } from './common/Button';
import { FlexView } from './common/Layout';

const statusLabelColors = {
  '3': '#FFD065',
  '5': '#FFD065',
  '10001': '#FFD065',
  '10002': '#008A39',
  '6': '#008A39',
  '2': '#476983',
  '1': '#476983',
  '4': '#476983',
  '10000': '#476983',
  '10100': '#476983',
};

const statusTextColors = {
  '3': '#000000',
  '5': '#000000',
  '10001': '#000000',
  '10002': '#ffffff',
  '6': '#ffffff',
  '10100': '#ffffff',
  '1': '#ffffff',
  '4': '#ffffff',
  '10000': '#ffffff',
};


class DetailView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'detail',
      data: {},
      editItem: '',
      transitions: []
    };
  }
  componentWillMount() {
    this.handelFetch();
    this.fetchTransitions();
  }

  fetchTransitions() {
    const { onFetchTransitions, item } = this.props;
    onFetchTransitions(item.key, (res) => {
      this.setState({
        transitions: res.transitions
      });
    });
  }

  handelFetch = () => {
    const { item, onFetchDetail } = this.props;
    onFetchDetail(item.key, (resp)=>{
      this.setState({
        data: resp
      });
    });
  }

  showWorkLog = () => {
    const { data } = this.state;
    Actions.worklog({
      data
    });
  }

  showWorkLogForm = () => {
    const { data } = this.state;
    Actions.worklogForm({
      title: `${data.fields.summary} / ${data.key}`,
      issueId: data.id
    });
  }

  // handelEditStatus = () => {
  //   this.setState({
  //     editItem: 'status'
  //   });
  // }

  getStatusColor(statusId) {
    const { statusConfig } = this.props;
    return statusConfig.find(item => item.id === statusId).statusCategory.colorName;
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

  handelEditStatus = () => {
    const { transitions } = this.state;
    if (Platform.OS === 'ios') {
      let buttons = transitions.map((item) => item.name);
      buttons.push('取消');
      ActionSheetIOS.showActionSheetWithOptions({
        options: buttons,
        cancelButtonIndex: transitions.length
      }, index => {
        index < transitions.length && this.handelUpdateStatus(transitions[index].id);
      });
    }
  }

  handelUpdateStatus(statusId) {
    const { onEditIssue } = this.props;
    const { data } = this.state;
    console.log(statusId);
    onEditIssue(data.id, {
      transition: {
        id: statusId
      }
    }, this.handelFetch, this.handelFetch);
  }

  render() {
    const { status, statusConfig } = this.props;
    const { data } = this.state;
    const fields = _.get(data, 'fields');

    const { messages: intlDict } = this.context.intl;
    return (
      <FlexView>
        <NavBar
          title={intlDict.detail}
          leftIcon='ios-arrow-back'
          onLeftIconPress={() => Actions.pop()}
        />
        <Header text={`${_.get(fields, 'summary') || ''} / ${_.get(data, 'key') || ''}`} />
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              onRefresh={this.handelFetch}
              refreshing={!fields}
            />
          }
        >
          <FlexView style={styles.scrollContent}>
            <SectionHeader text={intlDict.detail} />

            <Row label={intlDict.type}>
              {fields ? this.renderIconAndText(_.get(fields, 'issuetype.iconUrl'), _.get(data, 'fields.issuetype.name')) : null}
            </Row>

            <Line />

            <Row label={intlDict.priority}>
              {fields ? this.renderIconAndText(_.get(fields, 'priority.iconUrl'), _.get(data, 'fields.priority.name')) : null}
            </Row>

            <Line />

            {/* <SwipeRow
              disableRightSwipe={true}
              rightOpenValue={-75}
              stopRightSwipe={-75}
            >
              <ButtonRow>
                <EditButton onPress={this.handelEditStatus} />
              </ButtonRow> */}
            <Row label={intlDict.status} onPress={this.handelEditStatus}>
              {fields ? (
                <View style={[{}, styles.statusLabel, {
                  backgroundColor: statusLabelColors[_.get(fields, 'status.id')],
                  borderColor: statusLabelColors[_.get(fields, 'status.id')],
                }]}>
                  <Text style={[styles.statusText, {
                    color: statusTextColors[_.get(fields, 'status.id')]
                  }]}>
                    {_.get(fields, 'status.name')}
                  </Text>
                </View>
              ) : null}
            </Row>
            {/* </SwipeRow> */}

            {_.get(fields, 'versions.0') ? ([
              <Line key="line-1" />,
              <Row key="row-1" label="影响版本">
                <Text style={styles.text}>
                  {_.get(fields, 'versions.0.name')}
                </Text>
              </Row>
            ]) : null}

            {_.get(fields, 'fixVersions.0') ? ([
              <Line key="line-2" />,
              <Row key="row-2" label="修复的版本">
                <Text style={styles.text}>
                  {_.get(fields, 'fixVersions.0.name')}
                </Text>
              </Row>
            ]) : null}

            <SectionHeader text={intlDict.personnel} />
            <Row label={intlDict.creator}>
              <Text style={styles.text}>{_.get(fields, 'creator.displayName')}</Text>
            </Row>
            <Line />
            <Row label={intlDict.assignee}>
              <Text style={styles.text}>{_.get(fields, 'assignee.displayName')}</Text>
            </Row>
            <SectionHeader text={intlDict.description} />
            <SectionHeader text='活动日志' />
            <Row label={intlDict.comment}>
              <Text style={styles.text}>{`${_.get(fields, 'comment.total')} 条`}</Text>
            </Row>
            <Line />
            <RowWithArrow label={intlDict.worklog} onPress={this.showWorkLog}>
              <Text style={styles.text}>{`${_.get(fields, 'worklog.total')} 条`}</Text>

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

function mapState2Props(state) {
  const { allData } = state;
  return {
    statusConfig: allData.statusConfig
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...allDataActionCreators
  }, dispatch);

  return {
    onFetchDetail: actions.fetchDetail,
    onFetchTransitions: actions.fetchTranstions,
    onEditIssue: actions.editIssue
  };
}


export default connect(mapState2Props, mapDispatch2Props)(DetailView);
