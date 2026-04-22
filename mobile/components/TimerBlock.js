import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { COLORS } from '../styles/theme';

function parseTiempo(tiempo) {
  const match = (tiempo || '').match(/(\d+)\s*(minuto|segundo)/i);
  if (!match) return 60;
  const val = parseInt(match[1]);
  return match[2].toLowerCase().startsWith('minuto') ? val * 60 : val;
}

export default function TimerBlock({ tiempo }) {
  const total = useRef(parseTiempo(tiempo)).current;
  const [remaining, setRemaining] = useState(total);
  const [status, setStatus] = useState('idle'); // idle | running | paused | done
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const startTimer = () => {
    setStatus('running');
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setStatus('done');
          Vibration.vibrate([0, 300, 150, 300, 150, 300]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setStatus('paused');
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setRemaining(total);
    setStatus('idle');
  };

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = total > 0 ? remaining / total : 0;
  const isDone = status === 'done';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>⏱️ Tiempo límite · {tiempo}</Text>

      <Text style={[styles.clock, isDone && styles.clockDone]}>
        {isDone
          ? '¡Tiempo! ✅'
          : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}
      </Text>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(progress * 100)}%` },
            isDone && styles.progressDone,
          ]}
        />
      </View>

      <View style={styles.btnRow}>
        {status === 'idle' && (
          <TouchableOpacity style={styles.btn} onPress={startTimer} activeOpacity={0.85}>
            <Text style={styles.btnText}>▶  Iniciar</Text>
          </TouchableOpacity>
        )}
        {status === 'running' && (
          <TouchableOpacity style={[styles.btn, styles.btnPause]} onPress={pauseTimer} activeOpacity={0.85}>
            <Text style={styles.btnText}>⏸  Pausar</Text>
          </TouchableOpacity>
        )}
        {status === 'paused' && (
          <>
            <TouchableOpacity style={[styles.btn, styles.btnFlex]} onPress={startTimer} activeOpacity={0.85}>
              <Text style={styles.btnText}>▶  Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnReset, styles.btnFlex]} onPress={resetTimer} activeOpacity={0.85}>
              <Text style={styles.btnText}>↺  Reiniciar</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'done' && (
          <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={resetTimer} activeOpacity={0.85}>
            <Text style={styles.btnText}>↺  Repetir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff8fc',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(233,30,140,0.18)',
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  clock: {
    fontSize: 56,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 4,
  },
  clockDone: {
    fontSize: 26,
    color: '#2e7d32',
    letterSpacing: 0,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(233,30,140,0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  progressDone: {
    backgroundColor: '#4caf50',
    width: '100%',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  btn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnFlex: {
    flex: 1,
  },
  btnPause: {
    backgroundColor: '#f57c00',
    shadowColor: '#f57c00',
  },
  btnReset: {
    backgroundColor: '#78909c',
    shadowColor: '#78909c',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
