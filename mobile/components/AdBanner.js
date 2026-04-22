import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { usePremium } from '../context/PremiumContext';

// Replace with your real banner ad unit ID from AdMob once approved
const AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-REPLACE_WITH_YOUR_ADMOB_ID/REPLACE_WITH_BANNER_UNIT';

export default function AdBanner() {
  const { isPremium } = usePremium();

  if (isPremium) return null;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff5f8',
  },
});
