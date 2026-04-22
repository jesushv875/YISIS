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
import { verdades, retos } from '../data/gameData';
import TurnBadge from '../components/TurnBadge';
import PaywallModal from '../components/PaywallModal';
import { COLORS } from '../styles/theme';
import { usePremium, FREE_LIMITS } from '../context/PremiumContext';
import { useInterstitialAd } from '../hooks/useInterstitialAd';

const MAX_ATTEMPTS = 3;

export default function TruthOrDareScreen() {
  const { players, gameTurn, setGameTurn } = useGame();
  const { isPremium } = usePremium();
  const { onTurn } = useInterstitialAd(isPremium);
  const [resultado, setResultado] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const lastVerdadIdx = useRef(-1);
  const lastRetoIdx = useRef(-1);
  const isAnimating = useRef(false);
  // Snapshot del turno en el momento que se inicia la ronda
  const turnSnapshot = useRef({ actor: players[gameTurn], receiver: players[1 - gameTurn] });

  const actor = players[gameTurn];
  const receiver = players[1 - gameTurn];

  const verdadesPool = isPremium ? verdades : verdades.slice(0, FREE_LIMITS.verdades);
  const retosPool = isPremium ? retos : retos.slice(0, FREE_LIMITS.retos);

  const pickRandom = (arr, lastRef) => {
    let idx;
    do {
      idx = Math.floor(Math.random() * arr.length);
    } while (idx === lastRef.current && arr.length > 1);
    lastRef.current = idx;
    return arr[idx];
  };

  const animateResult = (onDone) => {
    fadeAnim.setValue(0);
    isAnimating.current = true;
    Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true })
      .start(() => { isAnimating.current = false; onDone?.(); });
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
  };

  // Primera elección: toma snapshot del turno actual y avanza el turno
  const elegirVerdad = () => {
    if (isAnimating.current) return;
    turnSnapshot.current = { actor, receiver };
    const v = pickRandom(verdadesPool, lastVerdadIdx);
    setTipo('verdad');
    setResultado({ texto: v, actorName: actor.name, receiverName: receiver.name });
    setAttempts(1);
    setGameTurn(1 - gameTurn);
    onTurn();
    animateResult();
  };

  const elegirReto = () => {
    if (isAnimating.current) return;
    turnSnapshot.current = { actor, receiver };
    const r = pickRandom(retosPool, lastRetoIdx);
    setTipo('reto');
    setResultado({ texto: r, actorName: actor.name, receiverName: receiver.name });
    setAttempts(1);
    setGameTurn(1 - gameTurn);
    onTurn();
    animateResult();
  };

  // Reintento: mantiene el snapshot del turno, NO cambia el turno
  const reintentarVerdad = () => {
    if (isAnimating.current) return;
    const { actor: a, receiver: r } = turnSnapshot.current;
    const v = pickRandom(verdadesPool, lastVerdadIdx);
    setTipo('verdad');
    setResultado({ texto: v, actorName: a.name, receiverName: r.name });
    setAttempts(prev => prev + 1);
    animateResult();
  };

  const reintentarReto = () => {
    if (isAnimating.current) return;
    const { actor: a, receiver: r } = turnSnapshot.current;
    const re = pickRandom(retosPool, lastRetoIdx);
    setTipo('reto');
    setResultado({ texto: re, actorName: a.name, receiverName: r.name });
    setAttempts(prev => prev + 1);
    animateResult();
  };

  const canRetry = attempts > 0 && attempts < MAX_ATTEMPTS;
  const lockedV = verdades.length - FREE_LIMITS.verdades;
  const lockedR = retos.length - FREE_LIMITS.retos;

  return (
    <>
      <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🔥 Verdad o Reto</Text>
          <Text style={styles.subtitle}>¡Elige y atrévete!</Text>
          {!isPremium && (
            <TouchableOpacity style={styles.lockBadge} onPress={() => setPaywallVisible(true)} activeOpacity={0.8}>
              <Text style={styles.lockText}>🔒 +{lockedV} verdades · +{lockedR} retos con Premium</Text>
            </TouchableOpacity>
          )}
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

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.truthBtn]} onPress={elegirVerdad} activeOpacity={0.85}>
            <Text style={styles.buttonIcon}>💬</Text>
            <Text style={styles.buttonText}>Verdad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.dareBtn]} onPress={elegirReto} activeOpacity={0.85}>
            <Text style={styles.buttonIcon}>🔥</Text>
            <Text style={styles.buttonText}>Reto</Text>
          </TouchableOpacity>
        </View>

        {!resultado && (
          <Text style={styles.instruction}>
            ¿Elige para {actor.name}: una pregunta o un desafío? 👆
          </Text>
        )}

        {resultado && (
          <Animated.View
            style={[styles.resultCard, tipo === 'verdad' ? styles.truthCard : styles.dareCard, { opacity: fadeAnim }]}
          >
            {tipo === 'verdad' ? (
              <View style={styles.truthHeader}>
                <Text style={styles.truthHeaderEmoji}>
                  {resultado.actorName === players[0].name
                    ? (players[0].gender === 'male' ? '👨' : '👩')
                    : (players[1].gender === 'male' ? '👨' : '👩')}
                </Text>
                <Text style={styles.truthHeaderName}>{resultado.actorName}</Text>
                <Text style={styles.truthHeaderSub}>debe responder</Text>
              </View>
            ) : (
              <TurnBadge actor={resultado.actorName} receiver={resultado.receiverName} />
            )}

            <Text style={[styles.resultLabel, tipo === 'verdad' ? styles.truthLabel : styles.dareLabel]}>
              {tipo === 'verdad' ? '💬 VERDAD' : '🔥 RETO'}
            </Text>
            <Text style={styles.resultText}>{resultado.texto}</Text>

            {canRetry && (
              <View style={styles.retryRow}>
                <Text style={styles.attemptsLeft}>
                  Intento {attempts}/{MAX_ATTEMPTS}
                </Text>
                <View style={styles.retryBtns}>
                  <TouchableOpacity
                    style={[styles.retryBtn, tipo === 'verdad' ? styles.retryBtnTruth : styles.retryBtnDare]}
                    onPress={tipo === 'verdad' ? reintentarVerdad : reintentarReto}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.retryBtnText}>
                      {tipo === 'verdad' ? '💬 Otra verdad' : '🔥 Otro reto'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.retryBtn, tipo === 'verdad' ? styles.retryBtnDare : styles.retryBtnTruth]}
                    onPress={tipo === 'verdad' ? reintentarReto : reintentarVerdad}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.retryBtnText}>
                      {tipo === 'verdad' ? '🔥 Mejor un reto' : '💬 Mejor verdad'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!canRetry && attempts >= MAX_ATTEMPTS && (
              <Text style={styles.noMoreRetries}>Sin más intentos — ¡hay que cumplirla! 😈</Text>
            )}
          </Animated.View>
        )}
      </ScrollView>

      <PaywallModal visible={paywallVisible} onClose={() => setPaywallVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { alignItems: 'center', padding: 20, paddingBottom: 50, gap: 20 },
  header: { alignItems: 'center', gap: 6 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.primary },
  subtitle: { fontSize: 14, color: COLORS.muted },
  lockBadge: {
    backgroundColor: '#fce4ec', paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 10, borderWidth: 1, borderColor: COLORS.border,
  },
  lockText: { fontSize: 12, color: COLORS.primary, fontWeight: '700' },
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
  buttonRow: { flexDirection: 'row', gap: 14, width: '100%' },
  button: {
    flex: 1, paddingVertical: 20, borderRadius: 16, alignItems: 'center',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 5, gap: 4,
  },
  truthBtn: { backgroundColor: COLORS.truth, shadowColor: COLORS.truth },
  dareBtn: { backgroundColor: COLORS.dare, shadowColor: COLORS.dare },
  buttonIcon: { fontSize: 28 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  instruction: {
    fontSize: 14, color: COLORS.muted, textAlign: 'center',
    fontStyle: 'italic', paddingHorizontal: 20,
  },
  resultCard: {
    borderRadius: 18, padding: 24, width: '100%', alignItems: 'center',
    borderWidth: 1, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 10, elevation: 4, gap: 10,
  },
  truthCard: { backgroundColor: '#f3e5f5', borderColor: '#ce93d8', shadowColor: COLORS.truth },
  dareCard: { backgroundColor: '#ffebee', borderColor: '#ef9a9a', shadowColor: COLORS.dare },
  truthHeader: { alignItems: 'center', gap: 2 },
  truthHeaderEmoji: { fontSize: 32 },
  truthHeaderName: { fontSize: 18, fontWeight: '900', color: COLORS.truth },
  truthHeaderSub: { fontSize: 12, color: COLORS.muted, fontStyle: 'italic' },
  resultLabel: { fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  truthLabel: { color: COLORS.truth },
  dareLabel: { color: COLORS.dare },
  resultText: { fontSize: 18, color: COLORS.text, textAlign: 'center', lineHeight: 28 },
  retryRow: { width: '100%', gap: 8, marginTop: 4 },
  attemptsLeft: {
    fontSize: 11, fontWeight: '700', color: COLORS.muted,
    letterSpacing: 1, textAlign: 'center',
  },
  retryBtns: { flexDirection: 'row', gap: 10 },
  retryBtn: { flex: 1, paddingVertical: 11, borderRadius: 12, alignItems: 'center' },
  retryBtnTruth: {
    backgroundColor: 'rgba(123,31,162,0.12)',
    borderWidth: 1, borderColor: 'rgba(123,31,162,0.25)',
  },
  retryBtnDare: {
    backgroundColor: 'rgba(229,57,53,0.1)',
    borderWidth: 1, borderColor: 'rgba(229,57,53,0.22)',
  },
  retryBtnText: { fontSize: 13, fontWeight: '800', color: COLORS.text },
  noMoreRetries: {
    fontSize: 13, fontWeight: '700', color: COLORS.dare,
    textAlign: 'center', fontStyle: 'italic',
  },
});
