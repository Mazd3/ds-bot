import { useQueue } from 'discord-player';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Stops the music player.'
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
		return this.stop(interaction);
	}

	private async stop(interaction: Command.ChatInputCommandInteraction) {
		//
		const queue = useQueue(interaction.guild!.id);

		if (!queue || !queue.tracks) return interaction.editReply({ content: `There is nothing to stop.` });

		queue.delete();
		return interaction.editReply({ content: 'Player stopped.' });
	}
}
