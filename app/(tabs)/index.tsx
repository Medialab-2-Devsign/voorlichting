import { Image, StyleSheet, Platform, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [entry, setEntry] = useState(null);

  const getEntries = async () => {
    try {
    const apiUrl = 'https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries?access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

const getEntry = async (id: string) => {
  try {
  const apiUrl = `https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries/${id}?access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  setEntry(data);
  console.log(data)
} catch (error) {
  console.error('Error fetching data:', error.message);
}
};

  useEffect(() => {
    getEntries();
  }, []);

  if (data) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
       <Text> HAllo</Text>
      </ParallaxScrollView>
    );
  } else {
    return (
        <Text>
          loading...
        </Text>
    )
  }
 
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
