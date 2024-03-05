import { View, Text, Image } from 'react-native'
import React from 'react'
import Logo from './../assets/logo.png'

export default function LogoManager() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center',}}>
    <Image source={Logo} style={{width: 100, height: 70}} />
  </View>
  )
}