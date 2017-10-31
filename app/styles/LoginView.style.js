import {
  StyleSheet,
  Platform
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0054C9',
    padding: 10
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  logo: {
    marginTop: 50,
    width: 100,
    height: 100
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 35,
    padding: 10,
    borderRadius: 4,
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#003f97',
    height: 35,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  loading: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20
  }
});

