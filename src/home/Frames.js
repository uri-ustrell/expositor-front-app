import * as React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";

export default class Frames extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
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
		return this.props.frames && (
			<ScrollView
				horizontal
				pagingEnabled
				ref={ref => {
					this.ListRef = ref;
				}}
				style={styles.listWrapper}
			>
				{this.props.frames.map((item) =>
					<View
						style={styles.frameWrapper}
						key={item.id}
					>
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
		resizeMode: 'contain',
	},
	frameWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	listWrapper: {
		flex: 1,
	}
});
