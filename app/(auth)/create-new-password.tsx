import { View, Text, ScrollView, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import FormField from '@/components/FormField'
import PrimaryButton from '@/components/PrimaryButton'
import ToastMessage from '@/components/ToastMessage'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/constants/types'
import { useMutation } from '@tanstack/react-query'
import { forgotPasswordHandler, onboardingHandler } from '@/api/user'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CreateNewPassword = () => {

  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [verificationCode, setVerificationCode] = useState<string>("")

  //Mutation for onnboarding user
  const {
    mutate,
    isPending
  } = useMutation({
    mutationFn: forgotPasswordHandler,

    //Handle success of mutation
    onSuccess: (data) => {
      ToastMessage({ type: "success", message: "User Resitered successfully" })
      router.push('/(auth)/login')
    },

    //Handle error of mutation
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError.response?.data.message || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
    }
  })

  const submitPasswordHandler = async () => {

    const email = await AsyncStorage.getItem('email');

    if (!email) {
      ToastMessage({ type: "error", message: "Please register first" })
      return;
    }

    //Validate Verification Code
    if(!verificationCode){
      ToastMessage({type: "error", message: "Please enter the verification code"})
      return;
    }

    if(verificationCode.length != 6){
      ToastMessage({type: "error", message: "Verification code should be 6 digits long"})
      return;
    }

    if(!password || !confirmPassword){
      ToastMessage({type: "error", message: "Please fill all the fields"})
      return;
    }

    //Validate the passwords
    if(password !== confirmPassword){
      ToastMessage({type: "error", message: "Passwords do not match"})
      return;
    }

    //check if the password is 4 - 20 characters
    if(password.length < 4 || password.length > 20){
      ToastMessage({type: "error", message: "Password should be between 4 - 20 characters"})
      return;
    }

    mutate({
      email,
      password,
      verificationCode
    })
  }

  return (
    <SafeAreaView className='min-h-full'>
      <ScrollView className=''>
        <View className='w-full flex min-h-full dark:bg-dark bg-white'>
          <BackButton destination="/(auth)/forgot-password" />
          <View className='h-full flex-1 justify-between'>
            <View className='mt-4 px-4 py-2 w-full'>
              <Text className='text-center text-3xl font-psemibold text-black-100 dark:text-primary'>Create new password 🛠️</Text>
              <Text className='text-center mt-2 font-pmedium text-gray-500 dark:text-gray-300'>Save the new password in a safe place, if you forget it then you have to do a forgot password again.</Text>

              <View className='mt-6'>
                <FormField
                  title='Enter OTP'
                  placeHolder='Enter OTP'
                  value={verificationCode}
                  handleChangeText={(e: string) => { setVerificationCode(e) }}
                  type='default'
                  otherStyle='mb-2'
                />
                <FormField
                  title='Create a new password'
                  placeHolder='Enter your password'
                  value={password}
                  handleChangeText={(e: string) => { setPassword(e) }}
                  type='default'
                  otherStyle='mb-2'
                />
                <FormField
                  title='Confirm a new password'
                  placeHolder='Enter your password'
                  value={confirmPassword}
                  handleChangeText={(e: string) => { setConfirmPassword(e) }}
                  type='default'
                  otherStyle='mb-2'
                />

              </View>
            </View>
            <View className='mt-4 mb-4 px-4 py-2'>
              <PrimaryButton
                title='Continue'
                onButtonPress={submitPasswordHandler}
                icon={"Share"}
                isLoading={isPending}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateNewPassword