import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainImage: {
    width: width,
    height: width * 0.8,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
  },
  priceTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  priceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  priceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  timeLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  timeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  tagsSection: {
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
  },
  additionalTagsScroll: {
    flexGrow: 0,
  },
  additionalTagsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  additionalTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  additionalTagText: {
    fontSize: 12,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  nutritionSection: {
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '22%',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 11,
  },
  similarSection: {
    marginBottom: 20,
  },
  similarItem: {
    width: 140,
    padding: 12,
    borderRadius: 12,
  },
  similarImagePlaceholder: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  similarItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  similarItemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  bottomButton: {
    flex: 1,
    height: 48,
  },
});
