import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

const Frames = ({ frames }) => {
	return (
		<FlatList
			data={frames}
			renderItem={({ item }) => (
				<View style={styles.frameWrapper}>
					<Image
						style={styles.frame}
						source={{
							uri: item.photo
						}}
					/>
				</View>
			)}
			keyExtractor={item => `${item.id}`}
			initialScrollIndex={0}
			ItemSeparatorComponent={() => <View style={{ height: 40 }}></View>}
		/>
	);
};

const styles = StyleSheet.create({
	frame: {
		//width: 1180,
		//height: 645,
		width: 550,
		height: 300,
		resizeMode: "contain",
		borderRadius: 10
	},
	frameWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default Frames;
