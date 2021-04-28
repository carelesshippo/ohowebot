import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface TicketAttributes {
    id: number;
    channelid: string;
    creatorid: string;
    subject: string | null;
    resolved: boolean;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, "id"> {}

export default class Ticket
    extends Model<TicketAttributes, TicketCreationAttributes>
    implements TicketAttributes {
    resolved: boolean;
    id: number;
    channelid: string;
    creatorid: string;
    subject: string | null;

    public readonly createdAt: Date;
    public readonly updateAt: Date;
}

export function init(sequelize: Sequelize) {
    Ticket.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            channelid: {
                type: new DataTypes.STRING(18),
                allowNull: false,
            },
            creatorid: {
                type: new DataTypes.STRING(18),
                allowNull: false,
            },
            subject: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
            resolved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            tableName: "tickets",
            sequelize,
        }
    );
    Ticket.sync();
}
