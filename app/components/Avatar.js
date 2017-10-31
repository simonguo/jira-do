import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Platform
} from 'react-native';

import SvgUri from './SvgUri';

export default class SliderEntry extends PureComponent {
  render() {
    let avatar = null;
    const { uri, width, height, style } = this.props;
    if (uri) {
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