import { View, Text, ScrollView, Image } from 'react-native'
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
import ToastMessage from '@/components/ToastMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    onSuccess: (loginData) => {
      console.log(loginData);
      ToastMessage({ type: "success", message: "You are logged in" })
      AsyncStorage.setItem('token', loginData.data)
      AsyncStorage.setItem('isLogin', "true")
      router.dismissAll()
      if (router.canGoBack()) {
        router.back()
      }
      router.replace('/homedemo')
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;

      console.log(axiosError || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
    },
  })


  const handleLogin = () => {
    if (!email || !password) {
      ToastMessage({ type: "error", message: "Please fill all the fields" })
      return
    }

    mutate({ userName: email, password })
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(loginData);
      ToastMessage({ type: "success", message: "You are logged in" })
      router.push('/homedemo')
    }

    if (isError) {

      const axiosError = error as AxiosError<ApiResponse>;

      console.log(axiosError || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
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
                title='Username'
                placeHolder='Enter your Username'
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

              <View className='mt-4 w-full'>
                <Link href={'/(auth)/forgot-password'}>
                  <Text className='text-primary font-pmedium text-sm text-right'>Forgot Password?</Text>
                </Link>
              </View>

              <PrimaryButton
                isLoading={isPending}
                title='Login'
                onButtonPress={handleLogin}
                icon={"User"}
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