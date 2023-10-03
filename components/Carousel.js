import { StyleSheet, Text, View , FlatList, Image} from "react-native";
import React from "react";
import { COLORS, SIZES, images } from "../constants";

const Carousel = () => {
  const carouselData = [
    { 
      id: 1, 
      image: images.carousel1 
    },
    { 
      id: 2, 
      image: images.carousel2 
    },
    { 
      id: 3, 
      image: images.carousel3 
    },
  ];

  // render image for flatList
  const renderItem = ({item, index}) => {
    return (
      <View key={`carouselItem-${index}`}>
        <Image source={item.image} style={styles.carouselImages}/>
      </View>
    )

  }

  // set indicators for carousel
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      return (
        <View style={styles.indicators}></View>
      )
    })
  }

  // handle active indicator and active image scroll
  const handleScroll = (event) => {

  }
  return (
    <View>
      <FlatList 
        data={carouselData}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        key={(item, index) => `carouselItem-${index}`}
      />
      <View style={styles.indicateToCenter}>
      {
        renderDotIndicators()
      }
      </View>
      
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselImages:{
    width: SIZES.width,
    height: 300, 
    resizeMode: 'cover'
  },
  indicators:{
    height: 10,
    width: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  indicateToCenter:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  }
});
