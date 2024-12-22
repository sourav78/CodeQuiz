import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'

interface PrimaryButtonProps {
  isLoading?: boolean,
  title: string,
  onButtonPress: () => void,
  icon?: any,
  otherStyle?: string
}

const PrimaryButton = (
  { isLoading= false, title, onButtonPress, icon, otherStyle }: PrimaryButtonProps
) => {
  return (
    <TouchableOpacity
      className={`flex flex-row gap-2 items-center justify-center bg-primary w-full h-14 rounded-lg ${otherStyle}`}
      onPress={ onButtonPress }
    >
      {
        isLoading ? (
          <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
        ) : (
          <>
            {
              icon && <Feather name={icon} size={20} color="white" />
            }
            <Text className='text-xl font-semibold text-white'>{title}</Text>
          </>
        )
      }
    </TouchableOpacity>
  )
}

export default PrimaryButton