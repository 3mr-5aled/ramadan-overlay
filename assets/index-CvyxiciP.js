(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function ku(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ql = { exports: {} },
  Io = {},
  Yl = { exports: {} },
  G = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zr = Symbol.for("react.element"),
  Cu = Symbol.for("react.portal"),
  bu = Symbol.for("react.fragment"),
  zu = Symbol.for("react.strict_mode"),
  Tu = Symbol.for("react.profiler"),
  Eu = Symbol.for("react.provider"),
  Mu = Symbol.for("react.context"),
  Nu = Symbol.for("react.forward_ref"),
  ju = Symbol.for("react.suspense"),
  Au = Symbol.for("react.memo"),
  Lu = Symbol.for("react.lazy"),
  z1 = Symbol.iterator;
function Pu(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (z1 && e[z1]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Kl = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Zl = Object.assign,
  Xl = {};
function An(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Xl),
    (this.updater = n || Kl));
}
An.prototype.isReactComponent = {};
An.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
An.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Jl() {}
Jl.prototype = An.prototype;
function za(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Xl),
    (this.updater = n || Kl));
}
var Ta = (za.prototype = new Jl());
Ta.constructor = za;
Zl(Ta, An.prototype);
Ta.isPureReactComponent = !0;
var T1 = Array.isArray,
  ql = Object.prototype.hasOwnProperty,
  Ea = { current: null },
  es = { key: !0, ref: !0, __self: !0, __source: !0 };
function ts(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      ql.call(t, r) && !es.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
    o.children = c;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: zr,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: Ea.current,
  };
}
function _u(e, t) {
  return {
    $$typeof: zr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ma(e) {
  return typeof e == "object" && e !== null && e.$$typeof === zr;
}
function Du(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var E1 = /\/+/g;
function qo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Du("" + e.key)
    : t.toString(36);
}
function Xr(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (i) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case zr:
          case Cu:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (o = o(a)),
      (e = r === "" ? "." + qo(a, 0) : r),
      T1(o)
        ? ((n = ""),
          e != null && (n = e.replace(E1, "$&/") + "/"),
          Xr(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Ma(o) &&
            (o = _u(
              o,
              n +
                (!o.key || (a && a.key === o.key)
                  ? ""
                  : ("" + o.key).replace(E1, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), T1(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var c = r + qo(i, l);
      a += Xr(i, t, n, c, o);
    }
  else if (((c = Pu(e)), typeof c == "function"))
    for (e = c.call(e), l = 0; !(i = e.next()).done;)
      ((i = i.value), (c = r + qo(i, l++)), (a += Xr(i, t, n, c, o)));
  else if (i === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      )
    );
  return a;
}
function jr(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Xr(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function Iu(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ee = { current: null },
  Jr = { transition: null },
  Ru = {
    ReactCurrentDispatcher: Ee,
    ReactCurrentBatchConfig: Jr,
    ReactCurrentOwner: Ea,
  };
function ns() {
  throw Error("act(...) is not supported in production builds of React.");
}
G.Children = {
  map: jr,
  forEach: function (e, t, n) {
    jr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      jr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      jr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ma(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
G.Component = An;
G.Fragment = bu;
G.Profiler = Tu;
G.PureComponent = za;
G.StrictMode = zu;
G.Suspense = ju;
G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ru;
G.act = ns;
G.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Zl({}, e.props),
    o = e.key,
    i = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (a = Ea.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (c in t)
      ql.call(t, c) &&
        !es.hasOwnProperty(c) &&
        (r[c] = t[c] === void 0 && l !== void 0 ? l[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    l = Array(c);
    for (var u = 0; u < c; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: zr, type: e.type, key: o, ref: i, props: r, _owner: a };
};
G.createContext = function (e) {
  return (
    (e = {
      $$typeof: Mu,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Eu, _context: e }),
    (e.Consumer = e)
  );
};
G.createElement = ts;
G.createFactory = function (e) {
  var t = ts.bind(null, e);
  return ((t.type = e), t);
};
G.createRef = function () {
  return { current: null };
};
G.forwardRef = function (e) {
  return { $$typeof: Nu, render: e };
};
G.isValidElement = Ma;
G.lazy = function (e) {
  return { $$typeof: Lu, _payload: { _status: -1, _result: e }, _init: Iu };
};
G.memo = function (e, t) {
  return { $$typeof: Au, type: e, compare: t === void 0 ? null : t };
};
G.startTransition = function (e) {
  var t = Jr.transition;
  Jr.transition = {};
  try {
    e();
  } finally {
    Jr.transition = t;
  }
};
G.unstable_act = ns;
G.useCallback = function (e, t) {
  return Ee.current.useCallback(e, t);
};
G.useContext = function (e) {
  return Ee.current.useContext(e);
};
G.useDebugValue = function () {};
G.useDeferredValue = function (e) {
  return Ee.current.useDeferredValue(e);
};
G.useEffect = function (e, t) {
  return Ee.current.useEffect(e, t);
};
G.useId = function () {
  return Ee.current.useId();
};
G.useImperativeHandle = function (e, t, n) {
  return Ee.current.useImperativeHandle(e, t, n);
};
G.useInsertionEffect = function (e, t) {
  return Ee.current.useInsertionEffect(e, t);
};
G.useLayoutEffect = function (e, t) {
  return Ee.current.useLayoutEffect(e, t);
};
G.useMemo = function (e, t) {
  return Ee.current.useMemo(e, t);
};
G.useReducer = function (e, t, n) {
  return Ee.current.useReducer(e, t, n);
};
G.useRef = function (e) {
  return Ee.current.useRef(e);
};
G.useState = function (e) {
  return Ee.current.useState(e);
};
G.useSyncExternalStore = function (e, t, n) {
  return Ee.current.useSyncExternalStore(e, t, n);
};
G.useTransition = function () {
  return Ee.current.useTransition();
};
G.version = "18.3.1";
Yl.exports = G;
var X = Yl.exports;
const Ou = ku(X);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bu = X,
  Fu = Symbol.for("react.element"),
  $u = Symbol.for("react.fragment"),
  Vu = Object.prototype.hasOwnProperty,
  Hu = Bu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Uu = { key: !0, ref: !0, __self: !0, __source: !0 };
function rs(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (a = t.ref));
  for (r in t) Vu.call(t, r) && !Uu.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Fu,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: Hu.current,
  };
}
Io.Fragment = $u;
Io.jsx = rs;
Io.jsxs = rs;
Ql.exports = Io;
var s = Ql.exports,
  Ei = {},
  os = { exports: {} },
  Be = {},
  is = { exports: {} },
  as = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(A, O) {
    var y = A.length;
    A.push(O);
    e: for (; 0 < y;) {
      var g = (y - 1) >>> 1,
        _ = A[g];
      if (0 < o(_, O)) ((A[g] = O), (A[y] = _), (y = g));
      else break e;
    }
  }
  function n(A) {
    return A.length === 0 ? null : A[0];
  }
  function r(A) {
    if (A.length === 0) return null;
    var O = A[0],
      y = A.pop();
    if (y !== O) {
      A[0] = y;
      e: for (var g = 0, _ = A.length, V = _ >>> 1; g < V;) {
        var U = 2 * (g + 1) - 1,
          D = A[U],
          B = U + 1,
          R = A[B];
        if (0 > o(D, y))
          B < _ && 0 > o(R, D)
            ? ((A[g] = R), (A[B] = y), (g = B))
            : ((A[g] = D), (A[U] = y), (g = U));
        else if (B < _ && 0 > o(R, y)) ((A[g] = R), (A[B] = y), (g = B));
        else break e;
      }
    }
    return O;
  }
  function o(A, O) {
    var y = A.sortIndex - O.sortIndex;
    return y !== 0 ? y : A.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var a = Date,
      l = a.now();
    e.unstable_now = function () {
      return a.now() - l;
    };
  }
  var c = [],
    u = [],
    v = 1,
    m = null,
    p = 3,
    w = !1,
    C = !1,
    S = !1,
    z = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(A) {
    for (var O = n(u); O !== null;) {
      if (O.callback === null) r(u);
      else if (O.startTime <= A)
        (r(u), (O.sortIndex = O.expirationTime), t(c, O));
      else break;
      O = n(u);
    }
  }
  function x(A) {
    if (((S = !1), h(A), !C))
      if (n(c) !== null) ((C = !0), Z(k));
      else {
        var O = n(u);
        O !== null && oe(x, O.startTime - A);
      }
  }
  function k(A, O) {
    ((C = !1), S && ((S = !1), d(b), (b = -1)), (w = !0));
    var y = p;
    try {
      for (
        h(O), m = n(c);
        m !== null && (!(m.expirationTime > O) || (A && !L()));
      ) {
        var g = m.callback;
        if (typeof g == "function") {
          ((m.callback = null), (p = m.priorityLevel));
          var _ = g(m.expirationTime <= O);
          ((O = e.unstable_now()),
            typeof _ == "function" ? (m.callback = _) : m === n(c) && r(c),
            h(O));
        } else r(c);
        m = n(c);
      }
      if (m !== null) var V = !0;
      else {
        var U = n(u);
        (U !== null && oe(x, U.startTime - O), (V = !1));
      }
      return V;
    } finally {
      ((m = null), (p = y), (w = !1));
    }
  }
  var T = !1,
    E = null,
    b = -1,
    P = 5,
    M = -1;
  function L() {
    return !(e.unstable_now() - M < P);
  }
  function $() {
    if (E !== null) {
      var A = e.unstable_now();
      M = A;
      var O = !0;
      try {
        O = E(!0, A);
      } finally {
        O ? j() : ((T = !1), (E = null));
      }
    } else T = !1;
  }
  var j;
  if (typeof f == "function")
    j = function () {
      f($);
    };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(),
      F = W.port2;
    ((W.port1.onmessage = $),
      (j = function () {
        F.postMessage(null);
      }));
  } else
    j = function () {
      z($, 0);
    };
  function Z(A) {
    ((E = A), T || ((T = !0), j()));
  }
  function oe(A, O) {
    b = z(function () {
      A(e.unstable_now());
    }, O);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (A) {
      A.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      C || w || ((C = !0), Z(k));
    }),
    (e.unstable_forceFrameRate = function (A) {
      0 > A || 125 < A
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (P = 0 < A ? Math.floor(1e3 / A) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(c);
    }),
    (e.unstable_next = function (A) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = p;
      }
      var y = p;
      p = O;
      try {
        return A();
      } finally {
        p = y;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (A, O) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var y = p;
      p = A;
      try {
        return O();
      } finally {
        p = y;
      }
    }),
    (e.unstable_scheduleCallback = function (A, O, y) {
      var g = e.unstable_now();
      switch (
        (typeof y == "object" && y !== null
          ? ((y = y.delay), (y = typeof y == "number" && 0 < y ? g + y : g))
          : (y = g),
        A)
      ) {
        case 1:
          var _ = -1;
          break;
        case 2:
          _ = 250;
          break;
        case 5:
          _ = 1073741823;
          break;
        case 4:
          _ = 1e4;
          break;
        default:
          _ = 5e3;
      }
      return (
        (_ = y + _),
        (A = {
          id: v++,
          callback: O,
          priorityLevel: A,
          startTime: y,
          expirationTime: _,
          sortIndex: -1,
        }),
        y > g
          ? ((A.sortIndex = y),
            t(u, A),
            n(c) === null &&
              A === n(u) &&
              (S ? (d(b), (b = -1)) : (S = !0), oe(x, y - g)))
          : ((A.sortIndex = _), t(c, A), C || w || ((C = !0), Z(k))),
        A
      );
    }),
    (e.unstable_shouldYield = L),
    (e.unstable_wrapCallback = function (A) {
      var O = p;
      return function () {
        var y = p;
        p = O;
        try {
          return A.apply(this, arguments);
        } finally {
          p = y;
        }
      };
    }));
})(as);
is.exports = as;
var Wu = is.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gu = X,
  Oe = Wu;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var ls = new Set(),
  ar = {};
function qt(e, t) {
  (bn(e, t), bn(e + "Capture", t));
}
function bn(e, t) {
  for (ar[e] = t, e = 0; e < t.length; e++) ls.add(t[e]);
}
var ht = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Mi = Object.prototype.hasOwnProperty,
  Qu =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  M1 = {},
  N1 = {};
function Yu(e) {
  return Mi.call(N1, e)
    ? !0
    : Mi.call(M1, e)
      ? !1
      : Qu.test(e)
        ? (N1[e] = !0)
        : ((M1[e] = !0), !1);
}
function Ku(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Zu(e, t, n, r) {
  if (t === null || typeof t > "u" || Ku(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Me(e, t, n, r, o, i, a) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = a));
}
var xe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    xe[e] = new Me(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  xe[t] = new Me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  xe[e] = new Me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  xe[e] = new Me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    xe[e] = new Me(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  xe[e] = new Me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  xe[e] = new Me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  xe[e] = new Me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  xe[e] = new Me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Na = /[\-:]([a-z])/g;
function ja(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Na, ja);
    xe[t] = new Me(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Na, ja);
    xe[t] = new Me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Na, ja);
  xe[t] = new Me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  xe[e] = new Me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xe.xlinkHref = new Me(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  xe[e] = new Me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Aa(e, t, n, r) {
  var o = xe.hasOwnProperty(t) ? xe[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zu(t, n, o, r) && (n = null),
    r || o === null
      ? Yu(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
        ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var wt = Gu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Ar = Symbol.for("react.element"),
  on = Symbol.for("react.portal"),
  an = Symbol.for("react.fragment"),
  La = Symbol.for("react.strict_mode"),
  Ni = Symbol.for("react.profiler"),
  ss = Symbol.for("react.provider"),
  us = Symbol.for("react.context"),
  Pa = Symbol.for("react.forward_ref"),
  ji = Symbol.for("react.suspense"),
  Ai = Symbol.for("react.suspense_list"),
  _a = Symbol.for("react.memo"),
  St = Symbol.for("react.lazy"),
  cs = Symbol.for("react.offscreen"),
  j1 = Symbol.iterator;
function Dn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (j1 && e[j1]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var le = Object.assign,
  ei;
function Qn(e) {
  if (ei === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ei = (t && t[1]) || "";
    }
  return (
    `
` +
    ei +
    e
  );
}
var ti = !1;
function ni(e, t) {
  if (!e || ti) return "";
  ti = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          a = o.length - 1,
          l = i.length - 1;
        1 <= a && 0 <= l && o[a] !== i[l];
      )
        l--;
      for (; 1 <= a && 0 <= l; a--, l--)
        if (o[a] !== i[l]) {
          if (a !== 1 || l !== 1)
            do
              if ((a--, l--, 0 > l || o[a] !== i[l])) {
                var c =
                  `
` + o[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    c.includes("<anonymous>") &&
                    (c = c.replace("<anonymous>", e.displayName)),
                  c
                );
              }
            while (1 <= a && 0 <= l);
          break;
        }
    }
  } finally {
    ((ti = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Qn(e) : "";
}
function Xu(e) {
  switch (e.tag) {
    case 5:
      return Qn(e.type);
    case 16:
      return Qn("Lazy");
    case 13:
      return Qn("Suspense");
    case 19:
      return Qn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = ni(e.type, !1)), e);
    case 11:
      return ((e = ni(e.type.render, !1)), e);
    case 1:
      return ((e = ni(e.type, !0)), e);
    default:
      return "";
  }
}
function Li(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case an:
      return "Fragment";
    case on:
      return "Portal";
    case Ni:
      return "Profiler";
    case La:
      return "StrictMode";
    case ji:
      return "Suspense";
    case Ai:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case us:
        return (e.displayName || "Context") + ".Consumer";
      case ss:
        return (e._context.displayName || "Context") + ".Provider";
      case Pa:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case _a:
        return (
          (t = e.displayName || null),
          t !== null ? t : Li(e.type) || "Memo"
        );
      case St:
        ((t = e._payload), (e = e._init));
        try {
          return Li(e(t));
        } catch {}
    }
  return null;
}
function Ju(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Li(t);
    case 8:
      return t === La ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Dt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ds(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function qu(e) {
  var t = ds(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (a) {
          ((r = "" + a), i.call(this, a));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Lr(e) {
  e._valueTracker || (e._valueTracker = qu(e));
}
function fs(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = ds(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function co(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Pi(e, t) {
  var n = t.checked;
  return le({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function A1(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Dt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function ps(e, t) {
  ((t = t.checked), t != null && Aa(e, "checked", t, !1));
}
function _i(e, t) {
  ps(e, t);
  var n = Dt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Di(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Di(e, t.type, Dt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function L1(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(
      (r !== "submit" && r !== "reset") ||
      (t.value !== void 0 && t.value !== null)
    ))
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Di(e, t, n) {
  (t !== "number" || co(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Yn = Array.isArray;
function gn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Dt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return le({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function P1(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Yn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Dt(n) };
}
function ms(e, t) {
  var n = Dt(t.value),
    r = Dt(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function _1(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function hs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ri(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? hs(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Pr,
  vs = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Pr = Pr || document.createElement("div"),
          Pr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Pr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function lr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Xn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  ec = ["Webkit", "ms", "Moz", "O"];
Object.keys(Xn).forEach(function (e) {
  ec.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Xn[t] = Xn[e]));
  });
});
function gs(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Xn.hasOwnProperty(e) && Xn[e])
      ? ("" + t).trim()
      : t + "px";
}
function ys(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = gs(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var tc = le(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Oi(e, t) {
  if (t) {
    if (tc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function Bi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Fi = null;
function Da(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var $i = null,
  yn = null,
  wn = null;
function D1(e) {
  if ((e = Mr(e))) {
    if (typeof $i != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = $o(t)), $i(e.stateNode, e.type, t));
  }
}
function ws(e) {
  yn ? (wn ? wn.push(e) : (wn = [e])) : (yn = e);
}
function xs() {
  if (yn) {
    var e = yn,
      t = wn;
    if (((wn = yn = null), D1(e), t)) for (e = 0; e < t.length; e++) D1(t[e]);
  }
}
function Ss(e, t) {
  return e(t);
}
function ks() {}
var ri = !1;
function Cs(e, t, n) {
  if (ri) return e(t, n);
  ri = !0;
  try {
    return Ss(e, t, n);
  } finally {
    ((ri = !1), (yn !== null || wn !== null) && (ks(), xs()));
  }
}
function sr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = $o(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var Vi = !1;
if (ht)
  try {
    var In = {};
    (Object.defineProperty(In, "passive", {
      get: function () {
        Vi = !0;
      },
    }),
      window.addEventListener("test", In, In),
      window.removeEventListener("test", In, In));
  } catch {
    Vi = !1;
  }
function nc(e, t, n, r, o, i, a, l, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (v) {
    this.onError(v);
  }
}
var Jn = !1,
  fo = null,
  po = !1,
  Hi = null,
  rc = {
    onError: function (e) {
      ((Jn = !0), (fo = e));
    },
  };
function oc(e, t, n, r, o, i, a, l, c) {
  ((Jn = !1), (fo = null), nc.apply(rc, arguments));
}
function ic(e, t, n, r, o, i, a, l, c) {
  if ((oc.apply(this, arguments), Jn)) {
    if (Jn) {
      var u = fo;
      ((Jn = !1), (fo = null));
    } else throw Error(N(198));
    po || ((po = !0), (Hi = u));
  }
}
function en(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return;) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function bs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function I1(e) {
  if (en(e) !== e) throw Error(N(188));
}
function ac(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = en(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ;) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i;) {
        if (i === n) return (I1(o), e);
        if (i === r) return (I1(o), t);
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) ((n = o), (r = i));
    else {
      for (var a = !1, l = o.child; l;) {
        if (l === n) {
          ((a = !0), (n = o), (r = i));
          break;
        }
        if (l === r) {
          ((a = !0), (r = o), (n = i));
          break;
        }
        l = l.sibling;
      }
      if (!a) {
        for (l = i.child; l;) {
          if (l === n) {
            ((a = !0), (n = i), (r = o));
            break;
          }
          if (l === r) {
            ((a = !0), (r = i), (n = o));
            break;
          }
          l = l.sibling;
        }
        if (!a) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function zs(e) {
  return ((e = ac(e)), e !== null ? Ts(e) : null);
}
function Ts(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = Ts(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Es = Oe.unstable_scheduleCallback,
  R1 = Oe.unstable_cancelCallback,
  lc = Oe.unstable_shouldYield,
  sc = Oe.unstable_requestPaint,
  de = Oe.unstable_now,
  uc = Oe.unstable_getCurrentPriorityLevel,
  Ia = Oe.unstable_ImmediatePriority,
  Ms = Oe.unstable_UserBlockingPriority,
  mo = Oe.unstable_NormalPriority,
  cc = Oe.unstable_LowPriority,
  Ns = Oe.unstable_IdlePriority,
  Ro = null,
  lt = null;
function dc(e) {
  if (lt && typeof lt.onCommitFiberRoot == "function")
    try {
      lt.onCommitFiberRoot(Ro, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : mc,
  fc = Math.log,
  pc = Math.LN2;
function mc(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((fc(e) / pc) | 0)) | 0);
}
var _r = 64,
  Dr = 4194304;
function Kn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ho(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var l = a & ~o;
    l !== 0 ? (r = Kn(l)) : ((i &= a), i !== 0 && (r = Kn(i)));
  } else ((a = n & ~o), a !== 0 ? (r = Kn(a)) : i !== 0 && (r = Kn(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t;)
      ((n = 31 - et(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
  return r;
}
function hc(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function vc(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;
  ) {
    var a = 31 - et(i),
      l = 1 << a,
      c = o[a];
    (c === -1
      ? (!(l & n) || l & r) && (o[a] = hc(l, t))
      : c <= t && (e.expiredLanes |= l),
      (i &= ~l));
  }
}
function Ui(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function js() {
  var e = _r;
  return ((_r <<= 1), !(_r & 4194240) && (_r = 64), e);
}
function oi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Tr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - et(t)),
    (e[t] = n));
}
function gc(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var o = 31 - et(n),
      i = 1 << o;
    ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i));
  }
}
function Ra(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n;) {
    var r = 31 - et(n),
      o = 1 << r;
    ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
  }
}
var J = 0;
function As(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Ls,
  Oa,
  Ps,
  _s,
  Ds,
  Wi = !1,
  Ir = [],
  Et = null,
  Mt = null,
  Nt = null,
  ur = new Map(),
  cr = new Map(),
  Ct = [],
  yc =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function O1(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Et = null;
      break;
    case "dragenter":
    case "dragleave":
      Mt = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      ur.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      cr.delete(t.pointerId);
  }
}
function Rn(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = Mr(t)), t !== null && Oa(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function wc(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return ((Et = Rn(Et, e, t, n, r, o)), !0);
    case "dragenter":
      return ((Mt = Rn(Mt, e, t, n, r, o)), !0);
    case "mouseover":
      return ((Nt = Rn(Nt, e, t, n, r, o)), !0);
    case "pointerover":
      var i = o.pointerId;
      return (ur.set(i, Rn(ur.get(i) || null, e, t, n, r, o)), !0);
    case "gotpointercapture":
      return (
        (i = o.pointerId),
        cr.set(i, Rn(cr.get(i) || null, e, t, n, r, o)),
        !0
      );
  }
  return !1;
}
function Is(e) {
  var t = Ht(e.target);
  if (t !== null) {
    var n = en(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = bs(n)), t !== null)) {
          ((e.blockedOn = t),
            Ds(e.priority, function () {
              Ps(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function qr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = Gi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Fi = r), n.target.dispatchEvent(r), (Fi = null));
    } else return ((t = Mr(n)), t !== null && Oa(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function B1(e, t, n) {
  qr(e) && n.delete(t);
}
function xc() {
  ((Wi = !1),
    Et !== null && qr(Et) && (Et = null),
    Mt !== null && qr(Mt) && (Mt = null),
    Nt !== null && qr(Nt) && (Nt = null),
    ur.forEach(B1),
    cr.forEach(B1));
}
function On(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Wi ||
      ((Wi = !0),
      Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, xc)));
}
function dr(e) {
  function t(o) {
    return On(o, e);
  }
  if (0 < Ir.length) {
    On(Ir[0], e);
    for (var n = 1; n < Ir.length; n++) {
      var r = Ir[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Et !== null && On(Et, e),
      Mt !== null && On(Mt, e),
      Nt !== null && On(Nt, e),
      ur.forEach(t),
      cr.forEach(t),
      n = 0;
    n < Ct.length;
    n++
  )
    ((r = Ct[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Ct.length && ((n = Ct[0]), n.blockedOn === null);)
    (Is(n), n.blockedOn === null && Ct.shift());
}
var xn = wt.ReactCurrentBatchConfig,
  vo = !0;
function Sc(e, t, n, r) {
  var o = J,
    i = xn.transition;
  xn.transition = null;
  try {
    ((J = 1), Ba(e, t, n, r));
  } finally {
    ((J = o), (xn.transition = i));
  }
}
function kc(e, t, n, r) {
  var o = J,
    i = xn.transition;
  xn.transition = null;
  try {
    ((J = 4), Ba(e, t, n, r));
  } finally {
    ((J = o), (xn.transition = i));
  }
}
function Ba(e, t, n, r) {
  if (vo) {
    var o = Gi(e, t, n, r);
    if (o === null) (mi(e, t, r, go, n), O1(e, r));
    else if (wc(o, e, t, n, r)) r.stopPropagation();
    else if ((O1(e, r), t & 4 && -1 < yc.indexOf(e))) {
      for (; o !== null;) {
        var i = Mr(o);
        if (
          (i !== null && Ls(i),
          (i = Gi(e, t, n, r)),
          i === null && mi(e, t, r, go, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else mi(e, t, r, null, n);
  }
}
var go = null;
function Gi(e, t, n, r) {
  if (((go = null), (e = Da(r)), (e = Ht(e)), e !== null))
    if (((t = en(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = bs(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((go = e), null);
}
function Rs(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (uc()) {
        case Ia:
          return 1;
        case Ms:
          return 4;
        case mo:
        case cc:
          return 16;
        case Ns:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var zt = null,
  Fa = null,
  eo = null;
function Os() {
  if (eo) return eo;
  var e,
    t = Fa,
    n = t.length,
    r,
    o = "value" in zt ? zt.value : zt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === o[i - r]; r++);
  return (eo = o.slice(e, 1 < r ? 1 - r : void 0));
}
function to(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Rr() {
  return !0;
}
function F1() {
  return !1;
}
function Fe(e) {
  function t(n, r, o, i, a) {
    ((this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = a),
      (this.currentTarget = null));
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Rr
        : F1),
      (this.isPropagationStopped = F1),
      this
    );
  }
  return (
    le(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Rr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Rr));
      },
      persist: function () {},
      isPersistent: Rr,
    }),
    t
  );
}
var Ln = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  $a = Fe(Ln),
  Er = le({}, Ln, { view: 0, detail: 0 }),
  Cc = Fe(Er),
  ii,
  ai,
  Bn,
  Oo = le({}, Er, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Va,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Bn &&
            (Bn && e.type === "mousemove"
              ? ((ii = e.screenX - Bn.screenX), (ai = e.screenY - Bn.screenY))
              : (ai = ii = 0),
            (Bn = e)),
          ii);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ai;
    },
  }),
  $1 = Fe(Oo),
  bc = le({}, Oo, { dataTransfer: 0 }),
  zc = Fe(bc),
  Tc = le({}, Er, { relatedTarget: 0 }),
  li = Fe(Tc),
  Ec = le({}, Ln, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Mc = Fe(Ec),
  Nc = le({}, Ln, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  jc = Fe(Nc),
  Ac = le({}, Ln, { data: 0 }),
  V1 = Fe(Ac),
  Lc = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Pc = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  _c = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Dc(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = _c[e]) ? !!t[e] : !1;
}
function Va() {
  return Dc;
}
var Ic = le({}, Er, {
    key: function (e) {
      if (e.key) {
        var t = Lc[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = to(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Pc[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Va,
    charCode: function (e) {
      return e.type === "keypress" ? to(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? to(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Rc = Fe(Ic),
  Oc = le({}, Oo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  H1 = Fe(Oc),
  Bc = le({}, Er, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Va,
  }),
  Fc = Fe(Bc),
  $c = le({}, Ln, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Vc = Fe($c),
  Hc = le({}, Oo, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Uc = Fe(Hc),
  Wc = [9, 13, 27, 32],
  Ha = ht && "CompositionEvent" in window,
  qn = null;
ht && "documentMode" in document && (qn = document.documentMode);
var Gc = ht && "TextEvent" in window && !qn,
  Bs = ht && (!Ha || (qn && 8 < qn && 11 >= qn)),
  U1 = " ",
  W1 = !1;
function Fs(e, t) {
  switch (e) {
    case "keyup":
      return Wc.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function $s(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var ln = !1;
function Qc(e, t) {
  switch (e) {
    case "compositionend":
      return $s(t);
    case "keypress":
      return t.which !== 32 ? null : ((W1 = !0), U1);
    case "textInput":
      return ((e = t.data), e === U1 && W1 ? null : e);
    default:
      return null;
  }
}
function Yc(e, t) {
  if (ln)
    return e === "compositionend" || (!Ha && Fs(e, t))
      ? ((e = Os()), (eo = Fa = zt = null), (ln = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Bs && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Kc = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function G1(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Kc[e.type] : t === "textarea";
}
function Vs(e, t, n, r) {
  (ws(r),
    (t = yo(t, "onChange")),
    0 < t.length &&
      ((n = new $a("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var er = null,
  fr = null;
function Zc(e) {
  qs(e, 0);
}
function Bo(e) {
  var t = cn(e);
  if (fs(t)) return e;
}
function Xc(e, t) {
  if (e === "change") return t;
}
var Hs = !1;
if (ht) {
  var si;
  if (ht) {
    var ui = "oninput" in document;
    if (!ui) {
      var Q1 = document.createElement("div");
      (Q1.setAttribute("oninput", "return;"),
        (ui = typeof Q1.oninput == "function"));
    }
    si = ui;
  } else si = !1;
  Hs = si && (!document.documentMode || 9 < document.documentMode);
}
function Y1() {
  er && (er.detachEvent("onpropertychange", Us), (fr = er = null));
}
function Us(e) {
  if (e.propertyName === "value" && Bo(fr)) {
    var t = [];
    (Vs(t, fr, e, Da(e)), Cs(Zc, t));
  }
}
function Jc(e, t, n) {
  e === "focusin"
    ? (Y1(), (er = t), (fr = n), er.attachEvent("onpropertychange", Us))
    : e === "focusout" && Y1();
}
function qc(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Bo(fr);
}
function e0(e, t) {
  if (e === "click") return Bo(t);
}
function t0(e, t) {
  if (e === "input" || e === "change") return Bo(t);
}
function n0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nt = typeof Object.is == "function" ? Object.is : n0;
function pr(e, t) {
  if (nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Mi.call(t, o) || !nt(e[o], t[o])) return !1;
  }
  return !0;
}
function K1(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Z1(e, t) {
  var n = K1(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = K1(n);
  }
}
function Ws(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Ws(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Gs() {
  for (var e = window, t = co(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = co(e.document);
  }
  return t;
}
function Ua(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function r0(e) {
  var t = Gs(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Ws(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ua(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        ((r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = Z1(n, i)));
        var a = Z1(n, r);
        o &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode);)
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var o0 = ht && "documentMode" in document && 11 >= document.documentMode,
  sn = null,
  Qi = null,
  tr = null,
  Yi = !1;
function X1(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Yi ||
    sn == null ||
    sn !== co(r) ||
    ((r = sn),
    "selectionStart" in r && Ua(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (tr && pr(tr, r)) ||
      ((tr = r),
      (r = yo(Qi, "onSelect")),
      0 < r.length &&
        ((t = new $a("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = sn))));
}
function Or(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var un = {
    animationend: Or("Animation", "AnimationEnd"),
    animationiteration: Or("Animation", "AnimationIteration"),
    animationstart: Or("Animation", "AnimationStart"),
    transitionend: Or("Transition", "TransitionEnd"),
  },
  ci = {},
  Qs = {};
ht &&
  ((Qs = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete un.animationend.animation,
    delete un.animationiteration.animation,
    delete un.animationstart.animation),
  "TransitionEvent" in window || delete un.transitionend.transition);
function Fo(e) {
  if (ci[e]) return ci[e];
  if (!un[e]) return e;
  var t = un[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Qs) return (ci[e] = t[n]);
  return e;
}
var Ys = Fo("animationend"),
  Ks = Fo("animationiteration"),
  Zs = Fo("animationstart"),
  Xs = Fo("transitionend"),
  Js = new Map(),
  J1 =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Rt(e, t) {
  (Js.set(e, t), qt(t, [e]));
}
for (var di = 0; di < J1.length; di++) {
  var fi = J1[di],
    i0 = fi.toLowerCase(),
    a0 = fi[0].toUpperCase() + fi.slice(1);
  Rt(i0, "on" + a0);
}
Rt(Ys, "onAnimationEnd");
Rt(Ks, "onAnimationIteration");
Rt(Zs, "onAnimationStart");
Rt("dblclick", "onDoubleClick");
Rt("focusin", "onFocus");
Rt("focusout", "onBlur");
Rt(Xs, "onTransitionEnd");
bn("onMouseEnter", ["mouseout", "mouseover"]);
bn("onMouseLeave", ["mouseout", "mouseover"]);
bn("onPointerEnter", ["pointerout", "pointerover"]);
bn("onPointerLeave", ["pointerout", "pointerover"]);
qt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
qt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
qt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
qt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
qt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Zn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  l0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Zn));
function q1(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), ic(r, t, void 0, e), (e.currentTarget = null));
}
function qs(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var l = r[a],
            c = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), c !== i && o.isPropagationStopped())) break e;
          (q1(o, l, u), (i = c));
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((l = r[a]),
            (c = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            c !== i && o.isPropagationStopped())
          )
            break e;
          (q1(o, l, u), (i = c));
        }
    }
  }
  if (po) throw ((e = Hi), (po = !1), (Hi = null), e);
}
function te(e, t) {
  var n = t[qi];
  n === void 0 && (n = t[qi] = new Set());
  var r = e + "__bubble";
  n.has(r) || (e2(t, e, 2, !1), n.add(r));
}
function pi(e, t, n) {
  var r = 0;
  (t && (r |= 4), e2(n, e, r, t));
}
var Br = "_reactListening" + Math.random().toString(36).slice(2);
function mr(e) {
  if (!e[Br]) {
    ((e[Br] = !0),
      ls.forEach(function (n) {
        n !== "selectionchange" && (l0.has(n) || pi(n, !1, e), pi(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Br] || ((t[Br] = !0), pi("selectionchange", !1, t));
  }
}
function e2(e, t, n, r) {
  switch (Rs(t)) {
    case 1:
      var o = Sc;
      break;
    case 4:
      o = kc;
      break;
    default:
      o = Ba;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !Vi ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1));
}
function mi(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (a === 4)
          for (a = r.return; a !== null;) {
            var c = a.tag;
            if (
              (c === 3 || c === 4) &&
              ((c = a.stateNode.containerInfo),
              c === o || (c.nodeType === 8 && c.parentNode === o))
            )
              return;
            a = a.return;
          }
        for (; l !== null;) {
          if (((a = Ht(l)), a === null)) return;
          if (((c = a.tag), c === 5 || c === 6)) {
            r = i = a;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Cs(function () {
    var u = i,
      v = Da(n),
      m = [];
    e: {
      var p = Js.get(e);
      if (p !== void 0) {
        var w = $a,
          C = e;
        switch (e) {
          case "keypress":
            if (to(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Rc;
            break;
          case "focusin":
            ((C = "focus"), (w = li));
            break;
          case "focusout":
            ((C = "blur"), (w = li));
            break;
          case "beforeblur":
          case "afterblur":
            w = li;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = $1;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = zc;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Fc;
            break;
          case Ys:
          case Ks:
          case Zs:
            w = Mc;
            break;
          case Xs:
            w = Vc;
            break;
          case "scroll":
            w = Cc;
            break;
          case "wheel":
            w = Uc;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = jc;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = H1;
        }
        var S = (t & 4) !== 0,
          z = !S && e === "scroll",
          d = S ? (p !== null ? p + "Capture" : null) : p;
        S = [];
        for (var f = u, h; f !== null;) {
          h = f;
          var x = h.stateNode;
          if (
            (h.tag === 5 &&
              x !== null &&
              ((h = x),
              d !== null && ((x = sr(f, d)), x != null && S.push(hr(f, x, h)))),
            z)
          )
            break;
          f = f.return;
        }
        0 < S.length &&
          ((p = new w(p, C, null, n, v)), m.push({ event: p, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (w = e === "mouseout" || e === "pointerout"),
          p &&
            n !== Fi &&
            (C = n.relatedTarget || n.fromElement) &&
            (Ht(C) || C[vt]))
        )
          break e;
        if (
          (w || p) &&
          ((p =
            v.window === v
              ? v
              : (p = v.ownerDocument)
                ? p.defaultView || p.parentWindow
                : window),
          w
            ? ((C = n.relatedTarget || n.toElement),
              (w = u),
              (C = C ? Ht(C) : null),
              C !== null &&
                ((z = en(C)), C !== z || (C.tag !== 5 && C.tag !== 6)) &&
                (C = null))
            : ((w = null), (C = u)),
          w !== C)
        ) {
          if (
            ((S = $1),
            (x = "onMouseLeave"),
            (d = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = H1),
              (x = "onPointerLeave"),
              (d = "onPointerEnter"),
              (f = "pointer")),
            (z = w == null ? p : cn(w)),
            (h = C == null ? p : cn(C)),
            (p = new S(x, f + "leave", w, n, v)),
            (p.target = z),
            (p.relatedTarget = h),
            (x = null),
            Ht(v) === u &&
              ((S = new S(d, f + "enter", C, n, v)),
              (S.target = h),
              (S.relatedTarget = z),
              (x = S)),
            (z = x),
            w && C)
          )
            t: {
              for (S = w, d = C, f = 0, h = S; h; h = tn(h)) f++;
              for (h = 0, x = d; x; x = tn(x)) h++;
              for (; 0 < f - h;) ((S = tn(S)), f--);
              for (; 0 < h - f;) ((d = tn(d)), h--);
              for (; f--;) {
                if (S === d || (d !== null && S === d.alternate)) break t;
                ((S = tn(S)), (d = tn(d)));
              }
              S = null;
            }
          else S = null;
          (w !== null && el(m, p, w, S, !1),
            C !== null && z !== null && el(m, z, C, S, !0));
        }
      }
      e: {
        if (
          ((p = u ? cn(u) : window),
          (w = p.nodeName && p.nodeName.toLowerCase()),
          w === "select" || (w === "input" && p.type === "file"))
        )
          var k = Xc;
        else if (G1(p))
          if (Hs) k = t0;
          else {
            k = qc;
            var T = Jc;
          }
        else
          (w = p.nodeName) &&
            w.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            (k = e0);
        if (k && (k = k(e, u))) {
          Vs(m, k, n, v);
          break e;
        }
        (T && T(e, p, u),
          e === "focusout" &&
            (T = p._wrapperState) &&
            T.controlled &&
            p.type === "number" &&
            Di(p, "number", p.value));
      }
      switch (((T = u ? cn(u) : window), e)) {
        case "focusin":
          (G1(T) || T.contentEditable === "true") &&
            ((sn = T), (Qi = u), (tr = null));
          break;
        case "focusout":
          tr = Qi = sn = null;
          break;
        case "mousedown":
          Yi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Yi = !1), X1(m, n, v));
          break;
        case "selectionchange":
          if (o0) break;
        case "keydown":
        case "keyup":
          X1(m, n, v);
      }
      var E;
      if (Ha)
        e: {
          switch (e) {
            case "compositionstart":
              var b = "onCompositionStart";
              break e;
            case "compositionend":
              b = "onCompositionEnd";
              break e;
            case "compositionupdate":
              b = "onCompositionUpdate";
              break e;
          }
          b = void 0;
        }
      else
        ln
          ? Fs(e, n) && (b = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
      (b &&
        (Bs &&
          n.locale !== "ko" &&
          (ln || b !== "onCompositionStart"
            ? b === "onCompositionEnd" && ln && (E = Os())
            : ((zt = v),
              (Fa = "value" in zt ? zt.value : zt.textContent),
              (ln = !0))),
        (T = yo(u, b)),
        0 < T.length &&
          ((b = new V1(b, e, null, n, v)),
          m.push({ event: b, listeners: T }),
          E ? (b.data = E) : ((E = $s(n)), E !== null && (b.data = E)))),
        (E = Gc ? Qc(e, n) : Yc(e, n)) &&
          ((u = yo(u, "onBeforeInput")),
          0 < u.length &&
            ((v = new V1("onBeforeInput", "beforeinput", null, n, v)),
            m.push({ event: v, listeners: u }),
            (v.data = E))));
    }
    qs(m, t);
  });
}
function hr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function yo(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var o = e,
      i = o.stateNode;
    (o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = sr(e, n)),
      i != null && r.unshift(hr(e, i, o)),
      (i = sr(e, t)),
      i != null && r.push(hr(e, i, o))),
      (e = e.return));
  }
  return r;
}
function tn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function el(e, t, n, r, o) {
  for (var i = t._reactName, a = []; n !== null && n !== r;) {
    var l = n,
      c = l.alternate,
      u = l.stateNode;
    if (c !== null && c === r) break;
    (l.tag === 5 &&
      u !== null &&
      ((l = u),
      o
        ? ((c = sr(n, i)), c != null && a.unshift(hr(n, c, l)))
        : o || ((c = sr(n, i)), c != null && a.push(hr(n, c, l)))),
      (n = n.return));
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var s0 = /\r\n?/g,
  u0 = /\u0000|\uFFFD/g;
function tl(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      s0,
      `
`
    )
    .replace(u0, "");
}
function Fr(e, t, n) {
  if (((t = tl(t)), tl(e) !== t && n)) throw Error(N(425));
}
function wo() {}
var Ki = null,
  Zi = null;
function Xi(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ji = typeof setTimeout == "function" ? setTimeout : void 0,
  c0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  nl = typeof Promise == "function" ? Promise : void 0,
  d0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof nl < "u"
        ? function (e) {
            return nl.resolve(null).then(e).catch(f0);
          }
        : Ji;
function f0(e) {
  setTimeout(function () {
    throw e;
  });
}
function hi(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(o), dr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  dr(t);
}
function jt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function rl(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Pn = Math.random().toString(36).slice(2),
  at = "__reactFiber$" + Pn,
  vr = "__reactProps$" + Pn,
  vt = "__reactContainer$" + Pn,
  qi = "__reactEvents$" + Pn,
  p0 = "__reactListeners$" + Pn,
  m0 = "__reactHandles$" + Pn;
function Ht(e) {
  var t = e[at];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[vt] || n[at])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = rl(e); e !== null;) {
          if ((n = e[at])) return n;
          e = rl(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Mr(e) {
  return (
    (e = e[at] || e[vt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function cn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function $o(e) {
  return e[vr] || null;
}
var ea = [],
  dn = -1;
function Ot(e) {
  return { current: e };
}
function ne(e) {
  0 > dn || ((e.current = ea[dn]), (ea[dn] = null), dn--);
}
function q(e, t) {
  (dn++, (ea[dn] = e.current), (e.current = t));
}
var It = {},
  be = Ot(It),
  Le = Ot(!1),
  Yt = It;
function zn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return It;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Pe(e) {
  return ((e = e.childContextTypes), e != null);
}
function xo() {
  (ne(Le), ne(be));
}
function ol(e, t, n) {
  if (be.current !== It) throw Error(N(168));
  (q(be, t), q(Le, n));
}
function t2(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(N(108, Ju(e) || "Unknown", o));
  return le({}, n, r);
}
function So(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || It),
    (Yt = be.current),
    q(be, e),
    q(Le, Le.current),
    !0
  );
}
function il(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  (n
    ? ((e = t2(e, t, Yt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ne(Le),
      ne(be),
      q(be, e))
    : ne(Le),
    q(Le, n));
}
var dt = null,
  Vo = !1,
  vi = !1;
function n2(e) {
  dt === null ? (dt = [e]) : dt.push(e);
}
function h0(e) {
  ((Vo = !0), n2(e));
}
function Bt() {
  if (!vi && dt !== null) {
    vi = !0;
    var e = 0,
      t = J;
    try {
      var n = dt;
      for (J = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((dt = null), (Vo = !1));
    } catch (o) {
      throw (dt !== null && (dt = dt.slice(e + 1)), Es(Ia, Bt), o);
    } finally {
      ((J = t), (vi = !1));
    }
  }
  return null;
}
var fn = [],
  pn = 0,
  ko = null,
  Co = 0,
  $e = [],
  Ve = 0,
  Kt = null,
  ft = 1,
  pt = "";
function $t(e, t) {
  ((fn[pn++] = Co), (fn[pn++] = ko), (ko = e), (Co = t));
}
function r2(e, t, n) {
  (($e[Ve++] = ft), ($e[Ve++] = pt), ($e[Ve++] = Kt), (Kt = e));
  var r = ft;
  e = pt;
  var o = 32 - et(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var i = 32 - et(t) + o;
  if (30 < i) {
    var a = o - (o % 5);
    ((i = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (o -= a),
      (ft = (1 << (32 - et(t) + o)) | (n << o) | r),
      (pt = i + e));
  } else ((ft = (1 << i) | (n << o) | r), (pt = e));
}
function Wa(e) {
  e.return !== null && ($t(e, 1), r2(e, 1, 0));
}
function Ga(e) {
  for (; e === ko;)
    ((ko = fn[--pn]), (fn[pn] = null), (Co = fn[--pn]), (fn[pn] = null));
  for (; e === Kt;)
    ((Kt = $e[--Ve]),
      ($e[Ve] = null),
      (pt = $e[--Ve]),
      ($e[Ve] = null),
      (ft = $e[--Ve]),
      ($e[Ve] = null));
}
var Re = null,
  Ie = null,
  re = !1,
  qe = null;
function o2(e, t) {
  var n = He(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function al(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Re = e), (Ie = jt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Re = e), (Ie = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Kt !== null ? { id: ft, overflow: pt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = He(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Re = e),
            (Ie = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ta(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function na(e) {
  if (re) {
    var t = Ie;
    if (t) {
      var n = t;
      if (!al(e, t)) {
        if (ta(e)) throw Error(N(418));
        t = jt(n.nextSibling);
        var r = Re;
        t && al(e, t)
          ? o2(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (re = !1), (Re = e));
      }
    } else {
      if (ta(e)) throw Error(N(418));
      ((e.flags = (e.flags & -4097) | 2), (re = !1), (Re = e));
    }
  }
}
function ll(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  Re = e;
}
function $r(e) {
  if (e !== Re) return !1;
  if (!re) return (ll(e), (re = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Xi(e.type, e.memoizedProps))),
    t && (t = Ie))
  ) {
    if (ta(e)) throw (i2(), Error(N(418)));
    for (; t;) (o2(e, t), (t = jt(t.nextSibling)));
  }
  if ((ll(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ie = jt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ie = null;
    }
  } else Ie = Re ? jt(e.stateNode.nextSibling) : null;
  return !0;
}
function i2() {
  for (var e = Ie; e;) e = jt(e.nextSibling);
}
function Tn() {
  ((Ie = Re = null), (re = !1));
}
function Qa(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
var v0 = wt.ReactCurrentBatchConfig;
function Fn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (a) {
            var l = o.refs;
            a === null ? delete l[i] : (l[i] = a);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Vr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    )
  );
}
function sl(e) {
  var t = e._init;
  return t(e._payload);
}
function a2(e) {
  function t(d, f) {
    if (e) {
      var h = d.deletions;
      h === null ? ((d.deletions = [f]), (d.flags |= 16)) : h.push(f);
    }
  }
  function n(d, f) {
    if (!e) return null;
    for (; f !== null;) (t(d, f), (f = f.sibling));
    return null;
  }
  function r(d, f) {
    for (d = new Map(); f !== null;)
      (f.key !== null ? d.set(f.key, f) : d.set(f.index, f), (f = f.sibling));
    return d;
  }
  function o(d, f) {
    return ((d = _t(d, f)), (d.index = 0), (d.sibling = null), d);
  }
  function i(d, f, h) {
    return (
      (d.index = h),
      e
        ? ((h = d.alternate),
          h !== null
            ? ((h = h.index), h < f ? ((d.flags |= 2), f) : h)
            : ((d.flags |= 2), f))
        : ((d.flags |= 1048576), f)
    );
  }
  function a(d) {
    return (e && d.alternate === null && (d.flags |= 2), d);
  }
  function l(d, f, h, x) {
    return f === null || f.tag !== 6
      ? ((f = Ci(h, d.mode, x)), (f.return = d), f)
      : ((f = o(f, h)), (f.return = d), f);
  }
  function c(d, f, h, x) {
    var k = h.type;
    return k === an
      ? v(d, f, h.props.children, x, h.key)
      : f !== null &&
          (f.elementType === k ||
            (typeof k == "object" &&
              k !== null &&
              k.$$typeof === St &&
              sl(k) === f.type))
        ? ((x = o(f, h.props)), (x.ref = Fn(d, f, h)), (x.return = d), x)
        : ((x = so(h.type, h.key, h.props, null, d.mode, x)),
          (x.ref = Fn(d, f, h)),
          (x.return = d),
          x);
  }
  function u(d, f, h, x) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== h.containerInfo ||
      f.stateNode.implementation !== h.implementation
      ? ((f = bi(h, d.mode, x)), (f.return = d), f)
      : ((f = o(f, h.children || [])), (f.return = d), f);
  }
  function v(d, f, h, x, k) {
    return f === null || f.tag !== 7
      ? ((f = Qt(h, d.mode, x, k)), (f.return = d), f)
      : ((f = o(f, h)), (f.return = d), f);
  }
  function m(d, f, h) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return ((f = Ci("" + f, d.mode, h)), (f.return = d), f);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Ar:
          return (
            (h = so(f.type, f.key, f.props, null, d.mode, h)),
            (h.ref = Fn(d, null, f)),
            (h.return = d),
            h
          );
        case on:
          return ((f = bi(f, d.mode, h)), (f.return = d), f);
        case St:
          var x = f._init;
          return m(d, x(f._payload), h);
      }
      if (Yn(f) || Dn(f))
        return ((f = Qt(f, d.mode, h, null)), (f.return = d), f);
      Vr(d, f);
    }
    return null;
  }
  function p(d, f, h, x) {
    var k = f !== null ? f.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return k !== null ? null : l(d, f, "" + h, x);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Ar:
          return h.key === k ? c(d, f, h, x) : null;
        case on:
          return h.key === k ? u(d, f, h, x) : null;
        case St:
          return ((k = h._init), p(d, f, k(h._payload), x));
      }
      if (Yn(h) || Dn(h)) return k !== null ? null : v(d, f, h, x, null);
      Vr(d, h);
    }
    return null;
  }
  function w(d, f, h, x, k) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((d = d.get(h) || null), l(f, d, "" + x, k));
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Ar:
          return (
            (d = d.get(x.key === null ? h : x.key) || null),
            c(f, d, x, k)
          );
        case on:
          return (
            (d = d.get(x.key === null ? h : x.key) || null),
            u(f, d, x, k)
          );
        case St:
          var T = x._init;
          return w(d, f, h, T(x._payload), k);
      }
      if (Yn(x) || Dn(x)) return ((d = d.get(h) || null), v(f, d, x, k, null));
      Vr(f, x);
    }
    return null;
  }
  function C(d, f, h, x) {
    for (
      var k = null, T = null, E = f, b = (f = 0), P = null;
      E !== null && b < h.length;
      b++
    ) {
      E.index > b ? ((P = E), (E = null)) : (P = E.sibling);
      var M = p(d, E, h[b], x);
      if (M === null) {
        E === null && (E = P);
        break;
      }
      (e && E && M.alternate === null && t(d, E),
        (f = i(M, f, b)),
        T === null ? (k = M) : (T.sibling = M),
        (T = M),
        (E = P));
    }
    if (b === h.length) return (n(d, E), re && $t(d, b), k);
    if (E === null) {
      for (; b < h.length; b++)
        ((E = m(d, h[b], x)),
          E !== null &&
            ((f = i(E, f, b)),
            T === null ? (k = E) : (T.sibling = E),
            (T = E)));
      return (re && $t(d, b), k);
    }
    for (E = r(d, E); b < h.length; b++)
      ((P = w(E, d, b, h[b], x)),
        P !== null &&
          (e && P.alternate !== null && E.delete(P.key === null ? b : P.key),
          (f = i(P, f, b)),
          T === null ? (k = P) : (T.sibling = P),
          (T = P)));
    return (
      e &&
        E.forEach(function (L) {
          return t(d, L);
        }),
      re && $t(d, b),
      k
    );
  }
  function S(d, f, h, x) {
    var k = Dn(h);
    if (typeof k != "function") throw Error(N(150));
    if (((h = k.call(h)), h == null)) throw Error(N(151));
    for (
      var T = (k = null), E = f, b = (f = 0), P = null, M = h.next();
      E !== null && !M.done;
      b++, M = h.next()
    ) {
      E.index > b ? ((P = E), (E = null)) : (P = E.sibling);
      var L = p(d, E, M.value, x);
      if (L === null) {
        E === null && (E = P);
        break;
      }
      (e && E && L.alternate === null && t(d, E),
        (f = i(L, f, b)),
        T === null ? (k = L) : (T.sibling = L),
        (T = L),
        (E = P));
    }
    if (M.done) return (n(d, E), re && $t(d, b), k);
    if (E === null) {
      for (; !M.done; b++, M = h.next())
        ((M = m(d, M.value, x)),
          M !== null &&
            ((f = i(M, f, b)),
            T === null ? (k = M) : (T.sibling = M),
            (T = M)));
      return (re && $t(d, b), k);
    }
    for (E = r(d, E); !M.done; b++, M = h.next())
      ((M = w(E, d, b, M.value, x)),
        M !== null &&
          (e && M.alternate !== null && E.delete(M.key === null ? b : M.key),
          (f = i(M, f, b)),
          T === null ? (k = M) : (T.sibling = M),
          (T = M)));
    return (
      e &&
        E.forEach(function ($) {
          return t(d, $);
        }),
      re && $t(d, b),
      k
    );
  }
  function z(d, f, h, x) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === an &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case Ar:
          e: {
            for (var k = h.key, T = f; T !== null;) {
              if (T.key === k) {
                if (((k = h.type), k === an)) {
                  if (T.tag === 7) {
                    (n(d, T.sibling),
                      (f = o(T, h.props.children)),
                      (f.return = d),
                      (d = f));
                    break e;
                  }
                } else if (
                  T.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === St &&
                    sl(k) === T.type)
                ) {
                  (n(d, T.sibling),
                    (f = o(T, h.props)),
                    (f.ref = Fn(d, T, h)),
                    (f.return = d),
                    (d = f));
                  break e;
                }
                n(d, T);
                break;
              } else t(d, T);
              T = T.sibling;
            }
            h.type === an
              ? ((f = Qt(h.props.children, d.mode, x, h.key)),
                (f.return = d),
                (d = f))
              : ((x = so(h.type, h.key, h.props, null, d.mode, x)),
                (x.ref = Fn(d, f, h)),
                (x.return = d),
                (d = x));
          }
          return a(d);
        case on:
          e: {
            for (T = h.key; f !== null;) {
              if (f.key === T)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === h.containerInfo &&
                  f.stateNode.implementation === h.implementation
                ) {
                  (n(d, f.sibling),
                    (f = o(f, h.children || [])),
                    (f.return = d),
                    (d = f));
                  break e;
                } else {
                  n(d, f);
                  break;
                }
              else t(d, f);
              f = f.sibling;
            }
            ((f = bi(h, d.mode, x)), (f.return = d), (d = f));
          }
          return a(d);
        case St:
          return ((T = h._init), z(d, f, T(h._payload), x));
      }
      if (Yn(h)) return C(d, f, h, x);
      if (Dn(h)) return S(d, f, h, x);
      Vr(d, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        f !== null && f.tag === 6
          ? (n(d, f.sibling), (f = o(f, h)), (f.return = d), (d = f))
          : (n(d, f), (f = Ci(h, d.mode, x)), (f.return = d), (d = f)),
        a(d))
      : n(d, f);
  }
  return z;
}
var En = a2(!0),
  l2 = a2(!1),
  bo = Ot(null),
  zo = null,
  mn = null,
  Ya = null;
function Ka() {
  Ya = mn = zo = null;
}
function Za(e) {
  var t = bo.current;
  (ne(bo), (e._currentValue = t));
}
function ra(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Sn(e, t) {
  ((zo = e),
    (Ya = mn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ae = !0), (e.firstContext = null)));
}
function We(e) {
  var t = e._currentValue;
  if (Ya !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), mn === null)) {
      if (zo === null) throw Error(N(308));
      ((mn = e), (zo.dependencies = { lanes: 0, firstContext: e }));
    } else mn = mn.next = e;
  return t;
}
var Ut = null;
function Xa(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function s2(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), Xa(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    gt(e, r)
  );
}
function gt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var kt = !1;
function Ja(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function u2(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function mt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function At(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), K & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      gt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), Xa(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    gt(e, n)
  );
}
function no(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Ra(e, n));
  }
}
function ul(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (o = i = a) : (i = i.next = a), (n = n.next));
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function To(e, t, n, r) {
  var o = e.updateQueue;
  kt = !1;
  var i = o.firstBaseUpdate,
    a = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var c = l,
      u = c.next;
    ((c.next = null), a === null ? (i = u) : (a.next = u), (a = c));
    var v = e.alternate;
    v !== null &&
      ((v = v.updateQueue),
      (l = v.lastBaseUpdate),
      l !== a &&
        (l === null ? (v.firstBaseUpdate = u) : (l.next = u),
        (v.lastBaseUpdate = c)));
  }
  if (i !== null) {
    var m = o.baseState;
    ((a = 0), (v = u = c = null), (l = i));
    do {
      var p = l.lane,
        w = l.eventTime;
      if ((r & p) === p) {
        v !== null &&
          (v = v.next =
            {
              eventTime: w,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var C = e,
            S = l;
          switch (((p = t), (w = n), S.tag)) {
            case 1:
              if (((C = S.payload), typeof C == "function")) {
                m = C.call(w, m, p);
                break e;
              }
              m = C;
              break e;
            case 3:
              C.flags = (C.flags & -65537) | 128;
            case 0:
              if (
                ((C = S.payload),
                (p = typeof C == "function" ? C.call(w, m, p) : C),
                p == null)
              )
                break e;
              m = le({}, m, p);
              break e;
            case 2:
              kt = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (p = o.effects),
          p === null ? (o.effects = [l]) : p.push(l));
      } else
        ((w = {
          eventTime: w,
          lane: p,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          v === null ? ((u = v = w), (c = m)) : (v = v.next = w),
          (a |= p));
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        ((p = l),
          (l = p.next),
          (p.next = null),
          (o.lastBaseUpdate = p),
          (o.shared.pending = null));
      }
    } while (!0);
    if (
      (v === null && (c = m),
      (o.baseState = c),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = v),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((a |= o.lane), (o = o.next));
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    ((Xt |= a), (e.lanes = a), (e.memoizedState = m));
  }
}
function cl(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(N(191, o));
        o.call(r);
      }
    }
}
var Nr = {},
  st = Ot(Nr),
  gr = Ot(Nr),
  yr = Ot(Nr);
function Wt(e) {
  if (e === Nr) throw Error(N(174));
  return e;
}
function qa(e, t) {
  switch ((q(yr, t), q(gr, e), q(st, Nr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ri(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ri(t, e)));
  }
  (ne(st), q(st, t));
}
function Mn() {
  (ne(st), ne(gr), ne(yr));
}
function c2(e) {
  Wt(yr.current);
  var t = Wt(st.current),
    n = Ri(t, e.type);
  t !== n && (q(gr, e), q(st, n));
}
function e1(e) {
  gr.current === e && (ne(st), ne(gr));
}
var ie = Ot(0);
function Eo(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var gi = [];
function t1() {
  for (var e = 0; e < gi.length; e++)
    gi[e]._workInProgressVersionPrimary = null;
  gi.length = 0;
}
var ro = wt.ReactCurrentDispatcher,
  yi = wt.ReactCurrentBatchConfig,
  Zt = 0,
  ae = null,
  pe = null,
  he = null,
  Mo = !1,
  nr = !1,
  wr = 0,
  g0 = 0;
function Se() {
  throw Error(N(321));
}
function n1(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!nt(e[n], t[n])) return !1;
  return !0;
}
function r1(e, t, n, r, o, i) {
  if (
    ((Zt = i),
    (ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ro.current = e === null || e.memoizedState === null ? S0 : k0),
    (e = n(r, o)),
    nr)
  ) {
    i = 0;
    do {
      if (((nr = !1), (wr = 0), 25 <= i)) throw Error(N(301));
      ((i += 1),
        (he = pe = null),
        (t.updateQueue = null),
        (ro.current = C0),
        (e = n(r, o)));
    } while (nr);
  }
  if (
    ((ro.current = No),
    (t = pe !== null && pe.next !== null),
    (Zt = 0),
    (he = pe = ae = null),
    (Mo = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function o1() {
  var e = wr !== 0;
  return ((wr = 0), e);
}
function it() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (he === null ? (ae.memoizedState = he = e) : (he = he.next = e), he);
}
function Ge() {
  if (pe === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = pe.next;
  var t = he === null ? ae.memoizedState : he.next;
  if (t !== null) ((he = t), (pe = e));
  else {
    if (e === null) throw Error(N(310));
    ((pe = e),
      (e = {
        memoizedState: pe.memoizedState,
        baseState: pe.baseState,
        baseQueue: pe.baseQueue,
        queue: pe.queue,
        next: null,
      }),
      he === null ? (ae.memoizedState = he = e) : (he = he.next = e));
  }
  return he;
}
function xr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wi(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = pe,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var a = o.next;
      ((o.next = i.next), (i.next = a));
    }
    ((r.baseQueue = o = i), (n.pending = null));
  }
  if (o !== null) {
    ((i = o.next), (r = r.baseState));
    var l = (a = null),
      c = null,
      u = i;
    do {
      var v = u.lane;
      if ((Zt & v) === v)
        (c !== null &&
          (c = c.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var m = {
          lane: v,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (c === null ? ((l = c = m), (a = r)) : (c = c.next = m),
          (ae.lanes |= v),
          (Xt |= v));
      }
      u = u.next;
    } while (u !== null && u !== i);
    (c === null ? (a = r) : (c.next = l),
      nt(r, t.memoizedState) || (Ae = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = c),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((i = o.lane), (ae.lanes |= i), (Xt |= i), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function xi(e) {
  var t = Ge(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var a = (o = o.next);
    do ((i = e(i, a.action)), (a = a.next));
    while (a !== o);
    (nt(i, t.memoizedState) || (Ae = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function d2() {}
function f2(e, t) {
  var n = ae,
    r = Ge(),
    o = t(),
    i = !nt(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (Ae = !0)),
    (r = r.queue),
    i1(h2.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (he !== null && he.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Sr(9, m2.bind(null, n, r, o, t), void 0, null),
      ve === null)
    )
      throw Error(N(349));
    Zt & 30 || p2(n, t, o);
  }
  return o;
}
function p2(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function m2(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), v2(t) && g2(e));
}
function h2(e, t, n) {
  return n(function () {
    v2(t) && g2(e);
  });
}
function v2(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nt(e, n);
  } catch {
    return !0;
  }
}
function g2(e) {
  var t = gt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function dl(e) {
  var t = it();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = x0.bind(null, ae, e)),
    [t.memoizedState, e]
  );
}
function Sr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ae.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function y2() {
  return Ge().memoizedState;
}
function oo(e, t, n, r) {
  var o = it();
  ((ae.flags |= e),
    (o.memoizedState = Sr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Ho(e, t, n, r) {
  var o = Ge();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (pe !== null) {
    var a = pe.memoizedState;
    if (((i = a.destroy), r !== null && n1(r, a.deps))) {
      o.memoizedState = Sr(t, n, i, r);
      return;
    }
  }
  ((ae.flags |= e), (o.memoizedState = Sr(1 | t, n, i, r)));
}
function fl(e, t) {
  return oo(8390656, 8, e, t);
}
function i1(e, t) {
  return Ho(2048, 8, e, t);
}
function w2(e, t) {
  return Ho(4, 2, e, t);
}
function x2(e, t) {
  return Ho(4, 4, e, t);
}
function S2(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function k2(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Ho(4, 4, S2.bind(null, t, e), n)
  );
}
function a1() {}
function C2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && n1(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function b2(e, t) {
  var n = Ge();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && n1(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function z2(e, t, n) {
  return Zt & 21
    ? (nt(n, t) || ((n = js()), (ae.lanes |= n), (Xt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ae = !0)), (e.memoizedState = n));
}
function y0(e, t) {
  var n = J;
  ((J = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = yi.transition;
  yi.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((J = n), (yi.transition = r));
  }
}
function T2() {
  return Ge().memoizedState;
}
function w0(e, t, n) {
  var r = Pt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    E2(e))
  )
    M2(t, n);
  else if (((n = s2(e, t, n, r)), n !== null)) {
    var o = Te();
    (tt(n, e, r, o), N2(n, t, r));
  }
}
function x0(e, t, n) {
  var r = Pt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (E2(e)) M2(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var a = t.lastRenderedState,
          l = i(a, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), nt(l, a))) {
          var c = t.interleaved;
          (c === null
            ? ((o.next = o), Xa(t))
            : ((o.next = c.next), (c.next = o)),
            (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = s2(e, t, o, r)),
      n !== null && ((o = Te()), tt(n, e, r, o), N2(n, t, r)));
  }
}
function E2(e) {
  var t = e.alternate;
  return e === ae || (t !== null && t === ae);
}
function M2(e, t) {
  nr = Mo = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function N2(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Ra(e, n));
  }
}
var No = {
    readContext: We,
    useCallback: Se,
    useContext: Se,
    useEffect: Se,
    useImperativeHandle: Se,
    useInsertionEffect: Se,
    useLayoutEffect: Se,
    useMemo: Se,
    useReducer: Se,
    useRef: Se,
    useState: Se,
    useDebugValue: Se,
    useDeferredValue: Se,
    useTransition: Se,
    useMutableSource: Se,
    useSyncExternalStore: Se,
    useId: Se,
    unstable_isNewReconciler: !1,
  },
  S0 = {
    readContext: We,
    useCallback: function (e, t) {
      return ((it().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: We,
    useEffect: fl,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        oo(4194308, 4, S2.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return oo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return oo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = it();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = it();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = w0.bind(null, ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = it();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: dl,
    useDebugValue: a1,
    useDeferredValue: function (e) {
      return (it().memoizedState = e);
    },
    useTransition: function () {
      var e = dl(!1),
        t = e[0];
      return ((e = y0.bind(null, e[1])), (it().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ae,
        o = it();
      if (re) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), ve === null)) throw Error(N(349));
        Zt & 30 || p2(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        fl(h2.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Sr(9, m2.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = it(),
        t = ve.identifierPrefix;
      if (re) {
        var n = pt,
          r = ft;
        ((n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = wr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = g0++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  k0 = {
    readContext: We,
    useCallback: C2,
    useContext: We,
    useEffect: i1,
    useImperativeHandle: k2,
    useInsertionEffect: w2,
    useLayoutEffect: x2,
    useMemo: b2,
    useReducer: wi,
    useRef: y2,
    useState: function () {
      return wi(xr);
    },
    useDebugValue: a1,
    useDeferredValue: function (e) {
      var t = Ge();
      return z2(t, pe.memoizedState, e);
    },
    useTransition: function () {
      var e = wi(xr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: d2,
    useSyncExternalStore: f2,
    useId: T2,
    unstable_isNewReconciler: !1,
  },
  C0 = {
    readContext: We,
    useCallback: C2,
    useContext: We,
    useEffect: i1,
    useImperativeHandle: k2,
    useInsertionEffect: w2,
    useLayoutEffect: x2,
    useMemo: b2,
    useReducer: xi,
    useRef: y2,
    useState: function () {
      return xi(xr);
    },
    useDebugValue: a1,
    useDeferredValue: function (e) {
      var t = Ge();
      return pe === null ? (t.memoizedState = e) : z2(t, pe.memoizedState, e);
    },
    useTransition: function () {
      var e = xi(xr)[0],
        t = Ge().memoizedState;
      return [e, t];
    },
    useMutableSource: d2,
    useSyncExternalStore: f2,
    useId: T2,
    unstable_isNewReconciler: !1,
  };
function Xe(e, t) {
  if (e && e.defaultProps) {
    ((t = le({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function oa(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : le({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Uo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? en(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      o = Pt(e),
      i = mt(r, o);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = At(e, i, o)),
      t !== null && (tt(t, e, o, r), no(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Te(),
      o = Pt(e),
      i = mt(r, o);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = At(e, i, o)),
      t !== null && (tt(t, e, o, r), no(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Te(),
      r = Pt(e),
      o = mt(n, r);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = At(e, o, r)),
      t !== null && (tt(t, e, r, n), no(t, e, r)));
  },
};
function pl(e, t, n, r, o, i, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, a)
      : t.prototype && t.prototype.isPureReactComponent
        ? !pr(n, r) || !pr(o, i)
        : !0
  );
}
function j2(e, t, n) {
  var r = !1,
    o = It,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = We(i))
      : ((o = Pe(t) ? Yt : be.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? zn(e, o) : It)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Uo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function ml(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Uo.enqueueReplaceState(t, t.state, null));
}
function ia(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), Ja(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null
    ? (o.context = We(i))
    : ((i = Pe(t) ? Yt : be.current), (o.context = zn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (oa(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Uo.enqueueReplaceState(o, o.state, null),
      To(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308));
}
function Nn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Xu(r)), (r = r.return));
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Si(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function aa(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var b0 = typeof WeakMap == "function" ? WeakMap : Map;
function A2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Ao || ((Ao = !0), (va = r)), aa(e, t));
    }),
    n
  );
}
function L2(e, t, n) {
  ((n = mt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    ((n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        aa(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (aa(e, t),
          typeof r != "function" &&
            (Lt === null ? (Lt = new Set([this])) : Lt.add(this)));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function hl(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new b0();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = O0.bind(null, e, t, n)), t.then(e, e));
}
function vl(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function gl(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = mt(-1, 1)), (t.tag = 2), At(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var z0 = wt.ReactCurrentOwner,
  Ae = !1;
function ze(e, t, n, r) {
  t.child = e === null ? l2(t, null, n, r) : En(t, e.child, n, r);
}
function yl(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Sn(t, o),
    (r = r1(e, t, n, r, i, o)),
    (n = o1()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        yt(e, t, o))
      : (re && n && Wa(t), (t.flags |= 1), ze(e, t, r, o), t.child)
  );
}
function wl(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !m1(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), P2(e, t, i, r, o))
      : ((e = so(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var a = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : pr), n(a, r) && e.ref === t.ref)
    )
      return yt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = _t(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function P2(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (pr(i, r) && e.ref === t.ref)
      if (((Ae = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ae = !0);
      else return ((t.lanes = e.lanes), yt(e, t, o));
  }
  return la(e, t, n, r, o);
}
function _2(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        q(vn, De),
        (De |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          q(vn, De),
          (De |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        q(vn, De),
        (De |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      q(vn, De),
      (De |= r));
  return (ze(e, t, o, n), t.child);
}
function D2(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function la(e, t, n, r, o) {
  var i = Pe(n) ? Yt : be.current;
  return (
    (i = zn(t, i)),
    Sn(t, o),
    (n = r1(e, t, n, r, i, o)),
    (r = o1()),
    e !== null && !Ae
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        yt(e, t, o))
      : (re && r && Wa(t), (t.flags |= 1), ze(e, t, n, o), t.child)
  );
}
function xl(e, t, n, r, o) {
  if (Pe(n)) {
    var i = !0;
    So(t);
  } else i = !1;
  if ((Sn(t, o), t.stateNode === null))
    (io(e, t), j2(t, n, r), ia(t, n, r, o), (r = !0));
  else if (e === null) {
    var a = t.stateNode,
      l = t.memoizedProps;
    a.props = l;
    var c = a.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = We(u))
      : ((u = Pe(n) ? Yt : be.current), (u = zn(t, u)));
    var v = n.getDerivedStateFromProps,
      m =
        typeof v == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    (m ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== r || c !== u) && ml(t, a, r, u)),
      (kt = !1));
    var p = t.memoizedState;
    ((a.state = p),
      To(t, r, a, o),
      (c = t.memoizedState),
      l !== r || p !== c || Le.current || kt
        ? (typeof v == "function" && (oa(t, n, v, r), (c = t.memoizedState)),
          (l = kt || pl(t, n, l, r, p, c, u))
            ? (m ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = c)),
          (a.props = r),
          (a.state = c),
          (a.context = u),
          (r = l))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((a = t.stateNode),
      u2(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : Xe(t.type, l)),
      (a.props = u),
      (m = t.pendingProps),
      (p = a.context),
      (c = n.contextType),
      typeof c == "object" && c !== null
        ? (c = We(c))
        : ((c = Pe(n) ? Yt : be.current), (c = zn(t, c))));
    var w = n.getDerivedStateFromProps;
    ((v =
      typeof w == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((l !== m || p !== c) && ml(t, a, r, c)),
      (kt = !1),
      (p = t.memoizedState),
      (a.state = p),
      To(t, r, a, o));
    var C = t.memoizedState;
    l !== m || p !== C || Le.current || kt
      ? (typeof w == "function" && (oa(t, n, w, r), (C = t.memoizedState)),
        (u = kt || pl(t, n, u, r, p, C, c) || !1)
          ? (v ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, C, c),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, C, c)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = C)),
        (a.props = r),
        (a.state = C),
        (a.context = c),
        (r = u))
      : (typeof a.componentDidUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return sa(e, t, n, r, i, o);
}
function sa(e, t, n, r, o, i) {
  D2(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return (o && il(t, n, !1), yt(e, t, i));
  ((r = t.stateNode), (z0.current = t));
  var l =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = En(t, e.child, null, i)), (t.child = En(t, null, l, i)))
      : ze(e, t, l, i),
    (t.memoizedState = r.state),
    o && il(t, n, !0),
    t.child
  );
}
function I2(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? ol(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ol(e, t.context, !1),
    qa(e, t.containerInfo));
}
function Sl(e, t, n, r, o) {
  return (Tn(), Qa(o), (t.flags |= 256), ze(e, t, n, r), t.child);
}
var ua = { dehydrated: null, treeContext: null, retryLane: 0 };
function ca(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function R2(e, t, n) {
  var r = t.pendingProps,
    o = ie.current,
    i = !1,
    a = (t.flags & 128) !== 0,
    l;
  if (
    ((l = a) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    q(ie, o & 1),
    e === null)
  )
    return (
      na(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = a))
                : (i = Qo(a, r, 0, null)),
              (e = Qt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = ca(n)),
              (t.memoizedState = ua),
              e)
            : l1(t, a))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return T0(e, t, a, r, l, o, n);
  if (i) {
    ((i = r.fallback), (a = t.mode), (o = e.child), (l = o.sibling));
    var c = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = c),
          (t.deletions = null))
        : ((r = _t(o, c)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = _t(l, i)) : ((i = Qt(i, a, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? ca(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (i.memoizedState = a),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = ua),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = _t(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function l1(e, t) {
  return (
    (t = Qo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Hr(e, t, n, r) {
  return (
    r !== null && Qa(r),
    En(t, e.child, null, n),
    (e = l1(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function T0(e, t, n, r, o, i, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Si(Error(N(422)))), Hr(e, t, a, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (o = t.mode),
          (r = Qo({ mode: "visible", children: r.children }, o, 0, null)),
          (i = Qt(i, o, a, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && En(t, e.child, null, a),
          (t.child.memoizedState = ca(a)),
          (t.memoizedState = ua),
          i);
  if (!(t.mode & 1)) return Hr(e, t, a, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (
      (r = l),
      (i = Error(N(419))),
      (r = Si(i, r, void 0)),
      Hr(e, t, a, r)
    );
  }
  if (((l = (a & e.childLanes) !== 0), Ae || l)) {
    if (((r = ve), r !== null)) {
      switch (a & -a) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      ((o = o & (r.suspendedLanes | a) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), gt(e, o), tt(r, e, o, -1)));
    }
    return (p1(), (r = Si(Error(N(421)))), Hr(e, t, a, r));
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = B0.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Ie = jt(o.nextSibling)),
      (Re = t),
      (re = !0),
      (qe = null),
      e !== null &&
        (($e[Ve++] = ft),
        ($e[Ve++] = pt),
        ($e[Ve++] = Kt),
        (ft = e.id),
        (pt = e.overflow),
        (Kt = t)),
      (t = l1(t, r.children)),
      (t.flags |= 4096),
      t);
}
function kl(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), ra(e.return, t, n));
}
function ki(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function O2(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((ze(e, t, r.children, n), (r = ie.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && kl(e, n, t);
        else if (e.tag === 19) kl(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((q(ie, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null;)
          ((e = n.alternate),
            e !== null && Eo(e) === null && (o = n),
            (n = n.sibling));
        ((n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          ki(t, !1, o, n, i));
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null;) {
          if (((e = o.alternate), e !== null && Eo(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        ki(t, !0, n, null, i);
        break;
      case "together":
        ki(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function io(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function yt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Xt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = _t(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = _t(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function E0(e, t, n) {
  switch (t.tag) {
    case 3:
      (I2(t), Tn());
      break;
    case 5:
      c2(t);
      break;
    case 1:
      Pe(t.type) && So(t);
      break;
    case 4:
      qa(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (q(bo, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (q(ie, ie.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? R2(e, t, n)
            : (q(ie, ie.current & 1),
              (e = yt(e, t, n)),
              e !== null ? e.sibling : null);
      q(ie, ie.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return O2(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        q(ie, ie.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), _2(e, t, n));
  }
  return yt(e, t, n);
}
var B2, da, F2, $2;
B2 = function (e, t) {
  for (var n = t.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
da = function () {};
F2 = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), Wt(st.current));
    var i = null;
    switch (n) {
      case "input":
        ((o = Pi(e, o)), (r = Pi(e, r)), (i = []));
        break;
      case "select":
        ((o = le({}, o, { value: void 0 })),
          (r = le({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((o = Ii(e, o)), (r = Ii(e, r)), (i = []));
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = wo);
    }
    Oi(n, r);
    var a;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var l = o[u];
          for (a in l) l.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (ar.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var c = r[u];
      if (
        ((l = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && c !== l && (c != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (a in l)
              !l.hasOwnProperty(a) ||
                (c && c.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in c)
              c.hasOwnProperty(a) &&
                l[a] !== c[a] &&
                (n || (n = {}), (n[a] = c[a]));
          } else (n || (i || (i = []), i.push(u, n)), (n = c));
        else
          u === "dangerouslySetInnerHTML"
            ? ((c = c ? c.__html : void 0),
              (l = l ? l.__html : void 0),
              c != null && l !== c && (i = i || []).push(u, c))
            : u === "children"
              ? (typeof c != "string" && typeof c != "number") ||
                (i = i || []).push(u, "" + c)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (ar.hasOwnProperty(u)
                  ? (c != null && u === "onScroll" && te("scroll", e),
                    i || l === c || (i = []))
                  : (i = i || []).push(u, c));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
$2 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function $n(e, t) {
  if (!re)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null;)
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null;)
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ke(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null;)
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling));
  else
    for (o = e.child; o !== null;)
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function M0(e, t, n) {
  var r = t.pendingProps;
  switch ((Ga(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ke(t), null);
    case 1:
      return (Pe(t.type) && xo(), ke(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Mn(),
        ne(Le),
        ne(be),
        t1(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          ($r(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), qe !== null && (wa(qe), (qe = null)))),
        da(e, t),
        ke(t),
        null
      );
    case 5:
      e1(t);
      var o = Wt(yr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (F2(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return (ke(t), null);
        }
        if (((e = Wt(st.current)), $r(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[at] = t), (r[vr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (te("cancel", r), te("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              te("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Zn.length; o++) te(Zn[o], r);
              break;
            case "source":
              te("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (te("error", r), te("load", r));
              break;
            case "details":
              te("toggle", r);
              break;
            case "input":
              (A1(r, i), te("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                te("invalid", r));
              break;
            case "textarea":
              (P1(r, i), te("invalid", r));
          }
          (Oi(n, i), (o = null));
          for (var a in i)
            if (i.hasOwnProperty(a)) {
              var l = i[a];
              a === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Fr(r.textContent, l, e),
                    (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Fr(r.textContent, l, e),
                    (o = ["children", "" + l]))
                : ar.hasOwnProperty(a) &&
                  l != null &&
                  a === "onScroll" &&
                  te("scroll", r);
            }
          switch (n) {
            case "input":
              (Lr(r), L1(r, i, !0));
              break;
            case "textarea":
              (Lr(r), _1(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = wo);
          }
          ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((a = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = hs(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = a.createElement(n, { is: r.is }))
                  : ((e = a.createElement(n)),
                    n === "select" &&
                      ((a = e),
                      r.multiple
                        ? (a.multiple = !0)
                        : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[at] = t),
            (e[vr] = r),
            B2(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((a = Bi(n, r)), n)) {
              case "dialog":
                (te("cancel", e), te("close", e), (o = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (te("load", e), (o = r));
                break;
              case "video":
              case "audio":
                for (o = 0; o < Zn.length; o++) te(Zn[o], e);
                o = r;
                break;
              case "source":
                (te("error", e), (o = r));
                break;
              case "img":
              case "image":
              case "link":
                (te("error", e), te("load", e), (o = r));
                break;
              case "details":
                (te("toggle", e), (o = r));
                break;
              case "input":
                (A1(e, r), (o = Pi(e, r)), te("invalid", e));
                break;
              case "option":
                o = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = le({}, r, { value: void 0 })),
                  te("invalid", e));
                break;
              case "textarea":
                (P1(e, r), (o = Ii(e, r)), te("invalid", e));
                break;
              default:
                o = r;
            }
            (Oi(n, o), (l = o));
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var c = l[i];
                i === "style"
                  ? ys(e, c)
                  : i === "dangerouslySetInnerHTML"
                    ? ((c = c ? c.__html : void 0), c != null && vs(e, c))
                    : i === "children"
                      ? typeof c == "string"
                        ? (n !== "textarea" || c !== "") && lr(e, c)
                        : typeof c == "number" && lr(e, "" + c)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (ar.hasOwnProperty(i)
                          ? c != null && i === "onScroll" && te("scroll", e)
                          : c != null && Aa(e, i, c, a));
              }
            switch (n) {
              case "input":
                (Lr(e), L1(e, r, !1));
                break;
              case "textarea":
                (Lr(e), _1(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Dt(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? gn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      gn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = wo);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ke(t), null);
    case 6:
      if (e && t.stateNode != null) $2(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = Wt(yr.current)), Wt(st.current), $r(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[at] = t),
            (i = r.nodeValue !== n) && ((e = Re), e !== null))
          )
            switch (e.tag) {
              case 3:
                Fr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Fr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[at] = t),
            (t.stateNode = r));
      }
      return (ke(t), null);
    case 13:
      if (
        (ne(ie),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (re && Ie !== null && t.mode & 1 && !(t.flags & 128))
          (i2(), Tn(), (t.flags |= 98560), (i = !1));
        else if (((i = $r(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(N(317));
            i[at] = t;
          } else
            (Tn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ke(t), (i = !1));
        } else (qe !== null && (wa(qe), (qe = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ie.current & 1 ? me === 0 && (me = 3) : p1())),
          t.updateQueue !== null && (t.flags |= 4),
          ke(t),
          null);
    case 4:
      return (
        Mn(),
        da(e, t),
        e === null && mr(t.stateNode.containerInfo),
        ke(t),
        null
      );
    case 10:
      return (Za(t.type._context), ke(t), null);
    case 17:
      return (Pe(t.type) && xo(), ke(t), null);
    case 19:
      if ((ne(ie), (i = t.memoizedState), i === null)) return (ke(t), null);
      if (((r = (t.flags & 128) !== 0), (a = i.rendering), a === null))
        if (r) $n(i, !1);
        else {
          if (me !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((a = Eo(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    $n(i, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (a = i.alternate),
                    a === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = a.childLanes),
                        (i.lanes = a.lanes),
                        (i.child = a.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = a.memoizedProps),
                        (i.memoizedState = a.memoizedState),
                        (i.updateQueue = a.updateQueue),
                        (i.type = a.type),
                        (e = a.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (q(ie, (ie.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            de() > jn &&
            ((t.flags |= 128), (r = !0), $n(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Eo(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              $n(i, !0),
              i.tail === null && i.tailMode === "hidden" && !a.alternate && !re)
            )
              return (ke(t), null);
          } else
            2 * de() - i.renderingStartTime > jn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), $n(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = i.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (i.last = a));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = de()),
          (t.sibling = null),
          (n = ie.current),
          q(ie, r ? (n & 1) | 2 : n & 1),
          t)
        : (ke(t), null);
    case 22:
    case 23:
      return (
        f1(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? De & 1073741824 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ke(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function N0(e, t) {
  switch ((Ga(t), t.tag)) {
    case 1:
      return (
        Pe(t.type) && xo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Mn(),
        ne(Le),
        ne(be),
        t1(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (e1(t), null);
    case 13:
      if (
        (ne(ie), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(N(340));
        Tn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ne(ie), null);
    case 4:
      return (Mn(), null);
    case 10:
      return (Za(t.type._context), null);
    case 22:
    case 23:
      return (f1(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ur = !1,
  Ce = !1,
  j0 = typeof WeakSet == "function" ? WeakSet : Set,
  I = null;
function hn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ce(e, t, r);
      }
    else n.current = null;
}
function fa(e, t, n) {
  try {
    n();
  } catch (r) {
    ce(e, t, r);
  }
}
var Cl = !1;
function A0(e, t) {
  if (((Ki = vo), (e = Gs()), Ua(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            l = -1,
            c = -1,
            u = 0,
            v = 0,
            m = e,
            p = null;
          t: for (;;) {
            for (
              var w;
              m !== n || (o !== 0 && m.nodeType !== 3) || (l = a + o),
                m !== i || (r !== 0 && m.nodeType !== 3) || (c = a + r),
                m.nodeType === 3 && (a += m.nodeValue.length),
                (w = m.firstChild) !== null;
            )
              ((p = m), (m = w));
            for (;;) {
              if (m === e) break t;
              if (
                (p === n && ++u === o && (l = a),
                p === i && ++v === r && (c = a),
                (w = m.nextSibling) !== null)
              )
                break;
              ((m = p), (p = m.parentNode));
            }
            m = w;
          }
          n = l === -1 || c === -1 ? null : { start: l, end: c };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Zi = { focusedElem: e, selectionRange: n }, vo = !1, I = t; I !== null;)
    if (((t = I), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (I = e));
    else
      for (; I !== null;) {
        t = I;
        try {
          var C = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (C !== null) {
                  var S = C.memoizedProps,
                    z = C.memoizedState,
                    d = t.stateNode,
                    f = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : Xe(t.type, S),
                      z
                    );
                  d.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (x) {
          ce(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (I = e));
          break;
        }
        I = t.return;
      }
  return ((C = Cl), (Cl = !1), C);
}
function rr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        ((o.destroy = void 0), i !== void 0 && fa(t, n, i));
      }
      o = o.next;
    } while (o !== r);
  }
}
function Wo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function pa(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function V2(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), V2(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[at], delete t[vr], delete t[qi], delete t[p0], delete t[m0])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function H2(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function bl(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || H2(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ma(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = wo)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ma(e, t, n), e = e.sibling; e !== null;)
      (ma(e, t, n), (e = e.sibling));
}
function ha(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ha(e, t, n), e = e.sibling; e !== null;)
      (ha(e, t, n), (e = e.sibling));
}
var ye = null,
  Je = !1;
function xt(e, t, n) {
  for (n = n.child; n !== null;) (U2(e, t, n), (n = n.sibling));
}
function U2(e, t, n) {
  if (lt && typeof lt.onCommitFiberUnmount == "function")
    try {
      lt.onCommitFiberUnmount(Ro, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ce || hn(n, t);
    case 6:
      var r = ye,
        o = Je;
      ((ye = null),
        xt(e, t, n),
        (ye = r),
        (Je = o),
        ye !== null &&
          (Je
            ? ((e = ye),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ye.removeChild(n.stateNode)));
      break;
    case 18:
      ye !== null &&
        (Je
          ? ((e = ye),
            (n = n.stateNode),
            e.nodeType === 8
              ? hi(e.parentNode, n)
              : e.nodeType === 1 && hi(e, n),
            dr(e))
          : hi(ye, n.stateNode));
      break;
    case 4:
      ((r = ye),
        (o = Je),
        (ye = n.stateNode.containerInfo),
        (Je = !0),
        xt(e, t, n),
        (ye = r),
        (Je = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ce &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            a = i.destroy;
          ((i = i.tag),
            a !== void 0 && (i & 2 || i & 4) && fa(n, t, a),
            (o = o.next));
        } while (o !== r);
      }
      xt(e, t, n);
      break;
    case 1:
      if (
        !Ce &&
        (hn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (l) {
          ce(n, t, l);
        }
      xt(e, t, n);
      break;
    case 21:
      xt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ce = (r = Ce) || n.memoizedState !== null), xt(e, t, n), (Ce = r))
        : xt(e, t, n);
      break;
    default:
      xt(e, t, n);
  }
}
function zl(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new j0()),
      t.forEach(function (r) {
        var o = F0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      }));
  }
}
function Ke(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          a = t,
          l = a;
        e: for (; l !== null;) {
          switch (l.tag) {
            case 5:
              ((ye = l.stateNode), (Je = !1));
              break e;
            case 3:
              ((ye = l.stateNode.containerInfo), (Je = !0));
              break e;
            case 4:
              ((ye = l.stateNode.containerInfo), (Je = !0));
              break e;
          }
          l = l.return;
        }
        if (ye === null) throw Error(N(160));
        (U2(i, a, o), (ye = null), (Je = !1));
        var c = o.alternate;
        (c !== null && (c.return = null), (o.return = null));
      } catch (u) {
        ce(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (W2(t, e), (t = t.sibling));
}
function W2(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ke(t, e), ot(e), r & 4)) {
        try {
          (rr(3, e, e.return), Wo(3, e));
        } catch (S) {
          ce(e, e.return, S);
        }
        try {
          rr(5, e, e.return);
        } catch (S) {
          ce(e, e.return, S);
        }
      }
      break;
    case 1:
      (Ke(t, e), ot(e), r & 512 && n !== null && hn(n, n.return));
      break;
    case 5:
      if (
        (Ke(t, e),
        ot(e),
        r & 512 && n !== null && hn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          lr(o, "");
        } catch (S) {
          ce(e, e.return, S);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          a = n !== null ? n.memoizedProps : i,
          l = e.type,
          c = e.updateQueue;
        if (((e.updateQueue = null), c !== null))
          try {
            (l === "input" && i.type === "radio" && i.name != null && ps(o, i),
              Bi(l, a));
            var u = Bi(l, i);
            for (a = 0; a < c.length; a += 2) {
              var v = c[a],
                m = c[a + 1];
              v === "style"
                ? ys(o, m)
                : v === "dangerouslySetInnerHTML"
                  ? vs(o, m)
                  : v === "children"
                    ? lr(o, m)
                    : Aa(o, v, m, u);
            }
            switch (l) {
              case "input":
                _i(o, i);
                break;
              case "textarea":
                ms(o, i);
                break;
              case "select":
                var p = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var w = i.value;
                w != null
                  ? gn(o, !!i.multiple, w, !1)
                  : p !== !!i.multiple &&
                    (i.defaultValue != null
                      ? gn(o, !!i.multiple, i.defaultValue, !0)
                      : gn(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[vr] = i;
          } catch (S) {
            ce(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((Ke(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        ((o = e.stateNode), (i = e.memoizedProps));
        try {
          o.nodeValue = i;
        } catch (S) {
          ce(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (Ke(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          dr(t.containerInfo);
        } catch (S) {
          ce(e, e.return, S);
        }
      break;
    case 4:
      (Ke(t, e), ot(e));
      break;
    case 13:
      (Ke(t, e),
        ot(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (c1 = de())),
        r & 4 && zl(e));
      break;
    case 22:
      if (
        ((v = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ce = (u = Ce) || v), Ke(t, e), (Ce = u)) : Ke(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !v && e.mode & 1)
        )
          for (I = e, v = e.child; v !== null;) {
            for (m = I = v; I !== null;) {
              switch (((p = I), (w = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  rr(4, p, p.return);
                  break;
                case 1:
                  hn(p, p.return);
                  var C = p.stateNode;
                  if (typeof C.componentWillUnmount == "function") {
                    ((r = p), (n = p.return));
                    try {
                      ((t = r),
                        (C.props = t.memoizedProps),
                        (C.state = t.memoizedState),
                        C.componentWillUnmount());
                    } catch (S) {
                      ce(r, n, S);
                    }
                  }
                  break;
                case 5:
                  hn(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    El(m);
                    continue;
                  }
              }
              w !== null ? ((w.return = p), (I = w)) : El(m);
            }
            v = v.sibling;
          }
        e: for (v = null, m = e; ;) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                ((o = m.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((l = m.stateNode),
                      (c = m.memoizedProps.style),
                      (a =
                        c != null && c.hasOwnProperty("display")
                          ? c.display
                          : null),
                      (l.style.display = gs("display", a))));
              } catch (S) {
                ce(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (v === null)
              try {
                m.stateNode.nodeValue = u ? "" : m.memoizedProps;
              } catch (S) {
                ce(e, e.return, S);
              }
          } else if (
            ((m.tag !== 22 && m.tag !== 23) ||
              m.memoizedState === null ||
              m === e) &&
            m.child !== null
          ) {
            ((m.child.return = m), (m = m.child));
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null;) {
            if (m.return === null || m.return === e) break e;
            (v === m && (v = null), (m = m.return));
          }
          (v === m && (v = null),
            (m.sibling.return = m.return),
            (m = m.sibling));
        }
      }
      break;
    case 19:
      (Ke(t, e), ot(e), r & 4 && zl(e));
      break;
    case 21:
      break;
    default:
      (Ke(t, e), ot(e));
  }
}
function ot(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (H2(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (lr(o, ""), (r.flags &= -33));
          var i = bl(e);
          ha(e, i, o);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            l = bl(e);
          ma(e, l, a);
          break;
        default:
          throw Error(N(161));
      }
    } catch (c) {
      ce(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function L0(e, t, n) {
  ((I = e), G2(e));
}
function G2(e, t, n) {
  for (var r = (e.mode & 1) !== 0; I !== null;) {
    var o = I,
      i = o.child;
    if (o.tag === 22 && r) {
      var a = o.memoizedState !== null || Ur;
      if (!a) {
        var l = o.alternate,
          c = (l !== null && l.memoizedState !== null) || Ce;
        l = Ur;
        var u = Ce;
        if (((Ur = a), (Ce = c) && !u))
          for (I = o; I !== null;)
            ((a = I),
              (c = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? Ml(o)
                : c !== null
                  ? ((c.return = a), (I = c))
                  : Ml(o));
        for (; i !== null;) ((I = i), G2(i), (i = i.sibling));
        ((I = o), (Ur = l), (Ce = u));
      }
      Tl(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (I = i)) : Tl(e);
  }
}
function Tl(e) {
  for (; I !== null;) {
    var t = I;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ce || Wo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ce)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Xe(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && cl(t, i, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                cl(t, a, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var c = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    c.autoFocus && n.focus();
                    break;
                  case "img":
                    c.src && (n.src = c.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var v = u.memoizedState;
                  if (v !== null) {
                    var m = v.dehydrated;
                    m !== null && dr(m);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        Ce || (t.flags & 512 && pa(t));
      } catch (p) {
        ce(t, t.return, p);
      }
    }
    if (t === e) {
      I = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (I = n));
      break;
    }
    I = t.return;
  }
}
function El(e) {
  for (; I !== null;) {
    var t = I;
    if (t === e) {
      I = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (I = n));
      break;
    }
    I = t.return;
  }
}
function Ml(e) {
  for (; I !== null;) {
    var t = I;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Wo(4, t);
          } catch (c) {
            ce(t, n, c);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (c) {
              ce(t, o, c);
            }
          }
          var i = t.return;
          try {
            pa(t);
          } catch (c) {
            ce(t, i, c);
          }
          break;
        case 5:
          var a = t.return;
          try {
            pa(t);
          } catch (c) {
            ce(t, a, c);
          }
      }
    } catch (c) {
      ce(t, t.return, c);
    }
    if (t === e) {
      I = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      ((l.return = t.return), (I = l));
      break;
    }
    I = t.return;
  }
}
var P0 = Math.ceil,
  jo = wt.ReactCurrentDispatcher,
  s1 = wt.ReactCurrentOwner,
  Ue = wt.ReactCurrentBatchConfig,
  K = 0,
  ve = null,
  fe = null,
  we = 0,
  De = 0,
  vn = Ot(0),
  me = 0,
  kr = null,
  Xt = 0,
  Go = 0,
  u1 = 0,
  or = null,
  je = null,
  c1 = 0,
  jn = 1 / 0,
  ct = null,
  Ao = !1,
  va = null,
  Lt = null,
  Wr = !1,
  Tt = null,
  Lo = 0,
  ir = 0,
  ga = null,
  ao = -1,
  lo = 0;
function Te() {
  return K & 6 ? de() : ao !== -1 ? ao : (ao = de());
}
function Pt(e) {
  return e.mode & 1
    ? K & 2 && we !== 0
      ? we & -we
      : v0.transition !== null
        ? (lo === 0 && (lo = js()), lo)
        : ((e = J),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Rs(e.type))),
          e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < ir) throw ((ir = 0), (ga = null), Error(N(185)));
  (Tr(e, n, r),
    (!(K & 2) || e !== ve) &&
      (e === ve && (!(K & 2) && (Go |= n), me === 4 && bt(e, we)),
      _e(e, r),
      n === 1 && K === 0 && !(t.mode & 1) && ((jn = de() + 500), Vo && Bt())));
}
function _e(e, t) {
  var n = e.callbackNode;
  vc(e, t);
  var r = ho(e, e === ve ? we : 0);
  if (r === 0)
    (n !== null && R1(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && R1(n), t === 1))
      (e.tag === 0 ? h0(Nl.bind(null, e)) : n2(Nl.bind(null, e)),
        d0(function () {
          !(K & 6) && Bt();
        }),
        (n = null));
    else {
      switch (As(r)) {
        case 1:
          n = Ia;
          break;
        case 4:
          n = Ms;
          break;
        case 16:
          n = mo;
          break;
        case 536870912:
          n = Ns;
          break;
        default:
          n = mo;
      }
      n = eu(n, Q2.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Q2(e, t) {
  if (((ao = -1), (lo = 0), K & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (kn() && e.callbackNode !== n) return null;
  var r = ho(e, e === ve ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Po(e, r);
  else {
    t = r;
    var o = K;
    K |= 2;
    var i = K2();
    (ve !== e || we !== t) && ((ct = null), (jn = de() + 500), Gt(e, t));
    do
      try {
        I0();
        break;
      } catch (l) {
        Y2(e, l);
      }
    while (!0);
    (Ka(),
      (jo.current = i),
      (K = o),
      fe !== null ? (t = 0) : ((ve = null), (we = 0), (t = me)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Ui(e)), o !== 0 && ((r = o), (t = ya(e, o)))), t === 1)
    )
      throw ((n = kr), Gt(e, 0), bt(e, r), _e(e, de()), n);
    if (t === 6) bt(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !_0(o) &&
          ((t = Po(e, r)),
          t === 2 && ((i = Ui(e)), i !== 0 && ((r = i), (t = ya(e, i)))),
          t === 1))
      )
        throw ((n = kr), Gt(e, 0), bt(e, r), _e(e, de()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Vt(e, je, ct);
          break;
        case 3:
          if (
            (bt(e, r), (r & 130023424) === r && ((t = c1 + 500 - de()), 10 < t))
          ) {
            if (ho(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (Te(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = Ji(Vt.bind(null, e, je, ct), t);
            break;
          }
          Vt(e, je, ct);
          break;
        case 4:
          if ((bt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r;) {
            var a = 31 - et(r);
            ((i = 1 << a), (a = t[a]), a > o && (o = a), (r &= ~i));
          }
          if (
            ((r = o),
            (r = de() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * P0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ji(Vt.bind(null, e, je, ct), r);
            break;
          }
          Vt(e, je, ct);
          break;
        case 5:
          Vt(e, je, ct);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return (_e(e, de()), e.callbackNode === n ? Q2.bind(null, e) : null);
}
function ya(e, t) {
  var n = or;
  return (
    e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256),
    (e = Po(e, t)),
    e !== 2 && ((t = je), (je = n), t !== null && wa(t)),
    e
  );
}
function wa(e) {
  je === null ? (je = e) : je.push.apply(je, e);
}
function _0(e) {
  for (var t = e; ;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!nt(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function bt(e, t) {
  for (
    t &= ~u1,
      t &= ~Go,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - et(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Nl(e) {
  if (K & 6) throw Error(N(327));
  kn();
  var t = ho(e, 0);
  if (!(t & 1)) return (_e(e, de()), null);
  var n = Po(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ui(e);
    r !== 0 && ((t = r), (n = ya(e, r)));
  }
  if (n === 1) throw ((n = kr), Gt(e, 0), bt(e, t), _e(e, de()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Vt(e, je, ct),
    _e(e, de()),
    null
  );
}
function d1(e, t) {
  var n = K;
  K |= 1;
  try {
    return e(t);
  } finally {
    ((K = n), K === 0 && ((jn = de() + 500), Vo && Bt()));
  }
}
function Jt(e) {
  Tt !== null && Tt.tag === 0 && !(K & 6) && kn();
  var t = K;
  K |= 1;
  var n = Ue.transition,
    r = J;
  try {
    if (((Ue.transition = null), (J = 1), e)) return e();
  } finally {
    ((J = r), (Ue.transition = n), (K = t), !(K & 6) && Bt());
  }
}
function f1() {
  ((De = vn.current), ne(vn));
}
function Gt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), c0(n)), fe !== null))
    for (n = fe.return; n !== null;) {
      var r = n;
      switch ((Ga(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && xo());
          break;
        case 3:
          (Mn(), ne(Le), ne(be), t1());
          break;
        case 5:
          e1(r);
          break;
        case 4:
          Mn();
          break;
        case 13:
          ne(ie);
          break;
        case 19:
          ne(ie);
          break;
        case 10:
          Za(r.type._context);
          break;
        case 22:
        case 23:
          f1();
      }
      n = n.return;
    }
  if (
    ((ve = e),
    (fe = e = _t(e.current, null)),
    (we = De = t),
    (me = 0),
    (kr = null),
    (u1 = Go = Xt = 0),
    (je = or = null),
    Ut !== null)
  ) {
    for (t = 0; t < Ut.length; t++)
      if (((n = Ut[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var a = i.next;
          ((i.next = o), (r.next = a));
        }
        n.pending = r;
      }
    Ut = null;
  }
  return e;
}
function Y2(e, t) {
  do {
    var n = fe;
    try {
      if ((Ka(), (ro.current = No), Mo)) {
        for (var r = ae.memoizedState; r !== null;) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        Mo = !1;
      }
      if (
        ((Zt = 0),
        (he = pe = ae = null),
        (nr = !1),
        (wr = 0),
        (s1.current = null),
        n === null || n.return === null)
      ) {
        ((me = 1), (kr = t), (fe = null));
        break;
      }
      e: {
        var i = e,
          a = n.return,
          l = n,
          c = t;
        if (
          ((t = we),
          (l.flags |= 32768),
          c !== null && typeof c == "object" && typeof c.then == "function")
        ) {
          var u = c,
            v = l,
            m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = v.alternate;
            p
              ? ((v.updateQueue = p.updateQueue),
                (v.memoizedState = p.memoizedState),
                (v.lanes = p.lanes))
              : ((v.updateQueue = null), (v.memoizedState = null));
          }
          var w = vl(a);
          if (w !== null) {
            ((w.flags &= -257),
              gl(w, a, l, i, t),
              w.mode & 1 && hl(i, u, t),
              (t = w),
              (c = u));
            var C = t.updateQueue;
            if (C === null) {
              var S = new Set();
              (S.add(c), (t.updateQueue = S));
            } else C.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              (hl(i, u, t), p1());
              break e;
            }
            c = Error(N(426));
          }
        } else if (re && l.mode & 1) {
          var z = vl(a);
          if (z !== null) {
            (!(z.flags & 65536) && (z.flags |= 256),
              gl(z, a, l, i, t),
              Qa(Nn(c, l)));
            break e;
          }
        }
        ((i = c = Nn(c, l)),
          me !== 4 && (me = 2),
          or === null ? (or = [i]) : or.push(i),
          (i = a));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var d = A2(i, c, t);
              ul(i, d);
              break e;
            case 1:
              l = c;
              var f = i.type,
                h = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (Lt === null || !Lt.has(h))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var x = L2(i, l, t);
                ul(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      X2(n);
    } catch (k) {
      ((t = k), fe === n && n !== null && (fe = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function K2() {
  var e = jo.current;
  return ((jo.current = No), e === null ? No : e);
}
function p1() {
  ((me === 0 || me === 3 || me === 2) && (me = 4),
    ve === null || (!(Xt & 268435455) && !(Go & 268435455)) || bt(ve, we));
}
function Po(e, t) {
  var n = K;
  K |= 2;
  var r = K2();
  (ve !== e || we !== t) && ((ct = null), Gt(e, t));
  do
    try {
      D0();
      break;
    } catch (o) {
      Y2(e, o);
    }
  while (!0);
  if ((Ka(), (K = n), (jo.current = r), fe !== null)) throw Error(N(261));
  return ((ve = null), (we = 0), me);
}
function D0() {
  for (; fe !== null;) Z2(fe);
}
function I0() {
  for (; fe !== null && !lc();) Z2(fe);
}
function Z2(e) {
  var t = q2(e.alternate, e, De);
  ((e.memoizedProps = e.pendingProps),
    t === null ? X2(e) : (fe = t),
    (s1.current = null));
}
function X2(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = N0(n, t)), n !== null)) {
        ((n.flags &= 32767), (fe = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((me = 6), (fe = null));
        return;
      }
    } else if (((n = M0(n, t, De)), n !== null)) {
      fe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      fe = t;
      return;
    }
    fe = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function Vt(e, t, n) {
  var r = J,
    o = Ue.transition;
  try {
    ((Ue.transition = null), (J = 1), R0(e, t, n, r));
  } finally {
    ((Ue.transition = o), (J = r));
  }
  return null;
}
function R0(e, t, n, r) {
  do kn();
  while (Tt !== null);
  if (K & 6) throw Error(N(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (gc(e, i),
    e === ve && ((fe = ve = null), (we = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Wr ||
      ((Wr = !0),
      eu(mo, function () {
        return (kn(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = Ue.transition), (Ue.transition = null));
    var a = J;
    J = 1;
    var l = K;
    ((K |= 4),
      (s1.current = null),
      A0(e, n),
      W2(n, e),
      r0(Zi),
      (vo = !!Ki),
      (Zi = Ki = null),
      (e.current = n),
      L0(n),
      sc(),
      (K = l),
      (J = a),
      (Ue.transition = i));
  } else e.current = n;
  if (
    (Wr && ((Wr = !1), (Tt = e), (Lo = o)),
    (i = e.pendingLanes),
    i === 0 && (Lt = null),
    dc(n.stateNode),
    _e(e, de()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (Ao) throw ((Ao = !1), (e = va), (va = null), e);
  return (
    Lo & 1 && e.tag !== 0 && kn(),
    (i = e.pendingLanes),
    i & 1 ? (e === ga ? ir++ : ((ir = 0), (ga = e))) : (ir = 0),
    Bt(),
    null
  );
}
function kn() {
  if (Tt !== null) {
    var e = As(Lo),
      t = Ue.transition,
      n = J;
    try {
      if (((Ue.transition = null), (J = 16 > e ? 16 : e), Tt === null))
        var r = !1;
      else {
        if (((e = Tt), (Tt = null), (Lo = 0), K & 6)) throw Error(N(331));
        var o = K;
        for (K |= 4, I = e.current; I !== null;) {
          var i = I,
            a = i.child;
          if (I.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var c = 0; c < l.length; c++) {
                var u = l[c];
                for (I = u; I !== null;) {
                  var v = I;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      rr(8, v, i);
                  }
                  var m = v.child;
                  if (m !== null) ((m.return = v), (I = m));
                  else
                    for (; I !== null;) {
                      v = I;
                      var p = v.sibling,
                        w = v.return;
                      if ((V2(v), v === u)) {
                        I = null;
                        break;
                      }
                      if (p !== null) {
                        ((p.return = w), (I = p));
                        break;
                      }
                      I = w;
                    }
                }
              }
              var C = i.alternate;
              if (C !== null) {
                var S = C.child;
                if (S !== null) {
                  C.child = null;
                  do {
                    var z = S.sibling;
                    ((S.sibling = null), (S = z));
                  } while (S !== null);
                }
              }
              I = i;
            }
          }
          if (i.subtreeFlags & 2064 && a !== null) ((a.return = i), (I = a));
          else
            e: for (; I !== null;) {
              if (((i = I), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    rr(9, i, i.return);
                }
              var d = i.sibling;
              if (d !== null) {
                ((d.return = i.return), (I = d));
                break e;
              }
              I = i.return;
            }
        }
        var f = e.current;
        for (I = f; I !== null;) {
          a = I;
          var h = a.child;
          if (a.subtreeFlags & 2064 && h !== null) ((h.return = a), (I = h));
          else
            e: for (a = f; I !== null;) {
              if (((l = I), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Wo(9, l);
                  }
                } catch (k) {
                  ce(l, l.return, k);
                }
              if (l === a) {
                I = null;
                break e;
              }
              var x = l.sibling;
              if (x !== null) {
                ((x.return = l.return), (I = x));
                break e;
              }
              I = l.return;
            }
        }
        if (
          ((K = o), Bt(), lt && typeof lt.onPostCommitFiberRoot == "function")
        )
          try {
            lt.onPostCommitFiberRoot(Ro, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((J = n), (Ue.transition = t));
    }
  }
  return !1;
}
function jl(e, t, n) {
  ((t = Nn(n, t)),
    (t = A2(e, t, 1)),
    (e = At(e, t, 1)),
    (t = Te()),
    e !== null && (Tr(e, 1, t), _e(e, t)));
}
function ce(e, t, n) {
  if (e.tag === 3) jl(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        jl(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Lt === null || !Lt.has(r)))
        ) {
          ((e = Nn(n, e)),
            (e = L2(t, e, 1)),
            (t = At(t, e, 1)),
            (e = Te()),
            t !== null && (Tr(t, 1, e), _e(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function O0(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Te()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ve === e &&
      (we & n) === n &&
      (me === 4 || (me === 3 && (we & 130023424) === we && 500 > de() - c1)
        ? Gt(e, 0)
        : (u1 |= n)),
    _e(e, t));
}
function J2(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Dr), (Dr <<= 1), !(Dr & 130023424) && (Dr = 4194304))
      : (t = 1));
  var n = Te();
  ((e = gt(e, t)), e !== null && (Tr(e, t, n), _e(e, n)));
}
function B0(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), J2(e, n));
}
function F0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  (r !== null && r.delete(t), J2(e, n));
}
var q2;
q2 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Le.current) Ae = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ae = !1), E0(e, t, n));
      Ae = !!(e.flags & 131072);
    }
  else ((Ae = !1), re && t.flags & 1048576 && r2(t, Co, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (io(e, t), (e = t.pendingProps));
      var o = zn(t, be.current);
      (Sn(t, n), (o = r1(null, t, r, e, o, n)));
      var i = o1();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Pe(r) ? ((i = !0), So(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            Ja(t),
            (o.updater = Uo),
            (t.stateNode = o),
            (o._reactInternals = t),
            ia(t, r, e, n),
            (t = sa(null, t, r, !0, i, n)))
          : ((t.tag = 0), re && i && Wa(t), ze(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (io(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = V0(r)),
          (e = Xe(r, e)),
          o)
        ) {
          case 0:
            t = la(null, t, r, e, n);
            break e;
          case 1:
            t = xl(null, t, r, e, n);
            break e;
          case 11:
            t = yl(null, t, r, e, n);
            break e;
          case 14:
            t = wl(null, t, r, Xe(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        la(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        xl(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((I2(t), e === null)) throw Error(N(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          u2(e, t),
          To(t, r, null, n));
        var a = t.memoizedState;
        if (((r = a.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((o = Nn(Error(N(423)), t)), (t = Sl(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Nn(Error(N(424)), t)), (t = Sl(e, t, r, n, o)));
            break e;
          } else
            for (
              Ie = jt(t.stateNode.containerInfo.firstChild),
                Re = t,
                re = !0,
                qe = null,
                n = l2(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Tn(), r === o)) {
            t = yt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        c2(t),
        e === null && na(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (a = o.children),
        Xi(r, o) ? (a = null) : i !== null && Xi(r, i) && (t.flags |= 32),
        D2(e, t),
        ze(e, t, a, n),
        t.child
      );
    case 6:
      return (e === null && na(t), null);
    case 13:
      return R2(e, t, n);
    case 4:
      return (
        qa(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = En(t, null, r, n)) : ze(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        yl(e, t, r, o, n)
      );
    case 7:
      return (ze(e, t, t.pendingProps, n), t.child);
    case 8:
      return (ze(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (ze(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (a = o.value),
          q(bo, r._currentValue),
          (r._currentValue = a),
          i !== null)
        )
          if (nt(i.value, a)) {
            if (i.children === o.children && !Le.current) {
              t = yt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null;) {
              var l = i.dependencies;
              if (l !== null) {
                a = i.child;
                for (var c = l.firstContext; c !== null;) {
                  if (c.context === r) {
                    if (i.tag === 1) {
                      ((c = mt(-1, n & -n)), (c.tag = 2));
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var v = u.pending;
                        (v === null
                          ? (c.next = c)
                          : ((c.next = v.next), (v.next = c)),
                          (u.pending = c));
                      }
                    }
                    ((i.lanes |= n),
                      (c = i.alternate),
                      c !== null && (c.lanes |= n),
                      ra(i.return, n, t),
                      (l.lanes |= n));
                    break;
                  }
                  c = c.next;
                }
              } else if (i.tag === 10) a = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((a = i.return), a === null)) throw Error(N(341));
                ((a.lanes |= n),
                  (l = a.alternate),
                  l !== null && (l.lanes |= n),
                  ra(a, n, t),
                  (a = i.sibling));
              } else a = i.child;
              if (a !== null) a.return = i;
              else
                for (a = i; a !== null;) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((i = a.sibling), i !== null)) {
                    ((i.return = a.return), (a = i));
                    break;
                  }
                  a = a.return;
                }
              i = a;
            }
        (ze(e, t, o.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Sn(t, n),
        (o = We(o)),
        (r = r(o)),
        (t.flags |= 1),
        ze(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = Xe(r, t.pendingProps)),
        (o = Xe(r.type, o)),
        wl(e, t, r, o, n)
      );
    case 15:
      return P2(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Xe(r, o)),
        io(e, t),
        (t.tag = 1),
        Pe(r) ? ((e = !0), So(t)) : (e = !1),
        Sn(t, n),
        j2(t, r, o),
        ia(t, r, o, n),
        sa(null, t, r, !0, e, n)
      );
    case 19:
      return O2(e, t, n);
    case 22:
      return _2(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function eu(e, t) {
  return Es(e, t);
}
function $0(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function He(e, t, n, r) {
  return new $0(e, t, n, r);
}
function m1(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function V0(e) {
  if (typeof e == "function") return m1(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Pa)) return 11;
    if (e === _a) return 14;
  }
  return 2;
}
function _t(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = He(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function so(e, t, n, r, o, i) {
  var a = 2;
  if (((r = e), typeof e == "function")) m1(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case an:
        return Qt(n.children, o, i, t);
      case La:
        ((a = 8), (o |= 8));
        break;
      case Ni:
        return (
          (e = He(12, n, t, o | 2)),
          (e.elementType = Ni),
          (e.lanes = i),
          e
        );
      case ji:
        return ((e = He(13, n, t, o)), (e.elementType = ji), (e.lanes = i), e);
      case Ai:
        return ((e = He(19, n, t, o)), (e.elementType = Ai), (e.lanes = i), e);
      case cs:
        return Qo(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case ss:
              a = 10;
              break e;
            case us:
              a = 9;
              break e;
            case Pa:
              a = 11;
              break e;
            case _a:
              a = 14;
              break e;
            case St:
              ((a = 16), (r = null));
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = He(a, n, t, o)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Qt(e, t, n, r) {
  return ((e = He(7, e, r, t)), (e.lanes = n), e);
}
function Qo(e, t, n, r) {
  return (
    (e = He(22, e, r, t)),
    (e.elementType = cs),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ci(e, t, n) {
  return ((e = He(6, e, null, t)), (e.lanes = n), e);
}
function bi(e, t, n) {
  return (
    (t = He(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function H0(e, t, n, r, o) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = oi(0)),
    (this.expirationTimes = oi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = oi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function h1(e, t, n, r, o, i, a, l, c) {
  return (
    (e = new H0(e, t, n, l, c)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = He(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ja(i),
    e
  );
}
function U0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: on,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function tu(e) {
  if (!e) return It;
  e = e._reactInternals;
  e: {
    if (en(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Pe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Pe(n)) return t2(e, n, t);
  }
  return t;
}
function nu(e, t, n, r, o, i, a, l, c) {
  return (
    (e = h1(n, r, !0, e, o, i, a, l, c)),
    (e.context = tu(null)),
    (n = e.current),
    (r = Te()),
    (o = Pt(n)),
    (i = mt(r, o)),
    (i.callback = t ?? null),
    At(n, i, o),
    (e.current.lanes = o),
    Tr(e, o, r),
    _e(e, r),
    e
  );
}
function Yo(e, t, n, r) {
  var o = t.current,
    i = Te(),
    a = Pt(o);
  return (
    (n = tu(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = mt(i, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = At(o, t, a)),
    e !== null && (tt(e, o, a, i), no(e, o, a)),
    a
  );
}
function _o(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Al(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function v1(e, t) {
  (Al(e, t), (e = e.alternate) && Al(e, t));
}
function W0() {
  return null;
}
var ru =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function g1(e) {
  this._internalRoot = e;
}
Ko.prototype.render = g1.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Yo(e, t, null, null);
};
Ko.prototype.unmount = g1.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Jt(function () {
      Yo(null, e, null, null);
    }),
      (t[vt] = null));
  }
};
function Ko(e) {
  this._internalRoot = e;
}
Ko.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = _s();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ct.length && t !== 0 && t < Ct[n].priority; n++);
    (Ct.splice(n, 0, e), n === 0 && Is(e));
  }
};
function y1(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Zo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ll() {}
function G0(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = _o(a);
        i.call(u);
      };
    }
    var a = nu(t, r, e, 0, null, !1, !1, "", Ll);
    return (
      (e._reactRootContainer = a),
      (e[vt] = a.current),
      mr(e.nodeType === 8 ? e.parentNode : e),
      Jt(),
      a
    );
  }
  for (; (o = e.lastChild);) e.removeChild(o);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = _o(c);
      l.call(u);
    };
  }
  var c = h1(e, 0, !1, null, null, !1, !1, "", Ll);
  return (
    (e._reactRootContainer = c),
    (e[vt] = c.current),
    mr(e.nodeType === 8 ? e.parentNode : e),
    Jt(function () {
      Yo(t, c, n, r);
    }),
    c
  );
}
function Xo(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var a = i;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var c = _o(a);
        l.call(c);
      };
    }
    Yo(t, a, e, o);
  } else a = G0(n, t, e, o, r);
  return _o(a);
}
Ls = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Kn(t.pendingLanes);
        n !== 0 &&
          (Ra(t, n | 1), _e(t, de()), !(K & 6) && ((jn = de() + 500), Bt()));
      }
      break;
    case 13:
      (Jt(function () {
        var r = gt(e, 1);
        if (r !== null) {
          var o = Te();
          tt(r, e, 1, o);
        }
      }),
        v1(e, 1));
  }
};
Oa = function (e) {
  if (e.tag === 13) {
    var t = gt(e, 134217728);
    if (t !== null) {
      var n = Te();
      tt(t, e, 134217728, n);
    }
    v1(e, 134217728);
  }
};
Ps = function (e) {
  if (e.tag === 13) {
    var t = Pt(e),
      n = gt(e, t);
    if (n !== null) {
      var r = Te();
      tt(n, e, t, r);
    }
    v1(e, t);
  }
};
_s = function () {
  return J;
};
Ds = function (e, t) {
  var n = J;
  try {
    return ((J = e), t());
  } finally {
    J = n;
  }
};
$i = function (e, t, n) {
  switch (t) {
    case "input":
      if ((_i(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode;) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = $o(r);
            if (!o) throw Error(N(90));
            (fs(r), _i(r, o));
          }
        }
      }
      break;
    case "textarea":
      ms(e, n);
      break;
    case "select":
      ((t = n.value), t != null && gn(e, !!n.multiple, t, !1));
  }
};
Ss = d1;
ks = Jt;
var Q0 = { usingClientEntryPoint: !1, Events: [Mr, cn, $o, ws, xs, d1] },
  Vn = {
    findFiberByHostInstance: Ht,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Y0 = {
    bundleType: Vn.bundleType,
    version: Vn.version,
    rendererPackageName: Vn.rendererPackageName,
    rendererConfig: Vn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: wt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = zs(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Vn.findFiberByHostInstance || W0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Gr.isDisabled && Gr.supportsFiber)
    try {
      ((Ro = Gr.inject(Y0)), (lt = Gr));
    } catch {}
}
Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q0;
Be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!y1(t)) throw Error(N(200));
  return U0(e, t, null, n);
};
Be.createRoot = function (e, t) {
  if (!y1(e)) throw Error(N(299));
  var n = !1,
    r = "",
    o = ru;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = h1(e, 1, !1, null, null, n, !1, r, o)),
    (e[vt] = t.current),
    mr(e.nodeType === 8 ? e.parentNode : e),
    new g1(t)
  );
};
Be.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return ((e = zs(t)), (e = e === null ? null : e.stateNode), e);
};
Be.flushSync = function (e) {
  return Jt(e);
};
Be.hydrate = function (e, t, n) {
  if (!Zo(t)) throw Error(N(200));
  return Xo(null, e, t, !0, n);
};
Be.hydrateRoot = function (e, t, n) {
  if (!y1(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    a = ru;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = nu(t, null, e, 1, n ?? null, o, !1, i, a)),
    (e[vt] = t.current),
    mr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o));
  return new Ko(t);
};
Be.render = function (e, t, n) {
  if (!Zo(t)) throw Error(N(200));
  return Xo(null, e, t, !1, n);
};
Be.unmountComponentAtNode = function (e) {
  if (!Zo(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (Jt(function () {
        Xo(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[vt] = null));
        });
      }),
      !0)
    : !1;
};
Be.unstable_batchedUpdates = d1;
Be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Zo(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return Xo(e, t, n, !1, r);
};
Be.version = "18.3.1-next-f1338f8080-20240426";
function ou() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ou);
    } catch (e) {
      console.error(e);
    }
}
(ou(), (os.exports = Be));
var K0 = os.exports,
  Pl = K0;
((Ei.createRoot = Pl.createRoot), (Ei.hydrateRoot = Pl.hydrateRoot));
var w1 = {};
(function e(t, n, r, o) {
  var i = !!(
      t.Worker &&
      t.Blob &&
      t.Promise &&
      t.OffscreenCanvas &&
      t.OffscreenCanvasRenderingContext2D &&
      t.HTMLCanvasElement &&
      t.HTMLCanvasElement.prototype.transferControlToOffscreen &&
      t.URL &&
      t.URL.createObjectURL
    ),
    a = typeof Path2D == "function" && typeof DOMMatrix == "function",
    l = (function () {
      if (!t.OffscreenCanvas) return !1;
      try {
        var y = new OffscreenCanvas(1, 1),
          g = y.getContext("2d");
        g.fillRect(0, 0, 1, 1);
        var _ = y.transferToImageBitmap();
        g.createPattern(_, "no-repeat");
      } catch {
        return !1;
      }
      return !0;
    })();
  function c() {}
  function u(y) {
    var g = n.exports.Promise,
      _ = g !== void 0 ? g : t.Promise;
    return typeof _ == "function" ? new _(y) : (y(c, c), null);
  }
  var v = (function (y, g) {
      return {
        transform: function (_) {
          if (y) return _;
          if (g.has(_)) return g.get(_);
          var V = new OffscreenCanvas(_.width, _.height),
            U = V.getContext("2d");
          return (U.drawImage(_, 0, 0), g.set(_, V), V);
        },
        clear: function () {
          g.clear();
        },
      };
    })(l, new Map()),
    m = (function () {
      var y = Math.floor(16.666666666666668),
        g,
        _,
        V = {},
        U = 0;
      return (
        typeof requestAnimationFrame == "function" &&
        typeof cancelAnimationFrame == "function"
          ? ((g = function (D) {
              var B = Math.random();
              return (
                (V[B] = requestAnimationFrame(function R(H) {
                  U === H || U + y - 1 < H
                    ? ((U = H), delete V[B], D())
                    : (V[B] = requestAnimationFrame(R));
                })),
                B
              );
            }),
            (_ = function (D) {
              V[D] && cancelAnimationFrame(V[D]);
            }))
          : ((g = function (D) {
              return setTimeout(D, y);
            }),
            (_ = function (D) {
              return clearTimeout(D);
            })),
        { frame: g, cancel: _ }
      );
    })(),
    p = (function () {
      var y,
        g,
        _ = {};
      function V(U) {
        function D(B, R) {
          U.postMessage({ options: B || {}, callback: R });
        }
        ((U.init = function (R) {
          var H = R.transferControlToOffscreen();
          U.postMessage({ canvas: H }, [H]);
        }),
          (U.fire = function (R, H, Q) {
            if (g) return (D(R, null), g);
            var se = Math.random().toString(36).slice(2);
            return (
              (g = u(function (ee) {
                function ue(ge) {
                  ge.data.callback === se &&
                    (delete _[se],
                    U.removeEventListener("message", ue),
                    (g = null),
                    v.clear(),
                    Q(),
                    ee());
                }
                (U.addEventListener("message", ue),
                  D(R, se),
                  (_[se] = ue.bind(null, { data: { callback: se } })));
              })),
              g
            );
          }),
          (U.reset = function () {
            U.postMessage({ reset: !0 });
            for (var R in _) (_[R](), delete _[R]);
          }));
      }
      return function () {
        if (y) return y;
        if (!r && i) {
          var U = [
            "var CONFETTI, SIZE = {}, module = {};",
            "(" + e.toString() + ")(this, module, true, SIZE);",
            "onmessage = function(msg) {",
            "  if (msg.data.options) {",
            "    CONFETTI(msg.data.options).then(function () {",
            "      if (msg.data.callback) {",
            "        postMessage({ callback: msg.data.callback });",
            "      }",
            "    });",
            "  } else if (msg.data.reset) {",
            "    CONFETTI && CONFETTI.reset();",
            "  } else if (msg.data.resize) {",
            "    SIZE.width = msg.data.resize.width;",
            "    SIZE.height = msg.data.resize.height;",
            "  } else if (msg.data.canvas) {",
            "    SIZE.width = msg.data.canvas.width;",
            "    SIZE.height = msg.data.canvas.height;",
            "    CONFETTI = module.exports.create(msg.data.canvas);",
            "  }",
            "}",
          ].join(`
`);
          try {
            y = new Worker(URL.createObjectURL(new Blob([U])));
          } catch (D) {
            return (
              typeof console < "u" &&
                typeof console.warn == "function" &&
                console.warn("🎊 Could not load worker", D),
              null
            );
          }
          V(y);
        }
        return y;
      };
    })(),
    w = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ["square", "circle"],
      zIndex: 100,
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ],
      disableForReducedMotion: !1,
      scalar: 1,
    };
  function C(y, g) {
    return g ? g(y) : y;
  }
  function S(y) {
    return y != null;
  }
  function z(y, g, _) {
    return C(y && S(y[g]) ? y[g] : w[g], _);
  }
  function d(y) {
    return y < 0 ? 0 : Math.floor(y);
  }
  function f(y, g) {
    return Math.floor(Math.random() * (g - y)) + y;
  }
  function h(y) {
    return parseInt(y, 16);
  }
  function x(y) {
    return y.map(k);
  }
  function k(y) {
    var g = String(y).replace(/[^0-9a-f]/gi, "");
    return (
      g.length < 6 && (g = g[0] + g[0] + g[1] + g[1] + g[2] + g[2]),
      {
        r: h(g.substring(0, 2)),
        g: h(g.substring(2, 4)),
        b: h(g.substring(4, 6)),
      }
    );
  }
  function T(y) {
    var g = z(y, "origin", Object);
    return ((g.x = z(g, "x", Number)), (g.y = z(g, "y", Number)), g);
  }
  function E(y) {
    ((y.width = document.documentElement.clientWidth),
      (y.height = document.documentElement.clientHeight));
  }
  function b(y) {
    var g = y.getBoundingClientRect();
    ((y.width = g.width), (y.height = g.height));
  }
  function P(y) {
    var g = document.createElement("canvas");
    return (
      (g.style.position = "fixed"),
      (g.style.top = "0px"),
      (g.style.left = "0px"),
      (g.style.pointerEvents = "none"),
      (g.style.zIndex = y),
      g
    );
  }
  function M(y, g, _, V, U, D, B, R, H) {
    (y.save(),
      y.translate(g, _),
      y.rotate(D),
      y.scale(V, U),
      y.arc(0, 0, 1, B, R, H),
      y.restore());
  }
  function L(y) {
    var g = y.angle * (Math.PI / 180),
      _ = y.spread * (Math.PI / 180);
    return {
      x: y.x,
      y: y.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: y.startVelocity * 0.5 + Math.random() * y.startVelocity,
      angle2D: -g + (0.5 * _ - Math.random() * _),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: y.color,
      shape: y.shape,
      tick: 0,
      totalTicks: y.ticks,
      decay: y.decay,
      drift: y.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: y.gravity * 3,
      ovalScalar: 0.6,
      scalar: y.scalar,
      flat: y.flat,
    };
  }
  function $(y, g) {
    ((g.x += Math.cos(g.angle2D) * g.velocity + g.drift),
      (g.y += Math.sin(g.angle2D) * g.velocity + g.gravity),
      (g.velocity *= g.decay),
      g.flat
        ? ((g.wobble = 0),
          (g.wobbleX = g.x + 10 * g.scalar),
          (g.wobbleY = g.y + 10 * g.scalar),
          (g.tiltSin = 0),
          (g.tiltCos = 0),
          (g.random = 1))
        : ((g.wobble += g.wobbleSpeed),
          (g.wobbleX = g.x + 10 * g.scalar * Math.cos(g.wobble)),
          (g.wobbleY = g.y + 10 * g.scalar * Math.sin(g.wobble)),
          (g.tiltAngle += 0.1),
          (g.tiltSin = Math.sin(g.tiltAngle)),
          (g.tiltCos = Math.cos(g.tiltAngle)),
          (g.random = Math.random() + 2)));
    var _ = g.tick++ / g.totalTicks,
      V = g.x + g.random * g.tiltCos,
      U = g.y + g.random * g.tiltSin,
      D = g.wobbleX + g.random * g.tiltCos,
      B = g.wobbleY + g.random * g.tiltSin;
    if (
      ((y.fillStyle =
        "rgba(" +
        g.color.r +
        ", " +
        g.color.g +
        ", " +
        g.color.b +
        ", " +
        (1 - _) +
        ")"),
      y.beginPath(),
      a &&
        g.shape.type === "path" &&
        typeof g.shape.path == "string" &&
        Array.isArray(g.shape.matrix))
    )
      y.fill(
        oe(
          g.shape.path,
          g.shape.matrix,
          g.x,
          g.y,
          Math.abs(D - V) * 0.1,
          Math.abs(B - U) * 0.1,
          (Math.PI / 10) * g.wobble
        )
      );
    else if (g.shape.type === "bitmap") {
      var R = (Math.PI / 10) * g.wobble,
        H = Math.abs(D - V) * 0.1,
        Q = Math.abs(B - U) * 0.1,
        se = g.shape.bitmap.width * g.scalar,
        ee = g.shape.bitmap.height * g.scalar,
        ue = new DOMMatrix([
          Math.cos(R) * H,
          Math.sin(R) * H,
          -Math.sin(R) * Q,
          Math.cos(R) * Q,
          g.x,
          g.y,
        ]);
      ue.multiplySelf(new DOMMatrix(g.shape.matrix));
      var ge = y.createPattern(v.transform(g.shape.bitmap), "no-repeat");
      (ge.setTransform(ue),
        (y.globalAlpha = 1 - _),
        (y.fillStyle = ge),
        y.fillRect(g.x - se / 2, g.y - ee / 2, se, ee),
        (y.globalAlpha = 1));
    } else if (g.shape === "circle")
      y.ellipse
        ? y.ellipse(
            g.x,
            g.y,
            Math.abs(D - V) * g.ovalScalar,
            Math.abs(B - U) * g.ovalScalar,
            (Math.PI / 10) * g.wobble,
            0,
            2 * Math.PI
          )
        : M(
            y,
            g.x,
            g.y,
            Math.abs(D - V) * g.ovalScalar,
            Math.abs(B - U) * g.ovalScalar,
            (Math.PI / 10) * g.wobble,
            0,
            2 * Math.PI
          );
    else if (g.shape === "star")
      for (
        var Y = (Math.PI / 2) * 3,
          Ne = 4 * g.scalar,
          Qe = 8 * g.scalar,
          Ye = g.x,
          ut = g.y,
          Ft = 5,
          rt = Math.PI / Ft;
        Ft--;
      )
        ((Ye = g.x + Math.cos(Y) * Qe),
          (ut = g.y + Math.sin(Y) * Qe),
          y.lineTo(Ye, ut),
          (Y += rt),
          (Ye = g.x + Math.cos(Y) * Ne),
          (ut = g.y + Math.sin(Y) * Ne),
          y.lineTo(Ye, ut),
          (Y += rt));
    else
      (y.moveTo(Math.floor(g.x), Math.floor(g.y)),
        y.lineTo(Math.floor(g.wobbleX), Math.floor(U)),
        y.lineTo(Math.floor(D), Math.floor(B)),
        y.lineTo(Math.floor(V), Math.floor(g.wobbleY)));
    return (y.closePath(), y.fill(), g.tick < g.totalTicks);
  }
  function j(y, g, _, V, U) {
    var D = g.slice(),
      B = y.getContext("2d"),
      R,
      H,
      Q = u(function (se) {
        function ee() {
          ((R = H = null),
            B.clearRect(0, 0, V.width, V.height),
            v.clear(),
            U(),
            se());
        }
        function ue() {
          (r &&
            !(V.width === o.width && V.height === o.height) &&
            ((V.width = y.width = o.width), (V.height = y.height = o.height)),
            !V.width &&
              !V.height &&
              (_(y), (V.width = y.width), (V.height = y.height)),
            B.clearRect(0, 0, V.width, V.height),
            (D = D.filter(function (ge) {
              return $(B, ge);
            })),
            D.length ? (R = m.frame(ue)) : ee());
        }
        ((R = m.frame(ue)), (H = ee));
      });
    return {
      addFettis: function (se) {
        return ((D = D.concat(se)), Q);
      },
      canvas: y,
      promise: Q,
      reset: function () {
        (R && m.cancel(R), H && H());
      },
    };
  }
  function W(y, g) {
    var _ = !y,
      V = !!z(g || {}, "resize"),
      U = !1,
      D = z(g, "disableForReducedMotion", Boolean),
      B = i && !!z(g || {}, "useWorker"),
      R = B ? p() : null,
      H = _ ? E : b,
      Q = y && R ? !!y.__confetti_initialized : !1,
      se =
        typeof matchMedia == "function" &&
        matchMedia("(prefers-reduced-motion)").matches,
      ee;
    function ue(Y, Ne, Qe) {
      for (
        var Ye = z(Y, "particleCount", d),
          ut = z(Y, "angle", Number),
          Ft = z(Y, "spread", Number),
          rt = z(Y, "startVelocity", Number),
          mu = z(Y, "decay", Number),
          hu = z(Y, "gravity", Number),
          vu = z(Y, "drift", Number),
          S1 = z(Y, "colors", x),
          gu = z(Y, "ticks", Number),
          k1 = z(Y, "shapes"),
          yu = z(Y, "scalar"),
          wu = !!z(Y, "flat"),
          C1 = T(Y),
          b1 = Ye,
          Jo = [],
          xu = y.width * C1.x,
          Su = y.height * C1.y;
        b1--;
      )
        Jo.push(
          L({
            x: xu,
            y: Su,
            angle: ut,
            spread: Ft,
            startVelocity: rt,
            color: S1[b1 % S1.length],
            shape: k1[f(0, k1.length)],
            ticks: gu,
            decay: mu,
            gravity: hu,
            drift: vu,
            scalar: yu,
            flat: wu,
          })
        );
      return ee ? ee.addFettis(Jo) : ((ee = j(y, Jo, H, Ne, Qe)), ee.promise);
    }
    function ge(Y) {
      var Ne = D || z(Y, "disableForReducedMotion", Boolean),
        Qe = z(Y, "zIndex", Number);
      if (Ne && se)
        return u(function (rt) {
          rt();
        });
      (_ && ee
        ? (y = ee.canvas)
        : _ && !y && ((y = P(Qe)), document.body.appendChild(y)),
        V && !Q && H(y));
      var Ye = { width: y.width, height: y.height };
      (R && !Q && R.init(y), (Q = !0), R && (y.__confetti_initialized = !0));
      function ut() {
        if (R) {
          var rt = {
            getBoundingClientRect: function () {
              if (!_) return y.getBoundingClientRect();
            },
          };
          (H(rt),
            R.postMessage({ resize: { width: rt.width, height: rt.height } }));
          return;
        }
        Ye.width = Ye.height = null;
      }
      function Ft() {
        ((ee = null),
          V && ((U = !1), t.removeEventListener("resize", ut)),
          _ &&
            y &&
            (document.body.contains(y) && document.body.removeChild(y),
            (y = null),
            (Q = !1)));
      }
      return (
        V && !U && ((U = !0), t.addEventListener("resize", ut, !1)),
        R ? R.fire(Y, Ye, Ft) : ue(Y, Ye, Ft)
      );
    }
    return (
      (ge.reset = function () {
        (R && R.reset(), ee && ee.reset());
      }),
      ge
    );
  }
  var F;
  function Z() {
    return (F || (F = W(null, { useWorker: !0, resize: !0 })), F);
  }
  function oe(y, g, _, V, U, D, B) {
    var R = new Path2D(y),
      H = new Path2D();
    H.addPath(R, new DOMMatrix(g));
    var Q = new Path2D();
    return (
      Q.addPath(
        H,
        new DOMMatrix([
          Math.cos(B) * U,
          Math.sin(B) * U,
          -Math.sin(B) * D,
          Math.cos(B) * D,
          _,
          V,
        ])
      ),
      Q
    );
  }
  function A(y) {
    if (!a) throw new Error("path confetti are not supported in this browser");
    var g, _;
    typeof y == "string" ? (g = y) : ((g = y.path), (_ = y.matrix));
    var V = new Path2D(g),
      U = document.createElement("canvas"),
      D = U.getContext("2d");
    if (!_) {
      for (
        var B = 1e3, R = B, H = B, Q = 0, se = 0, ee, ue, ge = 0;
        ge < B;
        ge += 2
      )
        for (var Y = 0; Y < B; Y += 2)
          D.isPointInPath(V, ge, Y, "nonzero") &&
            ((R = Math.min(R, ge)),
            (H = Math.min(H, Y)),
            (Q = Math.max(Q, ge)),
            (se = Math.max(se, Y)));
      ((ee = Q - R), (ue = se - H));
      var Ne = 10,
        Qe = Math.min(Ne / ee, Ne / ue);
      _ = [
        Qe,
        0,
        0,
        Qe,
        -Math.round(ee / 2 + R) * Qe,
        -Math.round(ue / 2 + H) * Qe,
      ];
    }
    return { type: "path", path: g, matrix: _ };
  }
  function O(y) {
    var g,
      _ = 1,
      V = "#000000",
      U =
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof y == "string"
      ? (g = y)
      : ((g = y.text),
        (_ = "scalar" in y ? y.scalar : _),
        (U = "fontFamily" in y ? y.fontFamily : U),
        (V = "color" in y ? y.color : V));
    var D = 10 * _,
      B = "" + D + "px " + U,
      R = new OffscreenCanvas(D, D),
      H = R.getContext("2d");
    H.font = B;
    var Q = H.measureText(g),
      se = Math.ceil(Q.actualBoundingBoxRight + Q.actualBoundingBoxLeft),
      ee = Math.ceil(Q.actualBoundingBoxAscent + Q.actualBoundingBoxDescent),
      ue = 2,
      ge = Q.actualBoundingBoxLeft + ue,
      Y = Q.actualBoundingBoxAscent + ue;
    ((se += ue + ue),
      (ee += ue + ue),
      (R = new OffscreenCanvas(se, ee)),
      (H = R.getContext("2d")),
      (H.font = B),
      (H.fillStyle = V),
      H.fillText(g, ge, Y));
    var Ne = 1 / _;
    return {
      type: "bitmap",
      bitmap: R.transferToImageBitmap(),
      matrix: [Ne, 0, 0, Ne, (-se * Ne) / 2, (-ee * Ne) / 2],
    };
  }
  ((n.exports = function () {
    return Z().apply(this, arguments);
  }),
    (n.exports.reset = function () {
      Z().reset();
    }),
    (n.exports.create = W),
    (n.exports.shapeFromPath = A),
    (n.exports.shapeFromText = O));
})(
  (function () {
    return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
  })(),
  w1,
  !1
);
const nn = w1.exports;
w1.exports.create;
function Cr(e = !0) {
  var t;
  return typeof window > "u"
    ? !1
    : e
      ? !(
          (t = window.matchMedia) != null &&
          t.call(window, "(prefers-reduced-motion: reduce)").matches
        )
      : !0;
}
function Z0(e = {}) {
  const t = e.respectReducedMotion ?? !0,
    n = new Set();
  let r = null,
    o = 0,
    i = !1;
  const a = () => {
      typeof document > "u" ||
        (!document.hidden &&
          n.size > 0 &&
          r === null &&
          (i && (document.removeEventListener("visibilitychange", a), (i = !1)),
          (o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(l))));
    },
    l = (u) => {
      if (typeof document < "u" && document.hidden) {
        ((r = null),
          i || ((i = !0), document.addEventListener("visibilitychange", a)));
        return;
      }
      const v = u - o;
      ((o = u),
        n.forEach((m) => m(v)),
        (r = n.size > 0 ? requestAnimationFrame(l) : null));
    },
    c = () => {
      if (r === null) {
        if (typeof document < "u" && document.hidden) {
          i || ((i = !0), document.addEventListener("visibilitychange", a));
          return;
        }
        ((o = typeof performance < "u" ? performance.now() : Date.now()),
          (r = requestAnimationFrame(l)));
      }
    };
  return {
    isMotionAllowed: () => Cr(t),
    scheduleRender: (u) =>
      Cr(t)
        ? (n.add(u),
          c(),
          () => {
            (n.delete(u),
              n.size === 0 &&
                (r !== null && (cancelAnimationFrame(r), (r = null)),
                i &&
                  typeof document < "u" &&
                  (document.removeEventListener("visibilitychange", a),
                  (i = !1))));
          })
        : () => {},
    destroy: () => {
      (n.clear(),
        r !== null && (cancelAnimationFrame(r), (r = null)),
        i &&
          typeof document < "u" &&
          (document.removeEventListener("visibilitychange", a), (i = !1)));
    },
  };
}
const X0 = Z0();
function J0(e) {
  return X0.scheduleRender(e);
}
function x1(e, t) {
  if (typeof e == "number") return Math.min(10, Math.max(1, Math.round(e)));
  const n = e && e !== "normal" ? e : (t ?? e ?? "normal");
  return n === "low" ? 3 : n === "high" ? 8 : 5;
}
function iu(e, t = !1) {
  const n = Math.round(5 + e * 3.1);
  return t ? Math.max(4, Math.round(n * 0.6)) : n;
}
function au(e) {
  const t = Math.max(4, 18.5 - e * 1.35),
    n = Math.max(3, 9 - e * 0.5);
  return {
    minDuration: Number(t.toFixed(1)),
    maxDuration: Number((t + n).toFixed(1)),
  };
}
const q0 = "#c9a84c",
  e3 = "#2d5a27",
  t3 = "#fff7cc";
function n3() {
  if (typeof document > "u") return !1;
  try {
    const e = document.createElement("canvas");
    return !!(e.getContext && e.getContext("2d"));
  } catch {
    return !1;
  }
}
function r3(e) {
  return e === "eid-adha"
    ? ["🐑", "🎁"]
    : e === "eid-fitr" || e === "eid"
      ? ["🎁", "✨"]
      : ["🌙", "✨"];
}
async function xa(e, t, n) {
  if (!Cr() || !n3()) return;
  const r =
      t != null && t.length ? t : [q0, e3, t3, "#e8c96b", "#4a8a3a", "#ffffff"],
    [o, i] = r3(n);
  let a;
  if (typeof OffscreenCanvas < "u")
    try {
      const c = _l(o),
        u = _l(i),
        v = (e || 1447).toString(),
        m = o3(v);
      a = [c, u, m];
    } catch {
      a = void 0;
    }
  const l = {
    particleCount: 60,
    spread: 70,
    colors: r,
    ticks: 200,
    gravity: 0.8,
    scalar: a ? 1.8 : 1.2,
    drift: 0,
    disableForReducedMotion: !0,
  };
  a
    ? (nn({ ...l, angle: 60, origin: { x: 0, y: 0.85 }, shapes: [a[0], a[1]] }),
      await Qr(300),
      nn({ ...l, angle: 120, origin: { x: 1, y: 0.85 }, shapes: [a[0], a[1]] }),
      await Qr(300),
      await nn({
        ...l,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        shapes: a,
        scalar: 2,
      }))
    : (nn({ ...l, angle: 60, origin: { x: 0, y: 0.85 } }),
      await Qr(300),
      nn({ ...l, angle: 120, origin: { x: 1, y: 0.85 } }),
      await Qr(300),
      await nn({
        ...l,
        angle: 90,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        scalar: 1.4,
      }));
}
function _l(e) {
  const r = "20px serif";
  let i = new OffscreenCanvas(1, 1),
    a = i.getContext("2d");
  a.font = r;
  const l = a.measureText(e),
    c = 5,
    u =
      typeof l.actualBoundingBoxLeft == "number" ? l.actualBoundingBoxLeft : 0,
    v =
      typeof l.actualBoundingBoxRight == "number"
        ? l.actualBoundingBoxRight
        : l.width || 20,
    m =
      typeof l.actualBoundingBoxAscent == "number"
        ? l.actualBoundingBoxAscent
        : 20,
    p =
      typeof l.actualBoundingBoxDescent == "number"
        ? l.actualBoundingBoxDescent
        : 0,
    w = Math.max(1, Math.ceil(v + u) + c * 2),
    C = Math.max(1, Math.ceil(m + p) + c * 2),
    S = u + c,
    z = m + c;
  ((i = new OffscreenCanvas(w, C)),
    (a = i.getContext("2d")),
    (a.font = r),
    (a.lineJoin = "round"),
    (a.lineWidth = 3 * 2),
    (a.strokeStyle = "rgba(0,0,0,0.55)"),
    a.strokeText(e, S, z),
    a.fillText(e, S, z));
  const d = 1 / 2;
  return {
    type: "bitmap",
    bitmap: i.transferToImageBitmap(),
    matrix: [d, 0, 0, d, (-w * d) / 2, (-C * d) / 2],
  };
}
function o3(e) {
  const r = "bold 15px system-ui, -apple-system, sans-serif";
  let o = new OffscreenCanvas(1, 1),
    i = o.getContext("2d");
  i.font = r;
  const a = i.measureText(e),
    l = 3,
    c =
      typeof a.actualBoundingBoxLeft == "number" ? a.actualBoundingBoxLeft : 0,
    u =
      typeof a.actualBoundingBoxRight == "number"
        ? a.actualBoundingBoxRight
        : a.width || 15,
    v =
      typeof a.actualBoundingBoxAscent == "number"
        ? a.actualBoundingBoxAscent
        : 15,
    m =
      typeof a.actualBoundingBoxDescent == "number"
        ? a.actualBoundingBoxDescent
        : 0,
    p = Math.max(1, Math.ceil(u + c) + l * 2),
    w = Math.max(1, Math.ceil(v + m) + l * 2),
    C = c + l,
    S = v + l;
  ((o = new OffscreenCanvas(p, w)),
    (i = o.getContext("2d")),
    (i.font = r),
    (i.lineJoin = "round"),
    (i.lineWidth = 15 * 0.28),
    (i.strokeStyle = "#000000"),
    i.strokeText(e, C, S),
    (i.fillStyle = "#ffffff"),
    i.fillText(e, C, S));
  const z = 1 / 1.5;
  return {
    type: "bitmap",
    bitmap: o.transferToImageBitmap(),
    matrix: [z, 0, 0, z, (-p * z) / 2, (-w * z) / 2],
  };
}
function i3(e, t, n = !1) {
  return t === "off" || !Cr() ? !1 : e.isRamadan || e.isEid || n;
}
function Qr(e) {
  return new Promise((t) => setTimeout(t, e));
}
const a3 = {
  standard: 0,
  saudi: 0,
  uae: 0,
  malaysia: 0,
  egypt: 1,
  turkey: 1,
  pakistan: 1,
  indonesia: 1,
  morocco: 1,
  us: 1,
  uk: 1,
};
function lu(e, t) {
  return t !== void 0
    ? typeof t == "number" && !isNaN(t) && isFinite(t)
      ? Math.max(-3, Math.min(3, Math.round(t)))
      : 0
    : e
      ? (a3[e] ?? 0)
      : 0;
}
const l3 = {
    1443: "2022-04-02",
    1444: "2023-03-23",
    1445: "2024-03-11",
    1446: "2025-03-01",
    1447: "2026-02-18",
    1448: "2027-02-07",
    1449: "2028-01-28",
    1450: "2029-01-16",
    1451: "2030-01-06",
    1452: "2030-12-26",
    1453: "2031-12-15",
    1454: "2032-12-04",
    1455: "2033-11-24",
    1456: "2034-11-13",
    1457: "2035-11-02",
    1458: "2036-10-22",
    1459: "2037-10-11",
    1460: "2038-10-01",
  },
  Dl = {
    1443: "2022-05-02",
    1444: "2023-04-21",
    1445: "2024-04-10",
    1446: "2025-03-30",
    1447: "2026-03-20",
    1448: "2027-03-09",
    1449: "2028-02-26",
    1450: "2029-02-14",
    1451: "2030-02-04",
    1452: "2031-01-24",
    1453: "2032-01-14",
    1454: "2033-01-03",
    1455: "2033-12-23",
    1456: "2034-12-12",
    1457: "2035-12-01",
    1458: "2036-11-19",
    1459: "2037-11-09",
    1460: "2038-10-29",
  },
  s3 = {
    1443: "2022-07-09",
    1444: "2023-06-28",
    1445: "2024-06-16",
    1446: "2025-06-06",
    1447: "2026-05-27",
    1448: "2027-05-16",
    1449: "2028-05-05",
    1450: "2029-04-24",
    1451: "2030-04-13",
    1452: "2031-04-02",
    1453: "2032-03-22",
    1454: "2033-03-12",
    1455: "2034-03-01",
    1456: "2035-02-19",
    1457: "2036-02-08",
    1458: "2037-01-28",
    1459: "2038-01-17",
    1460: "2039-01-06",
  },
  Sa = Object.freeze({
    isRamadan: !1,
    occasion: "none",
    isEid: !1,
    hijriYear: 0,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  });
function u3(e) {
  var t;
  try {
    if (typeof Intl > "u" || typeof Intl.DateTimeFormat != "function")
      return null;
    const n = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    if (typeof n.formatToParts != "function") return null;
    const r = (t = n.resolvedOptions) == null ? void 0 : t.call(n).calendar;
    if (!r || !r.startsWith("islamic")) return null;
    const o = n.formatToParts(e);
    if (!Array.isArray(o) || o.length === 0) return null;
    const i = (u) => {
        const v = o.find((m) => m.type === u);
        return v ? parseInt(v.value, 10) : NaN;
      },
      a = i("month"),
      l = i("day"),
      c = i("year");
    return isNaN(a) || isNaN(l) || isNaN(c)
      ? null
      : { month: a, day: l, year: c };
  } catch {
    return null;
  }
}
const Yr = 24 * 60 * 60 * 1e3;
function c3(e) {
  const t = e.getTime();
  for (const [o, i] of Object.entries(Dl)) {
    const a = new Date(i).getTime(),
      l = Math.floor((t - a) / Yr);
    if (l >= 0 && l < 3) {
      const c = parseInt(o, 10),
        u = l + 1;
      return {
        isRamadan: !1,
        occasion: "eid-fitr",
        isEid: !0,
        hijriYear: c,
        hijriMonth: 10,
        hijriDay: u,
        dayNumber: u,
      };
    }
  }
  for (const [o, i] of Object.entries(s3)) {
    const a = new Date(i).getTime(),
      l = Math.floor((t - a) / Yr);
    if (l >= 0 && l < 4) {
      const c = parseInt(o, 10),
        u = l + 1;
      return {
        isRamadan: !1,
        occasion: "eid-adha",
        isEid: !0,
        hijriYear: c,
        hijriMonth: 12,
        hijriDay: l + 10,
        dayNumber: u,
      };
    }
  }
  let n = 0,
    r = null;
  for (const [o, i] of Object.entries(l3)) {
    const a = new Date(i);
    a.getTime() <= t &&
      (!r || a.getTime() > r.getTime()) &&
      ((r = a), (n = parseInt(o, 10)));
  }
  if (r) {
    const o = Dl[n],
      i = o ? new Date(o).getTime() : r.getTime() + 30 * Yr;
    if (t < i) {
      const a = Math.floor((t - r.getTime()) / Yr) + 1;
      return {
        isRamadan: !0,
        occasion: "ramadan",
        isEid: !1,
        hijriYear: n,
        hijriMonth: 9,
        hijriDay: a,
        dayNumber: a,
      };
    }
  }
  return {
    isRamadan: !1,
    occasion: "none",
    isEid: !1,
    hijriYear: n,
    hijriMonth: 0,
    hijriDay: 0,
    dayNumber: 0,
  };
}
function d3(e, t = 0, n = !1) {
  const r = typeof t == "number" ? t : 0;
  let o = typeof t == "boolean" ? t : n,
    i,
    a = r;
  if (e instanceof Date) i = e;
  else if (typeof e == "object" && e !== null) {
    const u = e;
    ((i = u.date),
      typeof u.debug == "boolean" && (o = u.debug),
      (a = lu(u.region, u.hijriAdjustment)));
  }
  let l;
  if (i instanceof Date) l = isNaN(i.getTime()) ? new Date() : i;
  else if (typeof i == "string" || typeof i == "number") {
    const u = new Date(i);
    l = isNaN(u.getTime()) ? new Date() : u;
  } else
    (i !== void 0 &&
      o &&
      typeof console < "u" &&
      console.warn &&
      console.warn(
        `[ramadan-overlay] Invalid Date "${String(i)}"; falling back to current date.`
      ),
      (l = new Date()));
  const c =
    typeof a == "number" && !isNaN(a) && isFinite(a)
      ? Math.max(-3, Math.min(3, Math.round(a)))
      : 0;
  return { targetDate: l, effectiveOffset: c };
}
function Cn(e = new Date(), t = 0) {
  const n = typeof e == "object" && e !== null && "debug" in e ? !!e.debug : !1,
    { targetDate: r, effectiveOffset: o } = d3(e, t, n),
    i = o === 0 ? r : new Date(r.getTime() - o * 24 * 60 * 60 * 1e3),
    a = u3(i);
  if (a) {
    const v = a.month === 9,
      m = a.month === 10 && a.day >= 1 && a.day <= 3,
      p = a.month === 12 && a.day >= 10 && a.day <= 13;
    let w = "none",
      C = 0;
    return (
      v
        ? ((w = "ramadan"), (C = a.day))
        : m
          ? ((w = "eid-fitr"), (C = a.day))
          : p && ((w = "eid-adha"), (C = a.day - 9)),
      {
        isRamadan: v,
        occasion: w,
        isEid: m || p,
        hijriYear: a.year,
        hijriMonth: a.month,
        hijriDay: a.day,
        dayNumber: C,
      }
    );
  }
  return c3(i);
}
function Il(e, t) {
  var n, r, o, i;
  return e
    ? typeof e == "string"
      ? e.trim()
      : (typeof e == "object" &&
          (((n = e[t]) == null ? void 0 : n.trim()) ||
            ((r = e.ramadan) == null ? void 0 : r.trim()) ||
            ((o = e["eid-fitr"]) == null ? void 0 : o.trim()) ||
            ((i = e["eid-adha"]) == null ? void 0 : i.trim()))) ||
        ""
    : "";
}
const f3 = {
  ramadan: {
    en: "Ramadan Mubarak — May Allah bless you with peace, health, and happiness",
    ar: "رمضان مبارك — أعاده الله عليكم بالخير واليمن والبركات",
  },
  "eid-fitr": {
    en: "Eid Al-Fitr Mubarak — Wishing you and your loved ones joy, peace, and prosperity",
    ar: "عيد فطر مبارك — تقبل الله منا ومنكم صالح الأعمال وكل عام وأنتم بخير",
  },
  "eid-adha": {
    en: "Eid Al-Adha Mubarak — Blessed Eid and warmest wishes to you and your family",
    ar: "عيد أضحى مبارك — تقبل الله منا ومنكم صالح الأعمال وحجاً مبروراً",
  },
  none: {
    en: "Ramadan Mubarak — May Allah bless you with peace, health, and happiness",
    ar: "رمضان مبارك — أعاده الله عليكم بالخير واليمن والبركات",
  },
};
function p3(e) {
  return `<svg viewBox="0 0 54.700001 119.00001" height="36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <g transform="matrix(0.1,0,0,-0.1,-112.1,290)" fill="var(--ro-banner-icon, ${e})" stroke="none">
      <path d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"/>
      <path d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"/>
      <path d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"/>
      <path d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"/>
      <path d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"/>
      <path d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"/>
    </g>
  </svg>`;
}
function m3(e) {
  return `<svg viewBox="0 0 36 36" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <path d="M18 3 C9 3 4 10 4 18 C4 26 9 33 18 33 C12 29 10 24 10 18 C10 12 12 7 18 3 Z" fill="var(--ro-banner-icon, ${e})"/>
    <polygon points="26,10 27.2,13.5 31,13.5 28,15.5 29.2,19 26,17 22.8,19 24,15.5 21,13.5 24.8,13.5" fill="var(--ro-banner-icon, ${e})"/>
    <circle cx="15" cy="11" r="1.4" fill="var(--ro-banner-icon, ${e})" opacity="0.85"/>
    <circle cx="28" cy="25" r="1.6" fill="var(--ro-banner-icon, ${e})" opacity="0.9"/>
  </svg>`;
}
function h3(e) {
  return `<svg viewBox="0 0 36 36" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <!-- Sacred Kaaba: strictly black cube with gold Kiswah belt and door, never themed -->
    <rect x="6" y="7" width="24" height="22" rx="1.5" fill="#121212"/>
    <!-- Marble Base (Shadherwan) -->
    <rect x="5.5" y="28.5" width="25" height="1.5" rx="0.5" fill="#e5e7eb" opacity="0.85"/>
    <!-- Kiswah Gold Belt -->
    <line x1="6" y1="13" x2="30" y2="13" stroke="#d4af37" stroke-width="2.5"/>
    <line x1="6" y1="16.5" x2="30" y2="16.5" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="2 1" opacity="0.9"/>
    <!-- Golden Door (Bab al-Kaaba) -->
    <rect x="19" y="15" width="5" height="11" rx="0.5" fill="#d4af37"/>
    <line x1="21.5" y1="15" x2="21.5" y2="26" stroke="#997b1a" stroke-width="0.6"/>
    <!-- Golden Spout (Mizab al-Rahmah) -->
    <rect x="10" y="6" width="2.2" height="1.8" rx="0.3" fill="#d4af37"/>
  </svg>`;
}
const ka = 52;
function Rl(e, t, n, r, o, i, a) {
  const l = document.createElement("div");
  (l.setAttribute("role", "banner"),
    l.setAttribute("aria-label", r),
    (l.style.cssText = [
      `background:var(--ro-banner-bg, ${e})`,
      "position:fixed",
      "left:0",
      "width:100%",
      `height:${ka}px`,
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "overflow:hidden",
      `z-index:${i}`,
      "box-sizing:border-box",
      `${a}:0`,
    ].join(";")));
  const c = document.createElement("div");
  c.style.cssText = `display:flex;align-items:center;justify-content:center;gap:12px;max-width:960px;width:100%;padding:0 20px;direction:${o ? "rtl" : "ltr"}`;
  const u = document.createElement("span");
  ((u.style.cssText = "display:flex;align-items:center;flex-shrink:0"),
    (u.innerHTML = n));
  const v = document.createElement("span");
  return (
    (v.textContent = r),
    (v.style.cssText = [
      `color:var(--ro-banner-text, ${t})`,
      `font-family:${o ? "'Amiri','Scheherazade New',Georgia,serif" : "Georgia,'Times New Roman',serif"}`,
      "font-size:clamp(12px,1.6vw,15px)",
      "font-weight:500",
      "white-space:nowrap",
      "overflow:hidden",
      "text-overflow:ellipsis",
      "line-height:1.3",
      `letter-spacing:${o ? "0.02em" : "0.04em"}`,
    ].join(";")),
    c.appendChild(u),
    c.appendChild(v),
    l.appendChild(c),
    l
  );
}
function v3(e, t) {
  const n = e.bannerBg,
    r = e.bannerTextColor,
    o = e.bannerIconColor,
    i = e.zIndex,
    a = e.locale ?? "en",
    l = t === "eid-fitr" || t === "eid-adha" || t === "ramadan" ? t : "ramadan",
    c = Il(e.bannerTextEn, l),
    u = Il(e.bannerTextAr, l),
    v = f3[l],
    m = a === "ar" ? u || c || v.ar : c || u || v.en,
    p = a === "ar",
    w = [],
    C = document.body.style.paddingTop,
    S = document.body.style.paddingBottom,
    z = e.position !== "bottom",
    d =
      e.position === "bottom" || e.position === "both" || e.position === "full";
  let f;
  if (
    (l === "eid-fitr"
      ? (f = m3(o))
      : l === "eid-adha"
        ? (f = h3())
        : (f = p3(o)),
    z)
  ) {
    const x = Rl(n, r, f, m, p, i, "top");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.prepend(x),
      w.push(x));
    const k = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = `${k + ka}px`;
  }
  if (d) {
    const x = Rl(n, r, f, m, p, i, "bottom");
    (x.style.setProperty("--ro-banner-bg", n),
      x.style.setProperty("--ro-banner-text", r),
      x.style.setProperty("--ro-banner-icon", o),
      document.body.appendChild(x),
      w.push(x));
    const k = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    document.body.style.paddingBottom = `${k + ka}px`;
  }
  return {
    elements: w,
    cleanup: () => {
      (w.forEach((x) => x.remove()),
        (document.body.style.paddingTop = C),
        (document.body.style.paddingBottom = S));
    },
  };
}
function g3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function y3(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const a = (r * Math.PI) / 4,
      l = a + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(a)},${20 - 18 * Math.cos(a)}`),
      n.push(`${20 + 9 * Math.sin(l)},${20 - 9 * Math.cos(l)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const w3 = (e, t) => {
  const n = t.colors,
    r = [],
    o = x1(t.intensity, t.density),
    i = typeof window < "u" && window.innerWidth < 640,
    a = iu(o, i),
    { minDuration: l, maxDuration: c } = au(o),
    u = i ? 0.7 : 1;
  for (let v = 0; v < a; v++) {
    const m = Math.random() < 0.35,
      p = n[Math.floor(Math.random() * Math.min(n.length, 4))] ?? "#c9a84c",
      w = (m ? 32 : 20) * u,
      C = w + Math.random() * w * 0.6,
      S = document.createElement("div");
    ((S.className = m ? "ro-crescent" : "ro-star"),
      (S.innerHTML = m ? g3(p, C) : y3(p, C)));
    const { x: z } = uu(t.position, t.clearance, i),
      d = l + Math.random() * (c - l),
      f = d.toFixed(1),
      h = (-Math.random() * d).toFixed(1),
      x = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      k = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      T = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      E = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      b = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      P = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((S.style.cssText = `
      left:${z}%;
      top:102%;
      --ro-float-duration:${f}s;
      --ro-sway-1:${x.toFixed(1)}px;
      --ro-sway-2:${k.toFixed(1)}px;
      --ro-sway-end:${T.toFixed(1)}px;
      --ro-rot-1:${E.toFixed(1)}deg;
      --ro-rot-2:${b.toFixed(1)}deg;
      --ro-rot-3:${P.toFixed(1)}deg;
      animation-delay:${h}s;
    `),
      e.appendChild(S),
      r.push(S));
  }
  return () => {
    r.forEach((v) => v.remove());
  };
};
function x3(e, t, n) {
  return `<svg width="${n}" height="${(n * 1.5).toFixed(0)}" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible">
    <ellipse cx="16" cy="18" rx="13" ry="16" fill="${e}" opacity="0.95"/>
    <ellipse cx="12" cy="12" rx="3.5" ry="6" fill="white" opacity="0.3" transform="rotate(-20 12 12)"/>
    <polygon points="16,34 13,38 19,38" fill="${e}"/>
    <path d="M16 38 Q19 43 14 46 T16 52" stroke="${t}" fill="none" stroke-width="1.2" opacity="0.75"/>
  </svg>`;
}
function S3(e, t, n) {
  return `<svg width="${n}" height="${n}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="10" width="24" height="18" rx="2" fill="${e}"/>
    <rect x="2" y="8" width="28" height="5" rx="1.5" fill="${t}"/>
    <rect x="14" y="8" width="4" height="20" fill="${t}"/>
    <path d="M16 8 C13 3 8 4 10 7 C13 9 16 8 16 8 C16 8 19 9 22 7 C24 4 19 3 16 8" fill="none" stroke="${t}" stroke-width="1.8"/>
  </svg>`;
}
function k3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" fill="${e}"/>
  </svg>`;
}
function C3(e, t, n) {
  return `<svg width="${n}" height="${(n * 0.8).toFixed(0)}" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- Legs -->
    <rect x="13" y="22" width="2.5" height="7" rx="1.2" fill="${t}"/>
    <rect x="23" y="22" width="2.5" height="7" rx="1.2" fill="${t}"/>
    <!-- Fluffy Wool Body -->
    <path d="M14 6 C16 4 20 4 22 6 C24 4 28 5 29 8 C32 9 34 12 33 15 C35 18 33 22 30 23 C28 25 24 25 22 24 C20 26 16 26 14 24 C12 25 8 24 6 22 C4 19 5 15 7 13 C5 10 8 7 11 7 C12 6 13 6 14 6 Z" fill="${e}"/>
    <!-- Head & Ears -->
    <ellipse cx="8" cy="14" rx="4" ry="5" fill="${t}"/>
    <ellipse cx="5" cy="11" rx="1.5" ry="3" transform="rotate(-30 5 11)" fill="${t}"/>
    <!-- Eye dot -->
    <circle cx="7" cy="13" r="0.8" fill="white"/>
  </svg>`;
}
function b3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
    <polygon points="26,11 27.5,15.5 32,15.5 28.5,18 30,22 26,19.5 22,22 23.5,18 20,15.5 24.5,15.5" fill="${e}"/>
  </svg>`;
}
const zi = (e, t, n) => {
  const r =
      t.variant === "eid-adha" || (t.variant === "eid" && n === "eid-adha"),
    o = t.colors,
    i = [],
    a = x1(t.intensity, t.density),
    l = typeof window < "u" && window.innerWidth < 640,
    c = iu(a, l),
    { minDuration: u, maxDuration: v } = au(a),
    m = l ? 0.7 : 1;
  for (let p = 0; p < c; p++) {
    const w = document.createElement("div"),
      C = o[0] ?? "#c9a84c",
      S = o[1] ?? "#e8c96b",
      z = o[2] ?? "#2d5a27",
      d = o[Math.floor(Math.random() * o.length)] ?? C;
    if (r)
      Math.random() < 0.5
        ? ((w.className = "ro-sheep"),
          (w.innerHTML = C3("#f8f9fa", z, Math.round(36 * m))))
        : ((w.className = "ro-crescent"),
          (w.innerHTML = b3(S, Math.round(30 * m))));
    else {
      const $ = Math.random();
      $ < 0.45
        ? ((w.className = "ro-balloon"),
          (w.innerHTML = x3(d, C, Math.round(26 * m))))
        : $ < 0.75
          ? ((w.className = "ro-gift"),
            (w.innerHTML = S3(d, S, Math.round(24 * m))))
          : ((w.className = "ro-star"),
            (w.innerHTML = k3(S, Math.round(18 * m))));
    }
    const { x: f } = uu(t.position, t.clearance, l),
      h = u + Math.random() * (v - u),
      x = h.toFixed(1),
      k = (-Math.random() * h).toFixed(1),
      T = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      E = (10 + Math.random() * 16) * (Math.random() < 0.5 ? 1 : -1),
      b = (8 + Math.random() * 14) * (Math.random() < 0.5 ? 1 : -1),
      P = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      M = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1),
      L = (5 + Math.random() * 12) * (Math.random() < 0.5 ? 1 : -1);
    ((w.style.cssText = `
      left:${f}%;
      top:102%;
      --ro-float-duration:${x}s;
      --ro-sway-1:${T.toFixed(1)}px;
      --ro-sway-2:${E.toFixed(1)}px;
      --ro-sway-end:${b.toFixed(1)}px;
      --ro-rot-1:${P.toFixed(1)}deg;
      --ro-rot-2:${M.toFixed(1)}deg;
      --ro-rot-3:${L.toFixed(1)}deg;
      animation-delay:${k}s;
    `),
      e.appendChild(w),
      i.push(w));
  }
  return () => {
    i.forEach((p) => p.remove());
  };
};
function Ol(e, t, n, r) {
  return `<svg width="${n}" height="${r}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="ro-geo-tile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <!-- 8-pointed star (inner) -->
        <polygon
          points="20,4 23.1,14.5 34,11.7 26.9,19.4 34,27.1 23.1,25.5 20,36 16.9,25.5 6,27.1 13.1,19.4 6,11.7 16.9,14.5"
          fill="none" stroke="${e}" stroke-width="1.2"/>
        <!-- Connecting girih lines -->
        <line x1="0" y1="20" x2="40" y2="20" stroke="${t}" stroke-width="0.5" opacity="0.5"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="${t}" stroke-width="0.5" opacity="0.5"/>
        <line x1="0" y1="0" x2="40" y2="40" stroke="${t}" stroke-width="0.4" opacity="0.35"/>
        <line x1="40" y1="0" x2="0" y2="40" stroke="${t}" stroke-width="0.4" opacity="0.35"/>
        <!-- Corner diamonds -->
        <polygon points="0,20 5,15 10,20 5,25" fill="${e}" opacity="0.6"/>
        <polygon points="40,20 35,15 30,20 35,25" fill="${e}" opacity="0.6"/>
        <polygon points="20,0 25,5 20,10 15,5" fill="${e}" opacity="0.6"/>
        <polygon points="20,40 25,35 20,30 15,35" fill="${e}" opacity="0.6"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ro-geo-tile)"/>
  </svg>`;
}
const z3 = (e, t) => {
    const n = t.colors,
      r = n[0] ?? "#c9a84c",
      o = n[1] ?? "#e8c96b",
      i = _n(t.position);
    if (i.length > 0) {
      const u = [];
      for (const v of i) {
        const m = document.createElement("div");
        m.className = `ro-side-band ro-side-band--${v}`;
        const p = `ro-geo-tile-${v}`;
        ((m.innerHTML = `<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="${p}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon
              points="20,4 23.1,14.5 34,11.7 26.9,19.4 34,27.1 23.1,25.5 20,36 16.9,25.5 6,27.1 13.1,19.4 6,11.7 16.9,14.5"
              fill="none" stroke="var(--ro-color-1, ${r})" stroke-width="1.2"/>
            <line x1="0" y1="20" x2="40" y2="20" stroke="var(--ro-color-2, ${o})" stroke-width="0.5" opacity="0.5"/>
            <line x1="20" y1="0" x2="20" y2="40" stroke="var(--ro-color-2, ${o})" stroke-width="0.5" opacity="0.5"/>
            <line x1="0" y1="0" x2="40" y2="40" stroke="var(--ro-color-2, ${o})" stroke-width="0.4" opacity="0.35"/>
            <line x1="40" y1="0" x2="0" y2="40" stroke="var(--ro-color-2, ${o})" stroke-width="0.4" opacity="0.35"/>
            <polygon points="0,20 5,15 10,20 5,25" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
            <polygon points="40,20 35,15 30,20 35,25" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
            <polygon points="20,0 25,5 20,10 15,5" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
            <polygon points="20,40 25,35 20,30 15,35" fill="var(--ro-color-1, ${r})" opacity="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#${p})"/>
      </svg>`),
          e.appendChild(m),
          u.push(m));
      }
      return () => {
        u.forEach((v) => v.remove());
      };
    }
    const a = [],
      l =
        t.position === "top"
          ? ["top"]
          : t.position === "bottom"
            ? ["bottom"]
            : t.position === "full"
              ? ["top", "bottom"]
              : ["top", "bottom"],
      c = Math.max(28, Math.min(56, Math.round(window.innerWidth * 0.035)));
    for (const u of l) {
      const v = document.createElement("div");
      ((v.className = `ro-geo-band ro-geo-band--${u}`),
        (v.innerHTML = Ol(r, o, window.innerWidth, c)),
        e.appendChild(v),
        a.push(v));
    }
    if (t.position === "full") {
      const u = document.createElement("div");
      ((u.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;opacity:0.08;overflow:hidden;
    `),
        (u.innerHTML = Ol(r, o, window.innerWidth, window.innerHeight)),
        e.appendChild(u),
        a.push(u));
    }
    return () => {
      a.forEach((u) => u.remove());
    };
  },
  Hn = [
    {
      viewBox: "0 0 63.543041 123.29771",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-12.131086,292.84161)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 59.001457 122.46818",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-205.49927,291.46818)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 54.700001 119.00001",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-112.1,290)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 54.825859 134.11481",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-16.075001,139.34413)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 68.790413 128.93234",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-104.20958,136.93233)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 57.234924 128.84048",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-205.66613,136.84047)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 396,2909 c -32,-25 -35,-71 -6,-96 11,-10 20,-21 20,-24 0,-4 -27,-24 -60,-44 -70,-42 -84,-64 -77,-115 4,-29 0,-41 -15,-54 -11,-10 -17,-23 -14,-31 4,-11 -9,-15 -57,-17 -50,-2 -62,-6 -65,-21 -3,-12 4,-20 17,-24 26,-7 22,8 66,-298 20,-137 38,-262 41,-277 5,-24 2,-28 -19,-28 -28,0 -55,-26 -41,-40 5,-4 20,-10 34,-12 16,-2 26,-11 30,-28 5,-21 13,-26 55,-30 58,-7 86,-20 113,-55 19,-24 21,-25 34,-8 30,40 59,56 115,62 55,6 58,8 63,36 3,17 9,29 13,28 4,-2 16,-3 28,-3 34,0 21,44 -13,48 -16,2 -28,7 -28,11 0,18 80,567 85,579 2,6 11,12 19,12 21,0 30,19 16,35 -8,10 -31,15 -66,15 -46,0 -54,3 -54,19 0,10 -7,24 -16,32 -10,8 -14,22 -10,40 10,50 -11,86 -70,119 -29,17 -56,35 -59,41 -4,5 3,21 14,35 27,35 26,59 -4,89 -30,30 -54,31 -89,4 z m 74,-19 c 33,-33 19,-63 -32,-64 -48,-2 -66,35 -32,68 21,21 40,20 64,-4 z M 265,2375 c 24,-23 30,-45 25,-88 -1,-10 6,-27 15,-37 23,-25 44,-302 25,-325 -22,-27 -49,-18 -54,18 -12,69 -56,417 -56,436 0,28 16,26 45,-4 z m 212,3 c 27,-30 32,-47 22,-81 -5,-19 -4,-36 5,-50 11,-18 12,-52 5,-166 -5,-80 -14,-150 -20,-157 -13,-16 -76,-19 -98,-5 -10,6 -16,50 -23,161 -9,136 -8,153 7,170 13,15 14,22 5,40 -14,27 -6,64 20,90 26,26 52,25 77,-2 z m 183,15 c 0,-5 -14,-111 -30,-237 -17,-126 -30,-234 -30,-238 0,-5 -12,-8 -27,-6 -35,4 -37,15 -28,187 6,106 11,137 24,150 12,12 16,28 13,54 -3,30 1,42 26,67 29,29 52,39 52,23 z"
       id="path1" />
    <path
       d="m 2320,2907 c -13,-7 -29,-25 -34,-40 -8,-22 -6,-33 13,-57 12,-17 21,-39 19,-48 -2,-10 -31,-30 -67,-48 -69,-33 -86,-53 -77,-89 5,-19 2,-24 -16,-27 -15,-2 -26,-16 -37,-45 -11,-33 -20,-43 -37,-43 -29,0 -38,-27 -19,-56 22,-33 22,-489 0,-518 -16,-21 -4,-56 20,-56 7,0 21,-24 32,-57 18,-52 23,-58 50,-61 23,-2 34,-11 46,-38 l 17,-34 h 124 124 l 12,34 c 9,29 17,35 43,38 29,3 33,8 48,57 10,36 23,57 36,62 27,10 35,33 18,56 -22,28 -21,484 0,517 19,29 10,56 -19,56 -16,0 -25,10 -36,43 -12,33 -20,42 -38,41 -20,-1 -22,3 -17,27 9,41 -5,58 -76,93 -71,34 -84,59 -49,91 54,49 -13,136 -80,102 z m 75,-38 c 4,-5 4,-20 1,-32 -4,-19 -12,-22 -45,-22 -43,0 -56,13 -45,47 11,36 69,41 89,7 z m -1,-460 36,-21 v -214 -214 h -80 -80 v 214 214 l 33,20 c 41,26 49,26 91,1 z m -194,-14 30,-16 v -209 -210 h -39 c -22,0 -46,-3 -55,-6 -14,-5 -16,16 -16,202 0,203 1,209 23,231 27,27 22,26 57,8 z m 357,-7 c 23,-21 23,-25 23,-228 v -206 l -42,2 c -24,2 -49,3 -55,3 -10,1 -13,50 -13,211 v 209 l 28,15 c 35,19 32,20 59,-6 z"
       id="path2" />
    <path
       d="m 1352,2884 c -26,-18 -30,-69 -6,-95 14,-16 14,-20 -1,-48 -8,-17 -20,-31 -25,-31 -18,0 -48,-42 -54,-75 -4,-18 -18,-44 -31,-57 -14,-13 -25,-34 -25,-50 0,-16 -20,-59 -45,-97 l -44,-70 61,-223 c 34,-123 63,-251 66,-285 2,-37 8,-63 15,-63 16,0 67,-51 67,-67 0,-9 18,-13 63,-13 59,0 63,1 75,29 7,17 26,36 42,43 26,11 29,17 32,73 3,50 54,254 113,457 l 13,46 -44,72 c -24,40 -44,84 -44,100 0,16 -8,33 -20,41 -11,8 -28,37 -38,64 -12,34 -28,57 -49,70 -36,23 -48,62 -27,86 22,25 18,75 -8,93 -12,9 -32,16 -43,16 -11,0 -31,-7 -43,-16 z m 78,-18 c 6,-8 10,-25 8,-37 -2,-19 -10,-24 -45,-26 -41,-3 -43,-1 -43,25 0,15 5,33 12,40 16,16 53,15 68,-2 z m -4,-544 c 12,-9 29,-31 37,-47 14,-28 14,-46 -3,-185 -11,-85 -19,-163 -20,-172 0,-15 -9,-18 -45,-18 -25,0 -45,3 -45,8 0,4 -9,81 -20,171 -18,152 -18,166 -3,198 15,33 48,63 68,63 5,0 20,-8 31,-18 z m -175,-50 c 5,-12 18,-86 29,-165 11,-78 23,-157 27,-175 5,-29 3,-33 -12,-30 -13,2 -29,43 -66,173 -51,181 -55,205 -38,236 10,20 11,20 31,2 11,-10 24,-28 29,-41 z m 349,27 c 12,-27 9,-44 -19,-147 -63,-227 -71,-252 -86,-252 -8,0 -15,2 -15,4 0,2 11,84 25,182 20,140 30,186 48,211 12,18 25,33 28,33 4,0 12,-14 19,-31 z"
       id="path3" />
    <path
       d="m 415,1392 c -54,-11 -75,-81 -35,-117 11,-10 20,-24 20,-31 0,-11 -72,-51 -124,-68 -15,-5 -17,-13 -13,-40 4,-28 1,-36 -18,-46 -13,-7 -31,-27 -39,-45 -9,-18 -22,-38 -31,-45 -19,-16 -19,-54 0,-70 13,-10 15,-49 15,-235 0,-189 -2,-224 -15,-229 -19,-7 -19,-40 0,-56 8,-7 15,-19 15,-27 0,-8 15,-30 33,-48 19,-19 38,-48 43,-65 6,-23 22,-40 55,-58 25,-15 56,-35 69,-44 23,-17 23,-18 6,-37 -32,-35 2,-89 49,-77 30,8 44,50 26,78 -16,26 -2,42 61,74 48,24 68,48 68,81 0,10 14,26 30,35 20,11 33,28 37,48 3,18 12,34 19,37 18,7 18,47 0,62 -12,10 -14,53 -13,232 1,198 2,221 19,236 22,20 23,37 1,54 -9,8 -22,29 -30,47 -7,18 -26,40 -42,50 -22,13 -26,22 -21,37 11,30 -6,53 -49,65 -42,11 -91,45 -91,62 0,6 7,20 16,29 41,46 -2,124 -61,111 z m 50,-62 c 0,-34 -1,-35 -40,-35 -34,0 -40,3 -43,23 -5,33 16,54 52,50 28,-3 31,-6 31,-38 z m 8,-447 c 19,-42 22,-65 22,-178 0,-113 -3,-136 -22,-177 -38,-84 -79,-57 -102,67 -14,75 -14,145 0,220 23,124 64,151 102,68 z M 296,864 c 13,-44 15,-86 12,-188 -5,-131 -18,-186 -44,-186 -50,0 -60,359 -12,417 19,23 27,14 44,-43 z m 324,29 c 20,-41 25,-295 8,-353 -17,-56 -41,-63 -58,-18 -17,47 -24,242 -11,312 16,87 38,107 61,59 z"
       id="path4" />
    <path
       d="m 1340,1350 c -26,-26 -26,-65 0,-97 19,-24 19,-27 4,-44 -9,-10 -36,-28 -60,-40 -24,-11 -55,-34 -68,-50 -14,-16 -32,-29 -40,-29 -20,0 -21,-19 -1,-26 25,-10 18,-41 -45,-199 -32,-83 -67,-182 -76,-220 -30,-130 -4,-220 86,-296 49,-41 65,-79 35,-79 -8,0 -15,-9 -15,-20 0,-11 7,-20 15,-20 8,0 35,-16 61,-35 25,-19 51,-35 58,-35 16,0 76,-56 76,-70 0,-6 4,-10 9,-10 14,0 61,45 61,58 0,5 11,13 24,16 13,3 45,21 72,39 27,18 57,36 67,40 21,8 22,26 2,33 -23,9 -18,50 8,67 76,50 116,123 117,211 0,82 -22,164 -91,335 -62,153 -69,181 -44,181 8,0 15,7 15,15 0,8 -6,15 -13,15 -7,0 -28,15 -46,34 -19,19 -48,40 -65,47 -17,7 -40,23 -52,34 -20,22 -20,23 -2,45 26,32 24,85 -4,104 -31,22 -64,20 -88,-4 z m 79,-14 c 7,-8 11,-27 9,-42 -3,-25 -7,-27 -43,-27 -37,0 -40,2 -43,28 -6,46 50,74 77,41 z M 1207,838 c -52,-175 -60,-292 -28,-398 12,-40 20,-74 18,-76 -11,-11 -87,71 -97,104 -26,96 -8,196 73,400 29,73 45,102 57,102 15,0 12,-18 -23,-132 z m 261,15 c 51,-194 67,-353 41,-420 -22,-58 -41,-68 -125,-67 -63,1 -80,5 -92,20 -45,60 -52,128 -27,284 14,85 60,273 72,293 2,4 26,7 52,7 h 48 z m 122,40 c 69,-164 92,-245 93,-323 2,-98 -14,-144 -66,-181 -22,-16 -42,-28 -44,-26 -2,2 6,30 17,62 42,123 37,204 -26,417 -39,136 -38,128 -20,128 8,0 28,-33 46,-77 z"
       id="path5" />
    <path
       d="m 2299,1352 c -27,-23 -30,-73 -6,-100 23,-26 22,-29 -18,-36 -19,-4 -48,-18 -64,-32 -30,-25 -76,-127 -67,-149 6,-16 -45,-65 -67,-65 -19,0 -22,-11 -6,-27 8,-8 7,-27 -2,-69 -18,-83 -16,-284 4,-364 9,-37 12,-66 6,-68 -19,-7 -7,-38 24,-57 18,-11 32,-27 33,-35 0,-8 8,-38 18,-67 21,-63 71,-110 125,-119 33,-5 37,-9 33,-30 -4,-23 12,-54 29,-54 18,0 40,34 35,54 -5,19 1,24 40,34 25,7 58,25 73,40 28,28 66,125 56,142 -4,6 -3,10 2,10 4,1 23,14 42,30 27,23 32,32 23,43 -9,10 -8,31 3,83 18,87 19,269 1,354 -8,36 -10,66 -5,68 14,5 11,32 -3,32 -23,1 -70,50 -64,66 3,8 2,22 -3,32 -54,112 -56,114 -95,132 -23,10 -50,21 -60,25 -18,5 -18,6 2,26 65,60 -20,156 -89,101 z m 75,-18 c 34,-34 16,-70 -34,-68 -31,1 -35,4 -38,29 -6,46 41,71 72,39 z M 2176,868 c -22,-108 -27,-191 -17,-275 14,-116 15,-113 -13,-113 -22,0 -25,5 -36,87 -12,83 -9,237 6,306 5,22 12,27 36,27 29,0 30,-2 24,-32 z m 244,-15 c 19,-76 23,-211 8,-293 l -13,-75 -71,-3 -71,-3 -12,57 c -19,96 -9,316 16,357 2,4 33,7 67,7 h 64 z m 144,38 c 16,-25 26,-201 16,-287 -12,-114 -16,-124 -47,-124 -22,0 -24,3 -19,23 16,50 18,252 4,320 -8,37 -12,69 -10,72 9,8 50,6 56,-4 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 56.962593 119.25",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-49.999994,322)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 56.712639 120.90999",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-248.60001,321.90998)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 57.500004 115.84162",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-150.5,319.84161)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 48.999996 134.77687",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-54,172.99999)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 66.091484 134.85776",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-145.89688,173)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
    {
      viewBox: "0 0 66.442177 132.58786",
      gContent: `<g
     transform="matrix(0.1,0,0,-0.1,-243.55783,170.87642)"
     fill="LANTERN_COLOR"
     stroke="none"
     id="g6">
    <path
       d="m 743,3205 c -39,-27 -38,-82 4,-123 7,-7 13,-18 13,-23 0,-5 -58,-69 -130,-143 L 500,2782 v -54 c 0,-36 7,-64 20,-86 19,-30 21,-52 23,-240 2,-193 1,-208 -17,-223 -27,-23 -14,-49 24,-49 22,0 38,-9 56,-30 16,-19 38,-31 62,-35 20,-3 55,-14 77,-24 39,-18 41,-18 75,0 19,11 45,19 58,19 31,0 79,26 92,50 7,14 21,20 44,20 43,0 57,27 27,52 -20,15 -21,26 -21,212 0,190 1,198 25,246 27,53 32,108 14,143 -7,12 -65,77 -130,144 -66,66 -119,126 -119,131 0,6 6,17 13,24 55,55 32,138 -38,138 -11,0 -30,-7 -42,-15 z m 69,-17 c 20,-17 28,-42 18,-58 -9,-15 -90,-24 -90,-10 0,5 -3,15 -6,23 -6,17 28,57 49,57 7,0 20,-6 29,-12 z M 678,2554 c 21,-15 22,-21 22,-175 v -159 h -55 -55 v 159 c 0,132 3,162 16,175 20,20 43,20 72,0 z m 152,-24 c 5,-10 10,-84 10,-164 v -146 h -55 -55 v 153 c 0,83 4,157 8,163 25,37 71,34 92,-6 z m 132,23 c 16,-14 18,-34 18,-175 v -158 h -55 -55 v 157 c 0,132 3,159 17,175 20,22 51,23 75,1 z"
       id="path1" />
    <path
       d="m 2720,3200 c -28,-28 -25,-72 6,-109 l 26,-31 -26,-34 c -31,-41 -73,-68 -142,-90 -66,-21 -98,-55 -98,-103 0,-28 7,-42 32,-63 l 32,-26 v -292 -291 l 55,-38 c 30,-21 55,-42 55,-46 0,-4 -7,-21 -15,-37 l -16,-30 h 142 141 l -16,25 c -25,38 -20,49 39,90 l 55,37 v 294 c 0,283 1,294 20,304 33,18 52,64 39,97 -17,44 -36,60 -107,85 -64,22 -152,89 -152,115 0,5 11,22 25,37 15,16 25,39 25,56 0,60 -78,92 -120,50 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -169,-734 v -260 h -27 -28 v 260 260 h 28 27 z m 215,0 v -260 h -80 -80 v 260 260 h 80 80 z m 110,0 v -260 h -30 -30 v 260 260 h 30 30 z"
       id="path2" />
    <path
       d="m 1745,3175 c -31,-30 -32,-64 -4,-99 11,-15 19,-33 16,-40 -3,-8 -30,-31 -61,-53 -60,-42 -81,-76 -70,-116 5,-21 3,-27 -10,-27 -10,0 -19,-11 -22,-30 -6,-26 -11,-30 -41,-30 -43,0 -56,-26 -25,-51 22,-17 22,-21 22,-327 v -311 l -22,-3 c -15,-2 -23,-10 -23,-23 0,-19 8,-20 288,-23 l 287,-2 v 25 c 0,20 -5,25 -25,25 h -25 v 311 c 0,307 0,311 22,328 31,25 18,51 -25,51 -30,0 -35,4 -40,30 -4,18 -13,30 -23,30 -12,0 -14,6 -9,29 9,41 -6,64 -71,112 -66,49 -73,63 -45,93 30,32 28,79 -5,105 -35,27 -59,26 -89,-4 z m 88,-19 c 4,-6 6,-22 5,-36 -3,-21 -8,-24 -43,-26 -57,-2 -73,28 -34,67 21,21 56,19 72,-5 z m -201,-513 c 22,-25 26,-45 17,-70 -5,-15 -3,-25 7,-33 11,-10 14,-48 14,-194 0,-196 -2,-206 -52,-206 h -28 v 260 c 0,211 3,260 13,260 8,0 21,-8 29,-17 z m 204,-8 c 10,-15 14,-37 12,-55 -3,-18 1,-35 9,-41 10,-9 13,-53 13,-184 0,-96 -3,-180 -6,-189 -9,-23 -139,-23 -148,0 -12,31 -7,359 6,372 7,7 11,28 10,47 -6,66 70,102 104,50 z m 154,-235 v -260 h -28 c -15,0 -33,5 -40,12 -15,15 -17,374 -3,383 6,3 9,23 8,45 -1,40 23,80 50,80 10,0 13,-49 13,-260 z"
       id="path3" />
    <path
       d="m 735,1705 c -30,-29 -32,-68 -5,-95 l 20,-20 -62,-59 -63,-59 1,-58 c 0,-55 -2,-59 -43,-97 l -43,-40 V 1007 737 l 40,-34 c 38,-33 40,-37 40,-91 0,-71 24,-113 85,-150 24,-15 45,-34 45,-43 0,-9 7,-22 16,-30 21,-17 49,0 48,29 0,14 8,24 25,30 72,25 117,96 109,173 -3,37 0,44 39,80 l 43,39 v 268 268 l -46,38 c -45,37 -46,40 -39,82 8,55 -8,87 -76,148 -31,28 -48,50 -42,54 57,38 19,132 -53,132 -8,0 -26,-11 -39,-25 z m 74,-5 c 4,0 13,-10 18,-23 15,-31 -1,-60 -28,-52 -11,4 -26,1 -34,-5 -11,-9 -16,-7 -24,9 -6,11 -11,24 -11,30 0,19 41,53 57,47 8,-3 18,-6 22,-6 z m -151,-692 2,-248 h -50 -50 v 243 c 0,134 3,247 7,251 4,4 25,6 48,4 l 40,-3 z m 190,0 2,-248 h -65 -65 v 243 c 0,134 3,247 7,251 4,4 32,6 63,4 l 55,-3 z m 152,2 V 760 h -45 -45 v 250 250 h 45 45 z"
       id="path4" />
    <path
       d="m 1740,1710 c -26,-26 -26,-74 2,-102 23,-23 26,-19 -36,-63 -16,-12 -17,-17 -7,-29 10,-12 2,-30 -48,-103 -33,-48 -83,-117 -111,-153 -59,-77 -82,-140 -81,-221 1,-62 16,-110 52,-160 17,-24 19,-32 8,-45 -9,-11 -9,-18 -1,-26 7,-7 9,-32 6,-67 -7,-68 11,-97 91,-142 29,-16 65,-41 80,-54 24,-23 25,-27 11,-41 -20,-19 -15,-28 24,-44 23,-10 29,-17 25,-34 -8,-31 8,-48 41,-44 25,3 29,7 28,34 -1,26 4,34 32,48 37,17 43,33 18,43 -22,8 24,54 92,93 79,44 97,73 91,142 -3,33 -1,60 6,67 7,7 6,15 -3,26 -11,13 -10,18 3,33 57,62 74,197 38,292 -11,28 -44,81 -74,118 -95,117 -160,221 -148,236 9,10 3,21 -24,45 l -35,31 20,20 c 26,26 26,74 0,100 -11,11 -33,20 -50,20 -17,0 -39,-9 -50,-20 z m 84,-16 c 34,-33 16,-69 -34,-69 -19,0 -38,4 -42,10 -21,28 6,75 42,75 10,0 26,-7 34,-16 z m -130,-310 c -9,-21 -41,-92 -71,-157 -69,-151 -77,-217 -37,-322 5,-13 2,-16 -17,-13 -29,4 -66,65 -75,125 -9,63 19,147 79,228 28,39 69,96 91,127 22,32 41,56 43,54 2,-1 -4,-20 -13,-42 z m 241,-36 c 128,-180 135,-194 146,-254 13,-66 4,-116 -31,-171 -21,-35 -68,-49 -56,-17 35,90 32,169 -9,260 -82,181 -113,254 -107,254 4,-1 30,-33 57,-72 z m -97,-76 c 10,-20 35,-67 55,-104 58,-103 60,-193 6,-262 -19,-24 -26,-26 -109,-26 -84,0 -90,1 -109,26 -55,71 -51,164 13,274 36,63 59,117 93,220 3,8 11,-9 19,-38 7,-29 22,-69 32,-90 z M 1613,718 c 3,-22 15,-54 27,-70 28,-38 3,-38 -38,0 -48,45 -56,112 -14,112 15,0 21,-9 25,-42 z m 277,8 c 0,-21 -11,-41 -34,-66 -19,-19 -41,-48 -50,-64 -14,-27 -15,-27 -25,-8 -6,12 -29,42 -51,67 -26,30 -40,56 -40,74 v 28 h 100 l 100,-1 z m 128,11 c 6,-29 -18,-76 -50,-98 -38,-27 -44,-20 -19,22 12,19 21,49 21,67 0,29 3,33 22,30 13,-2 24,-11 26,-21 z"
       id="path5" />
    <path
       d="m 2733,1700 c -49,-20 -58,-93 -17,-137 l 26,-28 -44,-11 c -63,-16 -101,-38 -138,-80 -37,-42 -60,-92 -60,-128 0,-17 -7,-26 -25,-30 -62,-16 -47,-96 18,-96 h 32 l -3,-197 c -1,-109 -2,-213 -2,-230 0,-28 -4,-33 -23,-33 -26,0 -52,-17 -60,-41 -6,-19 18,-59 37,-59 7,0 18,-23 25,-54 36,-163 237,-242 406,-161 27,13 57,30 65,37 32,27 60,77 70,125 8,35 17,51 33,58 29,13 36,64 11,82 -10,7 -30,13 -46,13 h -28 v 230 230 h 33 c 41,0 57,15 57,53 0,23 -6,31 -30,40 -20,7 -30,18 -30,32 -1,28 -37,105 -63,133 -32,34 -82,63 -134,76 l -45,12 26,31 c 41,49 32,103 -21,131 -25,14 -40,14 -70,2 z m 83,-45 c 27,-41 8,-69 -45,-70 -36,-1 -45,3 -54,22 -7,17 -6,28 7,48 23,34 69,34 92,0 z M 2610,965 V 780 h -30 -30 v 185 185 h 30 30 z m 258,-2 2,-183 h -100 -100 v 185 186 l 98,-3 97,-3 z m 120,0 2,-183 h -30 -30 v 186 185 l 28,-3 27,-3 z"
       id="path6" />
  </g>`,
    },
  ],
  su = (e, t) => {
    const n = t.colors,
      o = [
        "#c9a84c",
        "#e8c96b",
        "#8b4513",
        "#2d5a27",
        "#4a8a3a",
        "#8b1a1a",
        "#cc4444",
        "#1a3a6b",
        "#3a6ab8",
        "#6b2fa0",
        "#c44d8a",
        "#1a7a6b",
      ].map((T, E) => (n && n.length > 0 ? n[E % n.length] : T));
    t.ceilingColor;
    const i = t.ropeColor;
    function a(T, E) {
      const { viewBox: b, gContent: P } = Hn[T],
        M = P.replace(/LANTERN_COLOR/g, E);
      return `<svg viewBox="${b}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${M}</svg>`;
    }
    const l = _n(t.position);
    if (l.length > 0) {
      const T = [];
      let E = Math.max(2, Math.min(6, Math.round(window.innerHeight / 220)));
      const b = (M) => {
        for (const L of T) {
          L.querySelectorAll(".ro-lantern-unit").forEach((j) => j.remove());
          for (let j = 0; j < M; j++) {
            const W =
                t.lanternStyle > 0
                  ? (t.lanternStyle - 1) % Hn.length
                  : j % Hn.length,
              F = o[j % o.length],
              Z = (3.2 + ((j * 0.23) % 1.2)).toFixed(1),
              oe = -((j * 0.73) % parseFloat(Z)),
              A = (10 + (j * 80) / (M > 1 ? M - 1 : 1)).toFixed(1),
              O = document.createElement("div");
            ((O.className = "ro-lantern-unit"),
              (O.style.top = `${A}%`),
              O.style.setProperty("--ro-swing-duration", `${Z}s`),
              (O.style.animationDelay = `${oe.toFixed(2)}s`));
            const y = document.createElement("div");
            ((y.className = "ro-lantern-dropline"), (y.style.background = i));
            const g = document.createElement("div");
            ((g.className = "ro-lantern-svg-wrap"),
              (g.innerHTML = a(W, F)),
              O.appendChild(y),
              O.appendChild(g),
              L.appendChild(O));
          }
        }
      };
      for (const M of l) {
        const L = document.createElement("div");
        L.className = `ro-lantern-side ro-lantern-side--${M}`;
        const $ = document.createElement("div");
        (($.className = "ro-lantern-spine"),
          L.appendChild($),
          e.appendChild(L),
          T.push(L));
      }
      b(E);
      const P = () => {
        const M = Math.max(
          2,
          Math.min(6, Math.round(window.innerHeight / 220))
        );
        M !== E && ((E = M), b(E));
      };
      return (
        window.addEventListener("resize", P, { passive: !0 }),
        () => {
          (T.forEach((M) => M.remove()),
            window.removeEventListener("resize", P));
        }
      );
    }
    function c(T, E, b, P) {
      const M = E.length;
      let L = `M 0 ${b}`;
      const $ = E[0] / 2,
        j = b + P * 1.5;
      L += ` Q ${$.toFixed(1)} ${j.toFixed(1)}, ${E[0].toFixed(1)} ${b}`;
      for (let oe = 0; oe < M - 1; oe++) {
        const A = E[oe],
          O = E[oe + 1],
          y = (A + O) / 2,
          g = b + P * 2;
        L += ` Q ${y.toFixed(1)} ${g.toFixed(1)}, ${O.toFixed(1)} ${b}`;
      }
      const F = (E[M - 1] + T) / 2,
        Z = b + P * 1.5;
      return ((L += ` Q ${F.toFixed(1)} ${Z.toFixed(1)}, ${T} ${b}`), L);
    }
    function u(T, E, b, P) {
      E.forEach((M) => {
        const L = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        (L.setAttribute("x1", M.toFixed(1)),
          L.setAttribute("y1", String(b)),
          L.setAttribute("x2", M.toFixed(1)),
          L.setAttribute("y2", P.toFixed(1)),
          L.setAttribute("stroke", "var(--ro-rope)"),
          L.setAttribute("stroke-width", "1.5"),
          L.setAttribute("class", "ro-dropline-path"),
          T.appendChild(L));
      });
    }
    function v(T, E, b, P) {
      const L = document.createElementNS("http://www.w3.org/2000/svg", "line");
      return (
        L.setAttribute("x1", "0"),
        L.setAttribute("y1", String(2)),
        L.setAttribute("x2", String(E)),
        L.setAttribute("y2", String(2)),
        L.setAttribute("stroke", "var(--ro-ceiling)"),
        L.setAttribute("stroke-width", "3"),
        L.setAttribute("stroke-opacity", "0.75"),
        L.setAttribute("class", "ro-rope-path"),
        T.appendChild(L),
        u(T, b, 2, 2 + P),
        2 + P
      );
    }
    function m(T, E, b, P, M) {
      const $ = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        $.setAttribute("d", c(E, b, 4, P)),
        $.setAttribute("stroke", "var(--ro-ceiling)"),
        $.setAttribute("stroke-width", "2.2"),
        $.setAttribute("stroke-opacity", "0.85"),
        $.setAttribute("class", "ro-rope-path"),
        T.appendChild($),
        u(T, b, 4, 4 + M),
        4 + M
      );
    }
    function p(T, E, b, P, M) {
      const W = document.createElementNS("http://www.w3.org/2000/svg", "path");
      (W.setAttribute("d", c(E, b, 2, P)),
        W.setAttribute("stroke", "var(--ro-ceiling)"),
        W.setAttribute("stroke-width", "2.0"),
        W.setAttribute("stroke-opacity", "0.85"),
        W.setAttribute("class", "ro-rope-path"),
        T.appendChild(W));
      const F = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return (
        F.setAttribute("d", c(E, b, 16, P)),
        F.setAttribute("stroke", "var(--ro-ceiling)"),
        F.setAttribute("stroke-width", "1.6"),
        F.setAttribute("stroke-opacity", "0.65"),
        F.setAttribute("class", "ro-rope-path"),
        T.appendChild(F),
        u(T, b, 2, 16 + M),
        16 + M
      );
    }
    const w = 28,
      C = t.ropeStyle ?? "straight",
      S = t.ropeSag ?? 20,
      z = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    (z.setAttribute("class", "ro-lantern-ropes"),
      z.setAttribute("aria-hidden", "true"),
      z.setAttribute("width", "100%"),
      z.setAttribute("height", "100%"));
    const d = document.createElement("div");
    d.className = "ro-lantern-row";
    let f = 0,
      h = [];
    const x = () => {
      var W;
      const T =
          (typeof window < "u" && window.innerWidth) ||
          (typeof document < "u" &&
            ((W = document.documentElement) == null
              ? void 0
              : W.clientWidth)) ||
          1024,
        E = t.density === "low" ? 360 : t.density === "high" ? 180 : 260,
        b = t.density === "low" ? 4 : t.density === "high" ? 8 : 6,
        P = Math.max(2, Math.min(b, Math.round(T / E))),
        M =
          typeof t.lanternCount == "number" && t.lanternCount > 0
            ? Math.min(12, Math.max(1, Math.round(t.lanternCount)))
            : P,
        L = T < 600 ? Math.max(6, Math.round(S * (T / 600))) : S,
        $ = [];
      for (let F = 0; F < M; F++) $.push((F + 0.5) * (T / M));
      z.innerHTML = "";
      let j = 2 + w;
      if (
        (C === "u-shaped"
          ? (j = m(z, T, $, L, w))
          : C === "dual"
            ? (j = p(z, T, $, L, w))
            : (j = v(z, T, $, w)),
        M !== f || h.length !== M)
      ) {
        ((d.innerHTML = ""), (h = []), (f = M));
        for (let F = 0; F < M; F++) {
          const Z =
              t.lanternStyle > 0
                ? (t.lanternStyle - 1) % Hn.length
                : F % Hn.length,
            oe = o[F % o.length],
            A = (2.5 + ((F * 0.17) % 1.5)).toFixed(1),
            O = -((F * 0.37) % parseFloat(A)),
            y = document.createElement("div");
          ((y.className = "ro-lantern"),
            y.style.setProperty("--ro-swing-duration", `${A}s`),
            (y.style.animationDelay = `${O.toFixed(2)}s`),
            (y.style.left = `${$[F].toFixed(1)}px`),
            (y.style.top = `${j}px`));
          const g = document.createElement("div");
          ((g.innerHTML = a(Z, oe)),
            y.appendChild(g),
            d.appendChild(y),
            h.push(y));
        }
      } else
        for (let F = 0; F < M; F++)
          ((h[F].style.left = `${$[F].toFixed(1)}px`),
            (h[F].style.top = `${j}px`));
    };
    (e.appendChild(z), e.appendChild(d), x());
    const k = () => {
      x();
    };
    return (
      window.addEventListener("resize", k, { passive: !0 }),
      () => {
        (z.remove(), d.remove(), window.removeEventListener("resize", k));
      }
    );
  };
function T3(e, t) {
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 3 C8 3 2 11 2 20 C2 29 8 37 20 37 C14 32 11 26 11 20 C11 14 14 8 20 3Z" fill="${e}"/>
  </svg>`;
}
function E3(e, t) {
  const n = [];
  for (let r = 0; r < 8; r++) {
    const a = (r * Math.PI) / 4,
      l = a + Math.PI / 8;
    (n.push(`${20 + 18 * Math.sin(a)},${20 - 18 * Math.cos(a)}`),
      n.push(`${20 + 9 * Math.sin(l)},${20 - 9 * Math.cos(l)}`));
  }
  return `<svg width="${t}" height="${t}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="${n.join(" ")}" fill="${e}"/>
  </svg>`;
}
const M3 = (e, t) => {
  if (!Cr()) return () => {};
  const n = t.colors.length
      ? t.colors
      : ["#c9a84c", "#e8c96b", "#fff7cc", "#4a8a3a"],
    r = x1(t.intensity, t.density),
    o = Math.round(12 + r * 6.5),
    i = 0.5 + (r / 10) * 0.8,
    a = [];
  function l() {
    const v = n[Math.floor(Math.random() * n.length)],
      m = Math.random(),
      p = document.createElement("div");
    let w;
    (m < 0.18
      ? ((w = 18 + Math.random() * 14),
        (p.className = "ro-crescent"),
        (p.innerHTML = T3(v, w)),
        (p.style.cssText = `
        position:absolute;
        width:${w}px;height:${w}px;
        filter:drop-shadow(0 0 ${w * 0.5}px ${v});
        animation:none;
      `))
      : m < 0.38
        ? ((w = 14 + Math.random() * 12),
          (p.className = "ro-star"),
          (p.innerHTML = E3(v, w)),
          (p.style.cssText = `
        position:absolute;
        width:${w}px;height:${w}px;
        filter:drop-shadow(0 0 ${w * 0.5}px ${v});
        animation:none;
      `))
        : ((w = 3 + Math.random() * 7),
          (p.className = "ro-sparkle"),
          (p.style.cssText = `
        position:absolute;
        width:${w}px;height:${w}px;
        background:${v};
        box-shadow:0 0 ${w * 1.5}px ${v};
        animation:none;
      `)),
      e.appendChild(p));
    let C, S;
    const z = t.position,
      d = _n(z);
    d.length > 0
      ? ((C =
          d[Math.floor(Math.random() * d.length)] === "left"
            ? Math.random() * 4
            : 96 + Math.random() * 4),
        (S = Math.random() * 100))
      : z === "top"
        ? ((C = Math.random() * 100), (S = Math.random() * 20))
        : z === "bottom"
          ? ((C = Math.random() * 100), (S = 80 + Math.random() * 20))
          : z === "full"
            ? ((C = Math.random() * 100), (S = Math.random() * 100))
            : ((C = Math.random() * 100),
              (S =
                Math.random() < 0.5
                  ? Math.random() * 20
                  : 80 + Math.random() * 20));
    const f = 80 + Math.random() * 80;
    return (
      (p.style.left = `${C}%`),
      (p.style.top = `${S}%`),
      {
        el: p,
        x: C,
        y: S,
        vx: (Math.random() - 0.5) * 0.06 * i,
        vy: (-0.035 - Math.random() * 0.055) * i,
        size: w,
        opacity: 0,
        life: 0,
        maxLife: f,
        color: v,
      }
    );
  }
  for (; a.length < o;) a.push(l());
  function c(v) {
    for (; a.length < o;) a.push(l());
    for (let m = a.length - 1; m >= 0; m--) {
      const p = a[m];
      (p.life++, (p.x += p.vx), (p.y += p.vy));
      const w = p.life / p.maxLife;
      ((p.opacity = w < 0.3 ? w / 0.3 : w > 0.7 ? (1 - w) / 0.3 : 1),
        (p.el.style.left = `${p.x}%`),
        (p.el.style.top = `${p.y}%`),
        (p.el.style.opacity = String(Math.min(1, Math.max(0, p.opacity)))),
        (p.el.style.transform = `scale(${0.5 + p.opacity * 0.5})`),
        p.life >= p.maxLife && (p.el.remove(), a.splice(m, 1)));
    }
  }
  const u = J0(c);
  return () => {
    (u(), a.forEach((v) => v.el.remove()), (a.length = 0));
  };
};
function _n(
  e,
  t = typeof document < "u" &&
    (document.documentElement.dir === "rtl" ||
      ((n) => ((n = document.body) == null ? void 0 : n.dir))() === "rtl")
) {
  switch (e) {
    case "left":
      return ["left"];
    case "right":
      return ["right"];
    case "sides":
      return ["left", "right"];
    case "start":
      return [t ? "right" : "left"];
    case "end":
      return [t ? "left" : "right"];
    default:
      return [];
  }
}
function N3(e) {
  const t = _n(e);
  return t.length > 0
    ? {
        x:
          t[Math.floor(Math.random() * t.length)] === "left"
            ? Math.random() * 3.5
            : 96.5 + Math.random() * 3.5,
        y: Math.random() * 90,
      }
    : e === "top"
      ? { x: Math.random() * 95, y: Math.random() * 25 }
      : e === "bottom"
        ? { x: Math.random() * 95, y: 75 + Math.random() * 20 }
        : e === "full"
          ? { x: Math.random() * 95, y: Math.random() * 90 }
          : {
              x: Math.random() * 95,
              y:
                Math.random() < 0.5
                  ? Math.random() * 25
                  : 75 + Math.random() * 20,
            };
}
function uu(
  e,
  t = "edges",
  n = typeof window < "u" && window.innerWidth < 640
) {
  if (t === "edges") {
    const o =
      Math.random() < 0.5 ? 2 + Math.random() * 16 : 82 + Math.random() * 16;
    let i;
    return (
      n
        ? (i =
            Math.random() < 0.5
              ? 2 + Math.random() * 20
              : 78 + Math.random() * 18)
        : (i = Math.random() * 95),
      { x: Number(o.toFixed(2)), y: Number(i.toFixed(2)) }
    );
  }
  return N3(e);
}
const j3 = {
    lanterns: su,
    "crescent-stars": w3,
    geometric: z3,
    sparkles: M3,
    eid: zi,
    "eid-fitr": zi,
    "eid-adha": zi,
  },
  A3 = "ramadan-overlay-root",
  Ca = "ramadan-overlay-styles";
function L3() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(A3)) == null || e.remove(),
      (t = document.getElementById(Ca)) == null || t.remove());
  } catch {}
}
function P3() {
  if (typeof document > "u" || document.getElementById(Ca)) return;
  const e = `
#ramadan-overlay-root{--ro-color-1:#c9a84c;--ro-color-2:#e8c96b;--ro-color-3:#8b4513;--ro-color-4:#2d5a27;--ro-color-5:#1a3a1a;--ro-opacity:0.85;--ro-z:9999;--ro-lantern-z:2;--ro-shadow:drop-shadow(0 6px 12px rgba(0,0,0,0.18));--ro-gutter-width:clamp(28px,4vw,64px);--ro-lantern-side-size:clamp(20px,2.8vw,36px);position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-z);overflow:hidden;opacity:var(--ro-opacity);will-change:opacity;contain:strict}
#ramadan-overlay-root .ro-lantern-row{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--ro-lantern-z,2)}
#ramadan-overlay-root .ro-lantern{position:absolute;display:flex;flex-direction:column;align-items:center;translate:-50% 0;transform-origin:top center;animation:ro-swing var(--ro-swing-duration,3s) cubic-bezier(0.25,1,0.5,1) infinite alternate;z-index:var(--ro-lantern-z,2)}
#ramadan-overlay-root .ro-lantern svg{width:var(--ro-lantern-size,clamp(18px,2.5vw,38px));height:auto;animation:ro-glow-pulse 2.5s ease-in-out infinite;will-change:transform,opacity}
#ramadan-overlay-root .ro-lantern-string{width:1px;height:var(--ro-string-height,clamp(20px,3vw,48px));background:var(--ro-color-1);opacity:.7}
#ramadan-overlay-root .ro-lantern-ropes{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;shape-rendering:geometricPrecision;filter:var(--ro-shadow,none)}
#ramadan-overlay-root .ro-rope-path{fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-dropline-path{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}
#ramadan-overlay-root .ro-lantern-side,#ramadan-overlay-root .ro-side-band{position:fixed;top:0;bottom:0;height:100vh;height:100dvh;width:var(--ro-gutter-width,clamp(28px,4vw,64px));pointer-events:none;overflow:hidden;contain:strict;z-index:var(--ro-lantern-z,var(--ro-z,9999))}
#ramadan-overlay-root .ro-lantern-side--left,#ramadan-overlay-root .ro-side-band--left{left:0}
#ramadan-overlay-root .ro-lantern-side--right,#ramadan-overlay-root .ro-side-band--right{right:0}
#ramadan-overlay-root .ro-lantern-spine{position:absolute;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,transparent 0%,var(--ro-ceiling,#8b4513) 5%,var(--ro-ceiling,#8b4513) 95%,transparent 100%);opacity:0.5}
#ramadan-overlay-root .ro-lantern-unit{position:absolute;left:50%;transform-origin:top center;animation:ro-swing-side var(--ro-swing-duration,3.5s) cubic-bezier(0.25,1,0.5,1) infinite alternate;will-change:transform}
#ramadan-overlay-root .ro-lantern-dropline{width:1.5px;height:24px;margin:0 auto;background:var(--ro-rope,#8b4513)}
#ramadan-overlay-root .ro-lantern-svg-wrap svg{display:block;width:var(--ro-lantern-side-size,clamp(20px,2.8vw,36px));height:auto;filter:drop-shadow(0 2px 8px rgba(232,201,107,0.4)) var(--ro-shadow,none)}
#ramadan-overlay-root .ro-side-band svg{width:100%;height:100%;display:block}
#ramadan-overlay-root .ro-crescent,#ramadan-overlay-root .ro-star,#ramadan-overlay-root .ro-balloon,#ramadan-overlay-root .ro-gift,#ramadan-overlay-root .ro-sheep{position:absolute;top:102%;animation:ro-ascend var(--ro-float-duration,12s) linear infinite;will-change:transform,opacity;filter:var(--ro-shadow,none)}
#ramadan-overlay-root .ro-sparkle{position:absolute;border-radius:50%;background:var(--ro-color-2);opacity:0;will-change:transform,opacity}
#ramadan-overlay-root .ro-geo-band{position:absolute;left:0;width:100%;overflow:hidden;opacity:.6}
#ramadan-overlay-root .ro-geo-band--top{top:0}
#ramadan-overlay-root .ro-geo-band--bottom{bottom:0}
#ramadan-overlay-root .ro-geo-band svg{width:100%;height:100%}
#ramadan-overlay-root.ro-layer--background{z-index:-1!important}
#ramadan-overlay-root.ro-scoped-host{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}
@keyframes ro-swing{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes ro-swing-side{0%{transform:translateX(-50%) rotate(-3.5deg)}100%{transform:translateX(-50%) rotate(3.5deg)}}
@keyframes ro-float{from{transform:translateY(0) rotate(0deg);opacity:.7}to{transform:translateY(-12px) rotate(10deg);opacity:1}}
@keyframes ro-ascend{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0}8%{opacity:.9}30%{transform:translateY(calc(-32vh - 40px)) translateX(var(--ro-sway-1,16px)) rotate(var(--ro-rot-1,10deg))}60%{transform:translateY(calc(-65vh - 80px)) translateX(var(--ro-sway-2,-14px)) rotate(var(--ro-rot-2,-8deg))}85%{opacity:.85}100%{transform:translateY(calc(-105vh - 140px)) translateX(var(--ro-sway-end,8px)) rotate(var(--ro-rot-3,15deg));opacity:0}}
@keyframes ro-glow-pulse{0%,100%{filter:drop-shadow(0 2px 6px var(--ro-glow,rgba(201,168,76,0.5))) var(--ro-shadow,none)}50%{filter:drop-shadow(0 2px 18px var(--ro-glow,rgba(201,168,76,0.9))) drop-shadow(0 0 8px var(--ro-glow,rgba(201,168,76,0.6))) var(--ro-shadow,none)}}
@media(prefers-reduced-motion:reduce){#ramadan-overlay-root *{animation:none!important;transition:none!important}}
@media (max-width: 767px){#ramadan-overlay-root[data-mobile-side="hide"] .ro-lantern-side,#ramadan-overlay-root[data-mobile-side="hide"] .ro-side-band,#ramadan-overlay-root[data-mobile-side="hide"][data-is-side="true"] > *{display:none!important}}
  `,
    t = document.createElement("style");
  ((t.id = Ca), (t.textContent = e), document.head.appendChild(t));
}
function Bl(e, t) {
  const n = e.style;
  (n.setProperty("--ro-opacity", String(t.opacity)),
    t.layer === "background"
      ? (e.classList.add("ro-layer--background"), n.setProperty("--ro-z", "-1"))
      : (e.classList.remove("ro-layer--background"),
        n.setProperty("--ro-z", String(t.zIndex))),
    n.setProperty("--ro-lantern-z", String(t.lanternZIndex ?? 2)),
    n.setProperty("--ro-glow", t.glowColor));
  const r = {
    none: "none",
    soft: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.18))",
    deep: "drop-shadow(0 10px 22px rgba(0, 0, 0, 0.42))",
  };
  (n.setProperty("--ro-shadow", r[t.shadows] ?? r.soft),
    n.setProperty("--ro-ceiling", t.ceilingColor),
    n.setProperty("--ro-rope", t.ropeColor),
    n.setProperty("--ro-banner-bg", t.bannerBg),
    n.setProperty("--ro-banner-text", t.bannerTextColor),
    n.setProperty("--ro-banner-icon", t.bannerIconColor),
    t.countdownBg && n.setProperty("--ro-countdown-bg", t.countdownBg),
    t.countdownBorder &&
      n.setProperty("--ro-countdown-border", t.countdownBorder),
    t.countdownAccent &&
      n.setProperty("--ro-countdown-gold", t.countdownAccent),
    t.colors.forEach((o, i) => {
      n.setProperty(`--ro-color-${i + 1}`, o);
    }),
    e.setAttribute("data-theme", t.themeName ?? "classic"),
    e.setAttribute("data-shadows", t.shadows ?? "soft"),
    e.setAttribute("data-mobile-side", t.mobileSideBehavior),
    e.setAttribute("data-position", t.position),
    e.setAttribute("data-clearance", t.clearance),
    e.setAttribute("data-layer", t.layer),
    _n(t.position).length > 0
      ? e.setAttribute("data-is-side", "true")
      : e.removeAttribute("data-is-side"));
}
function _3(e, t) {
  return e.variant === "banner" ? I3(e, t) : D3(e, t);
}
function D3(e, t) {
  var v, m;
  P3();
  const n = document.createElement("div");
  ((n.id = "ramadan-overlay-root"),
    n.setAttribute("aria-hidden", "true"),
    n.setAttribute("role", "presentation"),
    Bl(n, e));
  let r = document.body,
    o = !1;
  if (e.mountTarget)
    if (typeof e.mountTarget == "string") {
      const p = document.querySelector(e.mountTarget);
      p && ((r = p), (o = !0));
    } else
      typeof HTMLElement < "u" &&
        e.mountTarget instanceof HTMLElement &&
        ((r = e.mountTarget), (o = !0));
  if (o) {
    n.classList.add("ro-scoped-host");
    const p =
      (m =
        (v = window.getComputedStyle) == null ? void 0 : v.call(window, r)) ==
      null
        ? void 0
        : m.position;
    (p === "static" || !p) && (r.style.position = "relative");
  }
  r.appendChild(n);
  const a = (j3[e.variant] ?? su)(n, e, t),
    l = () => {
      n.style.visibility = document.hidden ? "hidden" : "";
    };
  return (
    document.addEventListener("visibilitychange", l),
    {
      container: n,
      cleanup: () => {
        (a(), document.removeEventListener("visibilitychange", l), n.remove());
      },
      updateTokens: (p) => {
        Bl(n, p);
      },
    }
  );
}
function I3(e, t) {
  const { elements: n, cleanup: r } = v3(e, t);
  return {
    container: n[0] ?? document.body,
    cleanup: r,
    updateTokens: (a) => {
      for (const l of n)
        (l.style.setProperty("--ro-banner-bg", a.bannerBg),
          l.style.setProperty("--ro-banner-text", a.bannerTextColor),
          l.style.setProperty("--ro-banner-icon", a.bannerIconColor));
    },
  };
}
const R3 = {
  en: {
    title: "Iftar Countdown",
    targetTime: "Maghrib at {time}",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    celebration: "Iftar Mubarak!",
    dismissButton: "Dismiss countdown",
    minimizeButton: "Minimize countdown widget",
    expandButton: "Expand countdown widget",
    muteButton: "Mute alert sound",
    unmuteButton: "Enable alert sound",
    playButton: "Tap to play Iftar chime",
    srInitialAnnouncement:
      "Iftar countdown active: {minutes} minutes remaining until Maghrib.",
    srMilestoneMinutes: "{minutes} minutes remaining until Iftar.",
    srArrivedAnnouncement:
      "Iftar time! Maghrib prayer has arrived. Iftar Mubarak!",
  },
  ar: {
    title: "العد التنازلي للإفطار",
    targetTime: "المغرب في {time}",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    celebration: "إفطار مبارك!",
    dismissButton: "إغلاق العد التنازلي",
    minimizeButton: "تصغير أداة العد التنازلي",
    expandButton: "توسيع أداة العد التنازلي",
    muteButton: "كتم صوت التنبيه",
    unmuteButton: "تشغيل صوت التنبيه",
    playButton: "انقر لتشغيل تكبيرات الإفطار",
    srInitialAnnouncement:
      "العد التنازلي للإفطار نشط: متبقي {minutes} دقيقة حتى أذان المغرب.",
    srMilestoneMinutes: "متبقي {minutes} دقيقة حتى موعد الإفطار.",
    srArrivedAnnouncement: "حان الآن موعد أذان المغرب. إفطار مبارك وذنب مغفور!",
  },
};
function O3(e = "auto", t) {
  var i, a;
  let n = "en";
  return (
    e === "ar"
      ? (n = "ar")
      : e === "en"
        ? (n = "en")
        : typeof document < "u" &&
          ((
            ((i = document.documentElement.lang) == null
              ? void 0
              : i.toLowerCase()) || ""
          ).startsWith("ar") ||
            (typeof navigator < "u" &&
              (a = navigator.language) != null &&
              a.toLowerCase().startsWith("ar"))) &&
          (n = "ar"),
    { dict: { ...R3[n], ...t }, isRtl: n === "ar", lang: n }
  );
}
const B3 = [30, 15, 5, 1];
class F3 {
  constructor(t, n) {
    ((this.announcedMilestones = new Set()),
      (this.initialAnnounced = !1),
      (this.arrivedAnnounced = !1),
      (this.announcerEl = t),
      (this.dict = n));
  }
  announceInitial(t) {
    if (this.initialAnnounced) return;
    this.initialAnnounced = !0;
    const n = this.dict.srInitialAnnouncement.replace("{minutes}", String(t));
    this.announcerEl.textContent = n;
  }
  checkMilestone(t) {
    if (t <= 0) {
      this.arrivedAnnounced ||
        ((this.arrivedAnnounced = !0),
        (this.announcerEl.textContent = this.dict.srArrivedAnnouncement));
      return;
    }
    const n = Math.floor(t / 6e4);
    if (B3.includes(n) && !this.announcedMilestones.has(n)) {
      this.announcedMilestones.add(n);
      const r = this.dict.srMilestoneMinutes.replace("{minutes}", String(n));
      this.announcerEl.textContent = r;
    }
  }
}
function $3(e, t) {
  const n = (r) => {
    var o, i;
    r.key === "Escape" &&
      (r.stopPropagation(),
      t(),
      typeof document < "u" &&
        document.body &&
        ((i = (o = document.body).focus) == null || i.call(o)));
  };
  return (
    e.addEventListener("keydown", n),
    () => {
      e.removeEventListener("keydown", n);
    }
  );
}
async function V3(e) {
  try {
    const t = e.play();
    return (t !== void 0 && (await t), !0);
  } catch (t) {
    if (t instanceof DOMException)
      switch (t.name) {
        case "NotAllowedError":
          return (
            console.debug(
              "[ramadan-overlay] Audio alert autoplay blocked by browser policy."
            ),
            !1
          );
        case "NotSupportedError":
          return (
            console.warn(
              "[ramadan-overlay] Audio source format unsupported or invalid."
            ),
            !1
          );
        default:
          return (
            console.debug(
              `[ramadan-overlay] Audio playback failed with DOMException: ${t.name}`
            ),
            !1
          );
      }
    return !1;
  }
}
async function H3(e) {
  if (typeof window > "u") return !1;
  try {
    let t = e;
    if (!t || t.state === "closed") {
      const i = window.AudioContext || window.webkitAudioContext;
      if (!i) return !1;
      t = new i();
    }
    if (t.state === "suspended")
      try {
        await t.resume();
      } catch {}
    if (t.state === "suspended")
      return (
        console.debug(
          "[ramadan-overlay] Web Audio chime playback blocked by browser autoplay policy."
        ),
        !1
      );
    const n = t.currentTime,
      r = t.createGain();
    (r.gain.setValueAtTime(0.7, n), r.connect(t.destination));
    const o = [
      { freq: 523.25, time: 0, duration: 1.8, gain: 0.28 },
      { freq: 659.25, time: 0.16, duration: 1.7, gain: 0.25 },
      { freq: 783.99, time: 0.32, duration: 1.8, gain: 0.22 },
      { freq: 1046.5, time: 0.48, duration: 2, gain: 0.2 },
    ];
    for (const i of o) {
      const a = n + i.time,
        l = a + i.duration,
        c = t.createOscillator();
      ((c.type = "sine"), c.frequency.setValueAtTime(i.freq, a));
      const u = t.createOscillator();
      ((u.type = "sine"), u.frequency.setValueAtTime(i.freq * 2.01, a));
      const v = t.createGain();
      (v.gain.setValueAtTime(1e-4, a),
        v.gain.exponentialRampToValueAtTime(i.gain, a + 0.025),
        v.gain.exponentialRampToValueAtTime(1e-4, l));
      const m = t.createGain();
      (m.gain.setValueAtTime(1e-4, a),
        m.gain.exponentialRampToValueAtTime(i.gain * 0.2, a + 0.02),
        m.gain.exponentialRampToValueAtTime(1e-4, a + 0.7),
        c.connect(v),
        v.connect(r),
        u.connect(m),
        m.connect(r),
        c.start(a),
        c.stop(l),
        u.start(a),
        u.stop(a + 0.75));
    }
    return !0;
  } catch (t) {
    return (console.debug("[ramadan-overlay] Web Audio chime error:", t), !1);
  }
}
class U3 {
  constructor(t = {}) {
    if (
      ((this.audio = null),
      (this.audioCtx = null),
      (this.muted = t.defaultMuted ?? !0),
      (this.onAudioBlocked = t.onAudioBlocked),
      (this.soundUrl = t.soundUrl),
      this.hasCustomSoundUrl(t.soundUrl) && typeof Audio < "u")
    )
      try {
        ((this.audio = new Audio(t.soundUrl)),
          (this.audio.preload = "auto"),
          (this.audio.loop = !1));
      } catch {
        this.audio = null;
      }
  }
  hasCustomSoundUrl(t) {
    return (
      typeof t == "string" &&
      t.trim().length > 0 &&
      t !== "default" &&
      t !== "none"
    );
  }
  setSoundUrl(t) {
    if (this.soundUrl !== t) {
      if (((this.soundUrl = t), this.audio)) {
        try {
          (this.audio.pause(),
            this.audio.removeAttribute("src"),
            this.audio.load());
        } catch {}
        this.audio = null;
      }
      if (this.hasCustomSoundUrl(t) && typeof Audio < "u")
        try {
          ((this.audio = new Audio(t)),
            (this.audio.preload = "auto"),
            (this.audio.loop = !1));
        } catch {
          this.audio = null;
        }
    }
  }
  prime() {
    if (this.audio)
      try {
        const t = this.audio.play();
        t !== void 0 &&
          t
            .then(() => {
              this.audio && (this.audio.pause(), (this.audio.currentTime = 0));
            })
            .catch(() => {});
      } catch {}
    try {
      if (typeof window < "u") {
        const t = window.AudioContext || window.webkitAudioContext;
        t &&
          ((!this.audioCtx || this.audioCtx.state === "closed") &&
            (this.audioCtx = new t()),
          this.audioCtx &&
            this.audioCtx.state === "suspended" &&
            this.audioCtx.resume());
      }
    } catch {}
  }
  async playAlert() {
    var n, r;
    if (this.muted || this.soundUrl === !1 || this.soundUrl === "none")
      return !1;
    if (this.hasCustomSoundUrl(this.soundUrl) && this.audio) {
      const o = await V3(this.audio);
      return (o || (n = this.onAudioBlocked) == null || n.call(this), o);
    }
    const t = await H3(this.audioCtx);
    return (t || (r = this.onAudioBlocked) == null || r.call(this), t);
  }
  setMuted(t) {
    this.muted = t;
  }
  toggleMute() {
    return ((this.muted = !this.muted), this.muted);
  }
  isMuted() {
    return this.muted;
  }
  destroy() {
    if (this.audio) {
      try {
        (this.audio.pause(),
          (this.audio.currentTime = 0),
          this.audio.removeAttribute("src"),
          this.audio.load());
      } catch {}
      this.audio = null;
    }
    if (this.audioCtx && this.audioCtx.state !== "closed") {
      try {
        this.audioCtx.close();
      } catch {}
      this.audioCtx = null;
    }
  }
}
const ba = "ramadan-countdown-styles",
  W3 = "ramadan-countdown-root";
function G3() {
  var e, t;
  try {
    if (typeof document > "u") return;
    ((e = document.getElementById(W3)) == null || e.remove(),
      (t = document.getElementById(ba)) == null || t.remove());
  } catch {}
}
function Q3() {
  if (typeof document > "u" || document.getElementById(ba)) return;
  const e = `
:root {
  --ro-countdown-z: calc(var(--ro-z, 99999) + 1);
  --ro-countdown-margin: 24px;
  --ro-countdown-bg: rgba(18, 24, 38, 0.95);
  --ro-countdown-border: rgba(245, 158, 11, 0.3);
  --ro-countdown-gold: #f59e0b;
  --ro-countdown-text: #ffffff;
  --ro-countdown-muted: #9ca3af;
}

.ro-countdown-host {
  position: fixed;
  z-index: var(--ro-countdown-z);
  pointer-events: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ro-countdown-host--bottom-right {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-end: calc(var(--ro-countdown-margin) + env(safe-area-inset-right, 0px));
}

.ro-countdown-host--bottom-left {
  bottom: calc(var(--ro-countdown-margin) + env(safe-area-inset-bottom, 0px));
  inset-inline-start: calc(var(--ro-countdown-margin) + env(safe-area-inset-left, 0px));
}

.ro-countdown-host--top-right {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-end: calc(var(--ro-countdown-margin) + env(safe-area-inset-right, 0px));
}

.ro-countdown-host--top-left {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px));
  inset-inline-start: calc(var(--ro-countdown-margin) + env(safe-area-inset-left, 0px));
}

.ro-countdown-host--banner-offset-top {
  top: calc(var(--ro-countdown-margin) + env(safe-area-inset-top, 0px) + var(--ro-banner-height, 48px) + 16px) !important;
}

.ro-countdown-card {
  background: var(--ro-countdown-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ro-countdown-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 14px 18px;
  min-width: 270px;
  max-width: 320px;
  color: var(--ro-countdown-text);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.ro-countdown-card.ro-countdown--celebrating {
  border-color: var(--ro-countdown-gold);
  box-shadow: 0 0 24px rgba(245, 158, 11, 0.5), 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  animation: ro-countdown-pulse 2s infinite alternate;
}

@keyframes ro-countdown-pulse {
  from { box-shadow: 0 0 12px rgba(245, 158, 11, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
  to { box-shadow: 0 0 28px rgba(245, 158, 11, 0.7), 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
}

.ro-countdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ro-countdown-badge {
  font-size: 20px;
  line-height: 1;
}

.ro-countdown-titles {
  flex: 1;
  min-width: 0;
}

.ro-countdown-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--ro-countdown-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ro-countdown-target {
  display: block;
  font-size: 11px;
  color: var(--ro-countdown-muted);
  margin-top: 2px;
}

.ro-countdown-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ro-countdown-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  color: var(--ro-countdown-muted);
  font-size: 14px;
  line-height: 1;
  transition: background 0.15s ease, color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ro-countdown-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ro-countdown-text);
}

.ro-countdown-btn:focus-visible {
  outline: 2px solid var(--ro-countdown-gold);
  outline-offset: 2px;
}

.ro-countdown-btn--prompt {
  color: var(--ro-countdown-gold);
  background: rgba(245, 158, 11, 0.25);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
  animation: ro-countdown-pulse 1.5s infinite alternate ease-in-out;
}

.ro-countdown-digits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 2px;
}

.ro-countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ro-countdown-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: var(--ro-countdown-gold);
}

.ro-countdown-sep {
  font-size: 22px;
  font-weight: 700;
  color: var(--ro-countdown-muted);
  margin-top: -10px;
}

.ro-countdown-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ro-countdown-muted);
  margin-top: 4px;
}

.ro-countdown-celebration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 10px 0 2px;
  padding: 8px 12px;
  background: rgba(245, 158, 11, 0.15);
  border-radius: 8px;
}

.ro-celebration-badge {
  font-size: 18px;
}

.ro-celebration-text {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--ro-countdown-gold);
}

.ro-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.ro-countdown-pill {
  display: none;
  align-items: center;
  gap: 8px;
  background: var(--ro-countdown-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ro-countdown-border);
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  padding: 8px 14px;
  cursor: pointer;
  color: var(--ro-countdown-text);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease;
}

.ro-countdown-pill:hover {
  transform: scale(1.04);
  border-color: var(--ro-countdown-gold);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(245, 158, 11, 0.2);
}

.ro-countdown-pill:focus-visible {
  outline: 2px solid var(--ro-countdown-gold);
  outline-offset: 2px;
}

.ro-countdown-pill-badge {
  font-size: 16px;
  line-height: 1;
}

.ro-countdown-pill-target {
  font-size: 12px;
  color: var(--ro-countdown-muted);
}

.ro-countdown-pill-sep {
  font-size: 12px;
  color: var(--ro-countdown-muted);
}

.ro-countdown-pill-time {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--ro-countdown-gold);
}

.ro-countdown-host--minimized .ro-countdown-card {
  display: none;
}

.ro-countdown-host--minimized .ro-countdown-pill {
  display: flex;
}

@media (prefers-reduced-motion: reduce) {
  #ramadan-countdown-root * {
    animation: none !important;
    transition: none !important;
  }
}
  `,
    t = document.createElement("style");
  ((t.id = ba), (t.textContent = e), document.head.appendChild(t));
}
function Y3(e) {
  Q3();
  const t = document.createElement("aside");
  ((t.id = "ramadan-countdown-root"),
    t.setAttribute("role", "complementary"),
    t.setAttribute("aria-label", e.labels.title));
  const n = e.position ?? "bottom-right";
  ((t.className = `ro-countdown-host ro-countdown-host--${n}`),
    e.isBannerTopActive &&
      n.startsWith("top-") &&
      t.classList.add("ro-countdown-host--banner-offset-top"),
    e.isRtl && t.setAttribute("dir", "rtl"),
    t.setAttribute("lang", e.lang));
  const r = e.targetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    o = e.labels.targetTime.replace("{time}", r),
    i = document.createElement("div");
  ((i.className = "ro-countdown-card"),
    i.setAttribute("role", "region"),
    i.setAttribute("aria-label", e.labels.title));
  const a = document.createElement("div");
  a.className = "ro-countdown-header";
  const l = document.createElement("span");
  ((l.className = "ro-countdown-badge"), (l.textContent = "🌙"));
  const c = document.createElement("div");
  c.className = "ro-countdown-titles";
  const u = document.createElement("h3");
  ((u.className = "ro-countdown-title"), (u.textContent = e.labels.title));
  const v = document.createElement("span");
  ((v.className = "ro-countdown-target"),
    (v.textContent = o),
    c.appendChild(u),
    c.appendChild(v));
  const m = document.createElement("div");
  m.className = "ro-countdown-actions";
  let p = null;
  e.hasSound &&
    ((p = document.createElement("button")),
    (p.type = "button"),
    (p.className = "ro-countdown-btn ro-countdown-sound-btn"),
    p.setAttribute(
      "aria-label",
      e.initialMuted ? e.labels.unmuteButton : e.labels.muteButton
    ),
    p.setAttribute("aria-pressed", String(!e.initialMuted)),
    (p.innerHTML = e.initialMuted
      ? '<span class="ro-countdown-icon">🔇</span>'
      : '<span class="ro-countdown-icon">🔊</span>'),
    p.addEventListener("click", () => {
      var D;
      p != null && p.classList.contains("ro-countdown-btn--prompt")
        ? (p.classList.remove("ro-countdown-btn--prompt"),
          (D = e.onPlayAlert) == null || D.call(e))
        : e.onToggleSound();
    }),
    m.appendChild(p));
  const w = e.minimizable !== !1;
  let C = null;
  w &&
    ((C = document.createElement("button")),
    (C.type = "button"),
    (C.className = "ro-countdown-btn ro-countdown-minimize-btn"),
    C.setAttribute("aria-label", e.labels.minimizeButton),
    (C.innerHTML = '<span class="ro-countdown-icon">−</span>'),
    C.addEventListener("click", (D) => {
      (D.stopPropagation(), F());
    }),
    m.appendChild(C));
  const S = document.createElement("button");
  ((S.type = "button"),
    (S.className = "ro-countdown-btn ro-countdown-close-btn"),
    S.setAttribute("aria-label", e.labels.dismissButton),
    (S.innerHTML = '<span class="ro-countdown-icon">✕</span>'),
    S.addEventListener("click", () => {
      e.onDismiss();
    }),
    m.appendChild(S),
    a.appendChild(l),
    a.appendChild(c),
    a.appendChild(m),
    i.appendChild(a));
  const z = document.createElement("div");
  ((z.className = "ro-countdown-digits"),
    z.setAttribute("aria-hidden", "true"));
  const d = (D, B) => {
      const R = document.createElement("span");
      ((R.className = `ro-countdown-value ${D}`), (R.textContent = "00"));
      const H = document.createElement("div");
      H.className = "ro-countdown-unit";
      const Q = document.createElement("span");
      return (
        (Q.className = "ro-countdown-label"),
        (Q.textContent = B),
        H.appendChild(R),
        H.appendChild(Q),
        { unit: H, val: R }
      );
    },
    { unit: f, val: h } = d("ro-val-hours", e.labels.hours),
    x = document.createElement("span");
  ((x.className = "ro-countdown-sep"), (x.textContent = ":"));
  const { unit: k, val: T } = d("ro-val-minutes", e.labels.minutes),
    E = document.createElement("span");
  ((E.className = "ro-countdown-sep"), (E.textContent = ":"));
  const { unit: b, val: P } = d("ro-val-seconds", e.labels.seconds);
  (z.appendChild(f),
    z.appendChild(x),
    z.appendChild(k),
    z.appendChild(E),
    z.appendChild(b),
    i.appendChild(z));
  const M = document.createElement("div");
  ((M.className = "ro-countdown-celebration"),
    (M.style.display = "none"),
    (M.innerHTML = `
    <span class="ro-celebration-badge">✨</span>
    <p class="ro-celebration-text">${e.labels.celebration}</p>
  `),
    i.appendChild(M));
  const L = document.createElement("div");
  ((L.className = "ro-sr-only ro-countdown-announcer"),
    L.setAttribute("role", "status"),
    L.setAttribute("aria-live", "polite"),
    L.setAttribute("aria-atomic", "true"),
    i.appendChild(L));
  let $ = null,
    j = null;
  if (w) {
    (($ = document.createElement("div")),
      ($.className = "ro-countdown-pill"),
      $.setAttribute("role", "button"),
      $.setAttribute("tabindex", "0"),
      $.setAttribute("aria-label", e.labels.expandButton));
    const D = document.createElement("span");
    ((D.className = "ro-countdown-pill-badge"), (D.textContent = "🌙"));
    const B = document.createElement("span");
    ((B.className = "ro-countdown-pill-target"), (B.textContent = r));
    const R = document.createElement("span");
    ((R.className = "ro-countdown-pill-sep"),
      (R.textContent = "·"),
      (j = document.createElement("span")),
      (j.className = "ro-countdown-pill-time"),
      (j.textContent = "--:--"),
      $.appendChild(D),
      $.appendChild(B),
      $.appendChild(R),
      $.appendChild(j),
      $.addEventListener("click", () => {
        Z();
      }),
      $.addEventListener("keydown", (H) => {
        (H.key === "Enter" || H.key === " ") && (H.preventDefault(), Z());
      }),
      t.appendChild($));
  }
  (t.appendChild(i), document.body.appendChild(t));
  let W = !1;
  const F = () => {
      var D;
      if (w) {
        ((W = !0), t.classList.add("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "true");
        } catch {}
        (D = e.onMinimize) == null || D.call(e);
      }
    },
    Z = () => {
      var D;
      if (w) {
        ((W = !1), t.classList.remove("ro-countdown-host--minimized"));
        try {
          typeof sessionStorage < "u" &&
            sessionStorage.setItem("ro_countdown_minimized", "false");
        } catch {}
        (D = e.onExpand) == null || D.call(e);
      }
    },
    oe = () => W;
  if (w) {
    let D = e.initiallyMinimized ?? !1;
    try {
      if (typeof sessionStorage < "u") {
        const B = sessionStorage.getItem("ro_countdown_minimized");
        B === "true" ? (D = !0) : B === "false" && (D = !1);
      }
    } catch {}
    D && F();
  }
  const A = $3(t, e.onDismiss),
    O = new F3(L, e.labels),
    y = (D) => {
      const B = Math.max(0, Math.floor(D / 1e3)),
        R = Math.floor(B / 3600),
        H = Math.floor((B % 3600) / 60),
        Q = B % 60;
      ((h.textContent = String(R).padStart(2, "0")),
        (T.textContent = String(H).padStart(2, "0")),
        (P.textContent = String(Q).padStart(2, "0")),
        j &&
          !i.classList.contains("ro-countdown--celebrating") &&
          (R > 0
            ? (j.textContent = `${R}h ${H}m`)
            : (j.textContent = `${H}m ${String(Q).padStart(2, "0")}s`)),
        O.checkMilestone(D));
    },
    g = () => {
      (i.classList.add("ro-countdown--celebrating"),
        $ &&
          ($.classList.add("ro-countdown--celebrating"),
          j && (j.textContent = e.labels.celebration)),
        (z.style.display = "none"),
        (M.style.display = "flex"),
        O.checkMilestone(0));
    };
  return {
    root: t,
    updateDigits: y,
    showCelebration: g,
    triggerCelebrationFlare: g,
    endCelebration: () => {
      (i.classList.remove("ro-countdown--celebrating"),
        $ && $.classList.remove("ro-countdown--celebrating"),
        (M.style.display = "none"),
        (z.style.display = "flex"));
    },
    updateSoundButton: (D, B) => {
      p &&
        (p.setAttribute(
          "aria-label",
          D ? e.labels.unmuteButton : e.labels.muteButton
        ),
        p.setAttribute("aria-pressed", String(!D)),
        B
          ? (p.classList.add("ro-countdown-btn--prompt"),
            (p.innerHTML = '<span class="ro-countdown-icon">🔊</span>'),
            p.setAttribute("aria-label", e.labels.playButton))
          : (p.classList.remove("ro-countdown-btn--prompt"),
            (p.innerHTML = D
              ? '<span class="ro-countdown-icon">🔇</span>'
              : '<span class="ro-countdown-icon">🔊</span>')));
    },
    minimize: F,
    expand: Z,
    isMinimized: oe,
    announcer: O,
    destroy: () => {
      (A(), t.remove());
    },
  };
}
const K3 = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
function Fl(e, t = new Date(), n = 10) {
  if (!e) return null;
  let r = e;
  if (typeof r == "function")
    try {
      const o = r(t);
      if (!o) return null;
      r = o;
    } catch {
      return null;
    }
  if (r instanceof Date)
    return isNaN(r.getTime()) ? null : new Date(r.getTime());
  if (typeof r == "string") {
    const o = r.trim(),
      i = o.match(K3);
    if (i) {
      const l = parseInt(i[1], 10),
        c = parseInt(i[2], 10),
        u = i[3] !== void 0 ? parseInt(i[3], 10) : 0,
        v = new Date(t.getTime());
      v.setHours(l, c, u, 0);
      const m = n * 6e4;
      return (t.getTime() > v.getTime() + m && v.setDate(v.getDate() + 1), v);
    }
    const a = new Date(o);
    return isNaN(a.getTime()) ? null : a;
  }
  return null;
}
class Z3 {
  constructor(t, n = {}) {
    ((this.dormantTimeoutId = null),
      (this.tickTimeoutId = null),
      (this.celebrationTimeoutId = null),
      (this.autoDismissTimeoutId = null),
      (this.alertWindowActive = !1),
      (this.t0Fired = !1),
      (this.celebrationEndFired = !1),
      (this.autoDismissFired = !1),
      (this.destroyed = !1),
      (this.onVisibilityChange = () => {
        typeof document < "u" &&
          !document.hidden &&
          !this.destroyed &&
          this.forceTick();
      }),
      (this.targetTime = new Date(t.getTime())),
      (this.alertWindowMinutes = n.alertWindowMinutes ?? 30),
      (this.autoDismissMinutes = n.autoDismissMinutes ?? 10),
      (this.celebrationDurationMs = n.celebrationDurationMs ?? 3e4),
      (this.onAlertWindow = n.onAlertWindow),
      (this.onTick = n.onTick),
      (this.onT0 = n.onT0),
      (this.onCelebrationEnd = n.onCelebrationEnd),
      (this.onAutoDismiss = n.onAutoDismiss));
  }
  start() {
    if (this.destroyed) return;
    typeof document < "u" &&
      document.addEventListener("visibilitychange", this.onVisibilityChange);
    const t = Date.now(),
      r = this.targetTime.getTime() - this.alertWindowMinutes * 6e4;
    if (t >= r) this.enterAlertWindow();
    else {
      const o = r - t;
      this.dormantTimeoutId = window.setTimeout(() => {
        this.enterAlertWindow();
      }, o);
    }
  }
  enterAlertWindow() {
    var t;
    this.destroyed ||
      this.alertWindowActive ||
      ((this.alertWindowActive = !0),
      (t = this.onAlertWindow) == null || t.call(this),
      this.startActiveTickLoop());
  }
  startActiveTickLoop() {
    const t = () => {
      var i, a, l;
      if (this.destroyed) return;
      const n = Date.now(),
        r = this.targetTime.getTime() - n;
      if (r <= 0) {
        this.t0Fired ||
          ((this.t0Fired = !0),
          (i = this.onTick) == null || i.call(this, 0),
          (a = this.onT0) == null || a.call(this),
          this.scheduleCelebrationEnd(),
          this.scheduleAutoDismiss());
        return;
      }
      (l = this.onTick) == null || l.call(this, r);
      const o = 1e3 - (Date.now() % 1e3);
      this.tickTimeoutId = window.setTimeout(t, o);
    };
    t();
  }
  scheduleCelebrationEnd() {
    if (this.celebrationDurationMs <= 0 || this.celebrationEndFired) return;
    const t = Date.now(),
      n = this.targetTime.getTime() + this.celebrationDurationMs,
      r = Math.max(0, n - t);
    this.celebrationTimeoutId = window.setTimeout(() => {
      var o;
      !this.destroyed &&
        !this.celebrationEndFired &&
        ((this.celebrationEndFired = !0),
        (o = this.onCelebrationEnd) == null || o.call(this));
    }, r);
  }
  scheduleAutoDismiss() {
    if (this.autoDismissMinutes <= 0 || this.autoDismissFired) return;
    const t = Date.now(),
      n = this.targetTime.getTime() + this.autoDismissMinutes * 6e4,
      r = Math.max(0, n - t);
    this.autoDismissTimeoutId = window.setTimeout(() => {
      var o;
      !this.destroyed &&
        !this.autoDismissFired &&
        ((this.autoDismissFired = !0),
        (o = this.onAutoDismiss) == null || o.call(this));
    }, r);
  }
  forceOpen() {
    this.destroyed ||
      (this.dormantTimeoutId !== null &&
        (clearTimeout(this.dormantTimeoutId), (this.dormantTimeoutId = null)),
      this.alertWindowActive
        ? this.t0Fired ||
          (this.tickTimeoutId !== null &&
            (clearTimeout(this.tickTimeoutId), (this.tickTimeoutId = null)),
          this.startActiveTickLoop())
        : this.enterAlertWindow());
  }
  forceTick() {
    if (this.destroyed) return;
    const t = Date.now(),
      r = this.targetTime.getTime() - this.alertWindowMinutes * 6e4;
    if (!this.alertWindowActive && t >= r) {
      (this.dormantTimeoutId !== null &&
        (clearTimeout(this.dormantTimeoutId), (this.dormantTimeoutId = null)),
        this.enterAlertWindow());
      return;
    }
    this.alertWindowActive &&
      !this.t0Fired &&
      (this.tickTimeoutId !== null &&
        (clearTimeout(this.tickTimeoutId), (this.tickTimeoutId = null)),
      this.startActiveTickLoop());
  }
  updateTarget(t, n, r, o) {
    ((this.targetTime = new Date(t.getTime())),
      n !== void 0 && (this.alertWindowMinutes = n),
      r !== void 0 && (this.autoDismissMinutes = r),
      o !== void 0 && (this.celebrationDurationMs = o),
      this.stop(),
      (this.alertWindowActive = !1),
      (this.t0Fired = !1),
      (this.celebrationEndFired = !1),
      (this.autoDismissFired = !1),
      this.start());
  }
  isAlertWindowActive() {
    return this.alertWindowActive;
  }
  getTargetTime() {
    return new Date(this.targetTime.getTime());
  }
  stop() {
    (this.dormantTimeoutId !== null &&
      (clearTimeout(this.dormantTimeoutId), (this.dormantTimeoutId = null)),
      this.tickTimeoutId !== null &&
        (clearTimeout(this.tickTimeoutId), (this.tickTimeoutId = null)),
      this.celebrationTimeoutId !== null &&
        (clearTimeout(this.celebrationTimeoutId),
        (this.celebrationTimeoutId = null)),
      this.autoDismissTimeoutId !== null &&
        (clearTimeout(this.autoDismissTimeoutId),
        (this.autoDismissTimeoutId = null)));
  }
  destroy() {
    ((this.destroyed = !0),
      this.stop(),
      typeof document < "u" &&
        document.removeEventListener(
          "visibilitychange",
          this.onVisibilityChange
        ));
  }
}
function $l(e, t = {}) {
  if (!e)
    return {
      start: () => {},
      stop: () => {},
      destroy: () => {},
      isMounted: () => !1,
      controller: null,
    };
  const { isBannerActive: n = !1, hijriYear: r = 1447, colors: o } = t,
    i = typeof e == "boolean" ? {} : e,
    a = i.iftarTime ?? i.maghribTime ?? "18:45",
    l = { ...i, iftarTime: a },
    c = l.alertWindowMinutes ?? 30,
    u = l.autoDismissAfterMinutes !== void 0 ? l.autoDismissAfterMinutes : 10,
    v = l.celebrationDurationMs ?? 3e4,
    m = Fl(l.iftarTime, new Date(), u);
  if (!m)
    return (
      console.debug(
        "[ramadan-overlay] Invalid or unresolvable Iftar time provided."
      ),
      {
        start: () => {},
        stop: () => {},
        destroy: () => {},
        isMounted: () => !1,
        controller: null,
      }
    );
  const { dict: p, isRtl: w, lang: C } = O3(l.locale, l.labels),
    S = new U3({
      soundUrl: l.soundUrl,
      defaultMuted: l.defaultMuted,
      onAudioBlocked: () => {
        var b;
        ((b = l.onAudioBlocked) == null || b.call(l),
          d && d.updateSoundButton(S.isMuted(), !0));
      },
    }),
    z = (b) => !(b.sound === !1 || b.soundUrl === !1 || b.soundUrl === "none");
  let d = null,
    f = !1,
    h,
    x = null;
  if (typeof window < "u") {
    const b = () => {
        (S.prime(), P());
      },
      P = () => {
        (window.removeEventListener("pointerdown", b),
          window.removeEventListener("keydown", b),
          (x = null));
      };
    ((x = P),
      window.addEventListener("pointerdown", b, { once: !0, passive: !0 }),
      window.addEventListener("keydown", b, { once: !0, passive: !0 }));
  }
  const k = () => {
      if (d || f) return;
      ((d = Y3({
        targetTime: T.getTargetTime(),
        position: l.position ?? "bottom-right",
        isBannerTopActive: n,
        hasSound: z(l),
        initialMuted: S.isMuted(),
        minimizable: l.minimizable,
        initiallyMinimized: h !== void 0 ? h : l.initiallyMinimized,
        labels: p,
        isRtl: w,
        lang: C,
        onDismiss: () => {
          E.dismiss();
        },
        onToggleSound: () => {
          E.toggleMute();
        },
        onPlayAlert: () => {
          S.playAlert();
        },
      })),
        S.prime());
      const P = T.getTargetTime().getTime() - Date.now();
      d.updateDigits(P);
      const M = Math.max(1, Math.floor(P / 6e4));
      d.announcer.announceInitial(M);
    },
    T = new Z3(m, {
      alertWindowMinutes: c,
      autoDismissMinutes: u,
      celebrationDurationMs: v,
      onAlertWindow: () => {
        k();
      },
      onTick: (b) => {
        d && d.updateDigits(b);
      },
      onT0: () => {
        var b;
        if ((d && d.triggerCelebrationFlare(), l.confetti !== !1))
          try {
            xa(r, o, "ramadan");
          } catch {}
        (S.playAlert(), (b = l.onIftar) == null || b.call(l));
      },
      onCelebrationEnd: () => {
        d && d.endCelebration();
      },
      onAutoDismiss: () => {
        E.dismiss();
      },
    }),
    E = {
      show: () => {
        (k(), T.forceOpen());
      },
      dismiss: () => {
        var b;
        (d && (d.destroy(), (d = null)),
          T.stop(),
          S.destroy(),
          (b = l.onDismiss) == null || b.call(l));
      },
      minimize: () => {
        ((h = !0), d == null || d.minimize());
      },
      expand: () => {
        ((h = !1), d == null || d.expand());
      },
      isMinimized: () =>
        d ? d.isMinimized() : (h ?? (l.initiallyMinimized || !1)),
      toggleMute: () => {
        const b = S.toggleMute();
        return (b || S.prime(), d && d.updateSoundButton(b, !1), b);
      },
      isMuted: () => S.isMuted(),
      playAlert: () => S.playAlert(),
      getTargetTime: () => T.getTargetTime(),
      updateConfig: (b) => {
        if (
          (Object.assign(l, b),
          b.defaultMuted !== void 0 && S.setMuted(b.defaultMuted),
          b.soundUrl !== void 0 && S.setSoundUrl(b.soundUrl),
          b.iftarTime !== void 0 ||
            b.alertWindowMinutes !== void 0 ||
            b.autoDismissAfterMinutes !== void 0 ||
            b.celebrationDurationMs !== void 0)
        ) {
          const P = Fl(
            l.iftarTime,
            new Date(),
            l.autoDismissAfterMinutes ?? 10
          );
          P &&
            T.updateTarget(
              P,
              l.alertWindowMinutes ?? 30,
              l.autoDismissAfterMinutes ?? 10,
              l.celebrationDurationMs ?? 3e4
            );
        }
        b.position &&
          d &&
          ((d.root.className = `ro-countdown-host ro-countdown-host--${b.position}`),
          n &&
            b.position.startsWith("top-") &&
            d.root.classList.add("ro-countdown-host--banner-offset-top"));
      },
    };
  return {
    start: () => {
      f || T.start();
    },
    stop: () => {
      T.stop();
    },
    destroy: () => {
      ((f = !0), x && x(), E.dismiss(), T.destroy());
    },
    isMounted: () => d !== null,
    controller: E,
  };
}
const Kr = {
  classic: {
    name: "classic",
    colors: ["#c9a84c", "#e5c158", "#8b4513", "#2d5a27", "#fff7cc", "#1a3a1a"],
    glowColor: "rgba(201, 168, 76, 0.55)",
    ceilingColor: "#8b4513",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(24, 19, 8, 0.95)",
    bannerTextColor: "#fae17d",
    bannerIconColor: "#e5c158",
    countdownBg: "rgba(26, 20, 10, 0.95)",
    countdownBorder: "rgba(201, 168, 76, 0.35)",
    countdownAccent: "#e5c158",
  },
  midnight: {
    name: "midnight",
    colors: ["#fbbf24", "#e2e8f0", "#38bdf8", "#6366f1", "#f8fafc", "#1e293b"],
    glowColor: "rgba(56, 189, 248, 0.55)",
    ceilingColor: "#1e293b",
    ropeColor: "#64748b",
    bannerBg: "rgba(15, 23, 42, 0.95)",
    bannerTextColor: "#f8fafc",
    bannerIconColor: "#fbbf24",
    countdownBg: "rgba(15, 23, 42, 0.95)",
    countdownBorder: "rgba(56, 189, 248, 0.35)",
    countdownAccent: "#fbbf24",
  },
  emerald: {
    name: "emerald",
    colors: ["#f59e0b", "#10b981", "#059669", "#064e3b", "#fde68a", "#022c22"],
    glowColor: "rgba(16, 185, 129, 0.55)",
    ceilingColor: "#064e3b",
    ropeColor: "#059669",
    bannerBg: "rgba(2, 44, 34, 0.95)",
    bannerTextColor: "#fef3c7",
    bannerIconColor: "#f59e0b",
    countdownBg: "rgba(4, 38, 28, 0.95)",
    countdownBorder: "rgba(16, 185, 129, 0.35)",
    countdownAccent: "#f59e0b",
  },
  royal: {
    name: "royal",
    colors: ["#fcd34d", "#a78bfa", "#7c3aed", "#4c1d95", "#fef08a", "#2e1065"],
    glowColor: "rgba(167, 139, 250, 0.55)",
    ceilingColor: "#4c1d95",
    ropeColor: "#8b5cf6",
    bannerBg: "rgba(30, 11, 64, 0.95)",
    bannerTextColor: "#fef08a",
    bannerIconColor: "#fcd34d",
    countdownBg: "rgba(32, 13, 64, 0.95)",
    countdownBorder: "rgba(167, 139, 250, 0.35)",
    countdownAccent: "#fcd34d",
  },
  "desert-dusk": {
    name: "desert-dusk",
    colors: ["#f97316", "#fde047", "#ea580c", "#c2410c", "#fed7aa", "#7c2d12"],
    glowColor: "rgba(249, 115, 22, 0.55)",
    ceilingColor: "#7c2d12",
    ropeColor: "#c2410c",
    bannerBg: "rgba(43, 14, 5, 0.95)",
    bannerTextColor: "#fef3c7",
    bannerIconColor: "#f97316",
    countdownBg: "rgba(43, 14, 5, 0.95)",
    countdownBorder: "rgba(249, 115, 22, 0.35)",
    countdownAccent: "#fde047",
  },
  "platinum-minimal": {
    name: "platinum-minimal",
    colors: ["#e2e8f0", "#94a3b8", "#cbd5e1", "#64748b", "#f8fafc", "#334155"],
    glowColor: "rgba(226, 232, 240, 0.45)",
    ceilingColor: "#475569",
    ropeColor: "#94a3b8",
    bannerBg: "rgba(15, 23, 42, 0.95)",
    bannerTextColor: "#f8fafc",
    bannerIconColor: "#e2e8f0",
    countdownBg: "rgba(15, 23, 42, 0.95)",
    countdownBorder: "rgba(148, 163, 184, 0.35)",
    countdownAccent: "#f8fafc",
  },
  "rose-sahara": {
    name: "rose-sahara",
    colors: ["#fb7185", "#f43f5e", "#fda4af", "#e11d48", "#fff1f2", "#be123c"],
    glowColor: "rgba(251, 113, 133, 0.55)",
    ceilingColor: "#881337",
    ropeColor: "#e11d48",
    bannerBg: "rgba(40, 10, 20, 0.95)",
    bannerTextColor: "#fff1f2",
    bannerIconColor: "#fb7185",
    countdownBg: "rgba(40, 10, 20, 0.95)",
    countdownBorder: "rgba(251, 113, 133, 0.35)",
    countdownAccent: "#fda4af",
  },
};
function X3(e, t) {
  let n = "classic",
    r = {};
  typeof e == "string"
    ? Kr[e] && (n = e)
    : typeof e == "object" &&
      e !== null &&
      (e.extends && Kr[e.extends] && (n = e.extends), (r = e));
  const o = Kr[n];
  let i = [...o.colors];
  return (
    t != null && t.colors && t.colors.length > 0
      ? (i = t.colors)
      : r.colors && r.colors.length > 0 && (i = r.colors),
    {
      name:
        typeof e == "string"
          ? Kr[e]
            ? e
            : "classic"
          : (r.name ?? (e ? "custom" : "classic")),
      extends: n,
      colors: i,
      glowColor:
        (t == null ? void 0 : t.glowColor) ?? r.glowColor ?? o.glowColor,
      ceilingColor:
        (t == null ? void 0 : t.ceilingColor) ??
        r.ceilingColor ??
        o.ceilingColor,
      ropeColor:
        (t == null ? void 0 : t.ropeColor) ?? r.ropeColor ?? o.ropeColor,
      bannerBg: (t == null ? void 0 : t.bannerBg) ?? r.bannerBg ?? o.bannerBg,
      bannerTextColor:
        (t == null ? void 0 : t.bannerTextColor) ??
        r.bannerTextColor ??
        o.bannerTextColor,
      bannerIconColor:
        (t == null ? void 0 : t.bannerIconColor) ??
        r.bannerIconColor ??
        o.bannerIconColor,
      countdownBg: r.countdownBg ?? o.countdownBg,
      countdownBorder: r.countdownBorder ?? o.countdownBorder,
      countdownAccent: r.countdownAccent ?? o.countdownAccent,
    }
  );
}
const J3 = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  q3 = ["none", "soft", "deep"],
  ed = [
    "lanterns",
    "crescent-stars",
    "geometric",
    "sparkles",
    "banner",
    "eid",
    "eid-fitr",
    "eid-adha",
  ],
  td = [
    "top",
    "bottom",
    "left",
    "right",
    "sides",
    "both",
    "full",
    "start",
    "end",
  ],
  nd = ["low", "normal", "high"],
  rd = ["straight", "u-shaped", "dual"],
  od = ["ramadan", "eid-fitr", "eid-adha"],
  id = ["hide", "top", "show"],
  ad = ["on", "off"],
  ld = ["en", "ar"],
  sd = ["edges", "full"],
  ud = ["foreground", "background"];
function cu(e) {
  if (e && typeof e.debug == "boolean") return e.debug;
  if (typeof window < "u" && window.__RAMADAN_OVERLAY_DEBUG__) return !0;
  try {
    typeof process < "u";
  } catch {}
  return !1;
}
function Un(e, t, n, r) {
  return typeof e != "number" || isNaN(e) || !isFinite(e)
    ? r
    : Math.max(t, Math.min(n, e));
}
function br(e) {
  return {
    info: (t, ...n) => {
      e && typeof console < "u" && console.info && console.info(t, ...n);
    },
    warn: (t, ...n) => {
      e && typeof console < "u" && console.warn && console.warn(t, ...n);
    },
    error: (t, ...n) => {
      e && typeof console < "u" && console.error && console.error(t, ...n);
    },
  };
}
function Ze(e, t, n, r, o) {
  return typeof e == "string" && t.includes(e)
    ? e
    : (e !== void 0 &&
        br(o).warn(
          `[ramadan-overlay] Invalid ${r} "${String(e)}"; falling back to "${n}".`
        ),
      n);
}
function cd() {
  (L3(), G3());
}
function Vl(e, t, n) {
  if (typeof e == "function")
    try {
      e(t);
    } catch (r) {
      br(n).warn(
        "[ramadan-overlay] Exception thrown inside consumer onError callback:",
        r
      );
    }
}
function Hl(e, t = Sa) {
  return {
    destroy: () => {},
    update: () => {},
    setTheme: () => {},
    container: null,
    config: e,
    state: t,
    getState: () => ({ ...t }),
    getCountdownController: () => null,
    countdown: null,
    fireConfetti: async () => {},
  };
}
function dd() {
  const e = new Date(),
    t = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1, 0, 0, 1);
  return Math.max(1e3, t.getTime() - e.getTime());
}
function Ti(e, t) {
  return t.isEid && (e.variant === "lanterns" || e.variant === "eid")
    ? e.eidVariant
    : e.variant;
}
function rn(e) {
  return e.mobileSideBehavior === "top" &&
    _n(e.position).length > 0 &&
    typeof window < "u" &&
    window.innerWidth < 768
    ? "top"
    : e.position;
}
function Wn(e, t) {
  return t.previewMode || !t.autoTrigger
    ? !0
    : e.occasion === "none"
      ? !1
      : t.occasions.includes(e.occasion);
}
function Ul(e, t) {
  return e.occasion && e.occasion !== "none"
    ? e.occasion
    : t.variant === "eid-adha"
      ? "eid-adha"
      : t.variant === "eid-fitr" || t.variant === "eid"
        ? "eid-fitr"
        : "ramadan";
}
function Zr(e) {
  const t = cu(e),
    n = br(t);
  let r = "classic";
  typeof e.theme == "string"
    ? (r = Ze(e.theme, J3, "classic", "theme", t))
    : typeof e.theme == "object" && e.theme !== null && (r = e.theme);
  const o = X3(r, e),
    i = Ze(e.variant, ed, "lanterns", "variant", t);
  let a = Ze(e.position, td, "both", "position", t);
  i === "banner" &&
    ["left", "right", "sides", "start", "end"].includes(a) &&
    (n.warn(
      '[ramadan-overlay] Banner variant does not support vertical side positioning; falling back to "top"'
    ),
    (a = "top"));
  const l = typeof window < "u" && window.innerWidth < 640 ? "low" : "normal",
    c = Ze(e.density, nd, l, "density", t);
  let u = e.ropeStyle;
  u === "u-shape" || u === "curved"
    ? (u = "u-shaped")
    : u === "dual-rope" && (u = "dual");
  const v = Ze(u, rd, "straight", "ropeStyle", t),
    m = Ze(e.mobileSideBehavior, id, "hide", "mobileSideBehavior", t),
    p = Ze(e.confetti, ad, "on", "confetti", t),
    w = Ze(e.locale, ld, "en", "locale", t),
    C = Un(e.opacity, 0, 1, 0.85),
    S = Un(e.zIndex, -2147483648, 2147483647, 9999),
    z = Un(e.lanternZIndex, -2147483648, 2147483647, 2),
    d = Un(e.ropeSag, 6, 60, 20),
    f =
      typeof e.lanternCount == "number" ? Un(e.lanternCount, 1, 12, 4) : void 0,
    h = Ze(e.shadows, q3, "soft", "shadows", t),
    x = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(i)
      ? "edges"
      : "full",
    k = Ze(e.clearance, sd, x, "clearance", t),
    T = Ze(e.layer, ud, "foreground", "layer", t);
  let E;
  typeof e.mountTarget == "string" && e.mountTarget.trim().length > 0
    ? (E = e.mountTarget.trim())
    : typeof HTMLElement < "u" &&
      e.mountTarget instanceof HTMLElement &&
      (E = e.mountTarget);
  let b = ["ramadan", "eid-fitr", "eid-adha"];
  if (Array.isArray(e.occasions)) {
    const L = e.occasions.filter(($) => od.includes($));
    L.length > 0 && (b = L);
  }
  let P;
  if (e.date instanceof Date) P = isNaN(e.date.getTime()) ? void 0 : e.date;
  else if (typeof e.date == "string" || typeof e.date == "number") {
    const L = new Date(e.date);
    P = isNaN(L.getTime()) ? void 0 : L;
  }
  let M = "normal";
  return (
    typeof e.intensity == "number"
      ? (M = Math.max(1, Math.min(10, Math.round(e.intensity))))
      : e.intensity === "low" ||
          e.intensity === "normal" ||
          e.intensity === "high"
        ? (M = e.intensity)
        : (e.density === "low" ||
            e.density === "normal" ||
            e.density === "high") &&
          (M = e.density),
    {
      date: P,
      debug: t,
      onError: e.onError,
      theme: e.theme ?? "classic",
      themeName: o.name ?? "classic",
      variant: i,
      position: a,
      clearance: k,
      layer: T,
      mountTarget: E,
      mobileSideBehavior: m,
      opacity: C,
      shadows: h,
      colors: o.colors,
      zIndex: S,
      lanternZIndex: z,
      autoTrigger: e.autoTrigger ?? !0,
      previewMode: e.previewMode ?? !1,
      confetti: p,
      locale: w,
      bannerBg: o.bannerBg,
      bannerTextColor: o.bannerTextColor,
      bannerTextEn: e.bannerTextEn ?? "",
      bannerTextAr: e.bannerTextAr ?? "",
      bannerIconColor: o.bannerIconColor,
      lanternStyle: e.lanternStyle ?? 0,
      lanternCount: f,
      glowColor: o.glowColor,
      ceilingColor: o.ceilingColor,
      ropeColor: o.ropeColor,
      ropeStyle: v,
      ropeSag: d,
      region: e.region ?? "standard",
      hijriAdjustment: lu(e.region, e.hijriAdjustment),
      density: c,
      intensity: M,
      occasions: b,
      eidVariant: e.eidVariant ?? "eid",
      liveTransition: e.liveTransition ?? !0,
      countdown: e.countdown ?? !1,
      countdownBg: o.countdownBg,
      countdownBorder: o.countdownBorder,
      countdownAccent: o.countdownAccent,
      onRamadanStart: e.onRamadanStart,
      onRamadanEnd: e.onRamadanEnd,
      onEidStart: e.onEidStart,
      onOccasionChange: e.onOccasionChange,
    }
  );
}
function uo(e = {}) {
  if (typeof document > "u") return Hl(Zr(e), Sa);
  let t = { ...e },
    n;
  try {
    n = Zr(t);
  } catch {
    n = Zr({});
  }
  const r = cu(n);
  try {
    let o = Cn({
      date: n.date ?? new Date(),
      region: n.region,
      hijriAdjustment: n.hijriAdjustment,
    });
    const i = br(r);
    if (n.autoTrigger && !n.previewMode && o.occasion === "none") {
      const x = n.date ?? new Date();
      i.info(
        `[ramadan-overlay] Overlay dormant: autoTrigger is enabled, but current date (${x.toISOString().slice(0, 10)}) does not fall within configured occasions (${n.occasions.join(", ")}). Pass previewMode: true to force display during development.`
      );
    }
    n.previewMode &&
      i.info(
        "[ramadan-overlay] Preview mode active: overlay forced visible regardless of Hijri calendar date."
      );
    let a = null,
      l = new Date().toDateString();
    const c = (x) => {
        const k = Ti(n, x),
          T = rn(n),
          E = { ...n, variant: k, position: T };
        ((a = _3(E, x.occasion)), (h.container = a.container));
      },
      u = () => {
        a && (a.cleanup(), (a = null), (h.container = null));
      },
      v = (x, k) => {
        var T, E, b, P;
        if (
          ((!x || x.occasion !== k.occasion) &&
            ((T = n.onOccasionChange) == null || T.call(n, k.occasion, k)),
          (k.isRamadan || n.previewMode) &&
            (!x || !x.isRamadan) &&
            ((E = n.onRamadanStart) == null || E.call(n, k)),
          k.isEid &&
            (!x || !x.isEid) &&
            ((b = n.onEidStart) == null || b.call(n, k)),
          x != null &&
            x.isRamadan &&
            !k.isRamadan &&
            ((P = n.onRamadanEnd) == null || P.call(n)),
          i3(k, n.confetti, n.previewMode))
        ) {
          const M = k.hijriYear || 1447,
            L = Ul(k, n);
          xa(M, n.colors, L);
        }
      };
    let m = null;
    const p = () => {
        if (!n.liveTransition || typeof window > "u") return;
        m && clearTimeout(m);
        const x = dd();
        m = setTimeout(() => {
          w();
        }, x);
      },
      w = () => {
        var M, L;
        const x = new Date();
        l = x.toDateString();
        const k = Cn({
            date: x,
            region: n.region,
            hijriAdjustment: n.hijriAdjustment,
          }),
          T = o,
          E = T.occasion,
          b = Wn(T, n),
          P = Wn(k, n);
        ((o = k),
          (h.state = k),
          P
            ? b
              ? E !== k.occasion && (u(), c(k), v(T, k))
              : (c(k), v(T, k))
            : b &&
              (u(),
              (M = n.onOccasionChange) == null || M.call(n, k.occasion, k),
              T.isRamadan && ((L = n.onRamadanEnd) == null || L.call(n))),
          p());
      },
      C = () => {
        new Date().toDateString() !== l && w();
      };
    n.liveTransition &&
      typeof document < "u" &&
      (p(),
      document.addEventListener("visibilitychange", C),
      typeof window < "u" && window.addEventListener("focus", C));
    let S = rn(n);
    const z = () => {
      const x = rn(n);
      x !== S && ((S = x), a && Wn(o, n) && (u(), c(o)));
    };
    typeof window < "u" &&
      window.addEventListener("resize", z, { passive: !0 });
    const d = (x, k) => x.isRamadan || k.previewMode || !k.autoTrigger;
    let f = null;
    n.countdown &&
      ((f = $l(n.countdown, {
        isBannerActive: n.variant === "banner",
        hijriYear: o.hijriYear || 1447,
        colors: n.colors,
      })),
      d(o, n) && f.start());
    const h = {
      destroy: () => {
        var x;
        (f && (f.destroy(), (f = null)),
          m && (clearTimeout(m), (m = null)),
          typeof document < "u" &&
            document.removeEventListener("visibilitychange", C),
          typeof window < "u" &&
            (window.removeEventListener("focus", C),
            window.removeEventListener("resize", z)),
          u(),
          o.isRamadan && ((x = n.onRamadanEnd) == null || x.call(n)));
      },
      update: (x) => {
        try {
          t = { ...t, ...x };
          const k = Zr(t);
          if (
            x.date !== void 0 ||
            x.region !== void 0 ||
            x.hijriAdjustment !== void 0
          ) {
            const b = o;
            ((o = Cn({
              date: k.date ?? new Date(),
              region: k.region,
              hijriAdjustment: k.hijriAdjustment,
            })),
              (h.state = o),
              b.occasion !== o.occasion && v(b, o));
          }
          const T = Wn(o, k),
            E = !!a;
          if (T && !E) ((n = k), c(o));
          else if (!T && E) ((n = k), u());
          else if (a) {
            const b = Ti(n, o),
              P = Ti(k, o),
              M =
                k.variant === "banner" &&
                (JSON.stringify(k.bannerTextEn) !==
                  JSON.stringify(n.bannerTextEn) ||
                  JSON.stringify(k.bannerTextAr) !==
                    JSON.stringify(n.bannerTextAr) ||
                  k.locale !== n.locale),
              L = rn(n),
              $ = rn(k),
              j =
                P !== b ||
                $ !== L ||
                k.mobileSideBehavior !== n.mobileSideBehavior ||
                k.density !== n.density ||
                k.intensity !== n.intensity ||
                k.lanternStyle !== n.lanternStyle ||
                k.ropeStyle !== n.ropeStyle ||
                k.ropeSag !== n.ropeSag ||
                k.clearance !== n.clearance ||
                k.mountTarget !== n.mountTarget ||
                M;
            ((n = k), (S = $), j ? (u(), c(o)) : a.updateTokens(k));
          } else ((n = k), (S = rn(k)));
          (n.liveTransition ? p() : m && (clearTimeout(m), (m = null)),
            x.countdown !== void 0 &&
              (f && (f.destroy(), (f = null)),
              k.countdown &&
                ((f = $l(k.countdown, {
                  isBannerActive: k.variant === "banner",
                  hijriYear: o.hijriYear || 1447,
                  colors: k.colors,
                })),
                d(o, k) && f.start())));
        } catch (k) {
          (Vl(t.onError, k, r),
            i.error(
              "[ramadan-overlay] Dynamic update error caught by containment boundary:",
              k
            ));
        }
      },
      setTheme: (x) => {
        h.update({ theme: x });
      },
      container: null,
      state: o,
      get config() {
        return n;
      },
      getCountdownController: () => (f ? f.controller : null),
      get countdown() {
        return f ? f.controller : null;
      },
      getState: () => o,
      fireConfetti: async (x) => {
        const k = o.hijriYear || 1447,
          T = x || Ul(o, n);
        await xa(k, n.colors, T);
      },
    };
    return (Wn(o, n) && c(o), v(null, o), h);
  } catch (o) {
    return (
      cd(),
      Vl(e.onError, o, r),
      br(r).error(
        "[ramadan-overlay] Catastrophic initialization error caught by containment boundary:",
        o
      ),
      Hl(n, Sa)
    );
  }
}
function fd(e = {}) {
  const t = X.useRef(null),
    [n, r] = X.useState(() => Cn(e)),
    o = JSON.stringify(e),
    i = X.useRef(!1);
  X.useEffect(() => {
    if (((i.current = !0), !t.current)) {
      const l = uo({
        ...e,
        onOccasionChange: (c, u) => {
          var v;
          (r(u), (v = e.onOccasionChange) == null || v.call(e, c, u));
        },
      });
      ((t.current = l), r(l.state));
    }
    return () => {
      var l;
      ((i.current = !1),
        (l = t.current) == null || l.destroy(),
        (t.current = null));
    };
  }, []);
  const a = typeof e.theme == "object" ? JSON.stringify(e.theme) : e.theme;
  return (
    X.useEffect(() => {
      i.current &&
        t.current &&
        e.theme !== void 0 &&
        t.current.setTheme(e.theme);
    }, [a]),
    X.useEffect(() => {
      i.current && t.current && t.current.update(e);
    }, [o]),
    { state: n, instance: t.current }
  );
}
const pd = (e) => {
    const { config: t, onInstance: n, children: r, ...o } = e,
      i = { ...t, ...o },
      { state: a, instance: l } = fd(i);
    return (
      X.useEffect(() => {
        n && n(l);
      }, [l, n]),
      r ? s.jsx(s.Fragment, { children: r(a) }) : null
    );
  },
  md = {
    nav: {
      brandTitle: "زينة رمضان",
      versionBadge: "الإصدار 0.7.0",
      occasionBadge: "المناسبة الحالية",
      occasionSelectLabel: "معاينة المناسبة",
      occasions: {
        ramadan: "🌙 شهر رمضان المبارك",
        "eid-fitr": "🎉 عيد الفطر المبارك",
        "eid-adha": "🐑 عيد الأضحى المبارك",
      },
      overlayOn: "الزينة مفعّلة",
      overlayOff: "الزينة متوقفة",
      chimeTest: "صوت التنبيه",
      confettiLaunch: "احتفال زينة",
      switchLang: "English",
      githubLink: "مستودع GitHub",
      toggleMobileDrawer: "لوحة التحكم",
    },
    hero: {
      badge: "رمضان مبارك و كل عام وأنتم بخير",
      title: "أجواء رمضانية واحتفالية ساحرة لموقعك",
      subtitle:
        "مكتبة تايب سكريبت خفيفة ومستقلة لإضفاء الزينة الرمضانية وفوانيس العيد تلقائياً بحسب التقويم الهجري، مع دعم كامل للرياكت وجميع أطر العمل وعداد الإفطار التفاعلي.",
      ctaWorkbench: "جرب المخصّص التفاعلي",
      ctaLab: "مختبر الأمان والعداد",
      statVariants: "8 أنماط زخرفية (Variants)",
      statZeroDeps: "خفيف ودون اعتماديات",
      statFrameworks: "React, Vue, Svelte, Angular",
    },
    workbench: {
      title: "المخصّص الحي والأنماط التفاعلية",
      subtitle:
        "اختر النمط الزخرفي المناسب لموقعك وخصص الألوان والمواضع واحصل على كود التضمين فوراً.",
      variantHeading: "1. اختر النمط الزخرفي (Overlay Variant)",
      optionsHeading: "2. تخصيص إعدادات النمط",
      variants: {
        lanterns: {
          name: "فوانيس تقليدية",
          desc: "صف فوانيس متدلية من السقف أو الجوانب مع حبال متحركة واقعية.",
        },
        banner: {
          name: "شريط التهنئة",
          desc: "شريط أنيق أعلى أو أسفل الشاشة يحمل عبارات التهنئة بالعربية والإنجليزية.",
        },
        "crescent-stars": {
          name: "هلال ونجوم طائرة",
          desc: "أشكال هلال ونجوم تسبح بخفة عبر الشاشة مع حماية منطقة المحتوى الآمنة (Content Safe Zone).",
        },
        geometric: {
          name: "زخارف إسلامية هندسية",
          desc: "أنماط هندسية إسلامية متحركة بزوايا ناعمة وألوان تراثية.",
        },
        sparkles: {
          name: "بريق ووميض نجوم",
          desc: "جزيئات مضيئة ونجوم ساطعة تتلألأ بهدوء في خلفية الموقع.",
        },
        eid: {
          name: "احتفالات العيد الشاملة",
          desc: "أشكال بهيجة تجمع هلال العيد والبالونات والهدايا.",
        },
        "eid-fitr": {
          name: "عيد الفطر المبارك",
          desc: "زينة عيد الفطر المبهجة مع تهاني خاصة وبالونات احتفالية.",
        },
        "eid-adha": {
          name: "عيد الأضحى المبارك",
          desc: "زينة عيد الأضحى بمجسمات خراف وبالونات وهلال مبارك.",
        },
      },
      universal: {
        theme: "السمة اللونية المعتمدة (Theme Preset)",
        themeOptions: {
          classic: "كلاسيكي (ذهبي ملكي)",
          midnight: "منتصف الليل (كحلي ولازوردي)",
          emerald: "زمردي (أخضر إسلامي فاخر)",
          royal: "ملكي (أرجواني وذهبي)",
          "desert-dusk": "شفق الصحراء (غروب دافئ)",
          "platinum-minimal": "بلاتيني هادئ",
          "rose-sahara": "ورد الصحراء",
          custom: "تخصيص يدوي للألوان",
        },
        position: "موضع الظهور على الشاشة",
        positionOptions: {
          top: "أعلى الشاشة (سقف الموقع)",
          bottom: "أسفل الشاشة",
          both: "أعلى وأسفل معاً",
          full: "كامل مساحة الشاشة",
          sides: "كلا الجانبين (يمين ويسار)",
          left: "الجانب الأيسر فقط",
          right: "الجانب الأيمن فقط",
          start: "بداية المحتوى (يمين في العربية)",
          end: "نهاية المحتوى (يسار في العربية)",
        },
        opacity: "مستوى الشفافية",
        layer: "طبقة العرض (Layer Stacking)",
        layerOptions: {
          foreground: "في المقدمة (أعلى محتوى الموقع)",
          background: "في الخلفية (خلف نصوص الموقع)",
        },
        shadows: "عمق الظلال الواقعية (Elevation Shadow)",
        shadowOptions: {
          none: "دون ظلال (توهج مسطح)",
          soft: "ظل ناعم وطبيعي",
          deep: "ظل غامق ومجسم",
        },
        confetti: "تأثير احتفال الزينة (Confetti)",
        confettiOptions: { on: "مفعّل (عند وقت الإفطار)", off: "معطل" },
        autoTrigger: "الكشف التلقائي بالتقويم الهجري",
        autoTriggerHelp:
          "يظهر تلقائياً في شهر رمضان وأيام العيد ويختفي في باقي شهور السنة.",
        countdown: "تفعيل ودجت عداد وقت الإفطار",
        countdownHelp:
          "يعرض بطاقة عد تنازلي حتى أذان المغرب مع تنبيهات صوتية واحتفال عند الوصول.",
      },
      variantSpecific: {
        lanternHeading: "خيارات الفوانيس والحبال",
        lanternStyle: "تصميم الفانوس",
        lanternCycle: "عرض جميع التصاميم الـ 12 بالتناوب",
        lanternCount: "كثافة وعدد الفوانيس",
        lanternCountAuto: "تلقائي هادئ (3-6)",
        ropeStyle: "نمط حبل التعليق",
        ropeStraight: "حبل مستقيم أفقي",
        ropeUshaped: "حبال متدلية ومنحنية (U-Shaped Swag)",
        ropeDual: "حبل مزدوج احتفالي (Dual Festoon)",
        ropeSag: "عمق تدلي الحبال (بكسل)",
        ceilingColor: "لون مسطرة التثبيت العلوية",
        ropeColor: "لون خيوط الفوانيس المتدلية",
        bannerHeading: "خيارات شريط التهنئة",
        bannerTextAr: "نص التهنئة بالعربية",
        bannerTextEn: "نص التهنئة بالإنجليزية",
        bannerBg: "لون خلفية الشريط",
        bannerTextColor: "لون نص التهنئة",
        bannerIconColor: "لون أيقونة الفانوس",
        motifsHeading: "خيارات حركة الأشكال والهلال",
        clearance: "حماية منطقة المحتوى الآمنة (Content Safe Zone)",
        clearanceEdges: "حصر الأشكال في هوامش الجوانب فقط (الموصى به)",
        clearanceFull: "حركة حرة عبر كامل الشاشة",
        intensity: "كثافة وسرعة حركة الأشكال",
        intensityLow: "حركة هادئة وخفيفة",
        intensityNormal: "حركة متوازنة ومعتدلة",
        intensityHigh: "تدفق احتفالي كثيف",
        sparklesHeading: "خيارات البريق والوميض",
        density: "كثافة الجزيئات والنجوم",
        glowColor: "لون توهج الجزيئات والبريق",
      },
      colors: {
        heading: "3. تخصيص لوحة الألوان اليدوية",
        customPalette: "لوحة ألوان متناسقة",
        primary: "اللون الأساسي",
        accent: "لون الزخرفة والتمييز",
        glow: "لون التوهج والبريق",
        ceiling: "لون مسطرة التثبيت",
        rope: "لون الحبال والخيوط",
        bannerBg: "خلفية شريط التهنئة",
        bannerText: "لون نص التهنئة",
        resetBtn: "استعادة ألوان السمة الافتراضية",
      },
      code: {
        heading: "4. كود التضمين الفوري",
        copyBtn: "📋 نسخ الكود",
        copiedBtn: "✓ تم النسخ إلى الحافظة!",
        copyPromptSeamBtn:
          "📋 نسخ مسار وكيل الذكاء الاصطناعي (Agent Prompt Seam)",
        promptSeamCopiedBtn: "✓ تم نسخ مسار الوكيل للحافظة!",
        tabs: {
          react: "React",
          vanilla: "Vanilla JS",
          vue: "Vue 3",
          svelte: "Svelte",
          angular: "Angular",
          ai: "🤖 مسار وكيل الذكاء الاصطناعي (Agent Prompt Seam)",
        },
        promptTitle:
          "مسار مباشر لمساعدي البرمجة بالذكاء الاصطناعي (Cursor / Claude Code / Copilot)",
      },
    },
    lab: {
      title: "مختبر المطور وعداد الإفطار",
      badge: "المختبر المتقدم",
      desc: "أدوات متقدمة لتجربة التحكم البرمجي في عداد الإفطار واختبار صلابة المكتبة وأمانها ضد الانهيارات.",
      countdownTitle: "التحكم التفاعلي في ودجت الإفطار",
      btnShow: "إظهار العداد فوراً",
      btnDismiss: "إخفاء العداد",
      btnMinimize: "تصغير إلى شارة مدمجة (Docked Pill)",
      btnExpand: "توسيع البطاقة بالكامل",
      btnMute: "كتم الصوت",
      btnUnmute: "تشغيل الصوت",
      btnPlayChime: "تجربة نغمة أذان المغرب",
      resilienceTitle: "اختبارات الصلابة وحماية التطبيق (Defensive Resilience)",
      resilienceDesc:
        "تختبر هذه الأزرار منظومة حماية الموقع ضد أي انهيارات برمجية غير متوقعة.",
      btnClamping: "اختبار تقييد الإعدادات الشاذة",
      btnInvalidDate: "اختبار تواريخ غير صالحة (NaN Date)",
      btnCrash: "محاكاة انهيار حقن الأنماط (DOM Rollback)",
      btnOnError: "اختبار عزل استدعاءات Telemetry التالفة",
      btnToggleDebug: "تفعيل السجل التشخيصي",
      debugOn: "السجل التشخيصي: مفعّل",
      debugOff: "السجل التشخيصي: معطل",
      terminalHeading: "سجل التشخيص الفوري (Console Logs)",
      clearTerminal: "مسح السجل",
    },
    footer: {
      copy: "مكتبة مفتوحة المصدر للاحتفال بشهر رمضان المبارك والأعياد.",
      license: "مرخصة تحت رخصة MIT.",
      builtWith: "صنعت بشغف وإتقان.",
    },
  },
  hd = {
    nav: {
      brandTitle: "ramadan-overlay",
      versionBadge: "v0.7.0",
      occasionBadge: "Festive Occasion",
      occasionSelectLabel: "Preview Occasion",
      occasions: {
        ramadan: "🌙 Ramadan Mubarak",
        "eid-fitr": "🎉 Eid Al-Fitr",
        "eid-adha": "🐑 Eid Al-Adha",
      },
      overlayOn: "Overlay ON",
      overlayOff: "Overlay OFF",
      chimeTest: "Test Chime",
      confettiLaunch: "Celebration Confetti",
      switchLang: "العربية",
      githubLink: "GitHub Repository",
      toggleMobileDrawer: "Toggle Configurator",
    },
    hero: {
      badge: "Ramadan Mubarak & Festive Celebrations",
      title: "Festive Visuals & Iftar Countdown for Modern Web",
      subtitle:
        "A lightweight, zero-dependency TypeScript library that automatically displays Ramadan & Eid decorations based on the Hijri calendar, with first-class React support, all major frameworks, and an accessible countdown timer.",
      ctaWorkbench: "Open Configurator",
      ctaLab: "Safety & Countdown Lab",
      statVariants: "8 Overlay Variants",
      statZeroDeps: "Lightweight & Zero-Deps",
      statFrameworks: "React, Vue, Svelte, Angular",
    },
    workbench: {
      title: "Live Interactive Configurator",
      subtitle:
        "Select an overlay variant, adjust positioning and colors, and copy production code instantly.",
      variantHeading: "1. Select Overlay Variant",
      optionsHeading: "2. Configure Variant Parameters",
      variants: {
        lanterns: {
          name: "Traditional Lanterns",
          desc: "Hanging lanterns from the ceiling or lateral gutters with realistic swinging rope physics.",
        },
        banner: {
          name: "Greeting Banner",
          desc: "Sleek top or bottom greeting bar featuring festive bilingual greetings in Arabic & English.",
        },
        "crescent-stars": {
          name: "Ascending Crescent & Stars",
          desc: "Floating celestial crescents drifting gracefully while keeping the central Content Safe Zone clean.",
        },
        geometric: {
          name: "Islamic Geometric Patterns",
          desc: "Subtle traditional Arabesque lattice patterns rotating smoothly across the viewport.",
        },
        sparkles: {
          name: "Luminous Star Sparkles",
          desc: "Gentle shimmering light particles and twinkling stars creating ambient festive warmth.",
        },
        eid: {
          name: "Eid Celebrations Suite",
          desc: "Celebratory mix of festive crescents, balloons, and gifts for Eid festivities.",
        },
        "eid-fitr": {
          name: "Eid Al-Fitr",
          desc: "Joyful Eid Al-Fitr motifs, sweets, floating balloons, and holiday crescent decorations.",
        },
        "eid-adha": {
          name: "Eid Al-Adha",
          desc: "Festive motifs with cute sheep silhouettes, festive balloons, and warm holiday blessings.",
        },
      },
      universal: {
        theme: "Curated Visual Theme",
        themeOptions: {
          classic: "Classic (Royal Gold)",
          midnight: "Midnight (Deep Navy & Lapis)",
          emerald: "Emerald (Sacred Islamic Green)",
          royal: "Royal (Velvet Purple & Gold)",
          "desert-dusk": "Desert Dusk (Warm Sunset Terracotta)",
          "platinum-minimal": "Platinum Minimal (Silver & Ice)",
          "rose-sahara": "Rose Sahara (Muted Blush Gold)",
          custom: "Custom Palette Overrides",
        },
        position: "Viewport Screen Placement",
        positionOptions: {
          top: "Top (Ceiling Rail)",
          bottom: "Bottom Viewport",
          both: "Both (Top & Bottom)",
          full: "Full Viewport Scatter",
          sides: "Both Lateral Sides",
          left: "Left Margin Only",
          right: "Right Margin Only",
          start: "Start Margin (Right in RTL)",
          end: "End Margin (Left in RTL)",
        },
        opacity: "Layer Opacity",
        layer: "Layer Stacking",
        layerOptions: {
          foreground: "Foreground (Above page elements)",
          background: "Background (Ambient backdrop)",
        },
        shadows: "Elevation Shadow Depth",
        shadowOptions: {
          none: "None (Flat minimalist glow)",
          soft: "Soft (Realistic depth shadow)",
          deep: "Deep (High-contrast elevation)",
        },
        confetti: "Celebration Confetti at Iftar",
        confettiOptions: { on: "Enabled (Flare at T-0)", off: "Disabled" },
        autoTrigger: "Automatic Hijri Calendar Trigger",
        autoTriggerHelp:
          "Automatically displays during Ramadan and Eid periods and sleeps the rest of the year.",
        countdown: "Enable Iftar Countdown Widget",
        countdownHelp:
          "Mounts an accessible floating countdown card with audio chime alerts and confetti flare at Maghrib.",
      },
      variantSpecific: {
        lanternHeading: "Lantern & Rope Parameters",
        lanternStyle: "Lantern SVG Design",
        lanternCycle: "Cycle all 12 distinct designs",
        lanternCount: "Lantern Density / Count",
        lanternCountAuto: "Auto Decorative (3–6)",
        ropeStyle: "Suspension String Style",
        ropeStraight: "Straight Ceiling Rail",
        ropeUshaped: "Curved U-Shaped Festoon Swag",
        ropeDual: "Dual Parallel Festival Cables",
        ropeSag: "Rope Sag Depth (px)",
        ceilingColor: "Ceiling Mounting Bar Color",
        ropeColor: "Lantern Dropline Cord Color",
        bannerHeading: "Greeting Banner Parameters",
        bannerTextAr: "Arabic Greeting Text",
        bannerTextEn: "English Greeting Text",
        bannerBg: "Banner Background (RGBA)",
        bannerTextColor: "Greeting Typography Color",
        bannerIconColor: "Lantern Icon Accent Color",
        motifsHeading: "Floating Motif Dynamics",
        clearance: "Content Safe Zone Clearance",
        clearanceEdges: "Constrain to peripheral gutters (Recommended)",
        clearanceFull: "Full viewport scatter",
        intensity: "Motion Cadence & Density",
        intensityLow: "Serene & Gentle Float",
        intensityNormal: "Balanced Festive Ambient",
        intensityHigh: "Festive Surge Stream",
        sparklesHeading: "Ambient Sparkle Parameters",
        density: "Particle Density",
        glowColor: "Ambient Glow Halo Color",
      },
      colors: {
        heading: "3. Custom Color Palette",
        customPalette: "Harmonized Color Palette",
        primary: "Primary Accent Color",
        accent: "Secondary Accent Color",
        glow: "Ambient Halo Glow",
        ceiling: "Ceiling Rail Color",
        rope: "Dropline Cord Color",
        bannerBg: "Banner Background",
        bannerText: "Banner Typography Color",
        resetBtn: "Reset to Classic Palette",
      },
      code: {
        heading: "4. Production Integration Code",
        copyBtn: "📋 Copy Code",
        copiedBtn: "✓ Copied to clipboard!",
        copyPromptSeamBtn: "📋 Copy Agent Prompt Seam",
        promptSeamCopiedBtn: "✓ Agent Prompt Seam copied!",
        tabs: {
          react: "React",
          vanilla: "Vanilla JS",
          vue: "Vue 3",
          svelte: "Svelte",
          angular: "Angular",
          ai: "🤖 Agent Prompt Seam",
        },
        promptTitle:
          "Direct Prompt for AI Assistants (Cursor / Claude Code / Copilot)",
      },
    },
    lab: {
      title: "Developer Lab & Iftar Countdown Sandbox",
      badge: "Advanced Lab",
      desc: "Interactive developer tools to test programmatic countdown widget controls and verify defensive safety and crash containment.",
      countdownTitle: "Iftar Countdown Widget Playground",
      btnShow: "Show Countdown",
      btnDismiss: "Dismiss Widget",
      btnMinimize: "Minimize to Docked Pill",
      btnExpand: "Expand to Full Card",
      btnMute: "Mute Audio Alert",
      btnUnmute: "Unmute Audio Alert",
      btnPlayChime: "Preview Harmonic Chime",
      resilienceTitle: "Defensive Safety & Crash Containment Harness",
      resilienceDesc:
        "Verify that unexpected runtime errors or malformed configs never crash the host application.",
      btnClamping: "Test Extreme Config Clamping",
      btnInvalidDate: "Test Invalid Date (NaN Date)",
      btnCrash: "Simulate DOM Injection Crash (Atomic Rollback)",
      btnOnError: "Test Double-Contained onError Isolation",
      btnToggleDebug: "Toggle Diagnostic Logging",
      debugOn: "Debug Logging: Active",
      debugOff: "Debug Logging: Off",
      terminalHeading: "Real-time Diagnostic Log Terminal",
      clearTerminal: "Clear Terminal",
    },
    footer: {
      copy: "Open-source Ramadan & Eid celebration overlay library.",
      license: "MIT Licensed.",
      builtWith: "Crafted with dedication and care.",
    },
  },
  du = "ro_demo_lang";
function vd() {
  if (typeof window > "u") return "ar";
  try {
    const t = new URLSearchParams(window.location.search).get("lang");
    if (t === "ar" || t === "en") return t;
  } catch {}
  try {
    const e = window.location.hash.replace(/^#/, ""),
      n = new URLSearchParams(e).get("lang");
    if (n === "ar" || n === "en") return n;
  } catch {}
  try {
    const e = localStorage.getItem(du);
    if (e === "ar" || e === "en") return e;
  } catch {}
  return "ar";
}
function fu(e) {
  if (typeof document > "u") return;
  const t = e === "ar" ? "rtl" : "ltr";
  (document.documentElement.setAttribute("dir", t),
    document.documentElement.setAttribute("lang", e));
}
function gd(e) {
  if (!(typeof window > "u")) {
    try {
      localStorage.setItem(du, e);
    } catch {}
    try {
      fu(e);
    } catch {}
  }
}
const yd = {
  lanterns: ["top", "left", "right", "sides", "start", "end"],
  banner: ["top", "bottom"],
  "crescent-stars": ["full", "both", "top", "bottom", "sides"],
  eid: ["full", "both", "top", "bottom", "sides"],
  "eid-fitr": ["full", "both", "top", "bottom", "sides"],
  "eid-adha": ["full", "both", "top", "bottom", "sides"],
  geometric: ["full", "both", "top", "bottom", "sides", "left", "right"],
  sparkles: ["full", "both", "top", "bottom", "sides"],
};
function pu(e) {
  return yd[e] || ["top"];
}
function wd(e) {
  switch (e) {
    case "lanterns":
    case "banner":
      return "top";
    case "sparkles":
      return "full";
    case "crescent-stars":
    case "eid":
    case "eid-fitr":
    case "eid-adha":
    case "geometric":
    default:
      return "both";
  }
}
function Do(e, t, n) {
  switch (e) {
    case "lanternStyle":
    case "ropeStyle":
    case "ceilingColor":
    case "ropeColor":
      return t === "lanterns";
    case "ropeSag":
      return (
        t === "lanterns" &&
        ((n == null ? void 0 : n.ropeStyle) === "u-shaped" ||
          (n == null ? void 0 : n.ropeStyle) === "dual")
      );
    case "bannerBg":
    case "bannerTextColor":
    case "bannerIconColor":
    case "bannerTextEn":
    case "bannerTextAr":
      return t === "banner";
    case "clearance":
      return (
        t === "crescent-stars" ||
        t === "eid" ||
        t === "eid-fitr" ||
        t === "eid-adha"
      );
    case "intensity":
      return (
        t === "crescent-stars" ||
        t === "eid" ||
        t === "eid-fitr" ||
        t === "eid-adha"
      );
    case "density":
      return t === "geometric" || t === "sparkles";
    case "shadows":
      return (
        t === "lanterns" ||
        t === "crescent-stars" ||
        t === "eid" ||
        t === "eid-fitr" ||
        t === "eid-adha"
      );
    case "glowColor":
      return t === "sparkles";
    case "colors":
      return t === "lanterns" || t === "geometric";
    case "theme":
    case "position":
    case "opacity":
    case "layer":
    case "autoTrigger":
    case "countdown":
    case "confetti":
      return !0;
    default:
      return !1;
  }
}
function Gn(e, t) {
  const n = pu(t);
  let r = e.position;
  return (
    (!r || !n.includes(r)) && (r = wd(t)),
    { ...e, variant: t, position: r }
  );
}
const xd = new URL(
    "" + new URL("logo-yOUHX95I.png", import.meta.url).href,
    import.meta.url
  ).href,
  Sd = ({
    t: e,
    locale: t,
    onToggleLocale: n,
    occasion: r,
    onChangeOccasion: o,
    overlayOn: i,
    onToggleOverlay: a,
    onPlayChime: l,
    onFireConfetti: c,
    onToggleDrawer: u,
  }) =>
    s.jsxs("header", {
      className: "celestial-nav",
      children: [
        s.jsxs("div", {
          className: "nav-brand",
          onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          children: [
            s.jsx("img", {
              src: xd,
              alt: "ramadan-overlay",
              className: "nav-logo-img",
            }),
            s.jsx("span", {
              className: "nav-title font-display",
              children: e.nav.brandTitle,
            }),
            s.jsx("span", {
              className: "nav-version-badge",
              children: e.nav.versionBadge,
            }),
            s.jsx("span", {
              className: "nav-occasion-badge",
              title: e.nav.occasionBadge,
              children: e.nav.occasions[r],
            }),
          ],
        }),
        s.jsxs("div", {
          className: "nav-controls",
          children: [
            s.jsx("div", {
              className: "nav-dropdown-wrap",
              children: s.jsxs("select", {
                className: "nav-select",
                value: r,
                "aria-label": e.nav.occasionSelectLabel,
                onChange: (v) => o(v.target.value),
                children: [
                  s.jsx("option", {
                    value: "ramadan",
                    children: e.nav.occasions.ramadan,
                  }),
                  s.jsx("option", {
                    value: "eid-fitr",
                    children: e.nav.occasions["eid-fitr"],
                  }),
                  s.jsx("option", {
                    value: "eid-adha",
                    children: e.nav.occasions["eid-adha"],
                  }),
                ],
              }),
            }),
            s.jsxs("button", {
              className: "nav-btn-pill lang-toggle",
              onClick: n,
              title: t === "ar" ? "Switch to English" : "التبديل إلى العربية",
              children: [
                s.jsx("span", { style: { fontSize: "1rem" }, children: "🌐" }),
                s.jsx("span", { children: e.nav.switchLang }),
              ],
            }),
            s.jsxs("button", {
              className: `nav-btn-pill ${i ? "active" : ""}`,
              onClick: a,
              children: [
                s.jsx("span", {
                  style: { fontSize: "0.9rem" },
                  children: i ? "✨" : "💤",
                }),
                s.jsx("span", {
                  children: i ? e.nav.overlayOn : e.nav.overlayOff,
                }),
              ],
            }),
            s.jsxs("button", {
              className: "nav-btn-pill chime-btn",
              onClick: l,
              title: e.nav.chimeTest,
              children: [
                s.jsxs("div", {
                  className: "audio-wave",
                  children: [
                    s.jsx("div", { className: "audio-bar" }),
                    s.jsx("div", { className: "audio-bar" }),
                    s.jsx("div", { className: "audio-bar" }),
                  ],
                }),
                s.jsx("span", { children: e.nav.chimeTest }),
              ],
            }),
            s.jsxs("button", {
              className: "nav-btn-pill",
              onClick: c,
              title: e.nav.confettiLaunch,
              children: [
                s.jsx("span", { children: "🎉" }),
                s.jsx("span", { children: e.nav.confettiLaunch }),
              ],
            }),
            u &&
              s.jsx("button", {
                className: "nav-btn-pill mobile-drawer-btn",
                onClick: u,
                title: e.nav.toggleMobileDrawer,
                children: s.jsx("span", { children: "🎛️" }),
              }),
            s.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "nav-btn-pill",
              style: { padding: "7px 12px" },
              title: e.nav.githubLink,
              children: s.jsx("svg", {
                height: "18",
                width: "18",
                viewBox: "0 0 16 16",
                fill: "currentColor",
                "aria-hidden": "true",
                children: s.jsx("path", {
                  d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  kd = new URL(
    "" + new URL("logo-yOUHX95I.png", import.meta.url).href,
    import.meta.url
  ).href,
  Cd = ({
    t: e,
    locale: t = "ar",
    occasion: n = "ramadan",
    onFireConfetti: r,
    onScrollToWorkbench: o,
    onScrollToLab: i,
  }) => {
    const [a, l] = X.useState(!1),
      c = async () => {
        try {
          (await navigator.clipboard.writeText("npm i ramadan-overlay"),
            l(!0),
            setTimeout(() => l(!1), 2200));
        } catch {}
      },
      u = e.nav.occasions[n] ?? e.hero.badge,
      v = n === "eid-adha" ? "🐑" : n === "eid-fitr" ? "🎁" : "🌙";
    return s.jsxs("section", {
      id: "hero",
      className: "canopy-stage",
      children: [
        s.jsx("div", {
          className: "canopy-logo-wrap",
          onClick: r,
          title: e.nav.confettiLaunch,
          role: r ? "button" : void 0,
          tabIndex: r ? 0 : void 0,
          onKeyDown: (m) => {
            r &&
              (m.key === "Enter" || m.key === " ") &&
              (m.preventDefault(), r());
          },
          children: s.jsx("img", {
            src: kd,
            alt: "ramadan-overlay logo",
            className: "canopy-hero-logo clickable",
          }),
        }),
        s.jsxs("div", {
          className: "canopy-badge-wrap font-calligraphy",
          children: [
            s.jsx("span", {
              role: "img",
              "aria-label": "occasion icon",
              children: v,
            }),
            s.jsx("span", { children: u }),
          ],
        }),
        s.jsx("h1", {
          className: "canopy-title font-display",
          children: e.hero.title,
        }),
        s.jsx("p", { className: "canopy-subtitle", children: e.hero.subtitle }),
        s.jsxs("div", {
          className: "quick-install-box",
          children: [
            s.jsx("span", { className: "quick-install-prompt", children: "$" }),
            s.jsx("code", {
              className: "quick-install-code",
              children: "npm i ramadan-overlay",
            }),
            s.jsx("button", {
              className: "quick-install-copy-btn",
              onClick: c,
              "aria-label": a ? "Copied" : "Copy install command",
              title: a ? "Copied!" : "Copy command",
              children: a ? "✓" : "📋",
            }),
            a &&
              s.jsx("span", {
                className: "quick-install-toast",
                children: t === "ar" ? "تم النسخ!" : "Copied!",
              }),
          ],
        }),
        s.jsxs("div", {
          className: "canopy-actions",
          children: [
            s.jsxs("button", {
              className: "btn-primary",
              onClick: o,
              children: [
                s.jsx("span", { children: "🎨" }),
                s.jsx("span", { children: e.hero.ctaWorkbench }),
              ],
            }),
            r &&
              s.jsxs("button", {
                className: "btn-celebrate",
                onClick: r,
                title: e.nav.confettiLaunch,
                children: [
                  s.jsx("span", { children: v }),
                  s.jsx("span", { children: e.nav.confettiLaunch }),
                ],
              }),
            s.jsxs("button", {
              className: "btn-secondary",
              onClick: i,
              children: [
                s.jsx("span", { children: "⚡" }),
                s.jsx("span", { children: e.hero.ctaLab }),
              ],
            }),
          ],
        }),
        s.jsxs("div", {
          className: "canopy-stats",
          children: [
            s.jsxs("div", {
              className: "stat-item",
              children: [
                s.jsx("span", { className: "stat-icon", children: "❖" }),
                s.jsx("span", { children: e.hero.statVariants }),
              ],
            }),
            s.jsxs("div", {
              className: "stat-item",
              children: [
                s.jsx("span", { className: "stat-icon", children: "⚡" }),
                s.jsx("span", { children: e.hero.statZeroDeps }),
              ],
            }),
            s.jsxs("div", {
              className: "stat-item",
              children: [
                s.jsx("span", { className: "stat-icon", children: "⚛" }),
                s.jsx("span", { children: e.hero.statFrameworks }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  bd = [
    { id: "lanterns", icon: "🏮" },
    { id: "banner", icon: "🏷️" },
    { id: "crescent-stars", icon: "🌙" },
    { id: "geometric", icon: "💠" },
    { id: "sparkles", icon: "✨" },
    { id: "eid", icon: "🎉" },
    { id: "eid-fitr", icon: "🍬" },
    { id: "eid-adha", icon: "🐑" },
  ],
  zd = ({ t: e, activeVariant: t, onSelectVariant: n }) =>
    s.jsxs("div", {
      className: "panel-card",
      children: [
        s.jsxs("h3", {
          className: "panel-heading",
          children: [
            s.jsx("span", { children: "❖" }),
            s.jsx("span", { children: e.workbench.variantHeading }),
          ],
        }),
        s.jsx("div", {
          className: "variant-grid",
          children: bd.map(({ id: r, icon: o }) => {
            const i = e.workbench.variants[r] || { name: r, desc: "" },
              a = t === r;
            return s.jsxs(
              "div",
              {
                className: `variant-card ${a ? "active" : ""}`,
                onClick: () => n(r),
                role: "button",
                tabIndex: 0,
                onKeyDown: (l) => {
                  (l.key === "Enter" || l.key === " ") && n(r);
                },
                children: [
                  s.jsxs("div", {
                    className: "variant-card-title",
                    children: [
                      s.jsx("span", {
                        style: { fontSize: "1.2rem" },
                        children: o,
                      }),
                      s.jsx("span", { children: i.name }),
                    ],
                  }),
                  s.jsx("p", {
                    className: "variant-card-desc",
                    children: i.desc,
                  }),
                ],
              },
              r
            );
          }),
        }),
      ],
    }),
  Td = ({ variant: e, position: t, onChangePosition: n, translations: r }) => {
    const o = pu(e);
    return s.jsxs("div", {
      className: "control-group",
      children: [
        s.jsx("label", { htmlFor: "position-select", children: r.position }),
        s.jsx("select", {
          id: "position-select",
          value: t,
          onChange: (i) => n(i.target.value),
          className: "form-select",
          children: o.map((i) =>
            s.jsx(
              "option",
              { value: i, children: r.positionOptions[i] || i },
              i
            )
          ),
        }),
      ],
    });
  },
  Ed = [
    "classic",
    "midnight",
    "emerald",
    "royal",
    "desert-dusk",
    "platinum-minimal",
    "rose-sahara",
  ],
  Md = ({
    t: e,
    variant: t,
    position: n,
    onChangePosition: r,
    themeName: o,
    onChangeTheme: i,
    opacity: a,
    onChangeOpacity: l,
    layer: c,
    onChangeLayer: u,
    shadows: v,
    onChangeShadows: m,
    confetti: p,
    onChangeConfetti: w,
    autoTrigger: C,
    onToggleAutoTrigger: S,
    countdownEnabled: z,
    onToggleCountdown: d,
  }) => {
    const f = Do("shadows", t);
    return s.jsxs("div", {
      className: "panel-card",
      children: [
        s.jsxs("h3", {
          className: "panel-heading",
          children: [
            s.jsx("span", { children: "⚙️" }),
            s.jsx("span", { children: e.workbench.optionsHeading }),
          ],
        }),
        s.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          },
          children: [
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: e.workbench.universal.theme,
                }),
                s.jsxs("select", {
                  className: "form-select",
                  value: o,
                  onChange: (h) => i(h.target.value),
                  children: [
                    s.jsx("optgroup", {
                      label: "Theme Presets",
                      children: Ed.map((h) =>
                        s.jsx(
                          "option",
                          {
                            value: h,
                            children:
                              e.workbench.universal.themeOptions[h] || h,
                          },
                          h
                        )
                      ),
                    }),
                    s.jsx("optgroup", {
                      label: "Theme Overrides",
                      children: s.jsx("option", {
                        value: "custom",
                        children: e.workbench.universal.themeOptions.custom,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            s.jsx(Td, {
              variant: t,
              position: n,
              onChangePosition: r,
              translations: e.workbench.universal,
            }),
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: e.workbench.universal.layer,
                }),
                s.jsxs("select", {
                  className: "form-select",
                  value: c,
                  onChange: (h) => u(h.target.value),
                  children: [
                    s.jsx("option", {
                      value: "foreground",
                      children: e.workbench.universal.layerOptions.foreground,
                    }),
                    s.jsx("option", {
                      value: "background",
                      children: e.workbench.universal.layerOptions.background,
                    }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: e.workbench.universal.confetti,
                }),
                s.jsxs("select", {
                  className: "form-select",
                  value: p,
                  onChange: (h) => w(h.target.value),
                  children: [
                    s.jsx("option", {
                      value: "on",
                      children: e.workbench.universal.confettiOptions.on,
                    }),
                    s.jsx("option", {
                      value: "off",
                      children: e.workbench.universal.confettiOptions.off,
                    }),
                  ],
                }),
              ],
            }),
            f &&
              s.jsxs("div", {
                className: "form-group",
                children: [
                  s.jsx("label", {
                    className: "form-label",
                    children: e.workbench.universal.shadows,
                  }),
                  s.jsxs("select", {
                    className: "form-select",
                    value: v,
                    onChange: (h) => m(h.target.value),
                    children: [
                      s.jsx("option", {
                        value: "soft",
                        children: e.workbench.universal.shadowOptions.soft,
                      }),
                      s.jsx("option", {
                        value: "deep",
                        children: e.workbench.universal.shadowOptions.deep,
                      }),
                      s.jsx("option", {
                        value: "none",
                        children: e.workbench.universal.shadowOptions.none,
                      }),
                    ],
                  }),
                ],
              }),
            s.jsxs("div", {
              className: "form-group",
              children: [
                s.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  },
                  children: [
                    s.jsx("label", {
                      className: "form-label",
                      style: { margin: 0 },
                      children: e.workbench.universal.opacity,
                    }),
                    s.jsxs("span", {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.82rem",
                        color: "var(--gold-400)",
                      },
                      children: [Math.round(a * 100), "%"],
                    }),
                  ],
                }),
                s.jsx("input", {
                  type: "range",
                  min: "0.1",
                  max: "1",
                  step: "0.05",
                  className: "form-range",
                  value: a,
                  onChange: (h) => l(parseFloat(h.target.value)),
                }),
              ],
            }),
          ],
        }),
        s.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            marginTop: "16px",
          },
          children: [
            s.jsxs("div", {
              className: "form-toggle-wrap",
              onClick: S,
              children: [
                s.jsxs("div", {
                  children: [
                    s.jsx("div", {
                      style: { fontWeight: 600, fontSize: "0.9rem" },
                      children: e.workbench.universal.autoTrigger,
                    }),
                    s.jsx("div", {
                      className: "form-help",
                      children: e.workbench.universal.autoTriggerHelp,
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "toggle-switch",
                  children: [
                    s.jsx("input", {
                      type: "checkbox",
                      checked: C,
                      onChange: S,
                      onClick: (h) => h.stopPropagation(),
                    }),
                    s.jsx("span", { className: "toggle-slider" }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "form-toggle-wrap",
              onClick: d,
              children: [
                s.jsxs("div", {
                  children: [
                    s.jsx("div", {
                      style: { fontWeight: 600, fontSize: "0.9rem" },
                      children: e.workbench.universal.countdown,
                    }),
                    s.jsx("div", {
                      className: "form-help",
                      children: e.workbench.universal.countdownHelp,
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "toggle-switch",
                  children: [
                    s.jsx("input", {
                      type: "checkbox",
                      checked: z,
                      onChange: d,
                      onClick: (h) => h.stopPropagation(),
                    }),
                    s.jsx("span", { className: "toggle-slider" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Nd = ({ t: e, config: t, onUpdateConfig: n }) => {
    const r = t.variant || "lanterns",
      o = r === "lanterns",
      i = r === "banner",
      a = ["crescent-stars", "eid", "eid-fitr", "eid-adha"].includes(r),
      l = r === "sparkles",
      c = r === "geometric";
    return !o && !i && !a && !l && !c
      ? null
      : s.jsxs("div", {
          className: "panel-card",
          children: [
            o &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "🏮" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.lanternHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.lanternStyle,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.lanternStyle ?? 0,
                            onChange: (u) =>
                              n({ lanternStyle: parseInt(u.target.value, 10) }),
                            children: [
                              s.jsx("option", {
                                value: 0,
                                children:
                                  e.workbench.variantSpecific.lanternCycle,
                              }),
                              [...Array(12)].map((u, v) =>
                                s.jsxs(
                                  "option",
                                  {
                                    value: v + 1,
                                    children: ["Design #", v + 1],
                                  },
                                  v + 1
                                )
                              ),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.lanternCount,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.lanternCount ?? 0,
                            onChange: (u) => {
                              const v = parseInt(u.target.value, 10);
                              n({ lanternCount: v === 0 ? void 0 : v });
                            },
                            children: [
                              s.jsx("option", {
                                value: 0,
                                children:
                                  e.workbench.variantSpecific.lanternCountAuto,
                              }),
                              [2, 3, 4, 5, 6, 8, 10].map((u) =>
                                s.jsx("option", { value: u, children: u }, u)
                              ),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.ropeStyle,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.ropeStyle ?? "straight",
                            onChange: (u) => n({ ropeStyle: u.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "straight",
                                children:
                                  e.workbench.variantSpecific.ropeStraight,
                              }),
                              s.jsx("option", {
                                value: "u-shaped",
                                children:
                                  e.workbench.variantSpecific.ropeUshaped,
                              }),
                              s.jsx("option", {
                                value: "dual",
                                children: e.workbench.variantSpecific.ropeDual,
                              }),
                            ],
                          }),
                        ],
                      }),
                      Do("ropeSag", "lanterns", { ropeStyle: t.ropeStyle }) &&
                        s.jsxs("div", {
                          className: "form-group",
                          children: [
                            s.jsxs("div", {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "6px",
                              },
                              children: [
                                s.jsx("label", {
                                  className: "form-label",
                                  style: { margin: 0 },
                                  children: e.workbench.variantSpecific.ropeSag,
                                }),
                                s.jsxs("span", {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.82rem",
                                    color: "var(--gold-400)",
                                  },
                                  children: [t.ropeSag ?? 20, "px"],
                                }),
                              ],
                            }),
                            s.jsx("input", {
                              type: "range",
                              min: "6",
                              max: "60",
                              step: "2",
                              className: "form-range",
                              value: t.ropeSag ?? 20,
                              onChange: (u) =>
                                n({ ropeSag: parseInt(u.target.value, 10) }),
                            }),
                          ],
                        }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.ceilingColor,
                          }),
                          s.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            },
                            children: [
                              s.jsx("input", {
                                type: "color",
                                value: t.ceilingColor || "#c9a84c",
                                onChange: (u) =>
                                  n({ ceilingColor: u.target.value }),
                                style: {
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                },
                              }),
                              s.jsx("input", {
                                type: "text",
                                className: "form-input",
                                value: t.ceilingColor || "#c9a84c",
                                onChange: (u) =>
                                  n({ ceilingColor: u.target.value }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.ropeColor,
                          }),
                          s.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            },
                            children: [
                              s.jsx("input", {
                                type: "color",
                                value: t.ropeColor || "#c9a84c",
                                onChange: (u) =>
                                  n({ ropeColor: u.target.value }),
                                style: {
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                },
                              }),
                              s.jsx("input", {
                                type: "text",
                                className: "form-input",
                                value: t.ropeColor || "#c9a84c",
                                onChange: (u) =>
                                  n({ ropeColor: u.target.value }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            i &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "🏷️" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.bannerHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.bannerTextAr,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerTextAr || "رَمَضَان كَرِيم",
                            onChange: (u) =>
                              n({ bannerTextAr: u.target.value }),
                            placeholder: "رَمَضَان كَرِيم",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.bannerTextEn,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerTextEn || "Ramadan Mubarak",
                            onChange: (u) =>
                              n({ bannerTextEn: u.target.value }),
                            placeholder: "Ramadan Mubarak",
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.bannerBg,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerBg || "rgba(15,15,20,0.92)",
                            onChange: (u) => n({ bannerBg: u.target.value }),
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children:
                              e.workbench.variantSpecific.bannerTextColor,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerTextColor || "#f1f5f9",
                            onChange: (u) =>
                              n({ bannerTextColor: u.target.value }),
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children:
                              e.workbench.variantSpecific.bannerIconColor,
                          }),
                          s.jsx("input", {
                            type: "text",
                            className: "form-input",
                            value: t.bannerIconColor || "#c9a84c",
                            onChange: (u) =>
                              n({ bannerIconColor: u.target.value }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            a &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "🌙" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.motifsHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.clearance,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.clearance ?? "edges",
                            onChange: (u) => n({ clearance: u.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "edges",
                                children:
                                  e.workbench.variantSpecific.clearanceEdges,
                              }),
                              s.jsx("option", {
                                value: "full",
                                children:
                                  e.workbench.variantSpecific.clearanceFull,
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.intensity,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.intensity ?? "normal",
                            onChange: (u) => n({ intensity: u.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "low",
                                children:
                                  e.workbench.variantSpecific.intensityLow,
                              }),
                              s.jsx("option", {
                                value: "normal",
                                children:
                                  e.workbench.variantSpecific.intensityNormal,
                              }),
                              s.jsx("option", {
                                value: "high",
                                children:
                                  e.workbench.variantSpecific.intensityHigh,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            (l || c) &&
              s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("h3", {
                    className: "panel-heading",
                    children: [
                      s.jsx("span", { children: "✨" }),
                      s.jsx("span", {
                        children: e.workbench.variantSpecific.sparklesHeading,
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "18px",
                    },
                    children: [
                      s.jsxs("div", {
                        className: "form-group",
                        children: [
                          s.jsx("label", {
                            className: "form-label",
                            children: e.workbench.variantSpecific.density,
                          }),
                          s.jsxs("select", {
                            className: "form-select",
                            value: t.density ?? "normal",
                            onChange: (u) => n({ density: u.target.value }),
                            children: [
                              s.jsx("option", {
                                value: "low",
                                children:
                                  e.workbench.variantSpecific.intensityLow,
                              }),
                              s.jsx("option", {
                                value: "normal",
                                children:
                                  e.workbench.variantSpecific.intensityNormal,
                              }),
                              s.jsx("option", {
                                value: "high",
                                children:
                                  e.workbench.variantSpecific.intensityHigh,
                              }),
                            ],
                          }),
                        ],
                      }),
                      l &&
                        s.jsxs("div", {
                          className: "form-group",
                          children: [
                            s.jsx("label", {
                              className: "form-label",
                              children: e.workbench.variantSpecific.glowColor,
                            }),
                            s.jsx("input", {
                              type: "text",
                              className: "form-input",
                              value: t.glowColor || "rgba(201,168,76,0.55)",
                              onChange: (u) => n({ glowColor: u.target.value }),
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
          ],
        });
  },
  jd = ({ customTheme: e, onChangeColor: t, onReset: n, translations: r }) => {
    const o = e.colors || [
        "#c9a84c",
        "#e5c158",
        "#9a7b2c",
        "#f3e5ab",
        "#1b3b2b",
        "#0f172a",
      ],
      i = o[0] || "#c9a84c",
      a = o[3] || "#f3e5ab";
    return s.jsxs("div", {
      className: "card-panel color-customizer-panel",
      children: [
        s.jsxs("div", {
          className: "panel-header",
          children: [
            s.jsx("h3", { className: "panel-title", children: r.heading }),
            s.jsx("button", {
              type: "button",
              className: "btn-outline btn-sm",
              onClick: n,
              children: r.resetBtn,
            }),
          ],
        }),
        s.jsxs("div", {
          className: "color-grid",
          children: [
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-primary",
                  children: r.primary,
                }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-primary",
                      type: "color",
                      value: i,
                      onChange: (l) => t("primaryColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", { className: "color-code", children: i }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", { htmlFor: "color-accent", children: r.accent }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-accent",
                      type: "color",
                      value: a,
                      onChange: (l) => t("accentColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", { className: "color-code", children: a }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", { htmlFor: "color-glow", children: r.glow }),
                s.jsx("div", {
                  className: "color-input-wrapper",
                  children: s.jsx("input", {
                    id: "color-glow",
                    type: "text",
                    value: e.glowColor || "rgba(201,168,76,0.55)",
                    onChange: (l) => t("glowColor", l.target.value),
                    className: "form-input text-mono",
                  }),
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-ceiling",
                  children: r.ceiling,
                }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-ceiling",
                      type: "color",
                      value: e.ceilingColor || "#c9a84c",
                      onChange: (l) => t("ceilingColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", {
                      className: "color-code",
                      children: e.ceilingColor || "#c9a84c",
                    }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", { htmlFor: "color-rope", children: r.rope }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-rope",
                      type: "color",
                      value: e.ropeColor || "#c9a84c",
                      onChange: (l) => t("ropeColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", {
                      className: "color-code",
                      children: e.ropeColor || "#c9a84c",
                    }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-banner-bg",
                  children: r.bannerBg,
                }),
                s.jsx("div", {
                  className: "color-input-wrapper",
                  children: s.jsx("input", {
                    id: "color-banner-bg",
                    type: "text",
                    value: e.bannerBg || "rgba(15,15,20,0.92)",
                    onChange: (l) => t("bannerBg", l.target.value),
                    className: "form-input text-mono",
                  }),
                }),
              ],
            }),
            s.jsxs("div", {
              className: "color-field",
              children: [
                s.jsx("label", {
                  htmlFor: "color-banner-text",
                  children: r.bannerText,
                }),
                s.jsxs("div", {
                  className: "color-input-wrapper",
                  children: [
                    s.jsx("input", {
                      id: "color-banner-text",
                      type: "color",
                      value: e.bannerTextColor || "#f1f5f9",
                      onChange: (l) => t("bannerTextColor", l.target.value),
                      className: "color-picker",
                    }),
                    s.jsx("span", {
                      className: "color-code",
                      children: e.bannerTextColor || "#f1f5f9",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Ad = ({ t: e, locale: t, config: n, themeName: r }) => {
    const [o, i] = X.useState("react"),
      [a, l] = X.useState(!1),
      c = n.variant || "lanterns",
      u = {};
    (n.variant && n.variant !== "lanterns" && (u.variant = n.variant),
      r &&
        r !== "classic" &&
        (u.theme = typeof n.theme == "object" ? n.theme : r),
      n.position &&
        n.position !== "top" &&
        n.position !== "both" &&
        (u.position = n.position),
      n.opacity !== void 0 && n.opacity !== 0.85 && (u.opacity = n.opacity),
      n.layer && n.layer !== "foreground" && (u.layer = n.layer),
      Do("shadows", c) &&
        n.shadows &&
        n.shadows !== "soft" &&
        (u.shadows = n.shadows),
      n.autoTrigger !== void 0 && !n.autoTrigger && (u.autoTrigger = !1),
      n.countdown && (u.countdown = !0),
      n.confetti === "off" && (u.confetti = "off"));
    const v = [
      "lanternStyle",
      "ropeStyle",
      "ropeSag",
      "ceilingColor",
      "ropeColor",
      "bannerTextAr",
      "bannerTextEn",
      "bannerBg",
      "bannerTextColor",
      "bannerIconColor",
      "clearance",
      "intensity",
      "density",
      "glowColor",
    ];
    for (const C of v) Do(C, c, n) && n[C] !== void 0 && (u[C] = n[C]);
    const m = JSON.stringify(u, null, 2),
      p = () => {
        switch (o) {
          case "react":
            return `// 1. Install
// npm install ramadan-overlay

import React from 'react';
import { RamadanOverlay } from 'ramadan-overlay/react';

export default function App() {
  return (
    <div>
      {/* Your app content */}
      <RamadanOverlay
        ${Object.entries(u).map(([S, z]) =>
          typeof z == "string"
            ? `${S}="${z}"`
            : typeof z == "boolean"
              ? z
                ? S
                : `${S}={false}`
              : `${S}={${JSON.stringify(z)}}`
        ).join(`
  `)}
      />
    </div>
  );
}`;
          case "vanilla":
            return `// 1. Install via npm or CDN:
// npm install ramadan-overlay

import { init } from 'ramadan-overlay';

// Initialize overlay with selected options
const overlay = init(${m});

// Cleanup when leaving the page
// overlay.destroy();`;
          case "vue":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script setup>
import { RamadanOverlay } from 'ramadan-overlay/vue';

const config = ${m};
<\/script>

<template>
  <main>
    <RamadanOverlay v-bind="config" />
  </main>
</template>`;
          case "svelte":
            return `<!-- 1. Install: npm install ramadan-overlay -->
<script>
  import { RamadanOverlay } from 'ramadan-overlay/svelte';

  const config = ${m};
<\/script>

<RamadanOverlay {...config} />`;
          case "angular":
            return `// 1. Install: npm install ramadan-overlay
import { Component } from '@angular/core';
import { RamadanOverlayComponent } from 'ramadan-overlay/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RamadanOverlayComponent],
  template: \`
    <ramadan-overlay [config]="config"></ramadan-overlay>
  \`
})
export class AppComponent {
  config = ${m};
}`;
          case "ai":
            return t === "ar"
              ? `أريد إضافة زينة رمضانية واحتفالية لمشروعي باستخدام مكتبة ramadan-overlay.
يرجى تثبيت الحزمة عبر npm install ramadan-overlay وتضمين الزينة بالإعدادات التالية:

- نمط الزخرفة (Overlay Variant): ${u.variant || "lanterns"}
- السمة اللونية (Theme): ${typeof u.theme == "string" ? u.theme : "custom"}
- الموضع (Position): ${u.position || "top"}
- الشفافية (Opacity): ${u.opacity ?? 0.85}
- العداد التنازلي لوقت الإفطار: ${u.countdown ? "مفعّل" : "معطل"}
- الكشف التلقائي بالتقويم الهجري: ${u.autoTrigger !== !1 ? "مفعّل" : "معطل"}

كود التهيئة المقترح:
${m}

يرجى مراعاة تنظيف دورة الحياة عند تدمير المكون والتأكد من توافق أنماط العرض.`
              : `I want to add Ramadan and Eid festive decorations to my web application using the ramadan-overlay library.
Please install the package via npm install ramadan-overlay and configure the overlay with the following parameters:

- Overlay Variant: ${u.variant || "lanterns"}
- Theme: ${typeof u.theme == "string" ? u.theme : "custom"}
- Position: ${u.position || "top"}
- Opacity: ${u.opacity ?? 0.85}
- Iftar Countdown Widget: ${u.countdown ? "Enabled" : "Disabled"}
- Auto Hijri Trigger: ${u.autoTrigger !== !1 ? "Enabled" : "Disabled"}

Target Configuration:
${m}

Please ensure clean lifecycle cleanup on component unmount and smooth z-index integration.`;
          default:
            return "";
        }
      },
      w = () => {
        const C = p();
        navigator.clipboard.writeText(C).then(() => {
          (l(!0), setTimeout(() => l(!1), 2200));
        });
      };
    return s.jsxs("div", {
      className: "panel-card code-viewer-card",
      children: [
        s.jsxs("h3", {
          className: "panel-heading",
          children: [
            s.jsx("span", { children: "💻" }),
            s.jsx("span", { children: e.workbench.code.heading }),
          ],
        }),
        s.jsx("div", {
          className: "code-tabs",
          children: ["react", "vanilla", "vue", "svelte", "angular", "ai"].map(
            (C) =>
              s.jsx(
                "button",
                {
                  className: `code-tab-btn ${o === C ? "active" : ""}`,
                  onClick: () => i(C),
                  children: e.workbench.code.tabs[C],
                },
                C
              )
          ),
        }),
        s.jsxs("div", {
          className: "code-box-container",
          children: [
            s.jsx("button", {
              className: `code-copy-floating ${a ? "copied" : ""}`,
              onClick: w,
              children: a
                ? o === "ai"
                  ? e.workbench.code.promptSeamCopiedBtn
                  : e.workbench.code.copiedBtn
                : o === "ai"
                  ? e.workbench.code.copyPromptSeamBtn
                  : e.workbench.code.copyBtn,
            }),
            s.jsx("pre", {
              className: "code-pre",
              children: s.jsx("code", { children: p() }),
            }),
          ],
        }),
      ],
    });
  },
  Ld = ({
    t: e,
    locale: t,
    config: n,
    themeName: r,
    customTheme: o,
    onSelectVariant: i,
    onChangePosition: a,
    onChangeTheme: l,
    onUpdateConfig: c,
    onUpdateCustomColor: u,
    onResetCustomColors: v,
    onToggleAutoTrigger: m,
    onToggleCountdown: p,
  }) => {
    const w = n.variant || "lanterns",
      C = n.position || "top",
      S = n.opacity ?? 0.85,
      z = n.layer || "foreground",
      d = n.shadows || "soft",
      f = n.confetti === "off" ? "off" : "on",
      h = n.autoTrigger ?? !0,
      x = !!n.countdown;
    return s.jsxs("section", {
      id: "workbench",
      className: "workbench-section",
      children: [
        s.jsxs("div", {
          className: "section-header",
          children: [
            s.jsx("h2", {
              className: "section-title font-display",
              children: e.workbench.title,
            }),
            s.jsx("p", {
              className: "section-subtitle",
              children: e.workbench.subtitle,
            }),
          ],
        }),
        s.jsxs("div", {
          className: "workbench-grid",
          children: [
            s.jsxs("div", {
              className: "controls-column",
              children: [
                s.jsx(zd, { t: e, activeVariant: w, onSelectVariant: i }),
                s.jsx(Md, {
                  t: e,
                  variant: w,
                  position: C,
                  onChangePosition: a,
                  themeName: r,
                  onChangeTheme: l,
                  opacity: S,
                  onChangeOpacity: (k) => c({ opacity: k }),
                  layer: z,
                  onChangeLayer: (k) => c({ layer: k }),
                  shadows: d,
                  onChangeShadows: (k) => c({ shadows: k }),
                  confetti: f,
                  onChangeConfetti: (k) => c({ confetti: k }),
                  autoTrigger: h,
                  onToggleAutoTrigger: m,
                  countdownEnabled: x,
                  onToggleCountdown: p,
                }),
                r === "custom" &&
                  s.jsx(jd, {
                    customTheme: o,
                    onChangeColor: u,
                    onReset: v,
                    translations: e.workbench.colors,
                  }),
                s.jsx(Nd, { t: e, config: n, onUpdateConfig: c }),
              ],
            }),
            s.jsx("div", {
              className: "code-column",
              children: s.jsx(Ad, { t: e, locale: t, config: n, themeName: r }),
            }),
          ],
        }),
      ],
    });
  },
  Pd = ({ t: e, overlayInstance: t }) => {
    const [n, r] = X.useState(!0),
      o = t == null ? void 0 : t.countdown,
      i = () => (o == null ? void 0 : o.show()),
      a = () => (o == null ? void 0 : o.dismiss()),
      l = () => {
        var m;
        return (m = o == null ? void 0 : o.minimize) == null
          ? void 0
          : m.call(o);
      },
      c = () => {
        var m;
        return (m = o == null ? void 0 : o.expand) == null ? void 0 : m.call(o);
      },
      u = () => {
        if (o) {
          const m = o.toggleMute();
          r(m);
        }
      },
      v = () => {
        var m;
        (m = o == null ? void 0 : o.playAlert) == null || m.call(o);
      };
    return s.jsxs("div", {
      className: "panel-card",
      style: { marginBottom: 0 },
      children: [
        s.jsxs("h4", {
          className: "panel-heading",
          style: { fontSize: "1.1rem" },
          children: [
            s.jsx("span", { children: "⏱️" }),
            s.jsx("span", { children: e.lab.countdownTitle }),
          ],
        }),
        s.jsx("p", {
          style: {
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          },
          children: e.workbench.universal.countdownHelp,
        }),
        s.jsxs("div", {
          className: "lab-btn-grid",
          children: [
            s.jsxs("button", {
              className: "lab-btn",
              onClick: i,
              children: [
                s.jsx("span", { children: "👁️" }),
                s.jsx("span", { children: e.lab.btnShow }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: a,
              children: [
                s.jsx("span", { children: "✕" }),
                s.jsx("span", { children: e.lab.btnDismiss }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: l,
              children: [
                s.jsx("span", { children: "🗕" }),
                s.jsx("span", { children: e.lab.btnMinimize }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: c,
              children: [
                s.jsx("span", { children: "🗖" }),
                s.jsx("span", { children: e.lab.btnExpand }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: u,
              children: [
                s.jsx("span", { children: n ? "🔇" : "🔊" }),
                s.jsx("span", {
                  children: n ? e.lab.btnUnmute : e.lab.btnMute,
                }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: v,
              children: [
                s.jsx("span", { children: "🔔" }),
                s.jsx("span", { children: e.lab.btnPlayChime }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  _d = ({ t: e }) => {
    const [t, n] = X.useState([
        {
          id: "init",
          time: new Date().toISOString().slice(11, 19),
          msg: "Diagnostic logging engine initialized. Ready for resilience tests.",
          color: "#7ee787",
        },
      ]),
      [r, o] = X.useState(!1),
      i = X.useRef(null),
      a = (w, C = "#7ee787") => {
        const S = new Date().toISOString().slice(11, 19),
          z = `${Date.now()}-${Math.random()}`;
        n((d) => [...d, { id: z, time: S, msg: w, color: C }]);
      };
    (X.useEffect(() => {
      i.current && (i.current.scrollTop = i.current.scrollHeight);
    }, [t]),
      X.useEffect(() => {
        const w = console.warn,
          C = console.error;
        return (
          (console.warn = (...S) => {
            w.apply(console, S);
            const z = S.map((d) =>
              typeof d == "object" ? JSON.stringify(d) : String(d)
            ).join(" ");
            z.includes("[ramadan-overlay]") && a(z, "#e3b341");
          }),
          (console.error = (...S) => {
            C.apply(console, S);
            const z = S.map((d) =>
              typeof d == "object" ? JSON.stringify(d) : String(d)
            ).join(" ");
            z.includes("[ramadan-overlay]") && a(z, "#f85149");
          }),
          () => {
            ((console.warn = w), (console.error = C));
          }
        );
      }, []));
    const l = () => {
        a("Testing defensive config clamping...", "#e3b341");
        try {
          const w = uo({
            variant: "lanterns",
            opacity: 99,
            zIndex: -9999999999,
            ropeSag: 999,
            hijriAdjustment: 50,
            debug: !0,
            previewMode: !0,
          });
          (a(
            "✅ Result: Extreme configuration values safely clamped within valid boundaries without throwing!",
            "#7ee787"
          ),
            w.destroy());
        } catch (w) {
          a(`❌ Clamping failed: ${w}`, "#f85149");
        }
      },
      c = () => {
        a("Testing invalid Date input resilience...", "#e3b341");
        try {
          const w = Cn(new Date(NaN), 0, !0),
            C = Cn(null, 0, !0);
          (a(
            `✅ Result: getRamadanState(NaN) -> occasion: '${w.occasion}', isRamadan: ${w.isRamadan}`,
            "#7ee787"
          ),
            a(
              `✅ Result: getRamadanState(null) -> occasion: '${C.occasion}', isRamadan: ${C.isRamadan}`,
              "#7ee787"
            ));
        } catch (w) {
          a(`❌ Date test failed: ${w}`, "#f85149");
        }
      },
      u = () => {
        a(
          "Testing Error Containment Boundary & Atomic DOM Rollback...",
          "#e3b341"
        );
        const w = document.createElement;
        let C = 0;
        document.createElement = function (S) {
          if (S.toLowerCase() === "style" && ++C === 1)
            throw new Error(
              "Simulated catastrophic CSS stylesheet mounting crash"
            );
          return w.call(document, S);
        };
        try {
          const S = uo({
            previewMode: !0,
            debug: !0,
            onError: (z) => {
              const d =
                z && typeof z == "object" && "message" in z
                  ? z.message
                  : String(z);
              a(`onError hook captured crash: ${d}`, "#f85149");
            },
          });
          (a(
            "✅ Result: Host application did NOT crash! Safe No-Op instance returned.",
            "#7ee787"
          ),
            S.destroy());
        } catch (S) {
          a(`❌ Crash escaped boundary: ${S}`, "#f85149");
        } finally {
          document.createElement = w;
        }
      },
      v = () => {
        a("Testing double-contained onError isolation...", "#e3b341");
        try {
          (uo({
            previewMode: !0,
            debug: !0,
            onError: () => {
              throw new Error(
                "Faulty external telemetry service threw an uncaught error"
              );
            },
          }),
            a(
              "✅ Result: Faulty consumer onError callback threw, but double-containment seam protected host from crash!",
              "#7ee787"
            ));
        } catch (w) {
          a(`❌ onError escaped boundary: ${w}`, "#f85149");
        }
      },
      m = () => {
        const w = !r;
        (o(w),
          a(
            `Debug mode toggled: ${w ? "ON" : "OFF"}`,
            w ? "#7ee787" : "#8b8f98"
          ));
      },
      p = () => n([]);
    return s.jsxs("div", {
      className: "panel-card",
      style: { marginBottom: 0 },
      children: [
        s.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          },
          children: [
            s.jsxs("h4", {
              className: "panel-heading",
              style: { fontSize: "1.1rem", margin: 0 },
              children: [
                s.jsx("span", { children: "🛡️" }),
                s.jsx("span", { children: e.lab.resilienceTitle }),
              ],
            }),
            s.jsx("button", {
              className: "nav-btn-pill",
              style: { fontSize: "0.75rem", padding: "4px 10px" },
              onClick: p,
              children: e.lab.clearTerminal,
            }),
          ],
        }),
        s.jsx("p", {
          style: {
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          },
          children: e.lab.resilienceDesc,
        }),
        s.jsxs("div", {
          className: "lab-btn-grid",
          children: [
            s.jsxs("button", {
              className: "lab-btn",
              onClick: l,
              children: [
                s.jsx("span", { children: "⚙️" }),
                s.jsx("span", { children: e.lab.btnClamping }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: c,
              children: [
                s.jsx("span", { children: "📅" }),
                s.jsx("span", { children: e.lab.btnInvalidDate }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: u,
              children: [
                s.jsx("span", { children: "💥" }),
                s.jsx("span", { children: e.lab.btnCrash }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: v,
              children: [
                s.jsx("span", { children: "📡" }),
                s.jsx("span", { children: e.lab.btnOnError }),
              ],
            }),
            s.jsxs("button", {
              className: "lab-btn",
              onClick: m,
              children: [
                s.jsx("span", { children: "🔍" }),
                s.jsx("span", { children: r ? e.lab.debugOn : e.lab.debugOff }),
              ],
            }),
          ],
        }),
        s.jsx("div", {
          className: "lab-terminal",
          ref: i,
          children: t.map((w) =>
            s.jsxs(
              "div",
              {
                className: "lab-terminal-line",
                style: { color: w.color },
                children: ["[", w.time, "] ", w.msg],
              },
              w.id
            )
          ),
        }),
      ],
    });
  },
  Dd = ({ t: e, overlayInstance: t }) => {
    const [n, r] = X.useState(!1);
    return s.jsxs("section", {
      id: "lab",
      className: "lab-section",
      children: [
        s.jsxs("div", {
          className: "lab-drawer-header",
          onClick: () => r(!n),
          role: "button",
          tabIndex: 0,
          onKeyDown: (o) => {
            (o.key === "Enter" || o.key === " ") && r(!n);
          },
          children: [
            s.jsxs("div", {
              className: "lab-drawer-title font-display",
              children: [
                s.jsx("span", { children: "⚡" }),
                s.jsx("span", { children: e.lab.title }),
                s.jsx("span", {
                  className: "lab-drawer-badge",
                  children: e.lab.badge,
                }),
              ],
            }),
            s.jsx("div", {
              style: { fontSize: "1.4rem", color: "var(--gold-400)" },
              children: n ? "▲" : "▼",
            }),
          ],
        }),
        n &&
          s.jsxs("div", {
            className: "lab-content",
            children: [
              s.jsx(Pd, { t: e, overlayInstance: t }),
              s.jsx(_d, { t: e }),
            ],
          }),
      ],
    });
  },
  Id = ({ t: e }) =>
    s.jsxs("footer", {
      className: "celestial-footer",
      children: [
        s.jsxs("div", {
          className: "footer-links",
          children: [
            s.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: "GitHub",
            }),
            s.jsx("span", { children: "•" }),
            s.jsx("a", {
              href: "https://www.npmjs.com/package/ramadan-overlay",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: "NPM Package",
            }),
            s.jsx("span", { children: "•" }),
            s.jsx("a", {
              href: "https://github.com/3mr-5aled/ramadan-overlay/blob/main/LICENSE",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link",
              children: e.footer.license,
            }),
          ],
        }),
        s.jsxs("p", {
          style: { marginTop: "8px" },
          children: ["🌙 ", e.footer.copy, " ", e.footer.builtWith],
        }),
      ],
    }),
  Wl = {
    colors: ["#c9a84c", "#e5c158", "#9a7b2c", "#f3e5ab", "#1b3b2b", "#0f172a"],
    glowColor: "rgba(201,168,76,0.55)",
    ceilingColor: "#c9a84c",
    ropeColor: "#c9a84c",
    bannerBg: "rgba(15,15,20,0.92)",
    bannerTextColor: "#f1f5f9",
    bannerIconColor: "#c9a84c",
  },
  Rd = () => {
    const [e, t] = X.useState(vd),
      n = e === "ar" ? md : hd,
      [r, o] = X.useState(!0),
      [i, a] = X.useState("classic"),
      [l, c] = X.useState("ramadan"),
      [u, v] = X.useState(!1),
      [m, p] = X.useState(null),
      [w, C] = X.useState(Wl),
      [S, z] = X.useState({
        variant: "lanterns",
        position: "top",
        opacity: 0.85,
        layer: "foreground",
        shadows: "soft",
        autoTrigger: !1,
        previewMode: !0,
        countdown: !1,
        confetti: "on",
        lanternStyle: 0,
        ropeStyle: "straight",
        ropeSag: 20,
        ceilingColor: "#c9a84c",
        ropeColor: "#c9a84c",
        bannerTextAr: "رَمَضَان كَرِيم",
        bannerTextEn: "Ramadan Mubarak",
        bannerBg: "rgba(15,15,20,0.92)",
        bannerTextColor: "#f1f5f9",
        bannerIconColor: "#c9a84c",
        clearance: "edges",
        intensity: "normal",
        density: "normal",
        glowColor: "rgba(201,168,76,0.55)",
      });
    (X.useEffect(() => {
      (fu(e), gd(e));
    }, [e]),
      X.useEffect(() => {
        try {
          const j = window.location.hash.replace(/^#/, "");
          if (j) {
            const W = new URLSearchParams(j),
              F = W.get("variant"),
              Z = W.get("theme"),
              oe = W.get("position"),
              A = W.get("occasion");
            (F &&
              z((O) => Gn({ ...O, variant: F, position: oe || O.position }, F)),
              Z && a(Z),
              A && c(A));
          }
        } catch {}
      }, []),
      X.useEffect(() => {
        try {
          const j = new URLSearchParams();
          (S.variant && j.set("variant", S.variant),
            i && j.set("theme", i),
            S.position && j.set("position", S.position),
            j.set("occasion", l),
            j.set("lang", e),
            window.history.replaceState(null, "", `#${j.toString()}`));
        } catch {}
      }, [S.variant, S.position, i, l, e]));
    const d = r
        ? { ...S, theme: i === "custom" ? w : i, previewMode: !0 }
        : { autoTrigger: !1, previewMode: !1 },
      f = () => {
        t((j) => (j === "ar" ? "en" : "ar"));
      },
      h = () => {
        o((j) => !j);
      },
      x = () => {
        var j;
        if ((j = m == null ? void 0 : m.countdown) != null && j.playAlert)
          m.countdown.playAlert();
        else
          try {
            const W = window.AudioContext || window.webkitAudioContext;
            if (W) {
              const F = new W(),
                Z = F.createOscillator(),
                oe = F.createGain();
              ((Z.type = "sine"),
                Z.frequency.setValueAtTime(587.33, F.currentTime),
                Z.frequency.exponentialRampToValueAtTime(
                  880,
                  F.currentTime + 0.8
                ),
                oe.gain.setValueAtTime(0.3, F.currentTime),
                oe.gain.exponentialRampToValueAtTime(
                  0.001,
                  F.currentTime + 1.2
                ),
                Z.connect(oe),
                oe.connect(F.destination),
                Z.start(),
                Z.stop(F.currentTime + 1.2));
            }
          } catch {}
      },
      k = () => {
        m != null && m.fireConfetti && m.fireConfetti(l);
      },
      T = (j) => {
        z((W) => Gn(W, j));
      },
      E = (j) => {
        z((W) => ({ ...W, position: j }));
      },
      b = (j) => {
        a(j);
      },
      P = (j) => {
        z((W) => ({ ...W, ...j }));
      },
      M = (j, W) => {
        C((F) => {
          const Z = F.colors
            ? [...F.colors]
            : [
                "#c9a84c",
                "#e5c158",
                "#9a7b2c",
                "#f3e5ab",
                "#1b3b2b",
                "#0f172a",
              ];
          return j === "primaryColor"
            ? ((Z[0] = W), { ...F, colors: Z })
            : j === "accentColor"
              ? ((Z[3] = W), { ...F, colors: Z })
              : { ...F, [j]: W };
        });
      },
      L = () => {
        C(Wl);
      },
      $ = (j) => {
        (c(j),
          z(
            j === "eid-fitr"
              ? (W) =>
                  Gn(
                    {
                      ...W,
                      bannerTextAr: "عِيد فِطْر مُبَارَك",
                      bannerTextEn: "Eid Al-Fitr Mubarak",
                    },
                    "eid-fitr"
                  )
              : j === "eid-adha"
                ? (W) =>
                    Gn(
                      {
                        ...W,
                        bannerTextAr: "عِيد أَضْحَى مُبَارَك",
                        bannerTextEn: "Eid Al-Adha Mubarak",
                      },
                      "eid-adha"
                    )
                : (W) =>
                    Gn(
                      {
                        ...W,
                        bannerTextAr: "رَمَضَان كَرِيم",
                        bannerTextEn: "Ramadan Mubarak",
                      },
                      "lanterns"
                    )
          ));
      };
    return s.jsxs("div", {
      className: `app-container ${u ? "drawer-open" : ""}`,
      children: [
        r && s.jsx(pd, { config: d, onInstance: p }),
        s.jsx(Sd, {
          t: n,
          locale: e,
          onToggleLocale: f,
          occasion: l,
          onChangeOccasion: $,
          overlayOn: r,
          onToggleOverlay: h,
          onPlayChime: x,
          onFireConfetti: k,
          onToggleDrawer: () => v((j) => !j),
        }),
        s.jsxs("main", {
          children: [
            s.jsx(Cd, {
              t: n,
              locale: e,
              occasion: l,
              onFireConfetti: k,
              onScrollToWorkbench: () => {
                var j;
                (j = document.getElementById("workbench")) == null ||
                  j.scrollIntoView({ behavior: "smooth" });
              },
              onScrollToLab: () => {
                var j;
                (j = document.getElementById("lab")) == null ||
                  j.scrollIntoView({ behavior: "smooth" });
              },
            }),
            s.jsx(Ld, {
              t: n,
              locale: e,
              config: S,
              themeName: i,
              customTheme: w,
              onSelectVariant: T,
              onChangePosition: E,
              onChangeTheme: b,
              onUpdateConfig: P,
              onUpdateCustomColor: M,
              onResetCustomColors: L,
              onToggleAutoTrigger: () =>
                z((j) => ({ ...j, autoTrigger: !j.autoTrigger })),
              onToggleCountdown: () =>
                z((j) => ({ ...j, countdown: !j.countdown })),
            }),
            s.jsx(Dd, { t: n, overlayInstance: m }),
          ],
        }),
        s.jsx(Id, { t: n }),
      ],
    });
  },
  Gl = document.getElementById("root");
Gl &&
  Ei.createRoot(Gl).render(s.jsx(Ou.StrictMode, { children: s.jsx(Rd, {}) }));
