// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import OnboardingScreen from "./components/onboarding/OnboardingScreen";
import { HomeStack } from "./components/Home/HomeStack";

import useContentfulData from "./api/api";
import {
  TranslationProvider,
  changeLocale,
} from "./contexts/TranslationContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const { data } = useContentfulData(); // Vergeet niet de hook aan te roepen met ()

  return (
    <TranslationProvider defaultLocale={"nl"}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => (
              <OnboardingScreen {...props} changeLocale={changeLocale} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="HomeTab"
            options={{
              headerShown: true,
              title: "MC Communications",
            }}
          >
            {(props) => <HomeStack data={data} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TranslationProvider>
  );
};

export default App;
