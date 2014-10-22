"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    AuthorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Post.belongsTo(models.Author);
      }
    }
  });

  return Post;
};
