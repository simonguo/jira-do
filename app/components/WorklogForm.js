import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  Button,
  ScrollView,
  TextInput,
  StyleSheet
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';
import { Actions } from 'react-native-router-flux';

import * as allDataActionCreators from '../actions/allData';


import NavBar from './NavBar';
import DatePicker from './common/DatePicker';
import styles from '../styles/WorklogForm.style';

import { Row, Header, SectionHeader, Line } from './common/List';
import { FlexView } from './common/Layout';
import { ButtonBlock } from './common/Button';

import { getMatches } from '../utils/commen';

class WorklogForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeSpend: '',
      startTime: moment(),
      comment: '',
      timeSpentSeconds: 0,
    };
  }
  handelSubmitForm = () => {
    let { startTime, timeSpentSeconds, timeSpend, comment } = this.state;
    if (!timeSpend) {
      this.handleAlert('error', '错误', '必须填写耗费时间');
      return;
    }
    if (!timeSpentSeconds) {
      this.handleAlert('error', '错误', '耗费时间格式错误');
      return;
    }
    const { issueId, id, onAddWorklog } = this.props;
    let requestBody = {
      timeSpentSeconds,
      started: startTime.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
      comment
    };
    onAddWorklog(issueId, requestBody, (res) => {
      if (res.errors) {
        this.handleAlert('error', '错误', '提交失败');
      } else {
        this.handleAlert('success', '消息', '提交成功');
        setTimeout(Actions.pop, 1000);
      }
    });
  }
  handelCancel = () => {

  }
  handelTimeSpendChange = (text) => {
    let { timeSpend } = this.state;
    if (/[^0-9wdhm. ]/.test(text)) {  // 如果有除 0-9wdhm. 以外的字符，禁止输入
      return false;
    }
    let matches = getMatches(/[0-9.]+[wdhm]/g, text);
    let spentSeconds = 0;
    matches.forEach(time => {
      let second = parseFloat(time);
      if (/w/.test(time)) {
        second *= 5 * 8 * 3600;
      } else if (/d/.test(time)) {
        second *= 8 * 3600;
      } else if (/h/.test(time)) {
        second *= 3600;
      } else if (/m/.test(time)) {
        second *= 60;
      }
      spentSeconds += second;
    });

    this.setState({
      timeSpend: text,
      timeSpentSeconds: Math.round(spentSeconds)
    });

  }

  handelCommentChange = (text) => {
    this.setState({
      comment: text
    });
  }
  handelDateChange = (date) => {
    this.setState({
      startTime: moment(date)
    });
  }
  handelEditDate = () => {
    this._datePicker && this._datePicker.open();
  }
  // handelEditTime = () => {
  //   this._datePicker && this._datePicker.open('time');
  // }
  handleAlert(type, title, message) {
    this.alert.alertWithType(type, title, message);
  }
  render() {
    const { title } = this.props;
    let { startTime, timeSpend } = this.state;

    return (
      <FlexView>
        <NavBar
          title="登记工作日志"
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />

        <ScrollView>
          <Header text={title} />
          <SectionHeader text='时间' />
          <Row label="耗费时间" style={styles.formGroup}>
            <TextInput
              value={timeSpend}
              onChangeText={this.handelTimeSpendChange}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          </Row>
          <Line />
          <Row label="开始时间" style={styles.formGroup}>
            <TouchableHighlight onPress={this.handelEditDate}>
              <Text style={styles.input}>
                {startTime.format('ddd YYYY-MM-DD HH:mm')}
              </Text>
            </TouchableHighlight>
          </Row>

          <SectionHeader text='工作说明' />
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline={true}
            onChangeText={this.handelCommentChange}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />

          <ButtonBlock
            onPress={this.handelSubmitForm}
            title='提交'
            type='primary'
          />
        </ScrollView>

        <DatePicker
          ref={ref => this._datePicker = ref}
          date={startTime}
          onChange={this.handelDateChange}
        />
        <DropdownAlert ref={(ref) => this.alert = ref} />
      </FlexView>
    );

  }
}

WorklogForm.contextTypes = {
  intl: PropTypes.object.isRequired
};



function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...allDataActionCreators
  }, dispatch);

  return {
    onAddWorklog: actions.addWorklog,
  };
}

export default connect(null, mapDispatch2Props)(WorklogForm);