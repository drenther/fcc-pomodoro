export const toTitleCase = str =>
	str
		.split(' ')
		.map(x => [x.slice(0, 1).toUpperCase(), x.slice(1)].join(''))
		.join(' ');

export const toMinsSecs = secs => `${toMins(secs)}:${padZeroes(secs % 60)}`;

export const toMins = secs => `${padZeroes(parseInt(secs / 60, 10))}`;

export const percent = (completed, total) =>
	parseInt(completed / total * 100, 10) || 0;

export const fetchFromCache = () => {
	let sessionLength, breakLength;
	if (localStorage) {
		const slCache = getCache('sessionLength');
		sessionLength = cacheIsValid(slCache) ? slCache : 1500;
		const bCache = getCache('breakLength');
		breakLength = cacheIsValid(bCache) ? bCache : 300;
	}
	return {
		sessionLength,
		breakLength,
	};
};

export const saveToCache = (timer, val) => {
	if (localStorage) {
		localStorage.setItem(timer, val);
	}
};

const padZeroes = x => `${'00'.substring(0, 2 - String(x).length)}${x}`;

const getCache = item => parseInt(localStorage.getItem(item), 10);

const cacheIsValid = val => isFinite(val) && val > 0 && val < 54000;
