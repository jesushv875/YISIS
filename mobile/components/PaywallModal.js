import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { usePremium } from '../context/PremiumContext';
import { posiciones, verdades, retos } from '../data/gameData';
import { FREE_LIMITS } from '../context/PremiumContext';
import { COLORS } from '../styles/theme';

const FEATURES = [
  { icon: '🎡', text: `${posiciones.length - FREE_LIMITS.posiciones} posiciones extra desbloqueadas` },
  { icon: '💬', text: `${verdades.length - FREE_LIMITS.verdades} verdades adicionales` },
  { icon: '🔥', text: `${retos.length - FREE_LIMITS.retos} retos adicionales` },
  { icon: '🔄', text: 'Acceso ilimitado a todo el contenido' },
  { icon: '🚫', text: 'Sin anuncios, para siempre' },
];

export default function PaywallModal({ visible, onClose }) {
  const { setIsPremium, restorePurchase } = usePremium();
  const [loading, setLoading] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState('');

  const handleUnlock = async () => {
    setLoading(true);
    // TODO: replace with real IAP call:
    // const result = await InAppPurchases.purchaseItemAsync('para_dos_premium');
    // if (result.responseCode === IAPResponseCode.OK) { ... }
    await setIsPremium(true);
    setLoading(false);
    onClose();
  };

  const handleRestore = async () => {
    setLoading(true);
    setRestoreMsg('');
    const ok = await restorePurchase();
    setLoading(false);
    if (ok) { onClose(); }
    else { setRestoreMsg('No se encontró ninguna compra anterior.'); }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.emoji}>❤️‍🔥</Text>
            <Text style={styles.title}>Para Dos Premium</Text>
            <Text style={styles.subtitle}>Desbloquea todo el contenido de una sola vez</Text>

            <View style={styles.featureList}>
              {FEATURES.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <Text style={styles.featureIcon}>{f.icon}</Text>
                  <Text style={styles.featureText}>{f.text}</Text>
                </View>
              ))}
            </View>

            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>PAGO ÚNICO · SIN SUSCRIPCIÓN</Text>
              <Text style={styles.price}>$3.99</Text>
            </View>

            <TouchableOpacity style={styles.unlockBtn} onPress={handleUnlock} activeOpacity={0.85} disabled={loading}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.unlockBtnText}>🔓 Desbloquear Premium</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.restoreBtn} onPress={handleRestore} activeOpacity={0.7} disabled={loading}>
              <Text style={styles.restoreText}>Restaurar compra</Text>
            </TouchableOpacity>

            {restoreMsg ? <Text style={styles.restoreMsg}>{restoreMsg}</Text> : null}

            <TouchableOpacity style={styles.dismissBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.dismissText}>Quizás después</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
    paddingBottom: 32,
  },
  content: {
    alignItems: 'center',
    padding: 28,
    gap: 18,
  },
  emoji: { fontSize: 60 },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  featureList: {
    width: '100%',
    gap: 12,
    backgroundColor: '#fce4ec',
    borderRadius: 16,
    padding: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: { fontSize: 20 },
  featureText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    flexShrink: 1,
  },
  priceBox: {
    alignItems: 'center',
    gap: 4,
  },
  priceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 1.5,
  },
  price: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
  },
  unlockBtn: {
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
  unlockBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  restoreBtn: {
    paddingVertical: 6,
  },
  restoreText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  restoreMsg: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
  },
  dismissBtn: {
    paddingVertical: 8,
  },
  dismissText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '600',
  },
});
