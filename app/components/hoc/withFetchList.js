import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function addFetchList (WrappedComponent, { maxResults, fetchFunc, listKey } = {}) {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        total: 0,
        nextAt: 0,
        _maxResults: maxResults || 25,
        list: [],
        isRefreshing: true,
        isFirst: true
      };
    }

    componentWillUpdate(nextProps) {
      const r = _.random(100000000, 9999999999);
      console.group(r);
      console.log('prevProps', this.props);
      console.log('nextProps', nextProps);
      console.groupEnd(r);
    }

    componentWillMount() {
      this.setState({
        isFirst: true
      });
      this.handleReload(0);
    }
  
    handleReload = () => {
      this.setState({
        isFirst: true
      });
      this.handleFetch(0);
    }
  
    handleFetchNextPage = () => {
      const { total, list, request } = this.state;
      if (total > list.length) {
        this.handleFetch(this.state.nextAt);
      }
    }

    handleFetch(startAt, projectKey) {
      let { _maxResults } = this.state;

      const params = WrappedComponent.getParams(this.props);  // isRequire
      console.log(startAt);

      const fun = fetchFunc || this.props.fetchFunc;

      fun({
        ...params,
        startAt,
        maxResults: _maxResults
      }, (resp) => {
        this.setState({
          total: resp.total,
          nextAt: startAt + _.get(resp, [...listKey, 'length']),
          list: startAt === 0 ? _.get(resp, listKey) : [...this.state.list, ..._.get(resp, listKey)],
          isRefreshing: false,
          isFirst: false
        });
      }, err => console.log(err));
    }

    render() {
      const { total, isRefreshing, nextAt, isFirst, isEnd, list } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          data={list}
          total={total}
          isRefreshing={isRefreshing}
          isEnd={nextAt >= total && !isFirst}
          handleReload={this.handleReload}
          handleFetchNextPage={this.handleFetchNextPage}
        />
      );
    }
  };
}