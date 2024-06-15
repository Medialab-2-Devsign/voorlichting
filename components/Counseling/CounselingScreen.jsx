import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getEntryByID } from "../../api/api";

export const CounselingScreen = ({ navigation, route }) => {
  const [id, setID] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    if (!route?.params?.id && !id) {
      navigation.navigate("HomeScreen");
    }
    if (route.params.id === null) return;
    setID(route.params.id);
  }, []);

  useEffect(() => {
    if (id === null) return;
    (async () => {
      const res = await getEntryByID(id);
      setData(res);
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      {!data ? (
        <View style={{ width: 100, height: 100 }}>
          <ActivityIndicator animating color={"#0C2074"} size={"large"} />
        </View>
      ) : (
        <View>
          <Text>DATA FETCHED</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#0C207430",
  },
});
