import { SapphireClient } from '@sapphire/framework';
import { Player } from 'discord-player';
import { CLIENT_OPTIONS, PLAYER_OPTIONS } from './config';

export class FlowyClient extends SapphireClient {
	public player: Player;
	constructor() {
		super(CLIENT_OPTIONS);
		this.player = Player.singleton(this, PLAYER_OPTIONS);
	}
}

declare module 'discord.js' {
	interface Client {
		readonly player: Player;
	}
}
