'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id'
      })
    }
  };
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        functionValidate: function(data) {
          if(data.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
         isEmail: {
           args: true,
           msg: 'dados do tipo email inválido'
         }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      all: { where: {}},
      //etc : { constraint : valor}
    }
  });
  return Pessoas;
};