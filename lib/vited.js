"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _process = _interopRequireDefault(require("process"));

var _chalk = _interopRequireDefault(require("chalk"));

var _glob = _interopRequireDefault(require("glob"));

var _vite = require("vite");

var _pluginReactRefresh = _interopRequireDefault(require("@vitejs/plugin-react-refresh"));

var _vitePluginStyleImport = _interopRequireDefault(require("vite-plugin-style-import"));

var _tpl = _interopRequireDefault(require("./tpl"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
/* eslint-disable */


//#region  helper
var getProjectPath = function getProjectPath(dir) {
  if (dir === void 0) {
    dir = './';
  }

  return (0, _vite.normalizePath)(_path.default.join(_process.default.cwd(), dir));
};

function exit(error) {
  console.log(_chalk.default.red(error));

  _process.default.exit(9);
} //#endregion


var defaultConfig = {
  configFile: false,
  envFile: false,
  root: _process.default.cwd(),
  base: '/',
  plugins: [(0, _vitePluginStyleImport.default)({
    libs: [{
      libraryName: 'antd',
      esModule: true,
      resolveStyle: function resolveStyle(name) {
        return "antd/es/" + name + "/style/index";
      }
    }, {
      libraryName: 'zarm',
      esModule: true,
      resolveStyle: function resolveStyle(name) {
        return "zarm/es/" + name + "/style/css";
      }
    }]
  })],
  resolve: {
    alias: {
      '~': getProjectPath('./src'),
      '@': getProjectPath('./src')
    }
  }
};
/** run vite with config */

var run = function run(isDev, options) {
  var entries = _glob.default.sync("./src/index{.jsx,.js,.ts,.tsx}");

  if (!entries.length) {
    exit("No entry file found : " + getProjectPath('./src/index'));
  }

  var entry = entries[0];
  var indexHtml = getProjectPath('./index.html');

  if (!_fs.default.existsSync(indexHtml)) {
    _fs.default.writeFileSync(indexHtml, (0, _tpl.default)(entry));

    console.log(_chalk.default.green('index.html not exist, created one'));
  } else {
    var content = _fs.default.readFileSync(indexHtml, {
      encoding: 'utf-8'
    });

    var $ = _cheerio.default.load(content);

    $('script[type="module"]').attr('src', entry);

    _fs.default.writeFileSync(indexHtml, $.html());
  }

  var config = __assign(__assign({}, defaultConfig), {
    configFile: false,
    envFile: false
  });

  var _a = options.plugins,
      plugins = _a === void 0 ? [] : _a,
      _b = options.server,
      server = _b === void 0 ? {} : _b,
      _c = options.build,
      build = _c === void 0 ? {} : _c;
  config.plugins = config.plugins.concat(plugins);

  if (isDev) {
    config.plugins.unshift((0, _pluginReactRefresh.default)());
    config.server = __assign({
      port: 3000,
      host: '0.0.0.0'
    }, server);
  } else {
    config.build = __assign({
      emptyOutDir: true,
      assetsInlineLimit: 10240
    }, build);
  }

  if (isDev) {
    var port_1 = config.server.port || 3000;

    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , (0, _vite.createServer)(config)];

            case 1:
              server = _a.sent();
              return [4
              /*yield*/
              , server.listen(port_1)];

            case 2:
              _a.sent();

              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  } else {
    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , (0, _vite.build)(config)];

            case 1:
              _a.sent();

              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }
};

exports.run = run;