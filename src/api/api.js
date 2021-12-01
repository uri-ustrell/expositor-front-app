import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
import * as Network from 'expo-network';
import { ID_EXPOSITOR, MAX_ITEMS, LANGUAGES } from '../context/constants'
import { Alert } from "react-native";

const COUNTER = 1;

const delay = ms => new Promise(res => setTimeout(res, ms))

const itemBuilder = async (lang, page) => {
	const uri = `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/${lang}/${page}.png`;
	const name = shorthash.unique(uri);
	const path = `${FileSystem.documentDirectory}${name}`;

	try {
		const newImage = await FileSystem.downloadAsync(uri, path);
		
		if (newImage.headers["Content-Type"] === "image/png") {
			
			return {
				id: `${page}-${Date.now()}`,
				page,
				type: "png",
				photo: newImage.uri
			};
		} else {
			await FileSystem.deleteAsync(path, { idempotent: true });
		}
	} catch (error) {
		Alert.alert("api.js > itemBuilder() ERROR", error);
	}
};

const langBuilder = async lang => {
	let langArr = [];

	for (let i = 0; i < MAX_ITEMS; i++) {
		const newItem = await itemBuilder(lang, i);
		
		if (newItem && Object.keys(newItem).length) {
			langArr.push(newItem);
		}
	}

	return langArr;
};

const expositorBuilder = async () => {
	try {
		
		const network = await Network.getNetworkStateAsync();
		Alert.alert("expositoBuilder > network", network.isInternetReachable ? "true" : 'false');
		
		if (!network.isConnected || !network.isInternetReachable) {
			await delay(3000);
			Alert.alert("expositoBuilder > no network", COUNTER)
			COUNTER++;
			return expositorBuilder();
		}
		
		let expositor = {};
		let objPromises = {};
		
		LANGUAGES.map(lang => (objPromises[lang] = langBuilder(lang)));
		
		for (let i = 0; i < LANGUAGES.length; i++) {
			const resolved = await objPromises[LANGUAGES[i]];
			if (Object.keys(resolved).length) expositor[LANGUAGES[i]] = resolved;
		}
		
		return expositor;
	} catch (error) {
		Alert.alert("api.js > expositorBuilder() ERROR", error);
	}
};

const api = async () => ({ expositor: await expositorBuilder() });

export default api;
