import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getEntryByID } from "../../api/api";
import PagerView from "react-native-pager-view";
import { TranslationContext } from "../../contexts/TranslationContext";

export const StepScreen = ({ navigation, route }) => {
  const { i18n } = useContext(TranslationContext);
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
    if (id === undefined) return;
    (async () => {
      const res = await getEntryByID(id, i18n.locale, "sys.createdAt");
      setData(res);
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      {!data ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator animating color={"#0C2074"} size={"large"} />
        </View>
      ) : (
        <PagerView initialPage={0} style={styles.pagerView}>
          <View key={1} collapsable={false} style={{ backgroundColor: "red" }}>
            <Text>DATA FETCHED</Text>
          </View>
          <View
            key={2}
            collapsable={false}
            style={{ backgroundColor: "white" }}
          >
            <Text>DATA FETCHED 2</Text>
          </View>
          <View key={3} collapsable={false} style={{ backgroundColor: "blue" }}>
            <Text>DATA FETCHED 3</Text>
          </View>
        </PagerView>
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
  pagerView: {
    height: "100%",
    width: "100%",
    backgroundColor: "orange",
  },
});
