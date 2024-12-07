const _0x365fe2 = _0x40d1;
(function (_0x28bba9, _0x5b9670) {
  const _0x1d7384 = _0x40d1,
    _0x11843e = _0x28bba9();
  while (!![]) {
    try {
      const _0x8c1840 =
        -parseInt(_0x1d7384(0x16e)) / 0x1 +
        -parseInt(_0x1d7384(0x188)) / 0x2 +
        (parseInt(_0x1d7384(0x172)) / 0x3) *
          (parseInt(_0x1d7384(0x174)) / 0x4) +
        (-parseInt(_0x1d7384(0x168)) / 0x5) *
          (parseInt(_0x1d7384(0x170)) / 0x6) +
        (-parseInt(_0x1d7384(0x1a9)) / 0x7) *
          (parseInt(_0x1d7384(0x14e)) / 0x8) +
        (parseInt(_0x1d7384(0x148)) / 0x9) *
          (-parseInt(_0x1d7384(0x149)) / 0xa) +
        parseInt(_0x1d7384(0x182)) / 0xb;
      if (_0x8c1840 === _0x5b9670) break;
      else _0x11843e["push"](_0x11843e["shift"]());
    } catch (_0x37784d) {
      _0x11843e["push"](_0x11843e["shift"]());
    }
  }
})(_0x3fdd, 0x543ad);
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-performance.js";
function _0x40d1(_0x1135ed, _0x546093) {
  const _0x3fdd69 = _0x3fdd();
  return (
    (_0x40d1 = function (_0x40d1d1, _0x2a883f) {
      _0x40d1d1 = _0x40d1d1 - 0x147;
      let _0x130140 = _0x3fdd69[_0x40d1d1];
      return _0x130140;
    }),
    _0x40d1(_0x1135ed, _0x546093)
  );
}
import {
  Timestamp,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import * as _0x56e5b5 from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-check.js";
const firebaseConfig = {
    apiKey: _0x365fe2(0x176),
    authDomain: _0x365fe2(0x196),
    projectId: _0x365fe2(0x161),
    storageBucket: _0x365fe2(0x161),
    messagingSenderId: _0x365fe2(0x155),
    appId: _0x365fe2(0x1af),
  },
  app = initializeApp(firebaseConfig),
  appCheckInstance = _0x56e5b5[_0x365fe2(0x180)](app, {
    provider: new _0x56e5b5[_0x365fe2(0x16f)](_0x365fe2(0x15d)),
    isTokenAutoRefreshEnabled: !![],
  }),
  perf = getPerformance(app);
_0x56e5b5[_0x365fe2(0x1ac)](appCheckInstance)
  [_0x365fe2(0x197)]((_0xe37181) => {
    const _0x3521d6 = getFirestore(app);
  })
  [_0x365fe2(0x187)]((_0x5f4322) => {
    const _0x4d177b = _0x365fe2;
    console[_0x4d177b(0x15c)](_0x4d177b(0x18f), _0x5f4322);
  });
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
function listenForChangesBoledo() {
  const _0x5348ec = _0x365fe2,
    _0x40b471 = getFirestore(app);
  function _0x3fb8e6() {
    const _0x3ab903 = _0x40d1,
      _0x130131 = new Date(),
      _0x147634 = _0x130131[_0x3ab903(0x1a6)](),
      _0x462acd = _0x147634 === 0x0 ? -0x6 : 0x1 - _0x147634,
      _0x285d93 = new Date(_0x130131);
    return (
      _0x285d93["setDate"](_0x130131["getDate"]() + _0x462acd),
      _0x285d93[_0x3ab903(0x14c)](0x0, 0x0, 0x0, 0x0),
      _0x285d93
    );
  }
  const _0x1d376c = _0x3fb8e6(),
    _0x3e5255 = new Date(_0x1d376c);
  _0x3e5255[_0x5348ec(0x189)](_0x1d376c[_0x5348ec(0x19e)]() + 0x4),
    _0x3e5255[_0x5348ec(0x14c)](0x17, 0x3b, 0x3b, 0x3e7);
  const _0x9b4363 = Timestamp[_0x5348ec(0x19b)](_0x1d376c),
    _0x1f8c4f = Timestamp[_0x5348ec(0x19b)](_0x3e5255),
    _0x2472ee = {
      Mon: _0x5348ec(0x16d),
      Tue: _0x5348ec(0x18a),
      Wed: _0x5348ec(0x18e),
      Thu: _0x5348ec(0x193),
      Fri: _0x5348ec(0x171),
    },
    _0xcd23ee = new Date();
  if (_0xcd23ee[_0x5348ec(0x1a6)]() === 0x0) {
    console[_0x5348ec(0x1a3)](_0x5348ec(0x17c)),
      Object[_0x5348ec(0x1a8)](_0x2472ee)[_0x5348ec(0x191)]((_0x111b32) => {
        const _0x22df3d = _0x5348ec;
        document["getElementById"](_0x111b32)[_0x22df3d(0x1a5)] = "";
      });
    return;
  }
  const _0x340609 = query(
    collection(_0x40b471, _0x5348ec(0x1ae)),
    where(_0x5348ec(0x18c), ">=", _0x9b4363),
    where(_0x5348ec(0x18c), "<=", _0x1f8c4f),
    where(_0x5348ec(0x15a), "==", _0x5348ec(0x190))
  );
  getDocs(_0x340609)
    [_0x5348ec(0x197)]((_0xc094ba) => {
      const _0x3f0170 = _0x5348ec,
        _0x42d71d = {};
      _0xc094ba["forEach"]((_0x38a9e8) => {
        const _0x3cd223 = _0x40d1,
          _0x11b89b = _0x38a9e8[_0x3cd223(0x15f)](),
          _0x573ae7 = _0x11b89b[_0x3cd223(0x18c)]["toDate"](),
          _0x597963 = [
            _0x3cd223(0x15b),
            _0x3cd223(0x159),
            _0x3cd223(0x17a),
            _0x3cd223(0x17f),
            _0x3cd223(0x18d),
            _0x3cd223(0x165),
            _0x3cd223(0x198),
          ][_0x573ae7[_0x3cd223(0x1a6)]()];
        _0x42d71d[_0x597963] = _0x11b89b["winningNumber"];
      }),
        Object[_0x3f0170(0x19d)](_0x2472ee)[_0x3f0170(0x191)](
          ([_0x3a2393, _0x95ef7b]) => {
            const _0x5314c3 = _0x3f0170,
              _0x32ee57 = document[_0x5314c3(0x19a)](_0x95ef7b);
            (_0x32ee57[_0x5314c3(0x1a5)] = ""),
              _0x42d71d[_0x3a2393]
                ? (_0x32ee57[_0x5314c3(0x153)] = _0x42d71d[_0x3a2393])
                : console[_0x5314c3(0x1a3)](
                    "No\x20Boledo\x20data\x20available\x20for\x20" + _0x3a2393
                  );
          }
        );
    })
    [_0x5348ec(0x187)]((_0x40a89f) => {
      console["error"]("Error\x20fetching\x20Boledo\x20data:", _0x40a89f);
    });
}
function listenForChangesJackpot() {
  const _0x24f733 = _0x365fe2,
    _0xecf017 = getFirestore(app);
  function _0x1b96ee() {
    const _0xb82de3 = _0x40d1,
      _0x456eba = new Date();
    return _0x456eba[_0xb82de3(0x1a6)]() === 0x0;
  }
  const _0x2668bb = collection(_0xecf017, _0x24f733(0x1aa)),
    _0x2ea6b2 = query(
      _0x2668bb,
      where(_0x24f733(0x15a), "==", "active"),
      orderBy(_0x24f733(0x18c), _0x24f733(0x17e)),
      limit(0x1)
    );
  getDocs(_0x2ea6b2)
    [_0x24f733(0x197)]((_0x3b8c63) => {
      const _0x1a7229 = _0x24f733,
        _0x1045d5 = document["getElementById"](_0x1a7229(0x195)),
        _0x35d716 = document[_0x1a7229(0x19a)](_0x1a7229(0x164)),
        _0x1df0ea = document["getElementById"](_0x1a7229(0x173));
      (_0x1045d5[_0x1a7229(0x1a5)] = ""),
        (_0x35d716["innerHTML"] = ""),
        (_0x1df0ea[_0x1a7229(0x1a5)] = "");
      if (_0x3b8c63[_0x1a7229(0x186)]) {
        console["log"]("No\x20active\x20Jackpot\x20data\x20available.");
        _0x1b96ee() && console["log"](_0x1a7229(0x192));
        return;
      }
      const _0x1d4c68 = _0x3b8c63[_0x1a7229(0x16b)][0x0][_0x1a7229(0x15f)](),
        _0x5821ea = _0x1d4c68[_0x1a7229(0x1a0)][_0x1a7229(0x15e)](-0x2),
        _0x43ee30 = _0x1d4c68["firstWinningNumber"][_0x1a7229(0x15e)](
          0x0,
          -0x2
        );
      (_0x1045d5[_0x1a7229(0x1a5)] =
        _0x43ee30 + _0x1a7229(0x150) + _0x5821ea + _0x1a7229(0x17d)),
        (_0x35d716[_0x1a7229(0x153)] = "" + _0x1d4c68[_0x1a7229(0x147)]),
        (_0x1df0ea[_0x1a7229(0x153)] = "" + _0x1d4c68[_0x1a7229(0x1a1)]);
    })
    ["catch"]((_0x157e86) => {
      console["error"]("Error\x20fetching\x20Jackpot\x20data:", _0x157e86);
    });
}
function todayWinningNumber() {
  const _0x50fe9d = _0x365fe2,
    _0x10e261 = getFirestore(app),
    _0x461e80 = collection(_0x10e261, _0x50fe9d(0x1ae)),
    _0x20efc1 = query(
      _0x461e80,
      where("status", "==", _0x50fe9d(0x190)),
      orderBy(_0x50fe9d(0x18c), _0x50fe9d(0x17e)),
      limit(0x1)
    );
  getDocs(_0x20efc1)
    [_0x50fe9d(0x197)]((_0xae4f66) => {
      const _0x3a11c9 = _0x50fe9d,
        _0x568103 = _0xae4f66[_0x3a11c9(0x16b)]["map"]((_0x5447fd) =>
          _0x5447fd[_0x3a11c9(0x15f)]()
        );
      if (_0x568103[_0x3a11c9(0x169)] > 0x0) {
        const _0x44c236 = _0x568103[0x0],
          _0x35fc75 = _0x44c236["date"][_0x3a11c9(0x175)](),
          _0x288fdf = _0x35fc75[_0x3a11c9(0x157)](_0x3a11c9(0x194), {
            year: _0x3a11c9(0x1a4),
            month: _0x3a11c9(0x154),
            day: "numeric",
          });
        (document["getElementById"]("date")["innerText"] = _0x288fdf),
          (document[_0x3a11c9(0x19a)](_0x3a11c9(0x19c))[_0x3a11c9(0x153)] =
            _0x44c236[_0x3a11c9(0x19c)]);
      } else console["log"](_0x3a11c9(0x162));
    })
    [_0x50fe9d(0x187)]((_0x4a0986) => {
      const _0x35cd71 = _0x50fe9d;
      console["error"](_0x35cd71(0x14a), _0x4a0986);
    });
}
function searchWinningNumber() {
  const _0x3cab9d = _0x365fe2,
    _0x25e1b1 = document[_0x3cab9d(0x19a)](_0x3cab9d(0x184))["value"],
    _0x150f22 = document[_0x3cab9d(0x19a)](_0x3cab9d(0x16a))[_0x3cab9d(0x14d)];
  if (!_0x150f22) {
    (document[_0x3cab9d(0x19a)](_0x3cab9d(0x178))["textContent"] =
      _0x3cab9d(0x18b)),
      (document[_0x3cab9d(0x19a)](_0x3cab9d(0x19c))[_0x3cab9d(0x181)] = "");
    return;
  }
  const _0x38a53a = _0x150f22[_0x3cab9d(0x1a7)]("-"),
    _0x40f438 = _0x38a53a[0x1][_0x3cab9d(0x177)](/^0+/, ""),
    _0x276cc6 = _0x38a53a[0x2][_0x3cab9d(0x177)](/^0+/, ""),
    _0x33776e = _0x38a53a[0x0],
    _0x8684ae = _0x40f438 + "/" + _0x276cc6 + "/" + _0x33776e,
    _0x3c7eb2 = new Date(_0x8684ae),
    _0x11a4f2 = Timestamp[_0x3cab9d(0x19b)](_0x3c7eb2),
    _0x9ab302 = getFirestore(app),
    _0x47b4af = collection(_0x9ab302, _0x25e1b1),
    _0x550e8e = query(
      _0x47b4af,
      where("date", "==", _0x11a4f2),
      where(_0x3cab9d(0x15a), "==", _0x3cab9d(0x190))
    );
  getDocs(_0x550e8e)
    [_0x3cab9d(0x197)]((_0xf198a2) => {
      const _0x18ba15 = _0x3cab9d;
      if (_0xf198a2[_0x18ba15(0x186)])
        console[_0x18ba15(0x1a3)](_0x18ba15(0x16c)),
          (document[_0x18ba15(0x19a)]("gameWinningTitle")["textContent"] =
            _0x18ba15(0x156)),
          (document[_0x18ba15(0x19a)](_0x18ba15(0x19c))["textContent"] = "");
      else {
        const _0xe051b8 = _0xf198a2["docs"][0x0]["data"]();
        (document[_0x18ba15(0x19a)](_0x18ba15(0x178))[_0x18ba15(0x181)] =
          _0x25e1b1 + "\x20Winning\x20Numbers"),
          _0x25e1b1 === _0x18ba15(0x1aa)
            ? (document["getElementById"]("winningNumber")["innerHTML"] =
                _0xe051b8[_0x18ba15(0x1a0)] +
                _0x18ba15(0x1ad) +
                _0xe051b8[_0x18ba15(0x147)] +
                _0x18ba15(0x1ad) +
                _0xe051b8[_0x18ba15(0x1a1)])
            : (document[_0x18ba15(0x19a)]("winningNumber")["textContent"] =
                _0xe051b8[_0x18ba15(0x19c)]);
      }
    })
    ["catch"]((_0x416de5) => {
      const _0x470bf4 = _0x3cab9d;
      console["error"](_0x470bf4(0x185), _0x416de5);
    });
}
function _0x3fdd() {
  const _0x2a6e08 = [
    "102yedypq",
    "boledoWinningNumberFri",
    "155019uhHtbr",
    "jackpotThirdWinningNumber",
    "44kdbniV",
    "toDate",
    "AIzaSyBGMnBQeYawhO5UKz5zTX2-IL77ePBiDW0",
    "replace",
    "gameWinningTitle",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22text-align:\x20left;\x22>",
    "Tue",
    "appendChild",
    "Today\x20is\x20Sunday,\x20not\x20displaying\x20Boledo\x20numbers.",
    "</span>",
    "desc",
    "Wed",
    "initializeAppCheck",
    "textContent",
    "30328243qYnJYp",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20scope=\x22col\x22\x20style=\x22text-align:\x20left;\x22>#</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20scope=\x22col\x22\x20style=\x22text-align:\x20left;\x22>Business\x20Name</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20scope=\x22col\x22\x20style=\x22text-align:\x20left;\x22>Address</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20scope=\x22col\x22\x20style=\x22text-align:\x20left;\x22>Community</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20scope=\x22col\x22\x20style=\x22text-align:\x20left;\x22>District</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "gameSelect",
    "Error\x20fetching\x20winning\x20numbers:",
    "empty",
    "catch",
    "1179194IBiAQa",
    "setDate",
    "boledoWinningNumberTue",
    "Select\x20a\x20Date",
    "date",
    "Thu",
    "boledoWinningNumberWed",
    "App\x20Check\x20Token\x20Error:",
    "active",
    "forEach",
    "Today\x20is\x20Sunday.\x20No\x20new\x20data\x20available,\x20clearing\x20display.",
    "boledoWinningNumberThu",
    "en-US",
    "jackpotFirstWinningNumber",
    "bgll-update-portal-35881.firebaseapp.com",
    "then",
    "Sat",
    "businessName",
    "getElementById",
    "fromDate",
    "winningNumber",
    "entries",
    "getDate",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "firstWinningNumber",
    "thirdWinningNumber",
    "community",
    "log",
    "numeric",
    "innerHTML",
    "getDay",
    "split",
    "values",
    "7FusnYr",
    "Jackpot",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22text-align:\x20left;\x22>",
    "getToken",
    "<br>",
    "Boledo",
    "1:830618333350:web:7d6acbd0260d58c8f80467",
    "secondWinningNumber",
    "979083Zebkhe",
    "60DoWRkv",
    "Error\x20getting\x20documents:",
    "district",
    "setHours",
    "value",
    "4752232mVKXDM",
    "insertAdjacentHTML",
    "<span\x20class=\x22underline\x22>",
    "<tr><td\x20colspan=\x225\x22\x20style=\x22text-align:\x20center;\x22>No\x20Agents\x20Found</td></tr>",
    "address",
    "innerText",
    "long",
    "830618333350",
    "No\x20Results\x20Found",
    "toLocaleDateString",
    "Error\x20fetching\x20agent\x20info:",
    "Mon",
    "status",
    "Sun",
    "error",
    "6Le1a5MqAAAAAOOGH-qEa-_5L2B2sJQjWKFp4P9i",
    "slice",
    "data",
    "createElement",
    "bgll-update-portal-35881",
    "No\x20data\x20available",
    "beforeend",
    "jackpotSecondWinningNumber",
    "Fri",
    "agentsTable",
    "map",
    "146085ycKAIb",
    "length",
    "datePicker",
    "docs",
    "No\x20winning\x20numbers\x20found\x20for\x20this\x20game\x20and\x20date",
    "boledoWinningNumberMon",
    "647474BNYEcD",
    "ReCaptchaV3Provider",
  ];
  _0x3fdd = function () {
    return _0x2a6e08;
  };
  return _0x3fdd();
}
function searchAgent(_0x9447a1) {
  const _0x59ac45 = _0x365fe2,
    _0x1e2dea = getFirestore(app),
    _0xa37c70 = collection(_0x1e2dea, "Agents"),
    _0x4fa0d4 = query(
      _0xa37c70,
      where(_0x59ac45(0x14b), "==", _0x9447a1),
      where(_0x59ac45(0x15a), "==", "active")
    );
  getDocs(_0x4fa0d4)
    [_0x59ac45(0x197)]((_0x275c7b) => {
      const _0x448669 = _0x59ac45,
        _0x2e7fcc = _0x275c7b[_0x448669(0x16b)][_0x448669(0x167)](
          (_0x1baff7) => ({ ..._0x1baff7["data"](), id: _0x1baff7["id"] })
        );
      populateAgentsTable(_0x2e7fcc);
    })
    [_0x59ac45(0x187)]((_0x17f431) => {
      const _0xa8ad41 = _0x59ac45;
      console[_0xa8ad41(0x15c)](_0xa8ad41(0x158), _0x17f431);
    });
}
function populateAgentsTable(_0x35c063) {
  const _0x402028 = _0x365fe2,
    _0x4de321 = document[_0x402028(0x19a)](_0x402028(0x166));
  _0x4de321["innerHTML"] = "";
  if (_0x35c063[_0x402028(0x169)] === 0x0) {
    const _0x56ad07 = _0x402028(0x151);
    _0x4de321["insertAdjacentHTML"](_0x402028(0x163), _0x56ad07);
  } else {
    const _0x490d7a = _0x402028(0x183);
    _0x4de321[_0x402028(0x14f)](_0x402028(0x163), _0x490d7a);
    const _0x518f03 = document[_0x402028(0x160)]("tbody");
    _0x35c063[_0x402028(0x191)]((_0x2dbdbf, _0x2079cd) => {
      const _0x2e4f4a = _0x402028,
        _0x50df68 =
          _0x2e4f4a(0x179) +
          (_0x2079cd + 0x1) +
          _0x2e4f4a(0x1ab) +
          _0x2dbdbf[_0x2e4f4a(0x199)] +
          _0x2e4f4a(0x1ab) +
          _0x2dbdbf[_0x2e4f4a(0x152)] +
          _0x2e4f4a(0x1ab) +
          _0x2dbdbf[_0x2e4f4a(0x1a2)] +
          _0x2e4f4a(0x1ab) +
          _0x2dbdbf[_0x2e4f4a(0x14b)] +
          _0x2e4f4a(0x19f);
      _0x518f03[_0x2e4f4a(0x14f)](_0x2e4f4a(0x163), _0x50df68);
    }),
      _0x4de321[_0x402028(0x17b)](_0x518f03);
  }
}
export {
  todayWinningNumber,
  searchWinningNumber,
  searchAgent,
  listenForChangesBoledo,
  listenForChangesJackpot,
};
