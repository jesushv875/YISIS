import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../styles/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '❤️‍🔥',
    title: 'Bienvenidos a Para Dos',
    body: 'El juego íntimo diseñado especialmente para parejas. Tres modos de juego para encender la noche.',
  },
  {
    emoji: '🎡',
    title: 'Ruleta Erótica',
    body: 'Gira la ruleta y descubre una nueva posición para explorar juntos. Más de 100 posiciones con descripción paso a paso.',
  },
  {
    emoji: '🎲',
    title: 'Dados Sexuales',
    body: 'Los dados deciden quién hace qué y en dónde. La lógica se adapta automáticamente al género de cada jugador para que todo tenga sentido.',
  },
  {
    emoji: '🔥',
    title: 'Verdad o Reto',
    body: 'Turnos alternados. Elige entre responder una verdad íntima o atreverte con un reto. ¿Quién se raja primero?',
  },
  {
    emoji: '🔒',
    title: 'Versión Gratuita y Premium',
    body: 'La versión gratuita incluye contenido para empezar. Desbloquea todo el contenido con Premium por un único pago de $3.99.',
  },
];

export default function OnboardingScreen({ onDone }) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const goTo = (idx) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
    setCurrent(idx);
    scrollRef.current?.scrollTo({ x: idx * width, animated: true });
  };

  const next = () => {
    if (current < SLIDES.length - 1) goTo(current + 1);
    else onDone();
  };

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {SLIDES.map((s, i) => (
          <View key={i} style={styles.slide}>
            <Animated.View style={[styles.slideInner, i === current && { opacity: fadeAnim }]}>
              <Text style={styles.emoji}>{s.emoji}</Text>
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.body}>{s.body}</Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goTo(i)} activeOpacity={0.7}>
              <View style={[styles.dot, i === current && styles.dotActive]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={next} activeOpacity={0.85}>
          <Text style={styles.nextBtnText}>
            {isLast ? '¡Empezar a jugar! 🚀' : 'Siguiente →'}
          </Text>
        </TouchableOpacity>

        {!isLast && (
          <TouchableOpacity style={styles.skipBtn} onPress={onDone} activeOpacity={0.7}>
            <Text style={styles.skipText}>Saltar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideInner: {
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 20,
  },
  emoji: {
    fontSize: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(233,30,140,0.25)',
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  nextBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  skipBtn: {
    paddingVertical: 4,
  },
  skipText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '600',
  },
});
