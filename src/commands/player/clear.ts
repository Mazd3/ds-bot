import { useQueue } from 'discord-player';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Clears the current queue.',
	preconditions: ['Voice']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addBooleanOption((option) => option.setName('history').setDescription('Clear the queue history.'))
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		//
		await interaction.deferReply({ ephemeral: true });
		return this.clear(interaction);
	}

	private async clear(interaction: Command.ChatInputCommandInteraction) {
		//a
		const queue = useQueue(interaction.guild!.id);
		// const history = interaction.options.getBoolean('history');

		if (!queue || !queue.tracks) return interaction.editReply({ content: `There is nothing to clear` });

		queue.tracks.clear();
		// if (history) queue.history.clear();
		return interaction.editReply({ content: `I have cleared the queue` });
	}
}
