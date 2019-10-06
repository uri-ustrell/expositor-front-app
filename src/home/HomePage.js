import React from "react";
import { StyleSheet, View, FlatList, ScrollView, Image } from "react-native";
import api from "../api/api";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	},
	hole: {
		backgroundColor: "#fff",
		width: 20,
		height: 15,
		marginTop: 25,
		borderRadius: 3
	},
	filmHoles: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	frame: {
		width: 1180,
		height: 645,
		resizeMode: "contain",
		borderRadius: 10
	}
});

const filmHoles = num => {
	let holes = [];
	for (let hole = 0; hole < num * 18; hole++) {
		holes.push(<View style={styles.hole} key={hole}></View>);
	}
	return holes;
};

const HomePage = () => {
	const Data = api();

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.filmHoles}>
					{filmHoles(Data.expositor.length)}
				</View>
			</ScrollView>
			<FlatList
				data={Data.expositor}
				renderItem={({ item }) => (
					<View style={styles.container}>
						<Image
							style={styles.frame}
							source={{
								uri: `data:image/${item.type};base64,${item.photo}`
							}}
						/>
					</View>
				)}
				keyExtractor={item => item.page}
				initialScrollIndex={2}
				ItemSeparatorComponent={() => (
					<View style={{ height: 40 }}></View>
				)}
			/>
			<ScrollView>
				<View style={styles.filmHoles}>
					{filmHoles(Data.expositor.length)}
				</View>
			</ScrollView>
		</View>
	);
};

export default HomePage;
