import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const about = () => {
  return (
    <SafeAreaView>
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-xl dark:text-purple-500'>This is about</Text>
        <Link className='text-blue-500' href={'/'}>Go to Details</Link>
      </View>
    </SafeAreaView>
  )
}

export default about