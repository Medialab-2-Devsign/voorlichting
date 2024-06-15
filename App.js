// App.js

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { I18n } from "i18n-js";

import OnboardingScreen from "./components/onboarding/OnboardingScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";

import useContentfulData from "./api/api";
import { TranslationProvider } from "./contexts/TranslationContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const { data } = useContentfulData(); // Vergeet niet de hook aan te roepen met ()

  return (
    <TranslationProvider defaultLocale={"nl-NL"}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => <OnboardingScreen {...props} data={data} />}
          </Stack.Screen>
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TranslationProvider>
  );
};

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default App;
