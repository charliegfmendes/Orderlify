import React from 'react';
import {
	useWindowDimensions,
	ImageBackground,
	TouchableOpacity,
	View,
	Alert,
} from 'react-native';
import { useTheme, Text, IconButton, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AppBackground from '../components/AppBackground';
import { formatMonetaryValue } from '../utils';

export default function MenuItemScreen() {
	const window = useWindowDimensions();
	const route = useRoute();
	const { colors } = useTheme();
	const navigation = useNavigation();

	return (
		<AppBackground>
			<ImageBackground
				style={{
					height: window.width,
					backgroundColor: colors.surfaceVariant,
					alignItems: 'center',
					justifyContent: 'center',
				}}
				source={{
					uri: route.params.menuItem.pictureUri,
				}}
			>
				<TouchableOpacity
					style={{
						position: 'absolute',
						right: 16,
						top: 40,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						height: 40,
						width: 40,
						borderRadius: 20,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<MaterialCommunityIcons name="close" size={24} color="white" />
				</TouchableOpacity>
				{!route.params.menuItem.pictureUri ? (
					<MaterialCommunityIcons
						name="food-outline"
						size={48}
						color={colors.onSurfaceVariant}
					/>
				) : (
					<></>
				)}
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						padding: 16,
					}}
				>
					<Text
						variant="headlineSmall"
						style={{ color: 'white' }}
						numberOfLines={2}
					>
						{route.params.menuItem.name}
					</Text>
				</View>
			</ImageBackground>
			<View
				style={{
					flex: 1,
					padding: 16,
					gap: 8,
				}}
			>
				<Text
					variant="headlineSmall"
					style={{
						fontSize: 20,
						fontWeight: 'bold',
					}}
				>
					{formatMonetaryValue(route.params.menuItem.price)}
				</Text>
				<Text variant="bodyLarge" style={{ textAlign: 'justify' }}>
					{route.params.menuItem.description}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						gap: 16,
					}}
				>
					<IconButton
						mode="contained-tonal"
						icon="pencil"
						size={32}
						onPress={() => {
							navigation.navigate('MenuItemForm', {
								menuItem: route.params.menuItem,
								onSave: (updates) => {
									navigation.setParams({
										menuItem: {
											...route.params.menuItem,
											...updates,
										},
									});

									route.params.onUpdate({
										...updates,
									});
								},
							});
						}}
					/>
					<IconButton
						mode="contained-tonal"
						icon="trash-can-outline"
						containerColor={colors.errorContainer}
						iconColor={colors.onErrorContainer}
						size={32}
						onPress={() => {
							Alert.alert(
								'Excluir produto',
								'Este produto será excluído permanente se você confirmar.',
								[
									{
										text: 'Cancelar',
										onPress: () => {},
										style: 'cancel',
									},
									{
										text: 'Confirmar',
										onPress: () => {
											route.params.onDelete();
											navigation.goBack();
										},
									},
								]
							);
						}}
					/>
				</View>
			</View>
			<View
				style={{
					paddingVertical: 16,
					paddingHorizontal: 32,
				}}
			>
				<Button mode="contained">Adicionar ao pedido</Button>
			</View>
		</AppBackground>
	);
}
