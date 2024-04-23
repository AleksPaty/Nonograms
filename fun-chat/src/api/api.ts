import { UserResponse } from '../types/interfaces';

export class Api {
    connection: WebSocket;
    websocketUrl: string;

    constructor(url = 'ws://127.0.0.1:4000') {
        this.websocketUrl = url;
        this.connection = new WebSocket(url);
    }

    public closeListener(showErrorMessageFunc: (message: string, isClick: boolean) => HTMLElement) {
        this.connection.onclose = (e): void => {
            console.dir(e);
            if (!e.wasClean) {
                const errorElem = showErrorMessageFunc('Disconnection server. Try restore the connection', false);

                for (let i = 0; i <= 5; i += 1) {
                    let isConnect = false;
                    setTimeout(() => {
                        this.connection = new WebSocket(this.websocketUrl);
                        this.connection.onopen = () => {
                            console.log('connect');
                            isConnect = true;
                            errorElem.remove();
                        };
                    }, 1000);
                    if (isConnect) break;
                }
            }
        };
    }

    public userOperation(operationType: string, userName: string, word: string): void {
        const id = operationType.includes('IN') ? `login_${userName}` : `logout_${userName}`;
        const data: UserResponse = {
            id,
            type: operationType,
            payload: {
                user: {
                    login: userName,
                    password: word,
                },
            },
        };

        const stringData = JSON.stringify(data);
        this.connection.send(stringData);
        this.connection.onerror = (e) => {
            console.log(e);
        };
    }

    public getAllUsers(): void {
        const userActive = 'USER_ACTIVE';
        const userInactive = 'USER_INACTIVE';

        this.connection.send(
            JSON.stringify({
                id: `get${userActive.slice(4)}`,
                type: userActive,
                payload: null,
            })
        );
        this.connection.send(
            JSON.stringify({
                id: `get${userInactive.slice(4)}`,
                type: userInactive,
                payload: null,
            })
        );
    }

    public getMessageHistory(userName: string): void {
        const sendData = {
            id: 'getMessageHist',
            type: 'MSG_FROM_USER',
            payload: {
                user: {
                    login: userName,
                },
            },
        };
        this.connection.send(JSON.stringify(sendData));
    }

    public sendMessage(toUser: string, message: string): void {
        const sendData = {
            id: 'sendingMessage',
            type: 'MSG_SEND',
            payload: {
                message: {
                    to: toUser,
                    text: message,
                },
            },
        };
        this.connection.send(JSON.stringify(sendData));
    }

    public readStatusChange(messageId: string): void {
        const sendData = {
            id: 'readStatusAdd',
            type: 'MSG_READ',
            payload: {
                message: {
                    id: messageId,
                },
            },
        };
        this.connection.send(JSON.stringify(sendData));
    }
}
