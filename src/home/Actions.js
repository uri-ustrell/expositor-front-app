import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Animated } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/AntDesign";

const AnimatedButton = Animated.createAnimatedComponent(ActionButton);

const Actions = ({
	languages,
	selectedLang,
	handleTopClick,
	handleSelectLang,
	isUserActive
}) => {
	const [opacity] = useState(new Animated.Value(0.7));
	useEffect(() => {
		Animated.timing(opacity, { toValue: 0, duration: 2000 }).start();
	}, [isUserActive]);

	return (
		(isUserActive && [
			<AnimatedButton
				buttonColor="rgb(174, 174, 174)"
				position="left"
				key="language button"
				buttonText={selectedLang}
				style={{ opacity: opacity }}
			>
				{languages.map(lang => (
					<ActionButton.Item
						buttonColor="#9b59b6"
						onPress={() => handleSelectLang(lang)}
						key={lang}
					>
						<Text>{lang}</Text>
					</ActionButton.Item>
				))}
			</AnimatedButton>,
			<AnimatedButton
				buttonColor="rgb(174, 174, 174)"
				onPress={() => handleTopClick()}
				renderIcon={() => (
					<Icon name="up" style={styles.actionButtonIcon} />
				)}
				key="top button"
				style={{ opacity: opacity }}
			></AnimatedButton>
		]) ||
		[]
	);
};

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: "white"
	}
});

export default Actions;
