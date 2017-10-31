import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  addButton: {
    borderRadius: 48,
    // borderColor: '#587BF4',
    // borderStyle: 'solid',
    // borderWidth: 2,
    position: 'absolute',
    bottom: 24,
    right: 24,
    overflow: 'hidden',
    backgroundColor: '#587BF4',
  },
  add: {
    height: 48,
    width: 48,
    color: '#fff',
    fontSize: 35,
    // backgroundColor: '#587BF4',
    // backgroundColor: 'red',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 48
      },
      android: {
        textAlignVertical: 'center'
      }
    })
  },
  button: {
    marginTop: 10,
    width: 345,
    height: 42,
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1
  },

  primary: {
    backgroundColor: '#008ee5',
  },
  primaryTitle: {
    color: '#fff'
  },

  default: {
    borderColor: '#008ee5',
    borderWidth: 1
  },
  defaultTitle: {
    color: '#008ee5'
  },

  buttonTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 36
      },
      android: {
        // textAlignVertical: 'center',
        paddingTop: 8,
        // backgroundColor: 'red'
      }
    })
  },
  buttonWrap: {
    flexDirection: 'row'
  },
  paddingHorizontal15: {
    width: 15,
  },
  modal: {
    flex: 1
  },
  modalMenu: {
  }
});