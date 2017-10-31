import { StyleSheet, Platform } from 'react-native';


export default StyleSheet.create({
  titleBar: {
    paddingTop: 20,
    backgroundColor: '#205081',
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      android: {
        marginTop: -20
      }
    })
  },
  titleText: {
    color: '#fff',
    fontSize: 18
  },
  icon: {
    color: '#fff',
    fontSize: 24,
    width: 44,
    height: 40,
    textAlign: 'center',
    paddingTop: 8
  },
  iconEmpty: {
    width: 44,
    height: 40
  },

});