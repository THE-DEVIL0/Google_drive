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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("./constants/env"));
const errorhandler_1 = __importDefault(require("./middlewares/errorhandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: (0, env_1.default)("APP_ORIGIN"),
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.set('view engine', 'ejs');
app.set("views", path_1.default.join(__dirname, "../../backend/src/views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../public")));
app.use('/user', user_routes_1.default);
app.use('/', index_routes_1.default);
app.use(errorhandler_1.default);
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
});
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server is running on Port 3000");
    yield (0, db_1.default)();
}));
