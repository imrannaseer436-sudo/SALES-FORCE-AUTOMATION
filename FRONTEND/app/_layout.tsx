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
          name="employees/index"
          options={{
            title: 'Employees',
          }}
        />
        <Stack.Screen
          name="employees/create"
          options={{
            title: 'Create Employee',
          }}
        />
        <Stack.Screen
          name="employees/[id]"
          options={{
            title: 'Employee Detail',
          }}
        />
        <Stack.Screen
          name="employees/[id]/edit"
          options={{
            title: 'Edit Employee',
          }}
        />
        <Stack.Screen
          name="contacts/index"
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
          name="network/index"
          options={{
            title: 'Hierarchy',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
