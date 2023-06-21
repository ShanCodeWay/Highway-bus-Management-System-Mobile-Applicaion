import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from './src/screens/Home';
import Page1 from './src/screens/Page1';
import Page2 from './src/screens/Page2';
import Page3 from './src/screens/Page3';
import Page4 from './src/screens/Page4';
import Page5 from './src/screens/Page5';
import Page6 from './src/screens/Page6';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#191970' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Page1"
        component={Page1}
        options={{ title: 'Bus Schedule & Price' }}
      />
      <Stack.Screen
        name="Page2"
        component={Page2}
        options={{ title: 'Bus Schedule' }}
      />
      <Stack.Screen
        name="Page3"
        component={Page3}
        options={{ title: 'Tickets Reservations' }}
      />
      <Stack.Screen
        name="Page4"
        component={Page4}
        options={{ title: 'LOGING ACCOUNT' }}
      />
      <Stack.Screen
        name="Page5"
        component={Page5}
        options={{ title: 'SIGNUP ACCOUNT' }}
      />
      <Stack.Screen
        name="Page6"
        component={Page6}
        options={{ title: 'TICKETS & LUGGAGE RESERVATION' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#191970' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Page2}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={Page3}
        options={{ title: 'Page2' }}
      />
      <Stack.Screen
        name="Profile"
        component={Page4}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#040412',
        }}
      >
        <Tab.Screen
          name=" "
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons

                name="cog"
                color={color}
                size={size}
              />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;
  