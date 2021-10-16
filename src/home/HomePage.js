import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import UserInactivity from "react-native-user-inactivity";
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
		this.frameSizes = { width: 1180, height: 760, gapHeight: 40 };
		this.state = {
			expositor: { ca: [] },
			languages: ["ca"],
			lang: "ca",
			userIsActive: true
		};
	}

	async componentDidMount() {
		const data = await api();
		this.setState(() => ({ expositor: data.expositor }));
		this.setState(() => ({ languages: Object.keys(data.expositor) }));
	}

	scrollUp = () => {
		this.refScrollView.scrollTo({ x: 0, y: 0, animated: true });
	};

	setLang = langSelected => this.setState(() => ({ lang: langSelected }));

	goToInitialPage = () => {
		this.scrollUp();
		this.setLang("ca");
	};

	render() {
		return (
			<UserInactivity
				timeForInactivity={45000}
				onAction={active => !active && this.goToInitialPage()}
			>
				<UserInactivity
					timeForInactivity={5000}
					onAction={active => {
						this.setState(() => ({ userIsActive: active }));
					}}
				>
					<ScrollView
						ref={ref => (this.refScrollView = ref)}
						pagingEnabled={true}
					>
						<View style={styles.container}>
							<Frames
								frames={this.state.expositor[this.state.lang]}
								sizes={this.frameSizes}
							/>
						</View>
					</ScrollView>
					<ActionButtons
						needButtons={this.state.userIsActive}
						languages={this.state.languages}
						selectedLang={this.state.lang}
						handleTopClick={this.scrollUp}
						handleSelectLang={this.setLang}
					/>
				</UserInactivity>
			</UserInactivity>
		);
	}
}

export default HomePage;
