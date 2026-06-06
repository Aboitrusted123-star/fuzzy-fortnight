import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Share } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme';
import { ChevronLeft, QrCode, Barcode, Download, Share2 } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import BarcodeSVG from 'react-native-barcode-svg';

interface GeneratorScreenProps {
  onBack: () => void;
}

type CodeType = 'QR' | 'BARCODE';

export const GeneratorScreen: React.FC<GeneratorScreenProps> = ({ onBack }) => {
  const [inputText, setInputText] = useState('');
  const [codeType, setCodeType] = useState<CodeType>('QR');

  const handleShare = () => {
    if (!inputText) return;
    Share.share({
      message: `Generated PeekScan Code: ${inputText} (${codeType})`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>GENERATOR</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.typeSelector}>
          <TouchableOpacity 
            style={[styles.typeButton, codeType === 'QR' && styles.typeButtonActive]}
            onPress={() => setCodeType('QR')}
          >
            <QrCode color={codeType === 'QR' ? Colors.background : Colors.text} size={24} />
            <Text style={[styles.typeText, codeType === 'QR' && styles.typeTextActive]}>QR Code</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.typeButton, codeType === 'BARCODE' && styles.typeButtonActive]}
            onPress={() => setCodeType('BARCODE')}
          >
            <Barcode color={codeType === 'BARCODE' ? Colors.background : Colors.text} size={24} />
            <Text style={[styles.typeText, codeType === 'BARCODE' && styles.typeTextActive]}>Barcode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ENTER DATA</Text>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type code data here..."
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {inputText.length > 0 && (
          <View style={styles.previewContainer}>
            <View style={styles.codeCard}>
              {codeType === 'QR' ? (
                <QRCode
                  value={inputText}
                  size={200}
                  color={Colors.text}
                  backgroundColor="transparent"
                />
              ) : (
                <BarcodeSVG
                  value={inputText}
                  format="CODE128"
                  maxWidth={250}
                  height={100}
                />
              )}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share2 color={Colors.background} size={20} />
                <Text style={styles.actionButtonText}>SHARE CODE</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {inputText.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Enter text above to generate a code</Text>
          </View>
        )}
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.space2,
  },
  title: {
    ...Typography.title2,
    color: Colors.text,
    letterSpacing: 1,
  },
  scrollContent: {
    padding: Spacing.space6,
    flexGrow: 1,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.space8,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.space1,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary,
  },
  typeText: {
    color: Colors.text,
    marginLeft: Spacing.space2,
    fontWeight: '700',
  },
  typeTextActive: {
    color: Colors.background,
  },
  inputContainer: {
    marginBottom: Spacing.space8,
  },
  inputLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: Spacing.space2,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.surface,
    height: 56,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.space4,
    color: Colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  previewContainer: {
    alignItems: 'center',
  },
  codeCard: {
    backgroundColor: '#FFFFFF', // High contrast for code readability
    padding: Spacing.space6,
    borderRadius: Radius.lg,
    marginBottom: Spacing.space8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    width: '100%',
  },
  actionButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 56,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: Spacing.space2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
