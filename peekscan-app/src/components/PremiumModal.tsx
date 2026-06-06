import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { Shield, CheckCircle2, X } from 'lucide-react-native';

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ visible, onClose, onUpgrade }) => {
  const features = [
    "Unlimited scans through any seal",
    "Enhanced dehazing algorithms",
    "Full scan history and export",
    "Glove-optimized large scan button",
    "Priority support for warehouse teams"
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color={Colors.text} size={28} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.iconContainer}>
              <Shield color={Colors.primary} size={64} fill={Colors.scanGlow} />
            </View>
            
            <Text style={styles.title}>UNLEASH THE POWER OF PEEKSCAN PRO</Text>
            <Text style={styles.subtitle}>Scan more, scan better, scan faster.</Text>

            <View style={styles.featuresList}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <CheckCircle2 color={Colors.primary} size={24} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.priceText}>ONLY $4.99 / ONE-TIME</Text>
            <TouchableOpacity style={styles.upgradeButton} onPress={onUpgrade}>
              <Text style={styles.upgradeButtonText}>UPGRADE TO PRO NOW</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>Includes lifetime updates and premium support.</Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  modalContent: {
    flex: 1,
    padding: Spacing.space6,
  },
  header: {
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: Spacing.space2,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.space8,
  },
  iconContainer: {
    marginBottom: Spacing.space8,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: Spacing.space2,
    letterSpacing: 1,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.space10,
  },
  featuresList: {
    width: '100%',
    paddingHorizontal: Spacing.space4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.space5,
  },
  featureText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Spacing.space4,
  },
  footer: {
    paddingBottom: Spacing.space12,
  },
  priceText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.space4,
  },
  upgradeButton: {
    backgroundColor: Colors.primary,
    height: 64,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.space4,
  },
  upgradeButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: '900',
  },
  termsText: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
});
