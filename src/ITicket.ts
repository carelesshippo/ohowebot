
export default interface ITicket {
    id: number;
    creatorId: string;
    originalMessageId: string;
    channelId: string;
    subject: string;
    resolved: boolean;
}