import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Item() {
  return (
    <View style={styles.container}>
      <Text>Item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});