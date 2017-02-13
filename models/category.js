
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'category'
    });
};