import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme';
import { ChevronLeft, Keyboard, ArrowRight } from 'lucide-react-native';

interface ManualEntryScreenProps {
  onBack: () => void;
  onSubmit: (data: string) => void;
}

export const ManualEntryScreen: React.FC<ManualEntryScreenProps> = ({ onBack, onSubmit }) => {
  const [data, setData] = useState('');

  const handleSubmit = () => {
    if (data.trim().length > 0) {
      onSubmit(data.trim());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ChevronLeft color={Colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>MANUAL ENTRY</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Keyboard color={Colors.primary} size={64} />
          </View>
          
          <Text style={styles.instruction}>Enter the code manually if the seal is too obscured to scan.</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={data}
              onChangeText={setData}
              placeholder="Enter barcode or serial..."
              placeholderTextColor={Colors.textMuted}
              autoFocus
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, !data.trim() && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={!data.trim()}
          >
            <Text style={styles.submitButtonText}>VALIDATE CODE</Text>
            <ArrowRight color={Colors.background} size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
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
  content: {
    flex: 1,
    padding: Spacing.space8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.space8,
    backgroundColor: Colors.surface,
    padding: Spacing.space6,
    borderRadius: Radius.full,
  },
  instruction: {
    ...Typography.body1,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.space12,
  },
  inputContainer: {
    width: '100%',
    marginBottom: Spacing.space10,
  },
  input: {
    backgroundColor: Colors.surface,
    height: 64,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.space4,
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 64,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Spacing.space6,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.surfaceRaised,
    opacity: 0.5,
  },
  submitButtonText: {
    ...Typography.button,
    color: Colors.background,
    marginRight: Spacing.space2,
    fontSize: 18,
    fontWeight: '900',
  },
});
