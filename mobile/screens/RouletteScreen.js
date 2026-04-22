import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { posiciones } from '../data/gameData';
import images from '../assets/images';
import { COLORS } from '../styles/theme';
import { usePremium, FREE_LIMITS } from '../context/PremiumContext';
import PaywallModal from '../components/PaywallModal';

export default function RouletteScreen() {
  const { isPremium } = usePremium();
  const [resultado, setResultado] = useState(null);
  const [count, setCount] = useState(0);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const spinValue = useRef(0);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const lastIndex = useRef(-1);

  const pool = isPremium ? posiciones : posiciones.slice(0, FREE_LIMITS.posiciones);

  const girarRuleta = () => {
    spinValue.current += 720;
    Animated.timing(spinAnim, {
      toValue: spinValue.current,
      duration: 600,
      useNativeDriver: true,
    }).start();

    let idx;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === lastIndex.current && pool.length > 1);
    lastIndex.current = idx;

    fadeAnim.setValue(0);
    setResultado(pool[idx]);
    setCount(c => c + 1);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const spin = spinAnim.interpolate({
    inputRange: [spinValue.current - 720, spinValue.current],
    outputRange: ['0deg', '720deg'],
    extrapolate: 'extend',
  });

  const locked = posiciones.length - FREE_LIMITS.posiciones;

  return (
    <>
      <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🎡 Ruleta Erótica</Text>
          <Text style={styles.subtitle}>¡Gira y descubre la posición!</Text>
          <View style={styles.statsRow}>
            <Text style={styles.total}>{pool.length} posiciones</Text>
            {!isPremium && (
              <TouchableOpacity style={styles.lockBadge} onPress={() => setPaywallVisible(true)} activeOpacity={0.8}>
                <Text style={styles.lockText}>🔒 +{locked} con Premium</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <TouchableOpacity style={styles.button} onPress={girarRuleta} activeOpacity={0.85}>
            <Text style={styles.buttonText}>🎡 Girar Ruleta</Text>
          </TouchableOpacity>
        </Animated.View>

        {!resultado && (
          <Text style={styles.instruction}>
            Gira la ruleta para descubrir qué posición probar 🎡
          </Text>
        )}

        {resultado && (
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.positionName}>{resultado.nombre}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>#{count}</Text>
              </View>
            </View>
            <Text style={styles.description}>{resultado.descripcion}</Text>
            {resultado.imagen && images[resultado.imagen] && (
              <Image
                source={images[resultado.imagen]}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity style={styles.replayBtn} onPress={girarRuleta} activeOpacity={0.85}>
              <Text style={styles.replayBtnText}>🎡 Girar de nuevo</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>

      <PaywallModal visible={paywallVisible} onClose={() => setPaywallVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50,
    gap: 20,
  },
  header: {
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  total: {
    fontSize: 12,
    color: COLORS.muted,
    opacity: 0.7,
  },
  lockBadge: {
    backgroundColor: '#fce4ec',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lockText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  instruction: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 22,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  positionName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    flexShrink: 1,
  },
  countBadge: {
    backgroundColor: '#fce4ec',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  image: {
    width: 270,
    height: 270,
    borderRadius: 14,
  },
  replayBtn: {
    marginTop: 4,
    backgroundColor: '#fce4ec',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  replayBtnText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});
