import { Precondition } from '@sapphire/framework';
import type { ChatInputCommandInteraction, GuildMember } from 'discord.js';

export class VoicePrecondition extends Precondition {
	//
	public override chatInputRun(interaction: ChatInputCommandInteraction) {
		//
		return this.checkVoice(interaction);
	}

	// public override messageRun(message: Message) {
	// 	return this.ok();
	// }

	// public override contextMenuRun(interaction: ContextMenuCommandInteraction) {
	// 	return this.ok();
	// }

	private async checkVoice(interaction: ChatInputCommandInteraction) {
		//
		const user = interaction.member as GuildMember;
		const client = interaction.guild?.members.me as GuildMember;

		if (!user.voice.channel) {
			return this.error({ message: 'You must be in a voice channel to play something!' });
		}

		if (client.voice.channel && user.voice.channel.id !== client.voice.channel.id) {
			return this.error({ message: 'You must be in the same voice channel as me to use this command!' });
		}

		return this.ok();
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		Voice: never;
	}
}
