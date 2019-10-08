import React from "react";
import { StyleSheet, Text } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/AntDesign";

const Actions = ({ languages, selectedLang, handleTopClick }) => {
	return [
		<ActionButton
			buttonColor="rgb(174, 174, 174)"
			position="left"
			key="language button"
			buttonText={languages[0]}
		>
			{languages.map(lang => (
				<ActionButton.Item
					key={lang}
					buttonColor="#9b59b6"
					onPress={() => console.log("notes tapped!")}
				>
					<Text>{lang}</Text>
				</ActionButton.Item>
			))}
		</ActionButton>,
		<ActionButton
			buttonColor="rgb(174, 174, 174)"
			renderIcon={() => (
				<Icon name="up" style={styles.actionButtonIcon} />
			)}
			key="top button"
		></ActionButton>
	];
};

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: "white"
	}
});

export default Actions;
