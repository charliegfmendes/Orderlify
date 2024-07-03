import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Auth from './screens/Auth';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import EateryListScreen from './screens/EateryList';
import { EateryProvider, useEatery } from './contexts/Eatery';
import CustomNavigationBar from './components/CustomNavigationBar';
import ModalBar from './components/ModalBar';
import EateryFormScreen from './screens/EateryForm';
import AddressFormScreen from './screens/AddressForm';
import OpeningHoursScreen from './screens/OpeningHours';
import MenuScreen from './screens/Menu';
import MenuItemFormScreen from './screens/MenuItemForm';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();

function AppNavigator() {
	const { accessToken } = useAuth();
	const { selectedEatery } = useEatery();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					header: (props) => <CustomNavigationBar {...props} />,
					animation: 'slide_from_right',
				}}
			>
				{!accessToken ? (
					<Stack.Screen
						name="Auth"
						component={Auth}
						options={{ headerShown: false }}
					/>
				) : !selectedEatery ? (
					<>
						<Stack.Screen
							name="SelectEatery"
							component={EateryListScreen}
							options={{ title: 'Selecionar estabelecimento' }}
						/>
						<Stack.Screen
							name="NewEatery"
							component={EateryFormScreen}
							options={{ title: 'Novo estabelecimento' }}
						/>
						<Stack.Screen
							name="AddressForm"
							component={AddressFormScreen}
							options={{ title: 'Endereço' }}
						/>
						<Stack.Screen
							name="OpeningHours"
							component={OpeningHoursScreen}
							options={{ title: 'Horários de funcionamento' }}
						/>
						<Stack.Group
							screenOptions={{
								presentation: 'modal',
								header: (props) => <ModalBar {...props} />,
								animation: 'slide_from_bottom',
							}}
						></Stack.Group>
					</>
				) : (
					<>
						<Stack.Screen
							name="Menu"
							component={MenuScreen}
							options={{ title: 'Menu' }}
						/>
						<Stack.Screen
							name="MenuItemForm"
							component={MenuItemFormScreen}
							options={{ title: 'Novo produto' }}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<PaperProvider>
					<AuthProvider>
						<ActionSheetProvider>
							<EateryProvider>
								<AppNavigator />
							</EateryProvider>
						</ActionSheetProvider>
					</AuthProvider>
				</PaperProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}

export default App;
