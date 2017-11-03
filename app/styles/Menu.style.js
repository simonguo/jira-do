import {StyleSheet, Dimensions, Platform} from 'react-native';

const window = Dimensions.get('window');
export default StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    width: '100%',
    height: window.height,
    padding: 0,
    position: 'relative'
  },
  avatarContainer: {
    paddingTop: 40,
    paddingLeft: 20,
    height: 110,
    backgroundColor: '#004ab0'
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
    padding: 10,
    backgroundColor: '#e9e9e9'
  },
  footer: {
    height: 70
  },
  itemView: {
    position: 'relative',
  },
  item: {
    padding: 5,
    marginRight: 0,
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
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 20,
    height: 44,
    width: '100%',
    backgroundColor: '#e9e9e9'
  },
  menuItem: {
    height: 44,
  },
  icon: {
    width: 44,
    height: 44,
    fontSize: 24,
    color: '#3b73af',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 44
      },
      android: {
        textAlignVertical: 'center'
      }
    })
  },
  menuText: {
    color: '#3b73af'
  }
});