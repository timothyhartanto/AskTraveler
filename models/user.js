/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idCountry: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusTravel: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tglAwal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tglAkhir: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userToken: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'user'
  });
};
