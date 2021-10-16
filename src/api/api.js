import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const ID_EXPOSITOR = 5;
const MAX_ITEMS = 5;
const LANGUAGES = ["ca", "es", "en", "fr"];

const itemBuilder = async (lang, page) => {
	const uri = `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/${lang}/${page}.png`;
	const name = shorthash.unique(uri);
	const path = `${FileSystem.cacheDirectory}${name}`;
	await FileSystem.deleteAsync(path, { idempotent: true });
	//const image = await FileSystem.getInfoAsync(path);

	let item = {};

	/* if (image.exists) {
		console.log("image from cache");
		item = {
			id: Date.now(),
			page,
			type: "png",
			photo: image.uri
		};
	} else { */
	const newImage = await FileSystem.downloadAsync(uri, path);
	//console.log("new image fetched");
	if (newImage.headers["Content-Type"] === "image/png") {
		//console.log("good image fetched");
		//genero un nou item
		item = {
			id: Date.now(),
			page,
			type: "png",
			photo: newImage.uri
		};
	} else {
		//console.log("bad image fetched");
		//borro l'item del FileSystem.cacheDirectory
		await FileSystem.deleteAsync(path, { idempotent: true });
	}
	/* } */

	return item;
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

const api = async () => {
/* 	await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}expositor/`, {
		idempotent: true
	});

	await FileSystem.makeDirectoryAsync(
		`${FileSystem.cacheDirectory}expositor/`,
		{
			intermediates: true
		}
	); */

	return {
		expositor: await expositorBuilder()
		/* {
			ca: [
				itemBuilder("ca", 0),
				{
					id: 45612341234,
					page: 1,
					type: "png",
					photo: `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/ca/1.png`
				},
				{
					id: 45623234,
					page: 2,
					type: "png",
					photo: `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/ca/43.png`
				}
			],
			es: [
				{
					id: 4587978,
					page: 0,
					type: "png",
					photo: `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/es/0.png`
				},
				{
					id: 454532788,
					page: 1,
					type: "png",
					photo: `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/es/1.png`
				},
				{
					id: 45346348,
					page: 2,
					type: "png",
					photo: `http://pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/es/2.png`
				}
			]
		} */
	};
};

export default api;
