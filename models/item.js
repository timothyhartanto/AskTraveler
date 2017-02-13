/**
 * Created by muchazul on 6/21/2016.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idCountry: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idCategory: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        URLItem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photoItems: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'item'
    });
};