'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      });

      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};