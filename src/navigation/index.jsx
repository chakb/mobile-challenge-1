import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import SignInScreen from '../screens/SignInScreen';
import TaxFormScreen from '../screens/TaxFormScreen';
import TaxSubmissionsScreen from '../screens/TaxSubmissionsScreen';
import { useStateValue, restoreUser, signOut } from '../state';

const DashboardTab = createBottomTabNavigator();

function DashboardTabScreen() {
  return (
    <DashboardTab.Navigator
      initialRouteName="ActiveTaxTab"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <DashboardTab.Screen
        name="ActiveTaxTab"
        component={DashboardScreen}
        options={{ title: 'Active' }}
        initialParams={{ isTaxSeasonActive: true }}
      />
      <DashboardTab.Screen
        name="InactiveTaxTab"
        component={DashboardScreen}
        options={{ title: 'Inactive' }}
        initialParams={{ isTaxSeasonActive: false }}
      />
    </DashboardTab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const logoutButton = (handleSignOut) => {
  return (
    <Pressable onPress={handleSignOut}>
      <MaterialIcons name="logout" size={24} color="black" />
    </Pressable>
  );
};

export default function Navigation() {
  const [{ user, isLoading, isSignout }, dispatch] = useStateValue();

  useEffect(() => {
    const restoreSavedUser = async () => {
      let userStored;

      try {
        userStored = await SecureStore.getItemAsync('user');
      } catch (e) {
        console.error(e);
      }
      dispatch(restoreUser(userStored));
    };

    restoreSavedUser();
  }, [dispatch]);

  const handleSignOut = async () => {
    await SecureStore.deleteItemAsync('user');
    dispatch(signOut());
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardTabScreen}
              options={{
                title: `Dashboard - ${user}`,
                headerRight: () => logoutButton(handleSignOut),
              }}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="TaxForm" component={TaxFormScreen} />
              <Stack.Screen name="TaxSubmissions" component={TaxSubmissionsScreen} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
