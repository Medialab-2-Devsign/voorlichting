import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { TranslationContext } from "../../contexts/TranslationContext";
import { getEntryByID, getEntriesByIDs } from "../../api/api";

import { ListCard } from "../Cards/ListCard";

export const CounselScreen = ({ navigation, route }) => {
  const { i18n } = useContext(TranslationContext);
  const [data, setData] = useState();
  const [counsels, setCounsels] = useState();
  const [id, setID] = useState(null);
  const windowWidth = useWindowDimensions().width;

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
      const res = await getEntryByID(id, i18n.locale);
      setData(res);

      const counselIDs = res.fields.counsels.map((counsel) => counsel.sys.id);
      const counselsRes = await getEntriesByIDs(
        counselIDs,
        "sys.createdAt",
        i18n.locale
      );
      const sortedCounsels = counselIDs.map((id) =>
        counselsRes.items.find((item) => item.sys.id === id)
      );
      counselsRes.items = sortedCounsels;
      setCounsels(counselsRes);
    })();
  }, [id]);

  const onCardPress = (id) => {
    navigation.navigate("Step", { id: id });
  };

  const renderCards = ({ item }) => {
    const icon = counsels?.includes?.Asset?.find(
      (element) => element?.sys?.id === item?.fields?.icon?.sys?.id
    );
    return <ListCard item={item} icon={icon} onCardPress={onCardPress} />;
  };

  return (
    <View style={styles.container}>
      {counsels && (
        <FlatList
          numColumns={windowWidth > 500 ? 3 : 2}
          data={counsels.items}
          renderItem={(item) => renderCards(item)}
          keyExtractor={(item) => item.sys.id}
          style={{ width: "100%" }}
          ListHeaderComponent={
            <Text style={styles.description.text}>
              {i18n.t("vochtbalans.description")}
            </Text>
          }
          ListHeaderComponentStyle={styles.description}
        />
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
  description: {
    marginHorizontal: 20,
    marginVertical: 10,
    text: {
      fontSize: 20,
    },
  },
});
