export class HighwayError extends Error {
    messageId: string;

    constructor(message: string, messageId: string) {
        super(message); // (1)
        this.messageId = messageId; // (2)
    }
}
