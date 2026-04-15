/**
 * Maps severity/status values to shield visual state.
 */

export type ShieldState = 'critical' | 'warning' | 'secure';

export function shieldForSeverity(
  s: 'critical' | 'high' | 'medium' | 'low' | 'pass' | 'fail' | 'info' | 'mock',
): ShieldState {
  if (s === 'critical' || s === 'fail') return 'critical';
  if (s === 'high' || s === 'medium') return 'warning';
  return 'secure';
}

export function shieldForScore(score: number): ShieldState {
  if (score >= 90) return 'secure';
  if (score >= 70) return 'warning';
  return 'critical';
}

export const SHIELD_COLORS: Record<ShieldState, { fill: string; label: string; text: string }> = {
  critical: { fill: '#F04438', label: 'CRITICAL', text: '#FFFFFF' },
  warning:  { fill: '#F5C842', label: 'AT RISK',  text: '#1B3A6B' },
  secure:   { fill: '#12B76A', label: 'SECURE',   text: '#FFFFFF' },
};
