import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    height: 45,
    color: '#666',
    padding: 0,
    paddingLeft: 20,
    width: window.width - 120,
    fontSize: 16,
    ...Platform.select({
      ios: {
        lineHeight: 45
      },
      android: {
        textAlignVertical: 'center'
      }
    })
  },
  formGroup: {
    justifyContent: 'flex-start',
  },
  textArea: {
    height: window.height - 370,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 20,
    width: window.width,
    fontSize: 16,
    lineHeight: 20,
    ...Platform.select({
      ios: {
      },
      android: {
        textAlignVertical: 'top'
      }
    })
  },
});

export default styles;