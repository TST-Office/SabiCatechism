import * as React from 'react';
import { Dimensions, Image, Text, View,StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '../constants';


function Index() {
  const width = Dimensions.get('window').width;
  
  const carouselData = [
    { id: 1, image: images.carousel1, text: "Top 10" },
    { id: 2, image: images.carousel2, text: "Trending" },
    { id: 3, image: images.carousel3, text: "New Release" },
  ];
  

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={carouselData} // Use the carouselData array as the data source
        scrollAnimationDuration={5000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Image
              source={item.image}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
  },
  text: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color for the text
    color: 'white', // Text color
    fontSize: 16, // Font size
    padding: 5, // Padding around the text
    borderRadius: 5, // Border radius for the text container
  },
});
export default Index;
