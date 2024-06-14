import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import colors from '../../frontend/Colors';
import GlobeImage from '../../assets/images/Globe.png';

const OnboardingScreen = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { label: 'Nederlands', value: 'nl' },
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Deutsch', value: 'de' },

  ];

  const onLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const renderLanguageList = () => {
    return languages.map((language, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.languageItem, selectedLanguage === language.value && styles.selectedItem]}
        onPress={() => onLanguageSelect(language.value)}
      >
        <Text style={[styles.languageText, selectedLanguage === language.value && styles.selectedText]}>{language.label}</Text>
      </TouchableOpacity>
    ));
  };

  const onDone = () => {
    // Hier kun je de geselecteerde taal verder verwerken
    props.navigation.navigate('HomeTab');
  };

  return (
    <Onboarding
      onDone={onDone}
      pages={[
        {
          backgroundColor: colors.blue__700,
          title: 'Welkom bij Onboarding',
          subtitle: 'Een korte introductie over je app.',
        },
        {
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
    resizeMode: 'contain',
  },
  languageList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
    marginBottom: 50,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  languageItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue__700,
    width: '100%',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: colors.blue__700,
  },
  languageText: {
    fontSize: 16,
    color: colors.blue__700,
  },
  selectedText: {
    color: '#ffffff', // Witte tekstkleur voor geselecteerde taal
  },
});

export default OnboardingScreen;
