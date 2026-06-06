import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme';
import { CheckCircle2, Copy, Share2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ScanResultScreenProps {
  data: string;
  type: string;
  onCopy: () => void;
  onShare: () => void;
  onSave: () => void;
  onClose: () => void;
}

export const ScanResultScreen: React.FC<ScanResultScreenProps> = ({
  data,
  type,
  onCopy,
  onShare,
  onSave,
  onClose,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PeekScan</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <CheckCircle2 size={120} color={Colors.success} fill={`${Colors.success}20`} />
        </View>

        <Text style={styles.resultData}>{data}</Text>
        <Text style={styles.resultType}>{type}</Text>

        <View style={styles.visualContainer}>
           {/* Placeholder for a barcode visual as seen in mockup */}
           <View style={styles.barcodePlaceholder}>
              <View style={styles.barcodeLines}>
                 {[...Array(20)].map((_, i) => (
                    <View 
                      key={i} 
                      style={[
                        styles.barcodeLine, 
                        { width: Math.random() > 0.5 ? 2 : 4, marginRight: Math.random() * 4 }
                      ]} 
                    />
                 ))}
              </View>
              <Text style={styles.barcodeNumbers}>{data.substring(0, 1)} {data.substring(1, 7)} {data.substring(7)}</Text>
           </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.outlineButton} onPress={onCopy}>
            <Text style={styles.outlineButtonText}>Copy Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={onShare}>
            <Text style={styles.primaryButtonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostButton} onPress={onSave}>
            <Text style={styles.ghostButtonText}>Save to History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: Spacing.space4,
    height: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.text,
    fontSize: 24,
  },
  headerTitle: {
    ...Typography.title2,
    color: Colors.text,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.space6,
    paddingTop: Spacing.space8,
  },
  successIconContainer: {
    marginBottom: Spacing.space10,
  },
  resultData: {
    ...Typography.display,
    color: Colors.text,
    textAlign: 'center',
  },
  resultType: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.space1,
    alignSelf: 'flex-end',
    width: '100%',
    textAlign: 'right',
    paddingRight: Spacing.space10,
  },
  visualContainer: {
    marginTop: Spacing.space8,
    width: width * 0.7,
    aspectRatio: 1.5,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.space4,
  },
  barcodePlaceholder: {
    alignItems: 'center',
  },
  barcodeLines: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'flex-end',
  },
  barcodeLine: {
    backgroundColor: Colors.text,
    height: '100%',
  },
  barcodeNumbers: {
    color: Colors.text,
    fontSize: 14,
    fontFamily: 'monospace',
    marginTop: 4,
  },
  actions: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: Spacing.space10,
  },
  outlineButton: {
    height: 56,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.space4,
  },
  outlineButtonText: {
    ...Typography.button,
    color: Colors.primary,
  },
  primaryButton: {
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.space6,
  },
  primaryButtonText: {
    ...Typography.button,
    color: Colors.background,
  },
  ghostButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostButtonText: {
    ...Typography.body1,
    color: Colors.textSecondary,
  },
});
