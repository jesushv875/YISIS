import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../styles/theme';

function GenderSelector({ selected, onSelect }) {
  return (
    <View style={styles.genderRow}>
      <TouchableOpacity
        style={[styles.genderBtn, selected === 'male' && styles.genderBtnActive]}
        onPress={() => onSelect('male')}
        activeOpacity={0.8}
      >
        <Text style={styles.genderIcon}>👨</Text>
        <Text style={[styles.genderLabel, selected === 'male' && styles.genderLabelActive]}>
          Hombre
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genderBtn, selected === 'female' && styles.genderBtnActive]}
        onPress={() => onSelect('female')}
        activeOpacity={0.8}
      >
        <Text style={styles.genderIcon}>👩</Text>
        <Text style={[styles.genderLabel, selected === 'female' && styles.genderLabelActive]}>
          Mujer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen({ onStart }) {
  const [p1Name, setP1Name] = useState('');
  const [p1Gender, setP1Gender] = useState(null);
  const [p2Name, setP2Name] = useState('');
  const [p2Gender, setP2Gender] = useState(null);

  const canStart =
    p1Name.trim().length > 0 && p1Gender &&
    p2Name.trim().length > 0 && p2Gender;

  const handleStart = () => {
    if (!canStart) return;
    onStart(
      { name: p1Name.trim(), gender: p1Gender },
      { name: p2Name.trim(), gender: p2Gender }
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <Text style={styles.heroEmoji}>❤️‍🔥</Text>
            <Text style={styles.appName}>Para Dos</Text>
            <Text style={styles.tagline}>El juego íntimo de parejas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>¿Quiénes juegan?</Text>

            {/* Jugador 1 */}
            <View style={styles.playerSection}>
              <Text style={styles.sectionLabel}>JUGADOR 1</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre..."
                placeholderTextColor="#d48fa0"
                value={p1Name}
                onChangeText={setP1Name}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <GenderSelector selected={p1Gender} onSelect={setP1Gender} />
            </View>

            <View style={styles.divider} />

            {/* Jugador 2 */}
            <View style={styles.playerSection}>
              <Text style={styles.sectionLabel}>JUGADOR 2</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre..."
                placeholderTextColor="#d48fa0"
                value={p2Name}
                onChangeText={setP2Name}
                autoCapitalize="words"
                returnKeyType="done"
              />
              <GenderSelector selected={p2Gender} onSelect={setP2Gender} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.startBtn, !canStart && styles.startBtnDisabled]}
            onPress={handleStart}
            activeOpacity={canStart ? 0.85 : 1}
          >
            <Text style={styles.startBtnText}>🚀 ¡Comenzar el juego!</Text>
          </TouchableOpacity>

          {!canStart && (
            <Text style={styles.hint}>
              Completa nombres y género de ambos jugadores
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
    gap: 22,
  },
  hero: {
    alignItems: 'center',
    gap: 6,
  },
  heroEmoji: {
    fontSize: 72,
  },
  appName: {
    fontSize: 44,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.muted,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    width: '100%',
    gap: 18,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  playerSection: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.muted,
    letterSpacing: 2,
  },
  input: {
    backgroundColor: '#fce4ec',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
  },
  genderBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderIcon: {
    fontSize: 18,
  },
  genderLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.muted,
  },
  genderLabelActive: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 7,
  },
  startBtnDisabled: {
    opacity: 0.35,
    shadowOpacity: 0,
    elevation: 0,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  hint: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: -8,
  },
});
