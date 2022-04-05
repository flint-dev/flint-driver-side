import { StatusBar } from 'expo-status-bar';
import {  Text, View ,SafeAreaView} from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
export default function App() {
  return (

    <>
    <StatusBar style="auto"  />
    <SafeAreaView >
      
      <HomeScreen/>
      
    </SafeAreaView>
    </>
  );
}

;
