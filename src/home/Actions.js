import * as React from "react";
import { StyleSheet, Text, Animated } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/AntDesign";

const ActionsAnimated = Animated.createAnimatedComponent(ActionButton);

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 22,
		height: 22,
		color: "#fff",
		fontWeight: "bold"
	},
	buttonOptionsTxt: {
		fontSize: 20,
		color: "#fff",
		fontWeight: "bold"
	}
});

export default class Actions extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		animatedOpacity: new Animated.Value(0.85)
	};

	buttonStyles = {
		opacity: this.state.animatedOpacity
	};

	componentDidMount() {
		this.animateBtnsOpacity(this.props.needButtons);
	}

	componentDidUpdate() {
		this.animateBtnsOpacity(this.props.needButtons);
	}

	animateBtnsOpacity(needButtons) {
		if (!needButtons) {
			Animated.timing(this.state.animatedOpacity, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: false
			}).start();
		} else {
			Animated.timing(this.state.animatedOpacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: false
			}).start();
		}
	}

	render() {
		return (
			<>
				<ActionsAnimated
					style={this.buttonStyles}
					buttonColor="rgba(255,80,81,1)"
					position="left"
					key="language button"
					buttonText={this.props.selectedLang}
					size={80}
					useNativeFeedback={false}
				>
					{this.props.languages.map(lang => (
						<ActionButton.Item
							onPress={() => this.props.handleSelectLang(lang)}
							key={lang}
							buttonColor="rgba(242,112,112,1)"
							useNativeFeedback={false}
						>
							<Text style={styles.buttonOptionsTxt}>{lang}</Text>
						</ActionButton.Item>
					))}
				</ActionsAnimated>
				<ActionsAnimated
					style={this.buttonStyles}
					buttonColor="rgba(255,80,81,1)"
					onPress={() => this.props.handleTopClick()}
					renderIcon={() => (
						<Icon name="up" style={styles.actionButtonIcon} />
					)}
					key="top button"
					size={80}
					useNativeFeedback={false}
				></ActionsAnimated>
			</>
		);
	}
}
