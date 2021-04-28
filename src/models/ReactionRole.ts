import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ReactionRoleAttributes {
    id: number,
    messageid: string,
    emojiid: string,
    roleid: string
}

interface ReactionRoleCreationAttributes extends Optional<ReactionRoleAttributes, "id"> {}

export default class ReactionRole extends Model<ReactionRoleAttributes, ReactionRoleCreationAttributes> implements ReactionRoleAttributes {
    id: number;
    messageid: string;
    emojiid: string;
    roleid: string
    
    public readonly createdAt: Date;
    public readonly updateAt: Date;
}

export function init(sequelize: Sequelize) {
    ReactionRole.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        messageid: {
            type: new DataTypes.STRING(18),
            allowNull: false,
        },
        emojiid: {
            type: new DataTypes.STRING(18),
            allowNull: false,
        },
        roleid: {
            type: new DataTypes.STRING(18),
            allowNull: false,
        },
    },
    {
        tableName: "reactionroles",
        sequelize
    })
    ReactionRole.sync();
}