import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const STORAGE_KEY_HISTORY = '@peekscan_history';

export interface HistoryItem {
  id: string;
  data: string;
  type: string;
  timestamp: number;
  imageUri?: string;
  source?: 'scan' | 'manual';
}

export const HistoryService = {
  async getHistory(): Promise<HistoryItem[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY_HISTORY);
    return data ? JSON.parse(data) : [];
  },

  async addHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): Promise<void> {
    const history = await this.getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    history.unshift(newItem);
    await AsyncStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(0, 100)));
  },

  async clearHistory(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY_HISTORY);
  },

  async exportToCSV(): Promise<void> {
    const history = await this.getHistory();
    if (history.length === 0) return;

    let csv = 'Timestamp,Type,Data,Source\n';
    history.forEach(item => {
      const date = new Date(item.timestamp).toISOString();
      csv += `"${date}","${item.type}","${item.data}","${item.source || 'scan'}"\n`;
    });

    const fileUri = FileSystem.documentDirectory + 'PeekScan_History.csv';
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
  }
};
