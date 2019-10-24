import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import UserInactivity from "react-native-user-inactivity";
import FilmPerforations from "./FilmPerforations";
import Frames from "./Frames";
import api from "../api/api";
import ActionButtons from "./Actions";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	}
});

class HomePage extends React.Component {
	constructor() {
		super();
		this.Data = api();
		this.languages = Object.keys(this.Data.expositor);
	}

	state = {
		lang: "ca",
		userIsActive: true
	};

	scrollUp = () => {
		this.refScrollView.scrollTo({ x: 0, y: 0, animated: true });
	};

	setLang = langSelected => this.setState(() => ({ lang: langSelected }));

	render() {
		return (
			<UserInactivity
				timeForInactivity={5000}
				onAction={active => {
					this.setState(() => ({ userIsActive: active }));
				}}
			>
				<ScrollView ref={ref => (this.refScrollView = ref)}>
					<View style={styles.container}>
						<FilmPerforations
							NumFrames={
								this.Data.expositor[this.state.lang].length
							}
						/>
						<Frames frames={this.Data.expositor[this.state.lang]} />
						<FilmPerforations
							NumFrames={
								this.Data.expositor[this.state.lang].length
							}
						/>
					</View>
				</ScrollView>
				<ActionButtons
					needButtons={this.state.userIsActive}
					languages={this.languages}
					selectedLang={this.state.lang}
					handleTopClick={this.scrollUp}
					handleSelectLang={this.setLang}
				/>
			</UserInactivity>
		);
	}
}

export default HomePage;
