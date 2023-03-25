import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { useMasterPlayer } from 'discord-player';
import type { GuildMember } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Play track or playlist.',
	preconditions: ['Voice']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) =>
					option //
						.setName('song')
						.setDescription('Query or link.')
						.setRequired(true)
				)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		//
		await interaction.deferReply({ ephemeral: true });
		return this.play(interaction);
	}

	private async play(interaction: Command.ChatInputCommandInteraction) {
		//
		const query = interaction.options.getString('song')!;
		const member = interaction.member as GuildMember;
		const player = useMasterPlayer()!;
		const result = await player.search(query, { requestedBy: interaction.user });

		try {
			await player.play(member.voice.channel!.id, result);
			return interaction.editReply({
				content: `${result.playlist ? 'Playlist' : 'Track'} **${result.tracks[0].author} - ${result.tracks[0].title}** added in queue.`
			});
		} catch (error: any) {
			await interaction.editReply({ content: `${error.message}` });
			return console.log(error);
		}
	}
}
