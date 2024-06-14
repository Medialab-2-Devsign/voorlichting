import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import colors from '../../frontend/Colors'

const OnboardingScreen = (props) => {
  const onDone = () => {
    props.navigation.navigate('HomeTab'); // Navigeer naar het Home component
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
          backgroundColor: colors.blue__700,
          title: 'Tweede scherm',
          subtitle: 'Meer informatie over je app.',
        },
        
      ]}
    />
  );
};

export default OnboardingScreen;
