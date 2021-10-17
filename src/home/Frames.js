import * as React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

export default class Frames extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.scrollUp) {
			this.scrollToStart();
			this.props.disableScrollUp();
		}
	}

	scrollToStart = () => {
		this.ListRef.scrollTo({ x: 0, y: 0, animated: true });
	}

	render() {
		return (
			<ScrollView
				horizontal
				pagingEnabled
				ref={ref => {
					this.ListRef = ref;
				}}
			>
				{this.props.frames.map((item) =>
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
			</ScrollView>
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
	},
	frameWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
