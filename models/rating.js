/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rating', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    idTransaction: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ratingDeal: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    ratingTime: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    ratingQuality: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'rating'
  });
};
