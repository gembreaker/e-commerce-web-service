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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var pgdbbook_js_1 = require("./pgdbbook.js");
var pgdbcart_js_1 = require("./pgdbcart.js");
var WebserviceProcess = /** @class */ (function () {
    function WebserviceProcess() {
        //private _hostname: string = process.env["SERVER_IP_ADDRESS"] || '127.0.0.1';	// In local computer
        this._port = 1339;
    }
    // Just for debugging
    WebserviceProcess.prototype.DumpObject = function (obj, msg) {
        if (msg === void 0) { msg = ""; }
        var output = msg;
        for (var property in obj) {
            output += property + ': ' + obj[property] + '; ';
        }
        console.log(output);
    };
    WebserviceProcess.prototype.Start = function () {
        var _this = this;
        var service = express_1.default();
        var dbname = "testdb1";
        service.get('/', function (req, res) {
            res.send('Welcome!');
        });
        service.get('/hi', function (req, res) {
            res.send('Hello!');
        });
        service.get('/hello/:title', function (req, res) {
            res.send("Hello " + req.params.title);
        });
        service.get('/error', function (req, res) {
            res.status(403).end();
        });
        var corsOptions = {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            allowedHeaders: "Authorization, Origin, Content-Type, Accept, X-Requested-With",
            maxAge: 0 //,      // Allow us to see preflight check, should be more like 1728000
            // preflightContinue: false,
            // optionsSuccessStatus: 204
        };
        service.use(cors_1.default(corsOptions));
        // Enable Express to read the Request Body
        service.use(express_1.default.json()); // for parsing application/json
        service.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        service.post('/books', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var bookDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookDB = new pgdbbook_js_1.PGBookTable();
                        return [4 /*yield*/, bookDB.Insert({
                                Title: req.body.title,
                                Author: req.body.author,
                                Price: req.body.price,
                                Image: req.body.image,
                            }, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.post('/cart', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartDB = new pgdbcart_js_1.PGCartTable();
                        return [4 /*yield*/, cartDB.Insert({
                                Quantity: req.body.quantity,
                                BookId: req.body.bookId,
                            }, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.post('/order', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartDB = new pgdbcart_js_1.PGCartTable();
                        return [4 /*yield*/, cartDB.InsertOrder({
                                BookNo: req.body.bookNo,
                                QuantityNo: req.body.quantityNo,
                                FirstName: req.body.firstName,
                                LastName: req.body.lastName,
                                Email: req.body.email,
                            }, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.get('/books', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var bookDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookDB = new pgdbbook_js_1.PGBookTable();
                        if (!(typeof req.query.title === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, bookDB.SelectByName(req.query.title, res)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, bookDB.Select(res)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        service.get('/cart', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartDB = new pgdbcart_js_1.PGCartTable();
                        return [4 /*yield*/, cartDB.Select(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.get('/books/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var bookDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookDB = new pgdbbook_js_1.PGBookTable();
                        return [4 /*yield*/, bookDB.SelectById(parseInt(req.params.id), res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.patch('/books/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var bookDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookDB = new pgdbbook_js_1.PGBookTable();
                        return [4 /*yield*/, bookDB.Patch({
                                Id: parseInt(req.params.id),
                                Title: req.body.title,
                                Author: req.body.author,
                                Price: req.body.price,
                                Image: req.body.image,
                            }, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.delete('/books/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var bookDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookDB = new pgdbbook_js_1.PGBookTable();
                        return [4 /*yield*/, bookDB.Delete(parseInt(req.params.id), res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.delete('/cart/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartDB = new pgdbcart_js_1.PGCartTable();
                        return [4 /*yield*/, cartDB.Delete(parseInt(req.params.id), res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        service.listen(this._port, function () { return console.log("Example web service listening at http://localhost:" + _this._port); });
    };
    return WebserviceProcess;
}());
(function () {
    (new WebserviceProcess()).Start();
})();
//# sourceMappingURL=service.js.map