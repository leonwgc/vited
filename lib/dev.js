"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//#region  helper
var getProjectPath = function getProjectPath() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
  return _path["default"].join(_process["default"].cwd(), dir);
};

function exit(error) {
  console.log(_chalk["default"].red(error));

  _process["default"].exit(9);
} //#endregion


var run = function run() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  var publicPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
  var isDev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var port = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 9000;

  var s = _glob["default"].sync("./src/".concat(dir, "/index{.jsx,.js,.ts,.tsx}"));

  if (!s.length) {
    s = _glob["default"].sync("./src/index{.jsx,.js,.ts,.tsx}");

    if (!s.length) {
      exit("can't find entry file");
    }
  }

  var indexHtml = getProjectPath('./index.html');

  if (!_fs["default"].existsSync(indexHtml)) {
    _fs["default"].writeFileSync(indexHtml, (0, _tpl["default"])(s[0]));
  } else {
    var content = _fs["default"].readFileSync(indexHtml, {
      encoding: 'utf-8'
    });

    var $ = _cheerio["default"].load(content);

    $('script[type="module"]').attr('src', s[0]);

    _fs["default"].writeFileSync(indexHtml, $.html());
  }

  var modifyVars = {
    '@primary-color': '#004bcc',
    '@link-color': '#004bcc'
  };
  /**
   * @type {import('vite').UserConfig}
   */

  var config = {
    css: {
      preprocessorOptions: {
        less: {
          relativeUrls: false,
          javascriptEnabled: true,
          modifyVars: modifyVars
        },
        scss: {
          implementation: require('sass')
        }
      }
    },
    define: {
      __dev__: !!isDev
    },
    plugins: [(0, _vitePluginStyleImport["default"])({
      libs: [{
        libraryName: 'antd',
        esModule: true,
        resolveStyle: function resolveStyle(name) {
          return "antd/es/".concat(name, "/style/index");
        }
      }, {
        libraryName: 'zarm',
        esModule: true,
        resolveStyle: function resolveStyle(name) {
          return "zarm/es/".concat(name, "/style/css");
        }
      }]
    })],
    resolve: {
      alias: {
        '~': _path["default"].resolve(__dirname, './src'),
        '@': _path["default"].resolve(__dirname, './src')
      }
    },
    logLevel: 'info'
  };

  if (isDev) {
    config.plugins.unshift((0, _pluginReactRefresh["default"])());
    config.server = {
      port: port,
      host: '0.0.0.0'
    };
  } else {
    config.base = publicPath;
    config.build = {
      outDir: "dist",
      assetsDir: 'assets',
      emptyOutDir: true,
      assetsInlineLimit: 10240,
      rollupOptions: {
        input: {
          index: getProjectPath('./index.html')
        }
      }
    };
  }

  if (isDev) {
    (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var server;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _vite.createServer)(_objectSpread({
                configFile: false,
                root: _process["default"].cwd(),
                envFile: false,
                base: '/'
              }, config));

            case 2:
              server = _context.sent;
              _context.next = 5;
              return server.listen(port);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  } else {
    (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _vite.build)(_objectSpread({
                configFile: false,
                root: _process["default"].cwd(),
                envFile: false,
                mode: 'development'
              }, config));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};

exports.run = run;