import { Image, StyleSheet, Text, TouchableOpacity, View, Switch as RNSwitch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect, router } from 'expo-router'
import { codequizIcon } from "../constants/images.js"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';



const index = () => {

  const [isLoading, setIsLoading] = useState(false)

  // const [loggedIn, setLoggedIn] = useState<Boolean>(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoggedIn(true)
  //   }, 3000)
  // }, [])

  // if(loggedIn){
  //   return <Redirect href={'/about'} />
  // }

  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  React.useEffect(() => {
    // Start the bounce animation
    scale.value = withRepeat(withSpring(1.2, {
      damping: 1,
      stiffness: 10,
    }), -1, true);
  }, []);

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <SafeAreaView>
      <View className='w-full h-full flex items-center justify-between pt-40 dark:bg-dark bg-white'>
        <View className='flex items-center'>
          <Animated.Image
            source={codequizIcon}
            className="w-16 h-16 mb-6"
            style={animatedStyles} // Apply Reanimated styles
          />
          <Text className='text-3xl font-psemibold dark:text-white'>Code Quiz</Text>
        </View>
        <View className='flex items-center justify-center w-full px-8'>
          <TouchableOpacity
            disabled={isLoading}
            className='flex flex-row gap-2 items-center justify-center bg-primary w-full h-14 rounded-lg'
            onPress={() => router.push('/(auth)/login')}
          >
            {
              isLoading ? (
                <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
              ) : (
                <>
                  <Feather name="user" size={20} color="white" />
                  <Text className='text-xl font-semibold text-white'>Login</Text>
                </>
              )
            }
          </TouchableOpacity>

          <Text className='text-black text-sm ml-4 mt-6 mb-1 dark:text-secondary-light'>From Sourav</Text>
        </View>
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
