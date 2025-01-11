import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import FormField from '@/components/FormField'
import PrimaryButton from '@/components/PrimaryButton'
import ToastMessage from '@/components/ToastMessage'


const OnBoarding = () => {

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<string>("")

  const handleLogin = () => {
    console.log({
      firstName,
      lastName,
      bio,
      dateOfBirth
    });
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
                  title='First Name'
                  placeHolder='Enter your first name'
                  value={firstName}
                  handleChangeText={(e: string) => { setFirstName(e) }}
                  type='default'
                />
                <FormField
                  title='Last Name'
                  placeHolder='Enter your last name'
                  value={lastName}
                  handleChangeText={(e: string) => { setLastName(e) }}
                  type='default'
                />
                <FormField
                  title='Bio'
                  placeHolder='Enter your bio'
                  value={bio}
                  handleChangeText={(e: string) => { setBio(e) }}
                  multiLine={true}
                  numberOfLines={4}
                />
                <FormField
                  title='Date of Birth'
                  placeHolder='Enter your date of birth'
                  value={dateOfBirth}
                  handleChangeText={(e: string) => { setDateOfBirth(e) }}
                  type='numeric'
                />
                
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OnBoarding