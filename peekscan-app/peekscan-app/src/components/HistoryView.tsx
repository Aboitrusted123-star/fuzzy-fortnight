import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Share, Modal, SafeAreaView } from 'react-native';
import { HistoryService, HistoryItem } from '../services/HistoryService';
import { Colors, Spacing, Radius } from '../theme';
import { ChevronLeft, Trash2, Share2, Barcode, QrCode, X, Copy } from 'lucide-react-native';

interface HistoryViewProps {
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onBack }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await HistoryService.getHistory();
    setHistory(data);
  };

  const clearHistory = async () => {
    await HistoryService.clearHistory();
    setHistory([]);
  };

  const handleShare = (item: HistoryItem) => {
    Share.share({
      message: `PeekScan result: ${item.data} (${item.type})`,
    });
  };

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const date = new Date(item.timestamp).toLocaleString();
    const IsQR = item.type.toLowerCase().includes('qr');

    return (
      <TouchableOpacity style={styles.historyItem} onPress={() => setSelectedItem(item)}>
        <View style={styles.itemIcon}>
          {IsQR ? <QrCode color={Colors.primary} size={24} /> : <Barcode color={Colors.primary} size={24} />}
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemData} numberOfLines={1}>{item.data}</Text>
          <Text style={styles.itemType}>{item.type.toUpperCase()} • {date}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={() => handleShare(item)}>
          <Share2 color={Colors.textSecondary} size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft color={Colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>HISTORY</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <Trash2 color={Colors.error} size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No scan history yet</Text>
          </View>
        }
      />

      {/* Detail Modal */}
      <Modal
        visible={!!selectedItem}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <X color={Colors.text} size={28} />
              </TouchableOpacity>
            </View>
            
            {selectedItem && (
              <View style={styles.modalBody}>
                <View style={styles.detailIcon}>
                  {selectedItem.type.toLowerCase().includes('qr') ? 
                    <QrCode color={Colors.primary} size={64} /> : 
                    <Barcode color={Colors.primary} size={64} />
                  }
                </View>
                
                <Text style={styles.detailType}>{selectedItem.type.toUpperCase()}</Text>
                <Text style={styles.detailData}>{selectedItem.data}</Text>
                <Text style={styles.detailDate}>{new Date(selectedItem.timestamp).toLocaleString()}</Text>

                <View style={styles.detailActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(selectedItem)}>
                    <Share2 color={Colors.background} size={24} />
                    <Text style={styles.actionButtonText}>SHARE</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.surfaceRaised, marginTop: Spacing.space4 }]}>
                    <Copy color={Colors.text} size={24} />
                    <Text style={[styles.actionButtonText, { color: Colors.text }]}>COPY TO CLIPBOARD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </SafeAreaView>
        </View>
      </Modal>
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
  clearButton: {
    padding: Spacing.space2,
  },
  listContent: {
    padding: Spacing.space4,
    flexGrow: 1,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.space4,
    borderRadius: Radius.md,
    marginBottom: Spacing.space3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.surfaceRaised,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.space4,
  },
  itemContent: {
    flex: 1,
  },
  itemData: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemType: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  shareButton: {
    padding: Spacing.space2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalContent: {
    flex: 1,
    padding: Spacing.space6,
  },
  modalHeader: {
    alignItems: 'flex-end',
    marginBottom: Spacing.space10,
  },
  modalBody: {
    flex: 1,
    alignItems: 'center',
  },
  detailIcon: {
    width: 120,
    height: 120,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.space6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailType: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: Spacing.space2,
    letterSpacing: 1,
  },
  detailData: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: Spacing.space4,
  },
  detailDate: {
    color: Colors.textMuted,
    fontSize: 14,
    marginBottom: Spacing.space12,
  },
  detailActions: {
    width: '100%',
    paddingHorizontal: Spacing.space4,
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
    marginLeft: Spacing.space3,
  },
});
