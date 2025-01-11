import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import FormField from '@/components/FormField'
import PrimaryButton from '@/components/PrimaryButton'
import ToastMessage from '@/components/ToastMessage'

const Otp = () => {

  const [otp, setOtp] = useState<string>('')

  const [resendTimer, setResendTimer] = useState<number>(5)
  const [toggleResend, setToggleResend] = useState<boolean>(false)

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

  const resendVerficationCodeHandler = async () => {
    //Resend Logic
    console.log("Resend Otp");
    


    setResendTimer(5)
    setToggleResend(prev => !prev)
  }

  const handleTextChange = (e:string) => {
    e.length <= 6 && setOtp(e)
  }

  const VerifyOtpHandler = async () => {

    if(otp.length < 6){
      ToastMessage({
        type: "error",
        message: "OTP should be 6 digits long"
      })
      return;
    }

    console.log(otp);
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
                      <Text className='mt-1 text-sm font-pmedium text-black-100 dark:text-gray-300 text-center'>You can resend code in <Text className='text-primary font-pmedium'>{resendTimer}</Text> s</Text>
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
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Otp