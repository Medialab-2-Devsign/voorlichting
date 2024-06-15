import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { CounselingScreen } from "../Counseling/CounselingScreen";

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
      <Stack.Screen name="Counseling">
        {(props) => <CounselingScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
