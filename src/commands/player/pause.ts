import { useQueue, useTimeline } from 'discord-player';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'Pause the player.',
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
		return this.pause(interaction);
	}

	private async pause(interaction: Command.ChatInputCommandInteraction) {
		//
		const queue = useQueue(interaction.guild!.id)!;
		const timeline = useTimeline(interaction.guild!.id)!;

		if (!queue.currentTrack) return interaction.editReply({ content: `There is no track currently playing` });

		(await timeline.paused) ? timeline.resume() : timeline.pause();
		const state = timeline.paused;
		return interaction.editReply({ content: `Playback has been ${state ? 'paused' : 'resumed'}` });
	}
}
