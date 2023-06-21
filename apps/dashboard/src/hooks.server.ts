import { CONFIG } from 'config';
import { twurple } from '$lib/clients/twurple';

export const handle = async ({ event, resolve }) => {
	const { twitchBroadcasterId, twitchBotId } = CONFIG;

	const userIds = [twitchBroadcasterId, twitchBotId].filter((x) => x != null) as string[];
	const users = userIds.length ? await twurple.users.getUsersByIds(userIds) : [];

	users.forEach((user) => {
		const userData = {
			id: user.id,
			name: user.name,
			displayName: user.displayName,
			description: user.description,
			type: user.type,
			broadcasterType: user.broadcasterType,
			profilePictureUrl: user.profilePictureUrl,
			offlinePlaceholderUrl: user.offlinePlaceholderUrl,
			creationDate: user.creationDate
		};

		if (user.id == twitchBroadcasterId) event.locals.twitchBroadcasterUser = userData;
		if (user.id == twitchBotId) event.locals.twitchBotUser = userData;
	});

	return await resolve(event);
};