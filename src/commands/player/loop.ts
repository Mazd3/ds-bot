import { useQueue } from 'discord-player';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

enum RepeatMode {
	off = 0,
	track = 1,
	queue = 2,
	autoplay = 3
}

@ApplyOptions<Command.Options>({
	description: 'Loops current song or queue.',
	preconditions: ['Voice']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addIntegerOption((option) =>
					option //
						.setName('mode')
						.setDescription('Choose loop mode')
						.setRequired(true)
						.addChoices(
							{ name: 'off', value: RepeatMode.off },
							{ name: 'track', value: RepeatMode.track },
							{ name: 'queue', value: RepeatMode.queue },
							{ name: 'autoplay', value: RepeatMode.autoplay }
						)
				)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		//
		await interaction.deferReply({ ephemeral: true });
		return this.loop(interaction);
	}

	private async loop(interaction: Command.ChatInputCommandInteraction) {
		//
		const queue = useQueue(interaction.guild!.id);
		if (!queue) return interaction.editReply({ content: `There is no queue currently playing.` });
		const mode = interaction.options.getInteger('mode', true);
		queue.setRepeatMode(mode);
		return interaction.editReply({ content: `Loop mode set to **${RepeatMode[mode]}**.` });
	}
}
