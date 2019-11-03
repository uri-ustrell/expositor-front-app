import * as React from "react";
import { StyleSheet, Text, Animated } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/AntDesign";

const ActionsAnimated = Animated.createAnimatedComponent(ActionButton);

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: "white"
	},
	buttonOptionsTxt: {
		color: "#fff"
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
				duration: 1000
			}).start();
		} else {
			Animated.timing(this.state.animatedOpacity, {
				toValue: 0.85,
				duration: 300
			}).start();
		}
	}

	render() {
		return (
			<>
				<ActionsAnimated
					style={this.buttonStyles}
					buttonColor="rgb(174, 174, 174)"
					position="left"
					offsetX={-30}
					key="language button"
					buttonText={this.props.selectedLang}
					fixNativeFeedbackRadius={true}
				>
					{this.props.languages.map(lang => (
						<ActionButton.Item
							onPress={() => this.props.handleSelectLang(lang)}
							key={lang}
							fixNativeFeedbackRadius={true}
							hideLabelShadow={true}
						>
							<Text style={styles.buttonOptionsTxt}>{lang}</Text>
						</ActionButton.Item>
					))}
				</ActionsAnimated>
				<ActionsAnimated
					style={this.buttonStyles}
					buttonColor="rgb(174, 174, 174)"
					onPress={() => this.props.handleTopClick()}
					renderIcon={() => (
						<Icon name="up" style={styles.actionButtonIcon} />
					)}
					key="top button"
					fixNativeFeedbackRadius={true}
				></ActionsAnimated>
			</>
		);
	}
}
