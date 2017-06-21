import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10
  },
  row: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 1,
    flexDirection: 'row'
  },
  navRow: {
    padding: 10,
    marginTop: -10,
    backgroundColor: '#eee'
  },
  colLabel: {
    flex: 1
  },
  proIcon: {
    marginTop: 4,
    width: 16,
    height: 16
  },
  fieldIcon: {
    marginTop: 2,
    width: 12,
    height: 12
  },
  itemLabelText: {
    color: '#707070'
  },
  colValue: {
    flex: 2
  }
});