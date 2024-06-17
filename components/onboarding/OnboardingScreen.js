import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import colors from "../../frontend/Colors";
import GlobeImage from "../../assets/images/Globe.png";
import { TranslationContext } from "../../contexts/TranslationContext"; // Importeer TranslationContext

const OnboardingScreen = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { i18n, changeLocale } = useContext(TranslationContext); // Gebruik useContext om toegang te krijgen tot i18n en changeLocale

  const onLanguageSelect = (language) => {
    setSelectedLanguage(language);
    changeLocale(language); // Wijzig de taal met changeLocale
  };

  const renderLanguageList = () => {
    return i18n.availableLocales.map((language, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.languageItem,
          selectedLanguage === language.code && styles.selectedItem,
        ]}
        onPress={() => onLanguageSelect(language.code)}
      >
        <Text
          style={[
            styles.languageText,
            selectedLanguage === language.code && styles.selectedText,
          ]}
        >
          {language.languageString}
        </Text>
      </TouchableOpacity>
    ));
  };

  const onDone = () => {
    props.navigation.navigate("HomeTab");
  };

  return (
    <Onboarding
      onDone={onDone}
      onSkip={onDone}
      skipLabel={i18n.t("ui.skipButton")}
      nextLabel={i18n.t("ui.nextButton")}
      pages={[
        {
          backgroundColor: colors.blue__700,
          title: i18n.t("onboard.title"), // Gebruik i18n.t om vertalingen te verkrijgen
          subtitle: i18n.t("onboard.subtitle"), // Gebruik i18n.t om vertalingen te verkrijgen
          image: <Image source={GlobeImage} style={styles.image} />,
        },
        {
          title: <View />,
          backgroundColor: colors.grey__100,
          image: <Image source={GlobeImage} style={styles.image} />,
          subtitle: (
            <View style={styles.languageList}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {renderLanguageList()}
              </ScrollView>
            </View>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  languageList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
    marginBottom: 50,
  },
  scrollView: {
    flexGrow: 1,
    width: "auto",
    paddingHorizontal: 50,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  languageItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue__700,
    width: "100%",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: colors.blue__700,
  },
  languageText: {
    fontSize: 16,
    color: colors.blue__700,
  },
  selectedText: {
    color: "#ffffff",
  },
});

export default OnboardingScreen;
