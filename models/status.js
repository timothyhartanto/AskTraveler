/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idUser1: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    idUser2: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'status'
  });
};
