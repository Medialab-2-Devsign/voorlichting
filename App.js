// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import OnboardingScreen from "./components/onboarding/OnboardingScreen";
import { HomeStack } from "./components/Home/HomeStack";
import ProfileScreen from "./components/ProfileScreen";

import useContentfulData from "./api/api";
import { TranslationProvider } from "./contexts/TranslationContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const { data } = useContentfulData(); // Vergeet niet de hook aan te roepen met ()

  return (
    <TranslationProvider defaultLocale={"nl"}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => <OnboardingScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="HomeTab" options={{ headerShown: false }}>
            {(props) => <HomeTab data={data} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TranslationProvider>
  );
};

const HomeTab = ({ data }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {(props) => <HomeStack {...props} data={data} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default App;
