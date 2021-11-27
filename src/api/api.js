import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";
import { ID_EXPOSITOR, MAX_ITEMS, LANGUAGES } from '../context/constants'

const itemBuilder = async (lang, page) => {
	const uri = `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/${lang}/${page}.png`;
	const name = shorthash.unique(uri);
	const path = `${FileSystem.documentDirectory}${name}`;
	
	const image = await FileSystem.getInfoAsync(path);

	if (!image.exists) {
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
	}
		
	return {
			id: `${page}-${Date.now()}`,
			page,
			type: "png",
			photo: image.uri
		};
};

const langBuilder = async lang => {
	let langArr = [];

	for (let i = 0; i < MAX_ITEMS; i++) {
		const newItem = await itemBuilder(lang, i);
		if (Object.keys(newItem).length) langArr.push(newItem);
	}

	return langArr;
};

const expositorBuilder = async () => {
	let expositor = {};
	let objPromises = {};

	LANGUAGES.map(lang => (objPromises[lang] = langBuilder(lang)));

	for (let i = 0; i < LANGUAGES.length; i++) {
		const resolved = await objPromises[LANGUAGES[i]];
		if (Object.keys(resolved).length) expositor[LANGUAGES[i]] = resolved;
	}

	return expositor;
};

const api = async () => ({ expositor: await expositorBuilder() });

export default api;
