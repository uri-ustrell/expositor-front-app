import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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
	//const languages = ["cat", "es"];
	//[lang, setLang] = useState(languages);

	return (
		<View style={styles.container}>
			<FilmPerforations NumFrames={Data.expositor.cat.length} />
			<Frames frames={Data.expositor.cat} />
			<FilmPerforations NumFrames={Data.expositor.cat.length} />
			<Actions languages={languages} />
		</View>
	);
};

export default HomePage;
