import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { TranslationContext } from "../../contexts/TranslationContext";
import { getEntriesByContentType } from "../../api/api";

import { CounselingCard } from "../Cards/CounselingCard";

export const HomeScreen = ({ navigation }) => {
  const { i18n } = useContext(TranslationContext);
  const [data, setData] = useState(null);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    (async () => {
      const res = await getEntriesByContentType("counseling");
      setData(res);
    })();
  }, []);

  const onCardPress = (id) => {
    console.log(id);
    navigation.navigate("Counseling", { id: id });
  };

  const renderCards = ({ item }) => {
    const icon = data.includes.Asset.find(
      (element) => element?.sys?.id === item?.fields?.icon?.sys?.id
    );
    return <CounselingCard item={item} icon={icon} onCardPress={onCardPress} />;
  };

  return (
    <View style={styles.container}>
      <Text>{i18n.t("vochtbalans.description")}</Text>
      {data?.items && (
        <FlatList
          numColumns={windowWidth > 500 ? 3 : 2}
          data={data.items}
          renderItem={(item) => renderCards(item)}
          keyExtractor={(item) => item.sys.id}
          style={{ width: "100%" }}
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
});
