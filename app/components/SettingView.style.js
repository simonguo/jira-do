import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    height: 100,
    backgroundColor: '#fff'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  displayName: {
    position: 'absolute',
    left: 90,
    top: 30
  },
  name: {
    position: 'absolute',
    left: 90,
    top: 50
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10
  },
  item:{
    padding:10,
    backgroundColor:'#fff',
    marginTop:1,
  },
  itemText:{
    textAlign:'center'
  }
});