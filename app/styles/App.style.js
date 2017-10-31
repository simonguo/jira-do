import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  boardView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3
  },
  titleBar: {
    paddingTop: 30,
    backgroundColor: '#0054C9',
    alignItems: 'center',
    height: 60
  },
  menuIcon: {
    position: 'absolute',
    left: 14,
    top: 30,
    color: '#fff',
    fontSize: 24
  },
  cofIcon:{
    position: 'absolute',
    right: 14,
    top: 30,
    color: '#fff',
    fontSize: 24
  },
  titleText: {
    color: '#ffffff',
    fontSize: 18
  }
});