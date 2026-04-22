import { useEffect, useRef } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// Replace with your real interstitial ad unit ID from AdMob once approved
const AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-REPLACE_WITH_YOUR_ADMOB_ID/REPLACE_WITH_INTERSTITIAL_UNIT';

const SHOW_EVERY_N_TURNS = 5;

export function useInterstitialAd(isPremium) {
  const ad = useRef(InterstitialAd.createForAdRequest(AD_UNIT_ID, { requestNonPersonalizedAdsOnly: true }));
  const turnCount = useRef(0);
  const loaded = useRef(false);

  useEffect(() => {
    if (isPremium) return;

    const unsubLoad = ad.current.addAdEventListener(AdEventType.LOADED, () => {
      loaded.current = true;
    });
    const unsubClose = ad.current.addAdEventListener(AdEventType.CLOSED, () => {
      loaded.current = false;
      ad.current.load();
    });
    const unsubError = ad.current.addAdEventListener(AdEventType.ERROR, () => {
      loaded.current = false;
    });

    ad.current.load();

    return () => {
      unsubLoad();
      unsubClose();
      unsubError();
    };
  }, [isPremium]);

  const onTurn = () => {
    if (isPremium) return;
    turnCount.current += 1;
    if (turnCount.current % SHOW_EVERY_N_TURNS === 0 && loaded.current) {
      ad.current.show();
    }
  };

  return { onTurn };
}
