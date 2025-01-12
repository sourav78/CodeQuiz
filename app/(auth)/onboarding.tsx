import { View, Text, ScrollView, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import FormField from '@/components/FormField'
import PrimaryButton from '@/components/PrimaryButton'
import ToastMessage from '@/components/ToastMessage'
import { SelectList } from "react-native-dropdown-select-list"
import { ALL_COUNTRY } from '@/constants/GlobalConstant'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/constants/types'
import { useMutation } from '@tanstack/react-query'
import { onboardingHandler } from '@/api/user'
import { router } from 'expo-router'
import { validateDate } from '@/lib/Validator'


const OnBoarding = () => {

  const colorScheme = useColorScheme();

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<string>("")

  const [selectedCountry, setSelectedCountry] = React.useState("");

  //Mutation for onnboarding user
  const {
    mutate,
    isPending
  } = useMutation({
    mutationFn: onboardingHandler,

    //Handle success of mutation
    onSuccess: (data) => {
      ToastMessage({ type: "success", message: "User Resitered successfully" })
      router.push('/homedemo')
    },

    //Handle error of mutation
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError.response?.data.message || "Something went wrong");
      ToastMessage({ type: "error", message: axiosError.response?.data.message || "Something went wrong" })
    }
  })

  const submitUserInfoHandler = async () => {
    console.log({
      firstName,
      lastName,
      bio,
      dateOfBirth,
      country: selectedCountry
    });

    if(!firstName || !lastName || !selectedCountry){
      ToastMessage({type: "error", message: "Please fill all the required fields"})
      return;
    }

    //Validate the date of birth
    if(!validateDate(dateOfBirth)){
      ToastMessage({type: "error", message: "Please provide a valid date of birth"})
      return;
    }

    mutate({
      firstName,
      lastName,
      bio,
      dob: dateOfBirth,
      country: selectedCountry
    })
  }

  return (
    <SafeAreaView className='min-h-full'>
      <ScrollView className=''>
        <View className='w-full flex min-h-full dark:bg-dark bg-white'>
          <BackButton destination="/(auth)/register" />
          <View className='h-full flex-1 justify-between'>
            <View className='mt-4 px-4 py-2 w-full'>
              <Text className='text-center text-3xl font-psemibold text-black-100 dark:text-primary'>Register Your Profile ✍️</Text>
              <Text className='text-center mt-2 font-pmedium text-gray-500 dark:text-gray-300'>Please complete your profile. Don't worry, your data will remain private and only you can see it.</Text>

              <View className='mt-6'>
                <FormField
                  title='First Name*'
                  placeHolder='Enter your first name'
                  value={firstName}
                  handleChangeText={(e: string) => { setFirstName(e) }}
                  type='default'
                  otherStyle='mb-2'
                />
                <FormField
                  title='Last Name*'
                  placeHolder='Enter your last name'
                  value={lastName}
                  handleChangeText={(e: string) => { setLastName(e) }}
                  type='default'
                  otherStyle='mb-2'
                />
                <FormField
                  title='Bio'
                  placeHolder='Enter your bio'
                  value={bio}
                  handleChangeText={(e: string) => { setBio(e) }}
                  multiLine={true}
                  numberOfLines={8}
                  otherStyle='mb-2'
                />
                <FormField
                  title='Date of Birth (YYYY-MM-DD)'
                  placeHolder='Format: YYYY-MM-DD'
                  value={dateOfBirth}
                  handleChangeText={(e: string) => { setDateOfBirth(e) }}
                  type='numeric'
                  otherStyle='mb-2'
                />

                <View className='mb-2'>
                  <Text className="text-base dark:text-gray-100 text-black-200 font-pmedium">Select Country*</Text>
                  <SelectList
                    setSelected={(val: any) => setSelectedCountry(val)}
                    data={ALL_COUNTRY.map((country: string) => ({ key: country, value: country }))}
                    save="value"
                    fontFamily='pmedium'
                    boxStyles={{ borderRadius: 8, height: 52, borderWidth:2, borderColor: '#9ca3af' }}
                    inputStyles={{color: `${colorScheme === 'dark' ? 'white' : 'black'}`}}
                    dropdownTextStyles={{color: `${colorScheme === 'dark' ? 'white' : 'black'}`}}
                    
                  />
                </View>

              </View>
            </View>
            <View className='mt-4 mb-4 px-4 py-2'>
              <PrimaryButton
                title='Submit'
                onButtonPress={submitUserInfoHandler}
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

export default OnBoarding