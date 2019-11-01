import * as React from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
//import * as FileSystem from 'expo-file-system';
import { cacheDirectory, downloadAsync, getInfoAsync } from "expo-file-system";

export default class CacheImage extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	state = { source: null };

	async componentDidMount() {
		const { uri } = this.props;
		const name = shorthash.unique(uri);
		const path = `${cacheDirectory}${name}`;
		const image = await getInfoAsync(path);

		if (image.exists) {
			this.setState({
				source: {
					uri: image.uri
				}
			});

			return;
		}

		const newImage = await downloadAsync(uri, path);

		if (newImage.headers["Content-Type"] === "image/png") {
			this.setState({
				source: {
					uri: newImage.uri
				}
			});
		}
	}

	render() {
		return <Image style={this.props.style} source={this.state.source} />;
	}
}
