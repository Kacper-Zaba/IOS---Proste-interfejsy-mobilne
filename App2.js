import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';

function SettingsRow({ label, icon, isDarkMode }) {
  return (
    <View style={[styles.settingRow, isDarkMode && styles.settingRowDark]}>
      <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>{icon} {label}</Text>
      <Text style={styles.settingArrow}>›</Text>
    </View>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Kacper Żaba',
    email: 'kacper.zaba@student.pl',
    city: 'Olkusz',
    bio: 'Student informatyki, pasjonat mobilnych interfejsów i nowoczesnych technologii.'
  });

  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  const BIO_LIMIT = 100;

  const handleSave = () => {
    if (!formData.name.trim()) {
      setStatusMessage({ text: '❌ Błąd: Imię nie może być puste!', type: 'error' });
      return;
    }
    if (!formData.email.includes('@')) {
      setStatusMessage({ text: '❌ Błąd: Niepoprawny format adresu e-mail (brak @)!', type: 'error' });
      return;
    }
    if (formData.bio.length > BIO_LIMIT) {
      setStatusMessage({ text: `❌ Błąd: Bio przekracza limit ${BIO_LIMIT} znaków!`, type: 'error' });
      return;
    }

    setStatusMessage({ text: '✅ Sukces: Ustawienia profilu zostały zapisane!', type: 'success' });
  };

  const handleLogout = () => {
    alert('Wylogowano pomyślnie z profilu studenta.');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.bgDark]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Pressable 
          style={[styles.themeToggleButton, isDarkMode ? styles.btnLight : styles.btnDark]} 
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Text style={isDarkMode ? styles.textBtnLight : styles.textBtnDark}>
            {isDarkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny'}
          </Text>
        </Pressable>

        <View style={[styles.profileCard, isDarkMode && styles.cardDark]}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>KŻ</Text>
          </View>
          <Text style={[styles.profileName, isDarkMode && styles.textDark]}>{formData.name}</Text>
          <Text style={styles.profileSub}>{formData.city}</Text>
          <Text style={[styles.profileBioPreview, isDarkMode && styles.textMutedDark]}>{formData.bio}</Text>
        </View>

        {statusMessage.text ? (
          <View style={[
            styles.statusContainer, 
            statusMessage.type === 'success' ? styles.statusSuccess : styles.statusError
          ]}>
            <Text style={styles.statusText}>{statusMessage.text}</Text>
          </View>
        ) : null}

        <View style={[styles.formContainer, isDarkMode && styles.cardDark]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Edytuj dane profilu</Text>
          
          <Text style={[styles.inputLabel, isDarkMode && styles.textDark]}>Imię i nazwisko</Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.inputDark]}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Wpisz imię"
            placeholderTextColor="#888"
          />

          <Text style={[styles.inputLabel, isDarkMode && styles.textDark]}>Adres E-mail</Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.inputDark]}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            placeholder="Wpisz e-mail"
            placeholderTextColor="#888"
          />

          <Text style={[styles.inputLabel, isDarkMode && styles.textDark]}>Miasto</Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.inputDark]}
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
            placeholder="Wpisz miasto"
            placeholderTextColor="#888"
          />

          <View style={styles.bioHeaderRow}>
            <Text style={[styles.inputLabel, isDarkMode && styles.textDark]}>Krótkie Bio</Text>
            <Text style={[
              styles.charCounter, 
              formData.bio.length > BIO_LIMIT ? styles.charLimitExceeded : null
            ]}>
              {formData.bio.length} / {BIO_LIMIT}
            </Text>
          </View>
          <TextInput
            style={[styles.textInput, styles.textArea, isDarkMode && styles.inputDark]}
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            multiline={true}
            numberOfLines={3}
            placeholder="Napisz coś o sobie"
            placeholderTextColor="#888"
          />

          <Pressable style={styles.saveChangesButton} onPress={handleSave}>
            <Text style={styles.saveChangesButtonText}>💾 Zapisz zmiany</Text>
          </Pressable>
        </View>

        <View style={[styles.formContainer, isDarkMode && styles.cardDark]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Preferencje aplikacji</Text>
          <SettingsRow label="Powiadomienia push" icon="🔔" isDarkMode={isDarkMode} />
          <SettingsRow label="Prywatność i widoczność" icon="🔒" isDarkMode={isDarkMode} />
          <SettingsRow label="Użyj motywu systemowego" icon="🎨" isDarkMode={isDarkMode} />
          <SettingsRow label="O aplikacji" icon="ℹ️" isDarkMode={isDarkMode} />
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Wyloguj z profilu</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  bgDark: {
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  themeToggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  btnDark: { backgroundColor: '#1e1e1e' },
  btnLight: { backgroundColor: '#e0e0e0' },
  textBtnDark: { color: '#fff', fontWeight: '600' },
  textBtnLight: { color: '#121212', fontWeight: '600' },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  profileSub: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  profileBioPreview: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textDark: { color: '#fff' },
  textMutedDark: { color: '#aaa' },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#222',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  bioHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCounter: {
    fontSize: 11,
    color: '#777',
  },
  charLimitExceeded: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveChangesButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  saveChangesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusSuccess: { backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#34C759' },
  statusError: { backgroundColor: '#FFEBEE', borderWidth: 1, borderColor: '#FF3B30' },
  statusText: { fontSize: 14, fontWeight: '500', textAlign: 'center' },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingRowDark: {
    borderBottomColor: '#333',
  },
  settingLabel: { fontSize: 14, color: '#333' },
  settingArrow: { fontSize: 18, color: '#b5b5b5' },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
