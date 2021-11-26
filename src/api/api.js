import { ID_EXPOSITOR, MAX_ITEMS, LANGUAGES } from '../context/constants';

const itemBuilder = async (lang, page) => {
	const uri = `http://www.pessebrescastellar.com/expo2018/models/${ID_EXPOSITOR}/${lang}/${page}.png`;

	return  {
		id: `${page}-${Date.now()}`,
		page,
		type: "png",
		photo: uri
	}
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
