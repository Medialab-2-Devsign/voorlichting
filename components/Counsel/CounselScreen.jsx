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
    // check for id, if no id is given refer them back to the Homescreen where they can select a Context.
    if (!route?.params?.id && !id) {
      navigation.navigate("HomeScreen");
    }
    if (route.params.id === null) return;
    setID(route.params.id);
  }, []);

  useEffect(() => {
    if (id === null) return;
    (async () => {
      // fetch selected Context.
      const res = await getEntryByID(id, i18n.locale);
      setData(res);

      // Collect all counselIDs to be able to fetch them.
      const counselIDs = res.fields.counsels.map((counsel) => counsel.sys.id);
      const counselsRes = await getEntriesByIDs(
        counselIDs,
        i18n.locale,
        "sys.createdAt"
      );

      // Sort Counsels as they are ordered in the Context.
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

  const renderListHeader = () => {
    return (
      <Text style={styles.description.text}>
        {/* // wtf */}
        {data?.fields?.description?.content[0]?.content[0]?.value ?? ""}{" "}
        {i18n.t("description.cta")}
      </Text>
    );
  };

  const renderCards = ({ item }) => {
    // images are found in an array called includes, and not with the items themselves.
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
          ListHeaderComponent={() => renderListHeader()}
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
