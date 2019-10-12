import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import UserInactivity from "react-native-user-inactivity";
import FilmPerforations from "./FilmPerforations";
import Frames from "./Frames";
import api from "../api/api";
import Actions from "./Actions";

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
	let [isUserActive, setUserActive] = useState(true);

	const scrollUp = () => console.log("scroll UP!!!");
	const setActivity = active => {
		if (active) setUserActive(true);
		else setUserActive(false);
	};

	return (
		<UserInactivity
			timeForInactivity={5000}
			onAction={active => {
				setActivity(active);
				console.log("isUserActive " + isUserActive);
				console.log("active " + active);
			}}
		>
			<ScrollView>
				<View style={styles.container}>
					<FilmPerforations NumFrames={Data.expositor[lang].length} />
					<Frames frames={Data.expositor[lang]} />
					<FilmPerforations NumFrames={Data.expositor[lang].length} />
				</View>
			</ScrollView>
			<Actions
				isUserActive
				languages={languages}
				selectedLang={lang}
				handleTopClick={scrollUp}
				handleSelectLang={setLang}
			/>
		</UserInactivity>
	);
};

export default HomePage;
