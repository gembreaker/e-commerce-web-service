"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGBookTable = void 0;
var pg_1 = require("pg");
var pg_format_1 = __importDefault(require("pg-format"));
var PGBookTable = /** @class */ (function () {
    function PGBookTable() {
        var _this = this;
        this.Insert = function (book, res) { return __awaiter(_this, void 0, void 0, function () {
            var client, query, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.GetClient();
                        console.log("Adding new book named " + book.Title);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        query = pg_format_1.default('INSERT INTO "Book"("Title", "Author", "Price", "Image") VALUES(%L, %L, %L, %L)  RETURNING *', book.Title, book.Author, book.Price, book.Image);
                        return [4 /*yield*/, client.query(query)];
                    case 3:
                        results = _a.sent();
                        if (results.rowCount > 0) {
                            console.log('New record added');
                            res.status(201).send(results.rows[0]);
                        }
                        else {
                            res.status(409).end();
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(403).send(error_1);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.end()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.Select = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var client, query, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.GetClient();
                        console.log("Reading all the books details");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        query = 'SELECT * FROM "Book"';
                        return [4 /*yield*/, client.query(query)];
                    case 3:
                        results = _a.sent();
                        if (results.rows.length > 0)
                            console.log("Read " + results.rows.length + " records");
                        else
                            console.log("Database is empty");
                        res.send(results.rows);
                        return [3 /*break*/, 7];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(403).send(error_2);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.end()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.SelectById = function (id, res) { return __awaiter(_this, void 0, void 0, function () {
            var client, query, results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.GetClient();
                        console.log("Looking for the book with id " + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        query = pg_format_1.default('SELECT * FROM "Book" WHERE "Id"=%L', id);
                        return [4 /*yield*/, client.query(query)];
                    case 3:
                        results = _a.sent();
                        if (results.rows.length > 0) {
                            console.log("Found " + results.rows.length + " records");
                            res.send(results.rows[0]);
                        }
                        else {
                            console.log("Record not found for Id=" + id);
                            res.status(409).end();
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(403).send(error_3);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.end()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.SelectByName = function (title, res) { return __awaiter(_this, void 0, void 0, function () {
            var client, query, results, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.GetClient();
                        console.log("Looking for all the books with the title " + title);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        query = pg_format_1.default('SELECT * FROM "Book" WHERE "Title"=%L', title);
                        return [4 /*yield*/, client.query(query)];
                    case 3:
                        results = _a.sent();
                        if (results.rows.length > 0)
                            console.log("Found " + results.rows.length + " records");
                        else
                            console.log("Records not found for " + title);
                        res.send(results.rows);
                        return [3 /*break*/, 7];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(403).send(error_4);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.end()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.Delete = function (id, res) { return __awaiter(_this, void 0, void 0, function () {
            var client, query, results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.GetClient();
                        console.log("Delete the book with id = " + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        query = pg_format_1.default('DELETE FROM "Book" WHERE "Id"=%L', id);
                        return [4 /*yield*/, client.query(query)];
                    case 3:
                        results = _a.sent();
                        if (results.rowCount > 0) {
                            console.log('Record deleted');
                            res.send({});
                        }
                        else {
                            console.log("Failed to delete record for Id = " + id);
                            res.status(409).end();
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(400).send(error_5);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.end()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.Patch = function (book, res) { return __awaiter(_this, void 0, void 0, function () {
            var client, queryArgs, values, query, results, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.GetClient();
                        console.log("Modifying the book with Id = " + book.Id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        queryArgs = [];
                        values = [];
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        if (book.Title != null) {
                            values.push(book.Title);
                            queryArgs.push('"Title"=%L');
                        }
                        if (book.Author != null) {
                            values.push(book.Author);
                            queryArgs.push('"Author"=%L');
                        }
                        if (book.Price != null) {
                            values.push(book.Price);
                            queryArgs.push('"Price"=%L');
                        }
                        if (book.Image != null) {
                            values.push(book.Image);
                            queryArgs.push('"Price"=%L');
                        }
                        values.push(book.Id); // Id of record to change
                        query = pg_format_1.default.withArray('UPDATE "Book" SET ' + queryArgs.join(",") + ' WHERE "Id"=%L', values);
                        return [4 /*yield*/, client.query(query)];
                    case 3:
                        results = _a.sent();
                        if (results.rowCount > 0) {
                            console.log('Modified the record');
                            res.send({});
                        }
                        else {
                            console.log("Failed to modify record for Id = " + book.Id);
                            res.status(409).end();
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        error_6 = _a.sent();
                        console.log(error_6);
                        res.status(403).send(error_6);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.end()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    PGBookTable.prototype.GetClient = function () {
        return new pg_1.Client({
            host: "postgres",
            port: 5432,
            user: "docker",
            password: "password",
            database: "mydb"
        });
    };
    return PGBookTable;
}());
exports.PGBookTable = PGBookTable;
//# sourceMappingURL=pgdbbook.js.map