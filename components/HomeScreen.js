import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TranslationContext } from "../contexts/TranslationContext";
import { getEntriesByContentType } from "../api/api";
import { Image } from "expo-image";

const HomeScreen = () => {
  const { i18n } = useContext(TranslationContext);
  const [data, setData] = useState(null);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  useEffect(() => {
    (async () => {
      const res = await getEntriesByContentType("counseling");
      setData(res);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{i18n.t("vochtbalans.description")}</Text>
      {data?.items &&
        data.items.map((item, index) => {
          const img = data.includes.Asset.find(
            (element) => element.sys.id === item.fields.icon.sys.id
          );
          return (
            <View style={styles.card} key={item.sys.id}>
              <View style={styles.cardContent}>
                {img.fields?.file?.url && (
                  <Image
                    source={`https:${img.fields.file.url}`}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1}
                    style={{
                      height: "80%",
                      width: "100%",
                    }}
                  />
                )}
                {item.fields.title && (
                  <Text style={styles.cardContent.title}>
                    {item.fields.title}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
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
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 8,
    height: 285,
    width: 260,
  },
  cardContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    title: {
      fontSize: 22,
      paddingVertical: 5,
    },
  },
});

export default HomeScreen;
