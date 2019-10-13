import React, { useState, useEffect } from "react";
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

const HomePage = () => {
	const Data = api();
	const languages = Object.keys(Data.expositor);
	let [lang, setLang] = useState("ca");
	let [userIsActive, setUserIsActive] = useState(true);

	const scrollUp = () => console.log("scroll UP!!!");

	return (
		<UserInactivity
			timeForInactivity={5000}
			onAction={active => {
				setUserIsActive(active);
			}}
		>
			<ScrollView>
				<View style={styles.container}>
					<FilmPerforations NumFrames={Data.expositor[lang].length} />
					<Frames frames={Data.expositor[lang]} />
					<FilmPerforations NumFrames={Data.expositor[lang].length} />
				</View>
			</ScrollView>
			<ActionButtons
				needButtons={userIsActive}
				languages={languages}
				selectedLang={lang}
				handleTopClick={scrollUp}
				handleSelectLang={setLang}
			/>
		</UserInactivity>
	);
};

export default HomePage;
