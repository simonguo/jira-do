import {Platform} from 'react-native';

/**
 * 判断平台
 * {{isIOS,isAndroid}}
 */
export  default {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android'
}