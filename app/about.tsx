import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '@/components/PrimaryButton'
import { useAtom } from 'jotai'
import { count } from '@/context/counter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addANewProduct, getProduct } from '../api/product'

const about = () => {

  const [counter, setCounter] = useAtom(count)

  // Queries
  const {data, isLoading, error, isError, isSuccess,} = useQuery({ 
    queryKey: ['product', counter],
    queryFn: () => getProduct(counter), 
  })

  const { 
    mutate, 
    isError:isMuattionError, 
    error: mutationError, 
    isPending: isMuattionLoading, 
    isSuccess: isMutationSuccess,
    data: mutationData,
  } = useMutation({
    mutationFn: addANewProduct,
  });

  const handleAddProduct = () => {
    mutate({ title: 'New Product', description: 'Description of new product', price: 100 });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data.id);
      console.log(data.title);
    }
  }, [isSuccess, data]);


  //For mutation

  useEffect(() => {
    if (isMutationSuccess) {
      console.log(mutationData.id, "New Product added");
    }

    if (isMuattionError) {
      console.log(mutationError);
    }
  }, [isMuattionError, mutationError, isMutationSuccess]);

  if(isError){
    console.log(error);
  }

  return (
    <SafeAreaView>
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-xl dark:text-purple-500'>This is about</Text>
        <Link className='text-blue-500' href={'/'}>Go to Details</Link>

        <View className='mt-4 w-full px-8'>
          <Text>{counter}</Text>
          <PrimaryButton
            title='Counter Up'
            icon={"Clock"}
            onButtonPress={() => setCounter(counter + 1)}
            otherStyle='mt-4'
          />
          <PrimaryButton
            title='Counter Down'
            icon={"Clock"}
            onButtonPress={() => setCounter(counter - 1)}
            otherStyle='mt-4'
            variant='secondary'
          />
        </View>
        <View className='mt-8 w-full px-20'>
          <PrimaryButton
            title='Get Product'
            onButtonPress={handleAddProduct}
            icon={'Box'}
            isLoading={isMuattionLoading || isLoading}
          />
          <Text className='text-xl'>{data && data.title}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default about