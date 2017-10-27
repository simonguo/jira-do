import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  open = (type) => {
    const { date, onChange } = this.props;
    if (isIOS) {
      this.setState({
        show: true
      });
    } else {
      if (type === 'date') {
        DatePickerAndroid.open({
          date: new Date(date.get('unix'))
        }).then(({action, year, month, day}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
            onChange(date.clone().set({
              year,
              month,
              date: day
            }));
          }
        });
      } else if (type === 'time') {
        TimePickerAndroid.open({
          date: new Date(date.get('unix'))
        }).then(({action, hour, minute}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
            onChange(date.clone().set({
              hour,
              minute
            }));
          }
        });
      } else {
        let newDate = date.clone();
        // 日期选择器
        DatePickerAndroid.open({
          date: new Date(date.get('unix'))
        }).then(({action, year, month, day}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
            newDate.set({
              year,
              month,
              date: day
            });
            // 时间选择器
            TimePickerAndroid.open({
              date: new Date(date.get('unix'))
            }).then(({action, hour, minute}) => {
              if (action !== DatePickerAndroid.dismissedAction) {
                onChange(newDate.set({
                  hour,
                  minute
                }));
              }
            });
          }
        });
      }
    }
  }
  close = () => {
    this.setState({
      show: false
    });
  }
  render() {
    const { date, onChange } = this.props;
    if (isIOS) {
      return (
        <Modal
          visible={this.state.show}
          transparent={true}
          animationType={'fade'}
        >
          <TouchableWithoutFeedback
            style={{
              height: viewportHeight - 215
            }}
            onPress={this.close}
          >
            <View style={{flex: 1, backgroundColor: '#000', opacity: 0.5}}></View>
          </TouchableWithoutFeedback>
          <DatePickerIOS
            date={new Date(date.get('unix'))}
            style={{
              opacity: 1,
              height: 215,
              backgroundColor: '#fff'
            }}
            onDateChange={onChange}
          />
        </Modal>
      );
    } else {
      return null;
    }
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(moment),
  defaultValue: PropTypes.instanceOf(moment)
};

const styles = StyleSheet.create({
  
});


export default DatePicker;