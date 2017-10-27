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
    lineHeight: 45,
    fontSize: 16,
    ...Platform.select({
      android: {
        textAlignVertical: 'top'
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
    paddingTop: 30,
    width: window.width,
    fontSize: 16
  },
});

export default styles;