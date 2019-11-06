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
var db = require('../models');
var jwt = require('jsonwebtoken');
// Defining methods for the userController
module.exports = {
    validateToken: function (req, res, next) {
        var token = req.body.token;
        //if no token found, return response (without going to the next middelware)
        if (!token)
            return res.status(401).send('Access denied. No token provided.');
        try {
            //if can verify the token, set req.user and pass to next middleware
            var decoded = jwt.verify(token, 'my-secret');
            req.user = decoded;
            // console.log(req);
            next();
        }
        catch (err) {
            //if invalid token
            res.status(400).json({ user: null });
        }
    },
    getUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.User.findById(req.user.id).select(['-password', '-_id'])];
                case 1:
                    user = _a.sent();
                    console.log('===== user!!======');
                    console.log(user);
                    return [2 /*return*/, res.json({ user: user })];
            }
        });
    }); },
    register: function (req, res) {
        var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, password = _a.password;
        // ADD VALIDATION
        db.User.findOne({ username: username }, function (err, userMatch) {
            console.log(err, userMatch);
            if (userMatch) {
                return res.json({
                    error: "Sorry, already a user with the username: " + username,
                });
            }
            var newUser = new db.User({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
            });
            newUser.save(function (err, savedUser) {
                if (err)
                    return res.json(err);
                return res.json(savedUser);
            });
        });
    },
    logout: function (req, res) {
        if (req.user) {
            req.session && req.session.destroy(function (err) { return console.log(err); });
            res.clearCookie('connect.sid'); // clean up!
            return res.json({ msg: 'logging you out' });
        }
        else {
            return res.json({ msg: 'no user to log out!' });
        }
    },
    auth: function (req, res, next) {
        console.log(req.body);
        console.log('================');
        next();
    },
    authenticate: function (req, res) {
        console.log('POST to /login');
        db.User.findOne({ username: req.body.username }, function (err, userMatch) {
            console.log(err, userMatch);
            if (err) {
                return res.status(401).send(err);
            }
            if (!userMatch) {
                return res.status(401).send({ message: 'Incorrect username' });
            }
            if (!userMatch.checkPassword(req.body.password)) {
                return res.status(401).send({ message: 'Incorrect password' });
            }
            var userObj = userMatch.toObject();
            console.log("Deleting " + userObj.password);
            delete userObj.password;
            var token = generateAuthToken(userObj._id);
            res.json({ user: userObj, token: token });
        });
    },
};
function generateAuthToken(value) {
    console.log(value);
    var token = jwt.sign({
        id: value,
    }, 'my-secret', { expiresIn: 60 * 120 }); //get the private key from the config file -> environment variable
    return token;
}
