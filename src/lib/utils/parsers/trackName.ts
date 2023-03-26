import type { Track } from 'discord-player';

export default (track: Track): { title: string; author: string } => {
	if (!(track.source === 'youtube' || track.source === 'soundcloud')) {
		return { title: track.title, author: track.author };
	} else {
		let title = track.title.split(' - ')[1];
		let author = track.title.split(' - ')[0];
		if (title === undefined) {
			title = track.title;
			author = track.author.split(' - ')[0];
		}
		return { title, author };
	}
};
