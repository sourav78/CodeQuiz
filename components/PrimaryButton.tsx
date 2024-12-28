import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'

type ButtonVariant = 'primary' | 'secondary'

interface PrimaryButtonProps {
  isLoading?: boolean,
  title: string,
  onButtonPress: () => void,
  icon?: any,
  otherStyle?: string
  variant?: ButtonVariant
}

const PrimaryButton = (
  { isLoading = false, title, onButtonPress, icon, otherStyle, variant = "primary" }: PrimaryButtonProps
) => {

  
    const colorScheme = useColorScheme();
    const isDarkTheme = colorScheme === 'dark';

  return (
    <TouchableOpacity
      className={`flex flex-row gap-2 items-center justify-center ${variant === "primary" ? "bg-primary" : "border-2 border-primary"} w-full h-14 rounded-lg ${otherStyle}`}
      onPress={ onButtonPress }
    >
      {
        isLoading ? (
          <AntDesign name="loading1" size={20} color={!isDarkTheme && variant === "secondary" ? "black" : "white"} className='animate-spin' />
        ) : (
          <>
            {
              icon && <Feather name={icon} size={20} color={!isDarkTheme && variant === "secondary" ? "black" : "white"} />
            }
            <Text className={`text-xl font-semibold ${!isDarkTheme && variant === "secondary" ? "dark:text-white text-black" : "text-white"}`}>{title}</Text>
          </>
        )
      }
    </TouchableOpacity>
  )
}

export default PrimaryButton