
import React, { PureComponent } from 'react';
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
import styles from '../../styles/DetailView.style';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import LoadingView from '../LoadingView';
import Spinner from 'react-native-loading-spinner-overlay';
import SvgUri from '../SvgUri';

import Detail from './Detail';
import Worklog from './Worklog';



class DetailView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'detail'
    };
  }

  showDetail = () => {
    // console.log('showDetail')
    this.setState({
      tab: 'detail'
    });
  }

  showWorkLog = () => {
    // console.log('showWorkLog')
    this.setState({
      tab: 'worklog'
    });
  }

  showWorkLogForm = () => {
    const { data } = this.props;
    Actions.worklogForm({
      title: data.key,
      issueId: data.id
    });
  }

  render() {
    const { data, status } = this.props;
    // console.log(data);
    let { tab } = this.state;
    return (
      <View style={{
        flex: 1,
        ...Platform.select({
          android: {
            marginTop: -20
          }
        })
      }}>
        <NavBar
          title={data.key}
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />
        { tab === 'detail' ? <Detail data={data} /> : <Worklog data={data} />}
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%'}}>
          <Button title={'详情'} onPress={this.showDetail} />
          <Button title={'登记'} onPress={this.showWorkLogForm} />
          <Button title={'日志'} onPress={this.showWorkLog} />
        </View>
      </View>
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
