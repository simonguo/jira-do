import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');
export default StyleSheet.create({
  menu: {
    width: '100%',
    height: window.height,
    padding: 0,
    position: 'relative',
    zIndex: 300
  },
  avatarContainer: {
    paddingTop: 40,
    paddingLeft: 20,
    height: 110,
    backgroundColor: '#205081'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  displayName: {
    position: 'absolute',
    left: 90,
    top: 45,
    color: '#fff'
  },
  name: {
    position: 'absolute',
    left: 90,
    top: 65,
    color: '#fff'
  },
  scrollView: {
    padding: 10
  },
  itemView: {
    position: 'relative',
  },
  item: {
    padding: 5,
    marginRight: 20,
    fontSize: 14,
    marginVertical: 5,
    color: '#3b73af'
  },
  itemActive: {
    backgroundColor: '#f5f5f5'
  },
  reloadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginLeft: -20,
    paddingLeft: 100
  },
  nullData: {
    marginTop: 10
  }
});