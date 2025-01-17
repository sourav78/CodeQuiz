import { View, Text, TextInput, TouchableOpacity, Image, KeyboardType } from 'react-native'
import React, { useState } from 'react'
import { Eye, EyeClosed } from "lucide-react-native"


interface FormFieldProps {
  title: string
  placeHolder: string
  value: string
  handleChangeText: (text: string) => void
  otherStyle?: string,
  type?: KeyboardType,
  multiLine?: boolean
  numberOfLines?: number
}

const FormField = ({
  title,
  placeHolder,
  value,
  handleChangeText,
  otherStyle,
  type,
  multiLine,
  numberOfLines
}: FormFieldProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-base dark:text-gray-100 text-black-200 font-pmedium">{title}</Text>
      <View className={`border-2 ${isFocused ? 'border-secondary' : 'border-gray-400'} w-full ${multiLine ? "min-h-16" : "h-16"} px-4 rounded-lg items-center flex-row`}> 
        <TextInput
          className="flex-1 dark:text-white text-black-100 font-psemibold"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={type || "default"}
          multiline={multiLine}
          numberOfLines={numberOfLines}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {
              showPassword ? <EyeClosed size={24} color="#7b7b8b" /> : <Eye size={24} color="#7b7b8b" />
            }
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField