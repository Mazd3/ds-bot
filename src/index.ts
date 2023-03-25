import './config';
import { FlowyClient } from './FlowyClient';

const client = new FlowyClient();

const main = async () => {
	try {
		client.logger.info('Logging in..');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
