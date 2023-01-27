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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const dropCollections_1 = __importDefault(require("../utils/dropCollections"));
const initMongodb_1 = __importDefault(require("../utils/initMongodb"));
const mongoose_1 = __importDefault(require("mongoose"));
let userData = {
    email: 'abhishek8765@gmail.com',
    fullName: 'abhishek',
    userName: 'abhibhadwal',
    password: 'Abhishek',
};
let userDataWithoutPassword = Object.assign({}, userData);
delete userDataWithoutPassword.password;
let userDataLogin = {
    email: userData.email,
    password: userData.password,
};
describe('Test the root path', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(initMongodb)
        yield initMongodb_1.default.connect();
        yield (0, dropCollections_1.default)(initMongodb_1.default.mongoose.connection);
    }));
    afterAll((done) => {
        mongoose_1.default.disconnect(done);
    });
    test('Create New User', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/signup').send(userData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(userDataWithoutPassword);
    }));
    test('should not signin with exiting email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/signup').send(userData);
        expect(response.statusCode).toBe(409);
        expect(response.body).toMatchObject({ error: 'User Email Already Exist' });
    }));
    test('should not signup with exiting username', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/signup')
            .send(Object.assign(Object.assign({}, userData), { email: 'any_new_email@gmail.com' }));
        expect(response.statusCode).toBe(409);
        console.log('resonse', response.body);
        expect(response.body).toMatchObject({ error: 'User Name Already Exist' });
    }));
    // test('should not signin with exiting username', async () => {
    //     const response = await request(app).post('/signin').send(userData)
    //     expect(response.statusCode).toBe(409)
    //     expect(response._body).toMatchObject({ "error": "User Name Already Exist", })
    // })
    test('Login Api', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(userDataLogin);
        expect(typeof response.body.token).toBe('string');
        expect(response.body.username).toBe(userData.fullName);
        expect(response.statusCode).toBe(200);
    }));
    test('should not login when bad lpasswrod', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send(Object.assign(Object.assign({}, userData), { password: 'BAD_PASSWORD' }));
        expect(response.body.error).toBe('Invalid Password');
    }));
    // todo
    // 1) should not signup user with existing email
    // 2) Should not login when bad lpasswrod
    // 3) should not signup with exiting username
});
// describe("Test the root path", () => {
//     test("It should response the GET method", async () => {
//         const response = await request(app)
//             .get("/")
//         console.log(response.data)
//         console.log(response.statusCode)
//     })
// })
