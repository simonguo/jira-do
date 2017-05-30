import { StyleSheet, Dimensions } from 'react-native';

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default StyleSheet.create({
  wrapper: {

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#205081',
    padding: 10
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  loading: {
    color: '#fff',
    fontSize: 24
  }
})