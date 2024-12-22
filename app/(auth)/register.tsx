import { View, Text, ScrollView, Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { codequizIcon } from '@/constants/images'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import PrimaryButton from '@/components/PrimaryButton'

const Register = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  const handleLogin = () => {
    console.log({
      username,
      email,
      password
    });
  }

  return (
    <SafeAreaView className='dark:bg-black bg-white min-h-full'>
      <ScrollView>
        <View className='w-full min-h-full gap-16 justify-between items-center'>
          <View className='w-full items-center pt-20'>
            <Image
              source={codequizIcon}
              className="w-20 h-20 mb-6"
            />
            <Text className='text-4xl font-psemibold dark:text-white'>Code Quiz</Text>
          </View>
          <View className='pb-8 w-full px-4'>
            <Text className='text-4xl font-bold dark:text-primary text-black-200'>Register</Text>
            <Text className='text-base dark:text-gray-300 text-gray-500 font-pmedium'>Please fill the details to register</Text>
            <View className='w-full px-2 mt-6 space-y-4'>
              <FormField
                title='Username'
                placeHolder='Enter your Username'
                value={username}
                handleChangeText={(e: string) => { setUsername(e) }}
                otherStyle='mb-4'
              />
              <FormField
                title='Email'
                placeHolder='Enter your email'
                value={email}
                handleChangeText={(e: string) => { setEmail(e) }}
                otherStyle='mb-4'
              />
              <FormField
                title='Password'
                placeHolder='Enter your Password'
                value={password}
                handleChangeText={(e: string) => { setPassword(e) }}
              />

              <PrimaryButton
                isLoading={isLoading}
                title='Register'
                onButtonPress={handleLogin}
                icon={"user-plus"}
                otherStyle='mt-4'
              />
              <Text className='text-center dark:text-white text-black-100 mt-4 text-sm'>Already have an account?
                <Link href={'/login'}>
                  <Text className='text-primary'> login</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register