import AsyncStorage from '@react-native-async-storage/async-storage';

const DAILY_LIMIT = 5;
const STORAGE_KEY_SCANS = '@peekscan_daily_scans';
const STORAGE_KEY_PREMIUM = '@peekscan_is_premium';

export const ScanLimitService = {
  async getRemainingScans(): Promise<number> {
    if (await this.isPremium()) return Infinity;

    const today = new Date().toISOString().split('T')[0];
    const data = await AsyncStorage.getItem(`${STORAGE_KEY_SCANS}_${today}`);
    const count = data ? parseInt(data, 10) : 0;
    
    return Math.max(0, DAILY_LIMIT - count);
  },

  async incrementScanCount(): Promise<void> {
    if (await this.isPremium()) return;

    const today = new Date().toISOString().split('T')[0];
    const data = await AsyncStorage.getItem(`${STORAGE_KEY_SCANS}_${today}`);
    const count = data ? parseInt(data, 10) : 0;
    
    await AsyncStorage.setItem(`${STORAGE_KEY_SCANS}_${today}`, (count + 1).toString());
  },

  async isPremium(): Promise<boolean> {
    const isPremium = await AsyncStorage.getItem(STORAGE_KEY_PREMIUM);
    return isPremium === 'true';
  },

  async setPremium(value: boolean): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY_PREMIUM, value.toString());
  }
};
