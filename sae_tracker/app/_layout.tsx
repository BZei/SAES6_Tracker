import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />
  <Stack.Screen name="login" />
  <Stack.Screen name="accueil" />
  <Stack.Screen name="saes" />
  <Stack.Screen name="details" />

  <Stack.Screen name="admin/index" />
  <Stack.Screen name="admin/saes" />
  <Stack.Screen name="admin/details" />
  <Stack.Screen name="admin/ajouter" />
  <Stack.Screen name="admin/modifier" />
  <Stack.Screen name="admin/profile" />
</Stack>
  );
}