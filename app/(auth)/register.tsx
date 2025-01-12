import { View, Text, ScrollView, Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { codequizIcon } from '@/constants/images'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import PrimaryButton from '@/components/PrimaryButton'
import { useMutation } from '@tanstack/react-query'
import { registerHandler } from '@/api/user'
import ToastMessage from '@/components/ToastMessage'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/constants/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { validateEmail } from '@/lib/Validator'

const Register = () => {
  
  //User Details State
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  //Mutation for register user
  const {
    mutate,
    isPending,
    data: registerData,
  } = useMutation({
    mutationFn: registerHandler,

    //Handle success of mutation
    onSuccess: (data) => {
      ToastMessage({type: "success", message: "You are registered successfully"})
      AsyncStorage.setItem('token', data.data)
      AsyncStorage.setItem('email', email)
      router.push('/(auth)/otp')
    },

    //Handle error of mutation
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;

      console.log(axiosError || "Something went wrong");

      if(axiosError.response?.data.message?.startsWith("Failed messages: jakarta.mail.SendFailedException")){
        ToastMessage({type: "error", message: "Please provide a valid email"})
      }else{
        ToastMessage({type: "error", message: axiosError.response?.data.message || "Something went wrong"})
      }

    }
  })


  //Handle register function
  const handleRegister = () => {
    //Check if all the fields are filled
    if(!username || !email || !password){
      ToastMessage({type: "error", message: "Please fill all the fields"})
      return;
    }

    //Check the user name is 3 - 20 characters
    if(username.length < 3 || username.length > 20){
      ToastMessage({type: "error", message: "Username should be between 3 - 20 characters"})
      return;
    }

    //Check the email is valid
    if(!validateEmail(email)){
      ToastMessage({type: "error", message: "Please provide a valid email"})
      return;
    }

    //Check the password is 4 - 20 characters
    if(password.length < 4 || password.length > 20){
      ToastMessage({type: "error", message: "Password should be between 6 - 20 characters"})
      return;
    }

    //Call the mutation
    mutate({
      userName: username,
      password,
      email
    })
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
                isLoading={isPending}
                title='Register'
                onButtonPress={handleRegister}
                icon={"UserPlus"}
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