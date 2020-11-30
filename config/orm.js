const connection = require("../config/connection.js");

function objToSql(object) {
  const keyArray = [];

  for (let key in object) {
    let value = object[key];
    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      keyArray.push(key + "=" + value);
    }
  }

  return keyArray.toString();
}

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
      arr.push("?");
  }

  return arr.toString();
}

const orm = {
  selectAll: (table, cb) => {
    const query = "SELECT * FROM " + table + ";";
    connection.query(query, function (err, result) {
      if (err)
        throw err;
      cb(result);
    });
  },
  insertOne: (table, columns, values, cb) => {
    let query = "INSERT INTO " + table;

    query += " (";
    query += columns.toString();
    query += ") ";
    query += "VALUES (";
    query += printQuestionMarks(values.length);
    query += ") ";

    console.log(query);

    connection.query(query, values, (err, result) => {
      if (err)
        throw err;
      cb(result);
    });
  },
  
  updateOne: (table, updates, condition, cb) => {
    let query = "UPDATE " + table;

    query += " SET ";
    query += objToSql(updates);
    query += " WHERE ";
    query += condition;

    console.log(query);

    connection.query(query, (err, result) => {
        if (err)
          throw err;
        cb(result);
      });
  }, 
  deleteOne: (table, condition, cb) => {
    let query = "DELETE FROM " + table;

    query += " WHERE ";
    query += condition;

    console.log(query);

    connection.query(query, (err, result) => {
        if (err)
          throw err;
        cb(result);
      });
  }
};

// Export the orm for the burger.js model
module.exports = orm;