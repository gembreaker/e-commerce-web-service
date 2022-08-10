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
var path_1 = __importDefault(require("path"));
var axios_1 = __importDefault(require("axios"));
var port = 80;
var server = express_1.default();
var dirname = __dirname;
// for parsing application/json
server.use(express_1.default.json());
// for parsing application/x-www-form-urlencoded
server.use(express_1.default.urlencoded({ extended: true }));
dirname = path_1.default.join(dirname, '..');
server.use(express_1.default.static(path_1.default.join(dirname, '/public')));
server.set('view engine', 'ejs');
server.set('views', path_1.default.join(dirname, '/views'));
server.post('/addbook', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var containerName, serviceResponse, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                containerName = "webservice";
                return [4 /*yield*/, axios_1.default.post("http://" + containerName + ":1339/books", {
                        title: req.body["title-textbox"],
                        author: req.body["author-textbox"],
                        price: req.body["price-textbox"],
                        image: req.body["image"],
                    })];
            case 1:
                serviceResponse = _b.sent();
                console.log("Service response = " + serviceResponse.status);
                res.redirect('thanks.html');
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                console.log(Error);
                res.status(403).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.post('/addcart', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var containerName, serviceResponse, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                containerName = "webservice";
                return [4 /*yield*/, axios_1.default.post("http://" + containerName + ":1339/cart", {
                        quantity: req.body["quantity-textbox"],
                        bookId: req.body["bookId"],
                    })];
            case 1:
                serviceResponse = _b.sent();
                console.log("Service response = " + serviceResponse.status);
                res.redirect('thanks.html');
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                console.log(Error);
                res.status(403).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.post('/addorder', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var containerName, serviceResponse, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                containerName = "webservice";
                return [4 /*yield*/, axios_1.default.post("http://" + containerName + ":1339/order", {
                        bookNo: req.body["bookNo"],
                        quantityNo: req.body["quantityNo"],
                        firstName: req.body["firstName"],
                        lastName: req.body["lastName"],
                        email: req.body["email"],
                    })];
            case 1:
                serviceResponse = _b.sent();
                console.log("Service response = " + serviceResponse.status);
                res.redirect('thanks.html');
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                console.log(Error);
                res.status(403).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.get('/readbooks', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var containerName, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Get books");
                containerName = "webservice";
                return [4 /*yield*/, axios_1.default.get("http://" + containerName + ":1339/books")];
            case 1:
                response = _a.sent();
                res.render('displayallbooks', { books: response.data });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(Error);
                res.status(403).send({});
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.get('/readcart', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var containerName, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Get cart");
                containerName = "webservice";
                return [4 /*yield*/, axios_1.default.get("http://" + containerName + ":1339/cart")];
            case 1:
                response = _a.sent();
                res.render('displayallcart', { cart: response.data });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(Error);
                res.status(403).send({});
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.listen(port, function () { return console.log("Example web server listening at http://localhost:" + port); });
//# sourceMappingURL=server.js.map