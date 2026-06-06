import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { 
  Camera, 
  useCameraDevice, 
  useFrameProcessor, 
} from 'react-native-vision-camera';
import * as Haptics from 'expo-haptics';
import { ScanLimitService } from '../services/ScanLimitService';
import { VisionPipeline, PreprocessingOptions } from '../services/VisionPipeline';
import { Colors, Spacing, Radius, Typography } from '../theme';
import { PremiumModal } from './PremiumModal';
import { 
  Settings, 
  Shield, 
  Zap, 
  RefreshCw, 
  Scan, 
  Flashlight, 
  Maximize, 
  Lock,
  History
} from 'lucide-react-native';

interface CameraViewProps {
  onNavigateHistory: () => void;
  onNavigateSettings: () => void;
  onScanSuccess: (data: string, type: string) => void;
  isPremiumStatus: boolean;
  onPremiumChange: (status: boolean) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ 
  onNavigateHistory, 
  onNavigateSettings, 
  onScanSuccess,
  isPremiumStatus: isPremium,
  onPremiumChange
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [scansRemaining, setScansRemaining] = useState<number | null>(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [zoom, setZoom] = useState(1);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [options, setOptions] = useState<PreprocessingOptions>({
    claheEnabled: true,
    dehazeEnabled: true,
    unsharpMaskEnabled: true,
    sharpenAmount: 1.0,
  });

  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      refreshLimits();
    })();
  }, []);

  const refreshLimits = async () => {
    const remaining = await ScanLimitService.getRemainingScans();
    setScansRemaining(remaining);
  };

  const handleUpgrade = async () => {
    await ScanLimitService.setPremium(true);
    onPremiumChange(true);
    setShowPremiumModal(false);
    refreshLimits();
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // Use the vision pipeline to scan the frame
    // In a real app, this runs at 30-60fps
    // VisionPipeline.scanFrame(frame, options).then(result => {
    //   if (result) {
    //     runOnJS(onScanSuccess)(result.data, result.type);
    //   }
    // });
  }, [options, onScanSuccess]);

  const onScanPress = () => {
    if (!isPremium && scansRemaining === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShowPremiumModal(true);
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Simulate a successful scan
    onScanSuccess('9781234567890', 'UPC-A');
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.text}>Finding camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isScanning}
        frameProcessor={frameProcessor}
        torch={flash}
        zoom={zoom}
      />
      
      {/* Viewfinder Overlay */}
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>PEEKSCAN</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={onNavigateHistory}>
              <History color={Colors.text} size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: Spacing.space4 }]} onPress={onNavigateSettings}>
              <Settings color={Colors.text} size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scanAreaContainer}>
          <View style={styles.scanArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {options.dehazeEnabled && (
              <View style={styles.scanLine} />
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.statusRow}>
            <TouchableOpacity style={styles.badge} onPress={() => !isPremium && setShowPremiumModal(true)}>
              {isPremium ? (
                <Shield size={14} color={Colors.primary} fill={Colors.primary} />
              ) : (
                <Lock size={14} color={Colors.secondary} />
              )}
              <Text style={[styles.badgeText, { color: isPremium ? Colors.primary : Colors.secondary }]}>
                {isPremium ? 'PRO UNLOCKED' : `${scansRemaining} FREE SCANS LEFT`}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.quickControls}>
               <TouchableOpacity 
                 style={[styles.controlButton, flash === 'on' && styles.controlButtonActive]} 
                 onPress={() => setFlash(f => f === 'off' ? 'on' : 'off')}
               >
                  <Flashlight size={20} color={flash === 'on' ? Colors.background : Colors.text} />
               </TouchableOpacity>
               <TouchableOpacity 
                 style={styles.controlButton} 
                 onPress={() => setZoom(z => Math.min(z + 1, 5))}
               >
                  <Maximize size={20} color={Colors.text} />
               </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.enhancementRow}>
            <Text style={styles.enhancementLabel}>VISION ENHANCEMENT</Text>
            <View style={styles.toggleGroup}>
              <TouchableOpacity 
                style={[styles.toggleButton, options.dehazeEnabled && styles.toggleButtonActive]} 
                onPress={() => setOptions({...options, dehazeEnabled: !options.dehazeEnabled})}
              >
                <Zap size={16} color={options.dehazeEnabled ? Colors.background : Colors.textSecondary} />
                <Text style={[styles.toggleText, options.dehazeEnabled && styles.toggleTextActive]}>DEHAZE</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.toggleButton, options.claheEnabled && styles.toggleButtonActive, { marginLeft: Spacing.space2 }]} 
                onPress={() => setOptions({...options, claheEnabled: !options.claheEnabled})}
              >
                <RefreshCw size={16} color={options.claheEnabled ? Colors.background : Colors.textSecondary} />
                <Text style={[styles.toggleText, options.claheEnabled && styles.toggleTextActive]}>CONTRAST</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.scanButton, !isScanning && styles.scanButtonDisabled]}
            disabled={!isScanning}
            onPress={onScanPress}
          >
            <Scan color={Colors.background} size={24} />
            <Text style={styles.scanButtonText}>
              {!isPremium && scansRemaining === 0 ? 'UPGRADE TO SCAN' : 'SCANNING THROUGH SEALS'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <PremiumModal 
        visible={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={handleUpgrade}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: Spacing.space6,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.space10,
  },
  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.scanGlow,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: Colors.primary,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: Radius.md,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: Radius.md,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: Radius.md,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: Radius.md,
  },
  scanLine: {
    width: '90%',
    height: 2,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  footer: {
    marginBottom: Spacing.space8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.space6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.space4,
    height: 40,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: Spacing.space2,
  },
  quickControls: {
    flexDirection: 'row',
  },
  controlButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.space3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  controlButtonActive: {
    backgroundColor: Colors.primary,
  },
  enhancementRow: {
    backgroundColor: Colors.surface,
    padding: Spacing.space4,
    borderRadius: Radius.lg,
    marginBottom: Spacing.space6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  enhancementLabel: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: Spacing.space3,
    letterSpacing: 1,
  },
  toggleGroup: {
    flexDirection: 'row',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceRaised,
    paddingHorizontal: Spacing.space4,
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  toggleText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: Spacing.space2,
  },
  toggleTextActive: {
    color: Colors.background,
  },
  scanButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 56,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  scanButtonDisabled: {
    backgroundColor: Colors.surfaceRaised,
    shadowOpacity: 0,
  },
  scanButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    marginLeft: Spacing.space3,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
});
