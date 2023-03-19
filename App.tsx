import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-teal-400">
      <Text className='text-slate-100 text-lg'>TypeScript + React Native temp</Text>
      <Text className='text-pink-700 text-base'>2023.3.18</Text>
      <StatusBar style="auto" />
    </View>
  );
}
