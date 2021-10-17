import * as React from "react";
import { StyleSheet, Animated } from "react-native";
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
				{this.props.languages.map((lang, index) => (
					<ActionsAnimated
						style={{ ...this.buttonStyles, marginBottom: index ? (100 * index) : 0 }}
						buttonColor={lang === this.props.selectedLang ? "rgba(255,80,81,1)" : "rgba(242,112,112,1)"}
						position="left"
						key={lang}
						buttonText={lang}
						size={80}
						useNativeFeedback={false}
						onPress={() => this.props.handleSelectLang(lang)}
					></ActionsAnimated>
				))}
				<ActionsAnimated
					style={this.buttonStyles}
					buttonColor="rgba(255,80,81,1)"
					onPress={() => this.props.handleTopClick()}
					renderIcon={() => (
						<Icon name="left" style={styles.actionButtonIcon} />
					)}
					key="top button"
					size={80}
					useNativeFeedback={false}
				></ActionsAnimated>
			</>
		);
	}
}
