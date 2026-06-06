import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, Linking } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { ChevronLeft, User, Bell, Shield, Info, ExternalLink, Moon } from 'lucide-react-native';
import { ScanLimitService } from '../services/ScanLimitService';

interface SettingsViewProps {
  onBack: () => void;
  isPremium: boolean;
  onPremiumToggle: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, isPremium, onPremiumToggle }) => {
  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress} 
      disabled={!onPress}
    >
      <View style={styles.itemLeft}>
        <View style={styles.itemIcon}>{icon}</View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      {rightElement || <ExternalLink color={Colors.textMuted} size={18} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>SETTINGS</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
          <View style={styles.card}>
            {renderSettingItem(
              <Shield color={isPremium ? Colors.primary : Colors.secondary} size={22} />,
              isPremium ? "PeekScan Pro Active" : "Upgrade to Pro",
              undefined,
              <Switch 
                value={isPremium} 
                onValueChange={onPremiumToggle}
                trackColor={{ false: Colors.surfaceRaised, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.card}>
            {renderSettingItem(
              <Moon color={Colors.text} size={22} />,
              "Dark Mode",
              undefined,
              <Switch 
                value={true} 
                disabled 
                trackColor={{ false: Colors.surfaceRaised, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            )}
            <View style={styles.divider} />
            {renderSettingItem(
              <Bell color={Colors.text} size={22} />,
              "Notifications",
              () => {}
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT & LEGAL</Text>
          <View style={styles.card}>
            {renderSettingItem(
              <Info color={Colors.text} size={22} />,
              "Help Center",
              () => Linking.openURL('https://peekscan.com/help')
            )}
            <View style={styles.divider} />
            {renderSettingItem(
              <ExternalLink color={Colors.text} size={22} />,
              "Privacy Policy",
              () => Linking.openURL('https://peekscan.com/privacy')
            )}
            <View style={styles.divider} />
            {renderSettingItem(
              <ExternalLink color={Colors.text} size={22} />,
              "Terms of Service",
              () => Linking.openURL('https://peekscan.com/terms')
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>PeekScan v1.0.0 (Build 102)</Text>
          <Text style={styles.copyrightText}>© 2026 PeekScan Inc.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.space12,
    paddingHorizontal: Spacing.space4,
    paddingBottom: Spacing.space4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.space2,
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scrollContent: {
    padding: Spacing.space4,
  },
  section: {
    marginBottom: Spacing.space6,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: Spacing.space2,
    marginLeft: Spacing.space1,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.space4,
    height: 64,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.space3,
  },
  itemTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.space4,
  },
  footer: {
    marginTop: Spacing.space8,
    alignItems: 'center',
    marginBottom: Spacing.space12,
  },
  versionText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  copyrightText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
