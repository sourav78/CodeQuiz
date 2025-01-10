import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { Href, RelativePathString, router } from 'expo-router'


const BackButton = ({ destination }: { destination: Href | RelativePathString }) => {

  const handleRouting = () => {
    router.push(destination as Href);
  }


  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <View className='p-2'>
      <TouchableOpacity
        onPress={handleRouting}
        className='p-2 w-12'>
        <ArrowLeft size={26} color={!isDarkTheme ? "black" : "white"} />
      </TouchableOpacity>
    </View>
  )
}

export default BackButton