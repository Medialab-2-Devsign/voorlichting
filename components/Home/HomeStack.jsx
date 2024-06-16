import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { CounselScreen } from "../Counsel/CounselScreen";
import { StepScreen } from "../Step/StepScreen";

export const HomeStack = ({ data }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" label={"Home"}>
        {(props) => <HomeScreen data={data} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Counsel">
        {(props) => <CounselScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Step">
        {(props) => <StepScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
