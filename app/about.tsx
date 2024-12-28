import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '@/components/PrimaryButton'
import { useAtom } from 'jotai'
import { count } from '@/context/counter'

const about = () => {

  const [counter, setCounter] = useAtom(count)

  return (
    <SafeAreaView>
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-xl dark:text-purple-500'>This is about</Text>
        <Link className='text-blue-500' href={'/'}>Go to Details</Link>

        <View className='mt-4 w-full px-8'>
          <Text>{counter}</Text>
          <PrimaryButton
            title='Counter Up'
            icon={"clock"}
            onButtonPress={() => setCounter(counter + 1)}
            otherStyle='mt-4'
          />
          <PrimaryButton
            title='Counter Down'
            icon={"clock"}
            onButtonPress={() => setCounter(counter - 1)}
            otherStyle='mt-4'
            variant='secondary'
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default about