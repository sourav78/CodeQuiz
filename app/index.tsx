import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const index = () => {
  return (
    <SafeAreaView>
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-2xl'>Hello World</Text>
        <Link href={'/about'}>Go to Details</Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerss: {
    color: 'red'
  }
})

export default index
