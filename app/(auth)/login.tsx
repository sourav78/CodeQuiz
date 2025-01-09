import { View, Text, ScrollView, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { codequizIcon } from '@/constants/images'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import PrimaryButton from '@/components/PrimaryButton'
import { useMutation } from '@tanstack/react-query'
import { loginHandler } from '../../api/user'
import { AxiosError } from 'axios'
import { ApiResponse } from '../../constants/types'
import * as Burnt from "burnt"

const Login = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const {
    mutate,
    isError,
    error,
    isPending,
    isSuccess,
    data: loginData,
  } = useMutation({
    mutationFn: loginHandler,
  })


  const handleLogin = () => {
    if(!email || !password){
      alert('Please fill all fields')
      return
    }

    Burnt.toast({
      title: 'Logging in',
      message: 'Please wait',
      preset: "done"
    })

    // mutate({ userName: email, password })
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(loginData);
      router.push('/homedemo')
    }

    if (isError) {

      const axiosError = error as AxiosError<ApiResponse>;

      console.log(axiosError || "Something went wrong");
    }
  }, [isSuccess, loginData, isError, error])

  return (
    <SafeAreaView className='dark:bg-dark bg-white min-h-full'>
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
            <Text className='text-4xl font-bold dark:text-primary text-black-200'>Login</Text>
            <Text className='text-base dark:text-gray-300 text-gray-500 font-pmedium'>Please Login to your account</Text>
            <View className='w-full px-2 mt-6 space-y-4'>
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
                isLoading={isPending}
                title='Login'
                onButtonPress={handleLogin}
                icon={"user"}
                otherStyle='mt-4'
              />
              <Text className='text-center dark:text-white text-black-100 mt-4 text-sm'>Don't have an account?
                <Link href={'/register'}>
                  <Text className='text-primary'> Sign Up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login