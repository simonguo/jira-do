import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  Platform,
  StyleSheet
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WorklogItem from './WorklogItem';

import Avatar from './Avatar';
import NavBar from './NavBar';
import { FlexView } from './common/Layout';
import { Header } from './common/List';
// import { PopupMenu } from './common/Button';

import * as allDataActionCreators from '../actions/allData';

import styles from '../styles/Worklog.style';



class Worklog extends PureComponent {
  constructor(props) {
    super(props);
    const { data, onFetchWorklog } = props;
    const worklog = _.get(data, ['fields', 'worklog']);
    this.state = {
      worklogs: worklog.worklogs
    };
    if (worklog.total > worklog.maxResults) {
      props.onFetchWorklog(data.id, (res) => {
        this.setState({
          worklogs: res.worklogs
        });
      });
    }
  }

  handelEdit = (id) => {
  }

  handelDelete = (id) => {
  }
  _renderItem = (props) => {
    return (
      <WorklogItem
        {...props}
      />
    );
  }

  _keyExtractor = (item, index) => item.id

  _getItemSeparatorComponent = () => (<View style={{ height: 5 }} ></View>)

  render() {
    const { messages: intlDict } = this.context.intl;
    const { data } = this.props;
    const { worklogs } = this.state;;
    return (
      <FlexView>
        <NavBar
          title={intlDict.worklog}
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />
        <Header text={`${data.fields.summary} / ${data.key}`} />
        <FlatList
          style={{flex: 1, width: '100%'}}
          data={worklogs}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._getItemSeparatorComponent}
        />
        {/* <PopupMenu ref={ref => this.popupMenu = ref} /> */}
      </FlexView>

    );
  }
}

Worklog.contextTypes = {
  intl: PropTypes.object.isRequired
};

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...allDataActionCreators
  }, dispatch);

  return {
    onFetchWorklog: actions.fetchWorklog,
  };
}

export default connect(null, mapDispatch2Props)(Worklog);
