import * as Sentry from '@sentry/react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './context/GameContext';
import { PremiumProvider } from './context/PremiumContext';
import ErrorBoundary from './components/ErrorBoundary';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RouletteScreen from './screens/RouletteScreen';
import DiceScreen from './screens/DiceScreen';
import TruthOrDareScreen from './screens/TruthOrDareScreen';
import { View } from 'react-native';
import { COLORS } from './styles/theme';
import AdBanner from './components/AdBanner';

// Replace with your DSN from sentry.io
Sentry.init({
  dsn: 'https://REPLACE_WITH_YOUR_DSN@sentry.io/0',
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});

const Tab = createBottomTabNavigator();

function GameTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = { Ruleta: 'disc-outline', Dados: 'dice-outline', Juego: 'flame-outline' };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: { backgroundColor: COLORS.tabBar, borderTopColor: COLORS.border },
        headerStyle: { backgroundColor: COLORS.bg },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '800', fontSize: 17 },
      })}
    >
      <Tab.Screen name="Ruleta" component={RouletteScreen} options={{ headerTitle: '🎡 Ruleta Erótica' }} />
      <Tab.Screen name="Dados" component={DiceScreen} options={{ headerTitle: '🎲 Dados Sexuales' }} />
      <Tab.Screen name="Juego" component={TruthOrDareScreen} options={{ title: 'Verdad/Reto', headerTitle: '🔥 Verdad o Reto' }} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const [screen, setScreen] = useState(null); // null=loading | onboarding | home | game
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@para_dos_onboarded')
      .then(val => setScreen(val ? 'home' : 'onboarding'))
      .catch(() => setScreen('onboarding'));
  }, []);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem('@para_dos_onboarded', 'true');
    setScreen('home');
  };

  if (!screen) return null;

  if (screen === 'onboarding') {
    return <OnboardingScreen onDone={finishOnboarding} />;
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        onStart={(p1, p2) => {
          setPlayers([p1, p2]);
          setScreen('game');
        }}
      />
    );
  }

  return (
    <GameProvider players={players}>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor={COLORS.bg} />
        <View style={{ flex: 1 }}>
          <GameTabs />
          <AdBanner />
        </View>
      </NavigationContainer>
    </GameProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PremiumProvider>
        <AppContent />
      </PremiumProvider>
    </ErrorBoundary>
  );
}
