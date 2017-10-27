import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  avatar: {
    // position: 'absolute',
    // top: 10,
    // left: 15,
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: -2
  },
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  info: {
    flex: 1,
    flexDirection: 'row'
    // marginLeft: 50
    // position: 'absolute',
    // top: 10,
    // left: 50
  },
  authorName: {
    marginLeft: 15,
    color: '#555'
  },
  time: {
    marginLeft: 10,
    color: '#555'
  },
  timeSpend: {
    position: 'absolute',
    right: 0,
    color: '#555'
  },
  comment: {
    marginTop: 10
  }
});