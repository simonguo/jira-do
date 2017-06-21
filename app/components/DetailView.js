
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView
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

class DetailView extends Component {

  renderLoading() {
    return <LoadingView loading={true} />;
  }
  renderRow(field) {
    return (
      <View style={styles.colValue}>

        <Text style={styles.itemText}>{field.html || field.text || '--'}</Text>
      </View>
    );
  }

  render() {
    const { data, status } = this.props;
    const { fields = [] } = data;

    const fieldItems = fields.filter((field) => {
      return !['description', 'issuekey'].some(k => k === field.id);
    }).map((field, index) => {
      return (
        <View style={styles.row} key={index}>
          <View style={styles.colLabel}>
            <Text style={styles.itemLabelText}>{field.label} : </Text>
          </View>
          {this.renderRow(field)}
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>

        <NavBar
          title={data.key}
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />

        <ScrollView
          style={styles.scrollView}
        >
          <View style={styles.navRow}>
            <Text style={styles.itemText}>
              <Image source={{ uri: data.projectAvatarUrl }} style={styles.proIcon} />
              {' '}
              {data.projectName} / {data.key}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.colLabel}>
              <Text style={styles.itemLabelText}>类型 : </Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.itemText}>
                <Image source={{ uri: data.typeUrl }} style={styles.fieldIcon} />
                {' '}
                {data.typeName}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colLabel}>
              <Text style={styles.itemLabelText}>优先级 : </Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.itemText}>
                <Image source={{ uri: data.priorityUrl }} style={styles.fieldIcon} />
                {' '}
                {data.priorityName}
              </Text>
            </View>
          </View>

          {fieldItems}

        </ScrollView>
        <Spinner visible={status === 'REQUEST'} />
      </View>
    )
  }
};

DetailView.propTypes = {
  data: React.PropTypes.object
}

DetailView.contextTypes = {
  intl: React.PropTypes.object.isRequired
}


function mapState2Props(state) {
  const { allData } = state;
  return {
    data: allData.detail,
    status: allData.detailStatus
  }
}

export default connect(mapState2Props)(DetailView);
