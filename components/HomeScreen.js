import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TranslationContext } from "../contexts/TranslationContext";

const HomeScreen = () => {
  const { i18n, changeLocale } = useContext(TranslationContext);

  return (
    <View style={styles.container}>
      <Text>{i18n.t("hello")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
