import { View, Text, ScrollView, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import FormField from '@/components/FormField'
import PrimaryButton from '@/components/PrimaryButton'
import ToastMessage from '@/components/ToastMessage'
import { SelectList } from "react-native-dropdown-select-list"
import { ALL_COUNTRY } from '@/constants/GlobalConstant'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/constants/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { forgotPasswordOtpHandler, onboardingHandler, resendOtpHandler } from '@/api/user'
import { router } from 'expo-router'
import { validateDate } from '@/lib/Validator'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ForgotPassword = () => {

  const [numberOfsend, setNumberOfSend] = useState<number>(0)
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    console.log(numberOfsend);
    
  }, [numberOfsend])

  //Query for resend otp
  const {
    data: resendOtpData,
    isLoading: isLoadingSend,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['sendOtp'],
    queryFn: async () => {
      if (!email) {
        ToastMessage({ type: "error", message: "Please enter your email address." });
        throw new Error("Email is required");  // Throw an error to handle this case.
      }

      setNumberOfSend(prev => prev + 1); // Increment the numberOfsend state
  
      if (numberOfsend > 0) {  // Ensure this code only runs if numberOfsend > 0
        return await forgotPasswordOtpHandler(email);
      }
  
      return null; // Return null or some other placeholder if numberOfsend is not > 0
    },
    enabled: !!email && numberOfsend > 0, // Only run the query if email is provided and numberOfsend is > 0
  });

  //Resend OTP logic
  const resendVerficationCodeHandler = async () => {
    //Resend Logic
    console.log("Resend Otp");
    refetch();
  }

  //Handle resend otp
  useEffect(() => {
    if (isSuccess && resendOtpData) {
      console.log(resendOtpData);
      ToastMessage({ type: "success", message: "OTP send to your email. Please check your email" })
      AsyncStorage.setItem('email', email)
      router.push(`/(auth)/create-new-password`)
    }

    if (isError) {

      const axiosError = error as AxiosError<ApiResponse>;

      console.log(axiosError || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
    }
  }, [isSuccess, resendOtpData, isError, error])

  return (
    <SafeAreaView className='min-h-full'>
      <ScrollView className=''>
        <View className='w-full flex min-h-full dark:bg-dark bg-white'>
          <BackButton destination="/(auth)/login" />
          <View className='h-full flex-1 justify-between'>
            <View className='mt-4 px-4 py-2 w-full'>
              <Text className='text-3xl font-psemibold text-black-100 dark:text-primary'>Forgot Password 📝</Text>
              <Text className='mt-2 font-pmedium text-gray-500 dark:text-gray-300'>Enter your email address to get an OTP code to reset your password.</Text>

              <View className='mt-6'>
                <FormField
                  title='Enter Email'
                  placeHolder='Enter your email'
                  value={email}
                  handleChangeText={(e: string) => { setEmail(e) }}
                  type='default'
                  otherStyle='mb-2'
                />

              </View>
            </View>
            <View className='mt-4 mb-4 px-4 py-2'>
              <PrimaryButton
                title='Submit'
                onButtonPress={resendVerficationCodeHandler}
                icon={"Share"}
                isLoading={isLoadingSend}
                disabled={isLoadingSend}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword