import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
// Import your global CSS file
import "../global.css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import {MD3LightTheme as PaperDefalutTheme, PaperProvider} from "react-native-paper"
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { authTokenContext, isLoginContext } from '@/context/credentials';
import { useAtom } from 'jotai';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});


// Configure react query clinet
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }: { text1: string, props: any }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};


export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [authToken, setAuthToken] = useAtom(authTokenContext);
  const [isLogin, setIsLogin] = useAtom(isLoginContext);
  
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("@/assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
  })
  
  useEffect(() => {
    const validateLogin = async () => {
      if (fontsLoaded) {
        
        // Get the token from async storage
        const token = await AsyncStorage.getItem('token');

        //Get the isLogin from async storage
        const isLogin = await AsyncStorage.getItem('isLogin');

        setAuthToken(token);
        setIsLogin(isLogin === "true" ? true : false);
        
        // If the token is null, redirect to the login page
        // if (token === null && isLogin !== "true") {
        //   router.replace('/');
        // } else {
        //   router.replace('/homedemo');
        // }
        
        SplashScreen.hideAsync();
        
      }
    }
    
    validateLogin();
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }

  const theme = {
    ...PaperDefalutTheme,
    colors: {
      ...PaperDefalutTheme.colors,
      primary: '#0083FF',
      secondary: '#4da8ff',
      surface: '#80c1ff',
      background: `${colorScheme === 'dark' ? "#080713" : "white"}`, 
    },
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <Toast />
          <StatusBar style="auto" />
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
