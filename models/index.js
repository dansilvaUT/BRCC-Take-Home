'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/sql');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.database, config.username,
    config.password, config);

const files = fs.readdirSync(__dirname).filter((file) => {
return (file.indexOf('.') !== 0) && (file !== basename) &&
    (file.slice(-3) === '.js');
});

for (const file of files) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
if (db[modelName].associate) {
    db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
