import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useGame } from '../context/GameContext';
import { usePremium } from '../context/PremiumContext';
import { useInterstitialAd } from '../hooks/useInterstitialAd';
import { diceActions } from '../data/gameData';
import TurnBadge from '../components/TurnBadge';
import TimerBlock from '../components/TimerBlock';
import { COLORS } from '../styles/theme';

const MAX_ATTEMPTS = 3;

function getActionPool(actorGender, receiverGender, esIntensa) {
  return diceActions.filter(a => {
    if (a.intenso !== esIntensa) return false;
    if (a.soloActorMasculino && actorGender !== 'male') return false;
    const zones = receiverGender === 'female' ? a.zonasMujer : a.zonasHombre;
    return zones.length > 0;
  });
}

function pickAction(actorGender, receiverGender, lastKey) {
  const esIntensa = Math.random() < 0.3;
  let pool = getActionPool(actorGender, receiverGender, esIntensa);
  if (pool.length === 0) pool = getActionPool(actorGender, receiverGender, false);

  let obj;
  let tries = 0;
  do {
    obj = pool[Math.floor(Math.random() * pool.length)];
    tries++;
  } while (obj.accion === lastKey && pool.length > 1 && tries < 10);
  return obj;
}

export default function DiceScreen() {
  const { players, diceTurn, setDiceTurn } = useGame();
  const { isPremium } = usePremium();
  const { onTurn } = useInterstitialAd(isPremium);
  const [resultado, setResultado] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const lastActionKey = useRef(null);
  const isAnimating = useRef(false);
  // Snapshot del turno al momento del primer lanzamiento
  const turnSnapshot = useRef({ actor: players[diceTurn], receiver: players[1 - diceTurn] });

  const actor = players[diceTurn];
  const receiver = players[1 - diceTurn];

  const animateResult = () => {
    isAnimating.current = true;
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1.2, duration: 120, useNativeDriver: true }),
      Animated.timing(bounceAnim, { toValue: 0.88, duration: 80, useNativeDriver: true }),
      Animated.timing(bounceAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1, duration: 350, delay: 150, useNativeDriver: true,
    }).start(() => { isAnimating.current = false; });

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
  };

  const buildResultado = (a, r) => {
    const accionObj = pickAction(a.gender, r.gender, lastActionKey.current);
    lastActionKey.current = accionObj.accion;
    const zones = r.gender === 'female' ? accionObj.zonasMujer : accionObj.zonasHombre;
    const zona = zones[Math.floor(Math.random() * zones.length)];
    return {
      texto: `¡${accionObj.accion} en ${zona}!`,
      actorName: a.name,
      receiverName: r.name,
      tiempo: accionObj.tiempo || null,
    };
  };

  // Primer lanzamiento: toma snapshot y avanza el turno
  const lanzarDados = () => {
    if (isAnimating.current) return;
    turnSnapshot.current = { actor, receiver };
    setResultado(buildResultado(actor, receiver));
    setAttempts(1);
    setDiceTurn(1 - diceTurn);
    onTurn();
    animateResult();
  };

  // Reintento: usa el snapshot, NO avanza el turno
  const relanzar = () => {
    if (isAnimating.current) return;
    const { actor: a, receiver: r } = turnSnapshot.current;
    setResultado(buildResultado(a, r));
    setAttempts(prev => prev + 1);
    animateResult();
  };

  const canRetry = attempts > 0 && attempts < MAX_ATTEMPTS;

  return (
    <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>🎲 Dados Sexuales</Text>
        <Text style={styles.subtitle}>¡Lanza y obedece!</Text>
      </View>

      <View style={styles.turnCard}>
        <View style={styles.turnRow}>
          <View style={styles.playerPill}>
            <Text style={styles.playerEmoji}>{actor.gender === 'male' ? '👨' : '👩'}</Text>
            <Text style={styles.playerName}>{actor.name}</Text>
          </View>
          <Text style={styles.turnArrow}>→</Text>
          <View style={[styles.playerPill, styles.playerPillReceiver]}>
            <Text style={styles.playerEmoji}>{receiver.gender === 'male' ? '👨' : '👩'}</Text>
            <Text style={[styles.playerName, styles.playerNameReceiver]}>{receiver.name}</Text>
          </View>
        </View>
        <Text style={styles.turnLabel}>TURNO DE {actor.name.toUpperCase()}</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={lanzarDados} activeOpacity={0.85}>
          <Text style={styles.buttonText}>🎲 Lanzar Dados</Text>
        </TouchableOpacity>
      </Animated.View>

      {!resultado && (
        <Text style={styles.instruction}>
          Presiona el botón para ver qué le toca hacer a {actor.name} 👆
        </Text>
      )}

      {resultado && (
        <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
          <TurnBadge actor={resultado.actorName} receiver={resultado.receiverName} />
          <Text style={styles.resultText}>{resultado.texto}</Text>
          {resultado.tiempo && (
            <TimerBlock key={resultado.texto} tiempo={resultado.tiempo} />
          )}

          {canRetry && (
            <View style={styles.retryRow}>
              <Text style={styles.attemptsLeft}>Intento {attempts}/{MAX_ATTEMPTS}</Text>
              <TouchableOpacity style={styles.rerollBtn} onPress={relanzar} activeOpacity={0.85}>
                <Text style={styles.rerollBtnText}>🎲 Lanzar de nuevo</Text>
              </TouchableOpacity>
            </View>
          )}

          {attempts >= MAX_ATTEMPTS && (
            <Text style={styles.noMoreRetries}>Sin más intentos — ¡hay que cumplirlo! 😈</Text>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { alignItems: 'center', padding: 20, paddingBottom: 50, gap: 20 },
  header: { alignItems: 'center', gap: 4 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.primary },
  subtitle: { fontSize: 14, color: COLORS.muted },
  turnCard: {
    backgroundColor: COLORS.card, borderRadius: 16, padding: 18, width: '100%',
    alignItems: 'center', borderWidth: 1, borderColor: COLORS.border,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12, shadowRadius: 8, elevation: 3, gap: 10,
  },
  turnRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  playerPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.primary, borderRadius: 20,
    paddingVertical: 6, paddingHorizontal: 14,
  },
  playerPillReceiver: {
    backgroundColor: 'rgba(233,30,140,0.1)',
    borderWidth: 1.5, borderColor: 'rgba(233,30,140,0.3)',
  },
  playerEmoji: { fontSize: 16 },
  playerName: { fontSize: 14, fontWeight: '700', color: '#fff' },
  playerNameReceiver: { color: COLORS.primary },
  turnArrow: { fontSize: 18, color: COLORS.muted, fontWeight: '700' },
  turnLabel: { fontSize: 11, fontWeight: '700', color: COLORS.muted, letterSpacing: 2 },
  button: {
    backgroundColor: COLORS.primary, paddingVertical: 18, paddingHorizontal: 48,
    borderRadius: 16, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  instruction: {
    fontSize: 14, color: COLORS.muted, textAlign: 'center',
    fontStyle: 'italic', paddingHorizontal: 20,
  },
  resultCard: {
    backgroundColor: COLORS.card, borderRadius: 18, padding: 22, width: '100%',
    alignItems: 'center', borderWidth: 1, borderColor: COLORS.border,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 10, elevation: 4, gap: 10,
  },
  resultText: { fontSize: 22, fontWeight: '700', color: COLORS.text, textAlign: 'center', lineHeight: 32 },
  retryRow: { width: '100%', alignItems: 'center', gap: 8 },
  attemptsLeft: { fontSize: 11, fontWeight: '700', color: COLORS.muted, letterSpacing: 1 },
  rerollBtn: {
    backgroundColor: '#fce4ec', paddingVertical: 12, paddingHorizontal: 32,
    borderRadius: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  rerollBtnText: { color: COLORS.primary, fontSize: 15, fontWeight: '800' },
  noMoreRetries: {
    fontSize: 13, fontWeight: '700', color: COLORS.dare,
    textAlign: 'center', fontStyle: 'italic',
  },
});
