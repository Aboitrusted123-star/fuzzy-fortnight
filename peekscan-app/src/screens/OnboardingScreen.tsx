import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const PAGES = [
  {
    title: 'See Through It.',
    description: 'PeekScan reads barcodes and QR codes through tape, seals, stickers, and shrink wrap – no peeling required.',
    imageType: 'scan',
  },
  {
    title: 'Warehouse Ready.',
    description: 'Optimized for high-glare environments and low-light storage areas. Built for the modern supply chain.',
    imageType: 'warehouse',
  },
  {
    title: 'Speed Up Workflow.',
    description: 'Save seconds on every scan. Increase throughput by scanning items without opening protective layers.',
    imageType: 'speed',
  }
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [activeIndex, setPageIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === PAGES.length - 1) {
      onComplete();
    } else {
      setPageIndex(activeIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{PAGES[activeIndex].title}</Text>
        <Text style={styles.description}>{PAGES[activeIndex].description}</Text>

        <View style={styles.imageContainer}>
           {/* Placeholder for the phone mockup in the design */}
           <View style={styles.phoneMockup}>
              <View style={styles.phoneScreen}>
                 <View style={styles.barcodeArea}>
                    <View style={styles.laser} />
                 </View>
              </View>
           </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {PAGES.map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.dot, 
                  i === activeIndex && styles.activeDot
                ]} 
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {activeIndex === PAGES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.space8,
    paddingTop: Spacing.space12,
  },
  title: {
    ...Typography.display,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.space4,
  },
  description: {
    ...Typography.body1,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.space12,
    lineHeight: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneMockup: {
    width: width * 0.6,
    height: width * 1.2,
    borderWidth: 8,
    borderColor: '#1A1A1A',
    borderRadius: 40,
    padding: 10,
    backgroundColor: '#000',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  barcodeArea: {
    width: '80%',
    height: 150,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  laser: {
    width: '110%',
    height: 3,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  footer: {
    paddingBottom: Spacing.space10,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: Spacing.space8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textMuted,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.space12,
    height: 56,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    ...Typography.button,
    color: Colors.background,
  },
});
