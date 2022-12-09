const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION. 
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  //first part inputing parameters dataToUpdate which is an object, and jsToSql which is an object with keys in javascript and values as sql queries
  const keys = Object.keys(dataToUpdate);
  //this line turns the keys into an array
  if (keys.length === 0) throw new BadRequestError("No data");
  //this line will handle if there are no keys 

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );
  // const cols = []
  // for(key of keys) {
  //   const colName = `"${jsToSql[key] || key}"=$${idx + 1}`
  //   cols.push(colName);
  // }
  //this part will loop through the column names and will update the 

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

//This function is basically meant to update a sql query 