
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('country', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        countryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'country'
    });
};