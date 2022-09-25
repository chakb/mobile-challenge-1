import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { StateProvider } from './src/state/state';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <StateProvider>
      <SafeAreaProvider>
        <StatusBar />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    </StateProvider>
  );
}
