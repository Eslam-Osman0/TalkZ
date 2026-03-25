import {  Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className='text-black text-2xl font-bold'>ProfileScreen</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen