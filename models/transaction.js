/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaction', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idUser1: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    idUser2: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    idItem: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    harga: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'transaction'
  });
};
