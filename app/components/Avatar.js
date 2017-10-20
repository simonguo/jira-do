import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Platform
} from 'react-native';

import SvgUri from './SvgUri';

export default class SliderEntry extends Component {
  render() {
    let avatar = null;
    const { uri, width, height, style } = this.props;
    if (uri) {
      // let url = uri.indexOf('xsmall') > 0 ? uri.replace('xsmall', 'xlarge') : uri;
      // console.log(url);
      if (uri.indexOf('ownerId') >= 0 ) {
        avatar = <Image
          style={[style, {
            width,
            height
          }]}
          source={{ uri }}
        /> ;
      } else {
        avatar = <SvgUri
          style={style}
          source={{ uri }}
          width={width}
          height={height}
        /> ;
      }
    } else {
      avatar = <SvgUri
        style={style}
        source={require('../resources/useravatar.svg')}
        width={width}
        height={height}
      /> ;
    }
    return avatar;
  }
}