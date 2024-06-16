import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ListCard = ({ item, icon, onCardPress }) => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <TouchableOpacity
      style={styles.card}
      key={item.sys.id}
      onPress={() => onCardPress(item.sys.id)}
    >
      <View style={styles.cardContent}>
        {icon.fields?.file?.url && (
          <Image
            source={`https:${icon.fields.file.url}`}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={{
              height: "80%",
              width: "100%",
            }}
          />
        )}
        {item.fields.title && (
          <Text style={styles.cardContent.title}>{item.fields.title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
