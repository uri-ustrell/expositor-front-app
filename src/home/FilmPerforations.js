import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

const FilmPerforations = ({ numFrames, frameSizes }) => {
	const filmHoles = (num, sizes) => {
		const holesByFrame = (sizes.height + sizes.gapHeight) / 40;
		let holes = [];

		for (let hole = 0; hole < num * holesByFrame; hole++) {
			holes.push(<View style={styles.hole} key={`${hole}`}></View>);
		}

		return holes;
	};

	return (
		<ScrollView>
			<View style={[styles.band]}>
				{filmHoles(numFrames, frameSizes)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	band: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	hole: {
		backgroundColor: "#fff",
		width: 20,
		height: 15,
		marginTop: 25,
		borderRadius: 3
	}
});

export default FilmPerforations;
