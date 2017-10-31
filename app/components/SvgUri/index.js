import React, { PureComponent } from 'react';
import SvgUri from './SvgUri';

const CacheSvgComponent = (() => {
  let cache = {};
  return (props) => {
    const { source, width, height, style } = props;
    if (source && source.uri) {
      const { uri } = source;
      let obj = cache[uri];
      if (!obj || (obj && (obj.width !== width || obj.height !== height || obj.style !== style))) {
        let svg = <SvgUri
          height={height}
          source={source}
          style={style}
          width={width}
        />;
        obj = {
          width,
          height,
          style,
          svg
        };
        cache[uri] = obj;
      }
      return obj.svg;
    }
    return null;
  };
})();

export default CacheSvgComponent;
