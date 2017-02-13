/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('messages', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idUserFrom: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idUserTo: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tgl: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'messages'
    });
};