import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    height: 45,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 0,
    marginRight: -30
  },
  label: {
    fontSize: 18,
    color: '#000'
  },
  header: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 15
  },
  sectionHeader: {
    fontSize: 14,
    color: '#999',
    paddingLeft: 15,
    marginTop: 15,
    marginBottom: 15
  },
  line: {
    height: 1
  },
  arrow: {
    width: 45,
    height: 45,
    fontSize: 25,
    paddingTop: 10,
    textAlign: 'center'
  }
});