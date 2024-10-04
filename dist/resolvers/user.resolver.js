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
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../helpers/generate.helper");
exports.resolversUser = {
    Query: {
        getUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { token } = args;
                const user = yield user_model_1.default.findOne({
                    token: token,
                    deleted: false
                });
                if (user) {
                    return {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        token: user.token,
                        code: 200,
                        message: "Lấy thông tin thành công!"
                    };
                }
                else {
                    return {
                        code: 400,
                        message: "token khong hop le"
                    };
                }
            }
            catch (error) {
                return {
                    code: 400,
                    message: "Id không đúng định dạng!"
                };
            }
        })
    },
    Mutation: {
        register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const exitstUser = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (exitstUser) {
                return {
                    code: 400,
                    message: "Email da ton tai"
                };
            }
            const userData = {
                fullName: user.fullName,
                email: user.email,
                password: (0, md5_1.default)(user.password),
                token: (0, generate_helper_1.generateRandomString)(30)
            };
            const newUser = new user_model_1.default(userData);
            yield newUser.save();
            return {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                token: newUser.token,
                code: 200,
                message: "Đăng ký thành công!"
            };
        }),
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { user } = args;
                const email = user.email;
                const password = (0, md5_1.default)(user.password);
                const existUser = yield user_model_1.default.findOne({
                    email: email,
                    deleted: false
                });
                if (!existUser) {
                    return {
                        code: 400,
                        message: "Không tồn tại email trong hệ thống"
                    };
                }
                if (existUser.password !== password) {
                    return {
                        code: 400,
                        message: "sai mat khau"
                    };
                }
                return {
                    code: 200,
                    message: "dang nhap thanh cong",
                    email: existUser.email,
                    token: existUser.token,
                    fullName: existUser.fullName,
                    id: existUser.id
                };
            }
            catch (e) {
                return {
                    code: 400,
                    message: "not found",
                };
            }
        })
    }
};
