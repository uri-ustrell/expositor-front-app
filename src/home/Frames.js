import * as React from "react";
import { StyleSheet, View, VirtualizedList, Image } from "react-native";

export default class Frames extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dragOffset: 0 }
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.scrollUp) {
			this.scrollToStart();
			this.props.disableScrollUp();
		}

		if (prevState !== this.state.dragOffset) {
			this.scrollToFrame();
		}
	}

	scrollToFrame = () => {
		console.log("this.dragOffset -->", this.state.dragOffset);

		this.ListRef.scrollToIndex({
			animated: true,
			index: this.state.dragOffset > 2 && 0,
			viewOffset: 0,
			viewPosition: 0.5
		});
	};

	scrollToStart = () => {
		this.ListRef.scrollToIndex({
			index: 0,
			viewOffset: 0,
			viewPosition: 0.5,
			animated: true
		});
	}

	render() {
		return (
			<VirtualizedList
				data={this.props.frames}
				getItem={(data, index) => (data[index])}
				getItemCount={(data) => data.length}
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
				horizontal
				onMomentumScrollEnd={(e) => {
					const { contentSize: { width }, contentOffset: { x } } = e.nativeEvent
					this.setState(() => ({ dragOffset: Math.floor(width / x) }))
				}}
				onScrollToIndexFailed={console.log}
				keyExtractor={item => `${item.id}`}
				initialScrollIndex={0}
				ref={ref => {
					this.ListRef = ref;
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
	},
	frameWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
