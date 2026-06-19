import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, SafeAreaView } from 'react-native';

const INITIAL_EVENTS = [
  { id: '1', title: 'Warsztaty Swift & iOS', date: '25.06.2026', category: 'Nauka', location: 'Kraków', favorite: false, isPopular: true },
  { id: '2', title: 'Festiwal Muzyki Letniej', date: '02.07.2026', category: 'Muzyka', location: 'Warszawa', favorite: true, isPopular: true },
  { id: '3', title: 'Maraton Podhalański', date: '12.07.2026', category: 'Sport', location: 'Zakopane', favorite: false, isPopular: false },
  { id: '4', title: 'Pokaz Filmów Sci-Fi', date: '18.07.2026', category: 'Film', location: 'Olkusz', favorite: false, isPopular: false },
  { id: '5', title: 'Konferencja Tech Trends', date: '22.08.2026', category: 'Nauka', location: 'Wrocław', favorite: true, isPopular: false }
];

const CATEGORIES = ['Wszystkie', 'Nauka', 'Sport', 'Muzyka', 'Film'];

function EventCard({ item, onToggleFavorite }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.isPopular && (
          <View style={styles.badgePopular}>
            <Text style={styles.badgeText}>🔥 Popularne</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.cardDetails}>📅 {item.date}  |  📍 {item.location}</Text>
      <Text style={styles.cardCategoryTag}>Kategoria: {item.category}</Text>
      
      <Pressable 
        style={[styles.favoriteButton, item.favorite && styles.favoriteActiveButton]} 
        onPress={() => onToggleFavorite(item.id)}
      >
        <Text style={styles.favoriteButtonText}>
          {item.favorite ? '⭐ W ulubionych' : '☆ Dodaj do ulubionych'}
        </Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const handleToggleFavorite = (id) => {
    setEvents(prevEvents => 
      prevEvents.map(evt => evt.id === id ? { ...evt, favorite: !evt.favorite } : evt)
    );
  };

  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Wszystkie' || evt.category === selectedCategory;
    const matchesFavorite = !showOnlyFavorites || evt.favorite;
    
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appContainer}>
        
        <Text style={styles.appHeaderTitle}>🎉 Mobilny Katalog Wydarzeń</Text>
        <Text style={styles.appHeaderSubtitle}>Znajdź najciekawsze eventy w Twojej okolicy</Text>

        <TextInput
          style={styles.searchBarInput}
          placeholder="🔍 Wpisz nazwę wydarzenia..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.categoriesFilterContainer}>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                style={[styles.categoryBadgeButton, isSelected && styles.categoryBadgeActiveButton]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryBadgeText, isSelected && styles.categoryBadgeActiveText]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable 
          style={[styles.toggleFavsFilter, showOnlyFavorites && styles.toggleFavsFilterActive]}
          onPress={() => setShowOnlyFavorites(!showOnlyFavorites)}
        >
          <Text style={styles.toggleFavsFilterText}>
            {showOnlyFavorites ? '👀 Pokazujesz: TYLKO ULUBIONE' : '👁️ Pokaż tylko ulubione'}
          </Text>
        </Pressable>

        <Text style={styles.resultsCounterText}>
          Aktualnie widoczne pozycje: {filteredEvents.length}
        </Text>

        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard item={item} onToggleFavorite={handleToggleFavorite} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyListFeedback}>Brak wydarzeń spełniających kryteria... 🔍</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  appContainer: {
    flex: 1,
    padding: 16,
  },
  appHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  appHeaderSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  searchBarInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  categoriesFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryBadgeButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryBadgeActiveButton: {
    backgroundColor: '#007AFF',
  },
  categoryBadgeText: {
    color: '#333',
    fontWeight: '500',
  },
  categoryBadgeActiveText: {
    color: '#fff',
  },
  toggleFavsFilter: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF9500',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleFavsFilterActive: {
    backgroundColor: '#FF9500',
  },
  toggleFavsFilterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  resultsCounterText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  badgePopular: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardCategoryTag: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  favoriteActiveButton: {
    backgroundColor: '#E5F1FF',
  },
  favoriteButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyListFeedback: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 15,
  }
});
