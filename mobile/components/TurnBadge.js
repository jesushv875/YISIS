import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

export default function TurnBadge({ actor, receiver }) {
  return (
    <View style={styles.container}>
      <View style={styles.actorBadge}>
        <Text style={styles.actorText}>{actor}</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
      <View style={styles.receiverBadge}>
        <Text style={styles.receiverText}>{receiver}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  actorBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  actorText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  arrow: {
    fontSize: 16,
    color: COLORS.muted,
    fontWeight: '700',
  },
  receiverBadge: {
    backgroundColor: 'rgba(233,30,140,0.12)',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(233,30,140,0.3)',
  },
  receiverText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
