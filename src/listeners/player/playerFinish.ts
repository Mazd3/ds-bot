import { ApplyOptions } from '@sapphire/decorators';
import { container, Listener, ListenerOptions } from '@sapphire/framework';
import type { GuildQueue } from 'discord-player';
import type { GuildTextBasedChannel, Message } from 'discord.js';

@ApplyOptions<ListenerOptions>({
	emitter: container.client.player.events,
	event: 'playerFinish'
})
export class UserEvent extends Listener {
	public run(queue: GuildQueue<{ channel: GuildTextBasedChannel; ui: Message }>) {
		//
		return queue.metadata.ui.delete();
	}
}
