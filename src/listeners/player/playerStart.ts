import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';
import type { GuildQueue, Track } from 'discord-player';
import type { APIEmbed, GuildTextBasedChannel, Message } from 'discord.js';
import trackName from '../../lib/utils/parsers/trackName';

@ApplyOptions<ListenerOptions>({
	emitter: container.client.player.events,
	event: 'playerStart'
})
export class UserEvent extends Listener {
	public async run(queue: GuildQueue<{ channel: GuildTextBasedChannel; ui: Message }>, track: Track) {
		//
		const { title, author } = trackName(track);

		const trackEmbed: APIEmbed = {
			color: 0x5865f2,
			thumbnail: { url: track.thumbnail },
			fields: [
				{ name: title, value: author },
				{ name: '', value: `- ${track.duration} -` + '\n' + `by: ${track.requestedBy}` }
			]
		};

		return (queue.metadata.ui = await queue.metadata.channel.send({ embeds: [trackEmbed] }));
	}
}
