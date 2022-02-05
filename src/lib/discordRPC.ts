import { Client } from 'discord-rpc';
import { getConfig } from './config';

export var rpc: Client;

export async function connectRPC() {
    if (!getConfig().discordRPC) return;

    try {
        rpc = new Client({ transport: 'ipc' });

        rpc.on('ready', () =>
            rpc.setActivity({
                details: 'Monitoring Service.',
                largeImageKey: 'qr',
                largeImageText: 'Apptime Desktop',
            //    smallImageKey: 'icon',
                startTimestamp: new Date(),
                buttons: [
                    { label: 'Join Apptime', url: 'https://www.apptime.tech' },
                    { label: 'Download Desktop App', url: 'https://desktop.apptime.tech' }
                ]
            })
        )

        // @ts-expect-error
        rpc.on('disconnected', reconnect)

        rpc.login({ clientId: '873161814635085877' });
    } catch (err) {
        reconnect();
    }
}

const reconnect = () => setTimeout(() => connectRPC(), 1e4);

export async function dropRPC() {
    rpc?.destroy();
}
