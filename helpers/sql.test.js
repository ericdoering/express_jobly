const { BadRequestError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql")

describe("sqlForPartialUpdate", function () {
    test("sql update test", async function () {
        const updatedData = sqlForPartialUpdate(
            { f1: "v1" }, // data
            { f1: "f1", fF2: "f2" }); // jstosql
            
        expect(updatedData).toEqual({
            setCols: "\"f1\"=$1",
            values: ["v1"],
        });
    });

    test("testing function when there is no data parameter", function (){
        expect(() => sqlForPartialUpdate(
                {}, // data
                { f1: "f1", fF2: "f2" })).toThrow(new BadRequestError("No data"));
    });

    test("testing function when there is no jsToSql parameter", function (){
        const updatedData = sqlForPartialUpdate(
            { f1: "v1" }, // data
            {}); // jstosql

        expect(updatedData).toEqual({
            setCols: "\"f1\"=$1",
            values: ["v1"],
        });
    });
    
    test("sql update test different name", async function () {
        const updatedData = sqlForPartialUpdate(
            { f1: "v1" }, // data
            { f1: "f2", fF2: "f2" }); // jstosql
            
        expect(updatedData).toEqual({
            setCols: "\"f2\"=$1",
            values: ["v1"],
        });
    });
});