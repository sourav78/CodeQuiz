import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import FormField from '@/components/FormField'
import PrimaryButton from '@/components/PrimaryButton'
import ToastMessage from '@/components/ToastMessage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { optVerificationHandler, resendOtpHandler } from '@/api/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/constants/types'
import { router } from 'expo-router'
import { Loader2 } from 'lucide-react-native'

const Otp = () => {

  const [otp, setOtp] = useState<string>('')

  const [resendTimer, setResendTimer] = useState<number>(59)
  const [toggleResend, setToggleResend] = useState<boolean>(false)

  const [numberOfResned, setNumberOfResned] = useState<number>(0)

  //Resend Verification Code timer
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((currentTimer) => {
        if (currentTimer < 1) {
          clearInterval(timer); // Clear timer when countdown finishes
          return 0; // Optionally reset or handle completion
        }
        return currentTimer - 1;
      });
    }, 1000);
  }, [toggleResend]);


  //Mutation for register user
  const {
    mutate,
    isPending,
    data: verifyData,
  } = useMutation({
    mutationFn: optVerificationHandler,

    //Handle success of mutation
    onSuccess: (data) => {
      ToastMessage({ type: "success", message: "User verified successfully" })

      //Set the islogin to true in the storage
      AsyncStorage.setItem('isLogin', "true")
      router.push('/(auth)/onboarding')
    },

    //Handle error of mutation
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
    }
  })

  //Query for resend otp
  const {
    data: resendOtpData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['resendOtp'],
    queryFn: async () => {

      const savedEmail = await AsyncStorage.getItem('email');

      if (!savedEmail) {
        ToastMessage({ type: "error", message: "Please register first" })
        return;
      }

      setNumberOfResned(prev => prev + 1)

      return numberOfResned > 0 && resendOtpHandler(savedEmail)
    },
  })

  //Handle resend otp
  useEffect(() => {
    if (isSuccess && resendOtpData) {
      console.log(resendOtpData);
      ToastMessage({ type: "success", message: "Resend OTP successfully" })
    }

    if (isError) {

      const axiosError = error as AxiosError<ApiResponse>;

      console.log(axiosError || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
    }
  }, [isSuccess, resendOtpData, isError, error])

  //Resend OTP logic
  const resendVerficationCodeHandler = async () => {
    //Resend Logic
    console.log("Resend Otp");
    refetch()

    setResendTimer(59)
    setToggleResend(prev => !prev)
  }

  const handleTextChange = (e: string) => {
    e.length <= 6 && setOtp(e)
  }

  //Verify OTP handler function
  const VerifyOtpHandler = async () => {

    if (otp.length < 6) {
      ToastMessage({
        type: "error",
        message: "OTP should be 6 digits long"
      })
      return;
    }

    const registerdEmail = await AsyncStorage.getItem('email');

    if (!registerdEmail) {
      ToastMessage({
        type: "error",
        message: "Please register first"
      })
      return;
    }

    mutate({ email: registerdEmail, verificationCode: otp })
  }

  return (
    <SafeAreaView className='min-h-full'>
      <ScrollView className=''>
        <View className='w-full flex min-h-full dark:bg-dark bg-white'>
          <BackButton destination="/(auth)/register" />
          <View className='h-full flex-1 justify-between'>
            <View className='mt-4 px-4 py-2 w-full'>
              <Text className='text-3xl font-psemibold text-black-100 dark:text-primary'>You’ve got mail 📧</Text>
              <Text className='mt-2 font-pmedium text-gray-500 dark:text-gray-300'>We have sent the OTP verification code to your email address. Check your email and enter the code below.</Text>

              <View className='mt-6'>
                <FormField
                  title='OTP'
                  placeHolder='Enter OTP'
                  value={otp}
                  handleChangeText={handleTextChange}
                  type='phone-pad'
                />

                <View className='mt-8 w-full'>
                  <Text className='text-sm font-pmedium text-black-100 dark:text-gray-300 text-center'>Didn't receive email?</Text>
                  {
                    resendTimer < 1 ? (
                      <Text className='mt-1 text-sm font-pmedium text-black-100 dark:text-gray-300 text-center'>
                        <Text className='text-primary font-pmedium'
                          onPress={resendVerficationCodeHandler}
                        >Resend</Text> verification code</Text>
                    ) : (
                      <>
                        {
                          isLoading ? (
                            <Loader2 size={20} color="#0083FF" />
                          ) : (
                            <Text className='mt-1 text-sm font-pmedium text-black-100 dark:text-gray-300 text-center'>You can resend code in <Text className='text-primary font-pmedium'>{resendTimer}</Text> s</Text>
                          )
                        }
                      </>
                    )
                  }
                </View>
              </View>
            </View>
            <View className='mt-4 mb-4 px-4 py-2'>
              <PrimaryButton
                title='Confirm'
                onButtonPress={VerifyOtpHandler}
                icon={"Lock"}
                disabled={otp.length < 6}
                isLoading={isPending}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Otp