import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { useQueue } from 'discord-player';

@ApplyOptions<Command.Options>({
	description: 'Skips the current track.',
	preconditions: ['Voice']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		//
		await interaction.deferReply({ ephemeral: true });
		return this.skip(interaction);
	}

	private async skip(interaction: Command.ChatInputCommandInteraction) {
		//
		const queue = useQueue(interaction.guild!.id);

		if (!queue || !queue.currentTrack) return interaction.editReply({ content: `There is no track currently playing.` });

		queue.node.skip();

		return interaction.editReply({ content: `I have skipped to the next track` });
	}
}
