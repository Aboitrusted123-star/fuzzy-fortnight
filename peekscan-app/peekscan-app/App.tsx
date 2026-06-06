import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CameraView } from './src/components/CameraView';
import { HistoryView } from './src/components/HistoryView';
import { SettingsView } from './src/components/SettingsView';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { ScanResultScreen } from './src/screens/ScanResultScreen';
import { Colors } from './src/theme';
import { ScanLimitService } from './src/services/ScanLimitService';
import { HistoryService } from './src/services/HistoryService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Screen = 'onboarding' | 'camera' | 'history' | 'settings' | 'result';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('camera');
  const [isPremium, setIsPremium] = useState(false);
  const [lastScan, setLastScan] = useState<{data: string, type: string} | null>(null);

  useEffect(() => {
    loadInitialState();
  }, []);

  const loadInitialState = async () => {
    const status = await ScanLimitService.isPremium();
    setIsPremium(status);

    const hasOnboarded = await AsyncStorage.getItem('@peekscan_onboarded');
    if (hasOnboarded !== 'true') {
      setCurrentScreen('onboarding');
    }
  };

  const handlePremiumToggle = async () => {
    const nextStatus = !isPremium;
    await ScanLimitService.setPremium(nextStatus);
    setIsPremium(nextStatus);
  };

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('@peekscan_onboarded', 'true');
    setCurrentScreen('camera');
  };

  const handleScanSuccess = async (data: string, type: string) => {
    setLastScan({ data, type });
    await ScanLimitService.incrementScanCount();
    await HistoryService.addHistoryItem({ data, type });
    setCurrentScreen('result');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'history':
        return <HistoryView onBack={() => setCurrentScreen('camera')} />;
      case 'settings':
        return (
          <SettingsView 
            onBack={() => setCurrentScreen('camera')} 
            isPremium={isPremium}
            onPremiumToggle={handlePremiumToggle}
          />
        );
      case 'result':
        return (
          <ScanResultScreen 
            data={lastScan?.data || ''} 
            type={lastScan?.type || ''}
            onCopy={() => {}}
            onShare={() => {}}
            onSave={() => setCurrentScreen('camera')}
            onClose={() => setCurrentScreen('camera')}
          />
        );
      case 'camera':
      default:
        return (
          <CameraView 
            onNavigateHistory={() => setCurrentScreen('history')}
            onNavigateSettings={() => setCurrentScreen('settings')}
            onScanSuccess={handleScanSuccess}
            isPremiumStatus={isPremium}
            onPremiumChange={setIsPremium}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
