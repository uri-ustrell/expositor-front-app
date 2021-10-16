import * as React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import ImageCache from "./CacheImage";

export default class Frames extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {}

	scrollToFrame = nextFrame => {
		this.flatListRef.scrollToIndex({
			animated: true,
			index: nextFrame,
			viewOffset: 0,
			viewPosition: 0.5
		});
	};

	render() {
		return (
			<FlatList
				data={this.props.frames}
				renderItem={({ item }) => (
					<View style={styles.frameWrapper}>
						<Image
							style={[
								styles.frame,
								{
									width: this.props.sizes.width,
									height: this.props.sizes.height
								}
							]}
							source={{ uri: item.photo }}
						/>
					</View>
				)}
				keyExtractor={item => `${item.id}`}
				initialScrollIndex={0}
				ListHeaderComponent={() => (
					<View
						style={{ height: this.props.sizes.gapHeight / 2 }}
					></View>
				)}
				ListFooterComponent={() => (
					<View
						style={{ height: this.props.sizes.gapHeight / 2 }}
					></View>
				)}
				ItemSeparatorComponent={() => (
					<View style={{ height: this.props.sizes.gapHeight }}></View>
				)}
				ref={ref => {
					this.flatListRef = ref;
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	frame: {
		//width: 1180,
		//height: 645,
		//width: 550,
		//height: 300,
		resizeMode: "contain",
		borderRadius: 10
	},
	frameWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
