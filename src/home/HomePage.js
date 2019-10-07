import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import FilmPerforations from "./FilmPerforations";
import Frames from "./Frames";
import api from "../api/api";

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

	return (
		<View style={styles.container}>
			<FilmPerforations NumFrames={Data.expositor.cat.length} />
			<Frames frames={Data.expositor.cat} />
			<FilmPerforations NumFrames={Data.expositor.cat.length} />
		</View>
	);
};

export default HomePage;
