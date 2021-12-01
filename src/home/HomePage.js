import React from "react";
import { StyleSheet, View } from "react-native";
import UserInactivity from "react-native-user-inactivity";
import Frames from "./Frames";
import api from "../api/api";
import ActionButtons from "./Actions";
import { FRAME_SIZES } from '../context/constants';

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
	constructor(props) {
		super(props);
		this.frameSizes = FRAME_SIZES;
		this.state = {
			lang: "ca",
			userIsActive: true,
			scrollUp: false,
		};
		this.expositor = props.expositor || { ca: [] };
	}

	setLang = langSelected => this.setState(() => ({ lang: langSelected }));

	setScrollUp = () => this.setState(() => ({ scrollUp: true }));
	disableScrollUp = () => this.setState(() => ({ scrollUp: false }));

	goToInitialPage = () => {
		this.setScrollUp();
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
					<View style={styles.container}>
						<Frames
							frames={this.expositor[this.state.lang]}
							sizes={this.frameSizes}
							scrollUp={this.state.scrollUp}
							disableScrollUp={this.disableScrollUp}
						/>
					</View>
					<ActionButtons
						needButtons={this.state.userIsActive}
						languages={Object.keys(this.expositor)}
						selectedLang={this.state.lang}
						handleTopClick={this.setScrollUp}
						handleSelectLang={this.setLang}
					/>
				</UserInactivity>
			</UserInactivity>
		);
	}
}

export default HomePage;
