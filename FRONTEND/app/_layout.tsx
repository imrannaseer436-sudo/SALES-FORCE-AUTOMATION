import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="employees"
          options={{
            title: 'Employees',
          }}
        />
        <Stack.Screen
          name="employees/[id]"
          options={{
            title: 'Employee Detail',
          }}
        />
        <Stack.Screen
          name="contacts"
          options={{
            title: 'Contacts',
          }}
        />
        <Stack.Screen
          name="contacts/[id]"
          options={{
            title: 'Contact Detail',
          }}
        />
        <Stack.Screen
          name="network"
          options={{
            title: 'Hierarchy',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
