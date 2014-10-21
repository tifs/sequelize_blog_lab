"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
        Post.belongsTo(db.Author);
      }
    }
  });

  return Post;
};
