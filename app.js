(() => {
  const { useState, useEffect, useRef, useCallback } = React;
  const SUPA_URL = "https://cjxgjtzmwttapujhxvoo.supabase.co";
  const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeGdqdHptd3R0YXB1amh4dm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5ODY1MzcsImV4cCI6MjA5NDU2MjUzN30.0-SHa7ZijSMCAoZClKA1CtXeYBBjSwz-gTtnYMGbcRk";
  const supa = window.supabase.createClient(SUPA_URL, SUPA_KEY);
  const GROUPS = [
    { id: "A", teams: [{ n: "M\xE9xico", f: "\u{1F1F2}\u{1F1FD}" }, { n: "\xC1frica do Sul", f: "\u{1F1FF}\u{1F1E6}" }, { n: "Coreia do Sul", f: "\u{1F1F0}\u{1F1F7}" }, { n: "Rep. Tcheca", f: "\u{1F1E8}\u{1F1FF}" }] },
    { id: "B", teams: [{ n: "Canad\xE1", f: "\u{1F1E8}\u{1F1E6}" }, { n: "B\xF3snia", f: "\u{1F1E7}\u{1F1E6}" }, { n: "Catar", f: "\u{1F1F6}\u{1F1E6}" }, { n: "Su\xED\xE7a", f: "\u{1F1E8}\u{1F1ED}" }] },
    { id: "C", teams: [{ n: "Brasil", f: "\u{1F1E7}\u{1F1F7}" }, { n: "Marrocos", f: "\u{1F1F2}\u{1F1E6}" }, { n: "Haiti", f: "\u{1F1ED}\u{1F1F9}" }, { n: "Esc\xF3cia", f: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}" }] },
    { id: "D", teams: [{ n: "EUA", f: "\u{1F1FA}\u{1F1F8}" }, { n: "Paraguai", f: "\u{1F1F5}\u{1F1FE}" }, { n: "Austr\xE1lia", f: "\u{1F1E6}\u{1F1FA}" }, { n: "Turquia", f: "\u{1F1F9}\u{1F1F7}" }] },
    { id: "E", teams: [{ n: "Alemanha", f: "\u{1F1E9}\u{1F1EA}" }, { n: "Cura\xE7ao", f: "\u{1F1E8}\u{1F1FC}" }, { n: "Costa do Marfim", f: "\u{1F1E8}\u{1F1EE}" }, { n: "Equador", f: "\u{1F1EA}\u{1F1E8}" }] },
    { id: "F", teams: [{ n: "Holanda", f: "\u{1F1F3}\u{1F1F1}" }, { n: "Jap\xE3o", f: "\u{1F1EF}\u{1F1F5}" }, { n: "Su\xE9cia", f: "\u{1F1F8}\u{1F1EA}" }, { n: "Tun\xEDsia", f: "\u{1F1F9}\u{1F1F3}" }] },
    { id: "G", teams: [{ n: "B\xE9lgica", f: "\u{1F1E7}\u{1F1EA}" }, { n: "Egito", f: "\u{1F1EA}\u{1F1EC}" }, { n: "Ir\xE3", f: "\u{1F1EE}\u{1F1F7}" }, { n: "Nova Zel\xE2ndia", f: "\u{1F1F3}\u{1F1FF}" }] },
    { id: "H", teams: [{ n: "Espanha", f: "\u{1F1EA}\u{1F1F8}" }, { n: "Cabo Verde", f: "\u{1F1E8}\u{1F1FB}" }, { n: "Ar\xE1bia Saudita", f: "\u{1F1F8}\u{1F1E6}" }, { n: "Uruguai", f: "\u{1F1FA}\u{1F1FE}" }] },
    { id: "I", teams: [{ n: "Fran\xE7a", f: "\u{1F1EB}\u{1F1F7}" }, { n: "Senegal", f: "\u{1F1F8}\u{1F1F3}" }, { n: "Iraque", f: "\u{1F1EE}\u{1F1F6}" }, { n: "Noruega", f: "\u{1F1F3}\u{1F1F4}" }] },
    { id: "J", teams: [{ n: "Argentina", f: "\u{1F1E6}\u{1F1F7}" }, { n: "Arg\xE9lia", f: "\u{1F1E9}\u{1F1FF}" }, { n: "\xC1ustria", f: "\u{1F1E6}\u{1F1F9}" }, { n: "Jord\xE2nia", f: "\u{1F1EF}\u{1F1F4}" }] },
    { id: "K", teams: [{ n: "Portugal", f: "\u{1F1F5}\u{1F1F9}" }, { n: "RD Congo", f: "\u{1F1E8}\u{1F1E9}" }, { n: "Uzbequist\xE3o", f: "\u{1F1FA}\u{1F1FF}" }, { n: "Col\xF4mbia", f: "\u{1F1E8}\u{1F1F4}" }] },
    { id: "L", teams: [{ n: "Inglaterra", f: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}" }, { n: "Cro\xE1cia", f: "\u{1F1ED}\u{1F1F7}" }, { n: "Panam\xE1", f: "\u{1F1F5}\u{1F1E6}" }, { n: "Gana", f: "\u{1F1EC}\u{1F1ED}" }] }
  ];
  const GROUP_MATCHES = [
    { id: "g1", d: "11/06", h: "16h", hm: "M\xE9xico", aw: "\xC1frica do Sul", g: "A" },
    { id: "g2", d: "11/06", h: "23h", hm: "Coreia do Sul", aw: "Rep. Tcheca", g: "A" },
    { id: "g3", d: "12/06", h: "16h", hm: "Canad\xE1", aw: "B\xF3snia", g: "B" },
    { id: "g4", d: "12/06", h: "22h", hm: "EUA", aw: "Paraguai", g: "D" },
    { id: "g5", d: "13/06", h: "01h", hm: "Austr\xE1lia", aw: "Turquia", g: "D" },
    { id: "g6", d: "13/06", h: "16h", hm: "Catar", aw: "Su\xED\xE7a", g: "B" },
    { id: "g7", d: "13/06", h: "19h", hm: "Brasil", aw: "Marrocos", g: "C" },
    { id: "g8", d: "13/06", h: "22h", hm: "Haiti", aw: "Esc\xF3cia", g: "C" },
    { id: "g9", d: "14/06", h: "14h", hm: "Alemanha", aw: "Cura\xE7ao", g: "E" },
    { id: "g10", d: "14/06", h: "17h", hm: "Holanda", aw: "Jap\xE3o", g: "F" },
    { id: "g11", d: "14/06", h: "20h", hm: "Costa do Marfim", aw: "Equador", g: "E" },
    { id: "g12", d: "14/06", h: "23h", hm: "Su\xE9cia", aw: "Tun\xEDsia", g: "F" },
    { id: "g13", d: "15/06", h: "13h", hm: "Espanha", aw: "Cabo Verde", g: "H" },
    { id: "g14", d: "15/06", h: "16h", hm: "B\xE9lgica", aw: "Egito", g: "G" },
    { id: "g15", d: "15/06", h: "19h", hm: "Ar\xE1bia Saudita", aw: "Uruguai", g: "H" },
    { id: "g16", d: "15/06", h: "22h", hm: "Ir\xE3", aw: "Nova Zel\xE2ndia", g: "G" },
    { id: "g17", d: "16/06", h: "16h", hm: "Fran\xE7a", aw: "Senegal", g: "I" },
    { id: "g18", d: "16/06", h: "19h", hm: "Iraque", aw: "Noruega", g: "I" },
    { id: "g19", d: "16/06", h: "22h", hm: "Argentina", aw: "Arg\xE9lia", g: "J" },
    { id: "g20", d: "17/06", h: "01h", hm: "\xC1ustria", aw: "Jord\xE2nia", g: "J" },
    { id: "g21", d: "17/06", h: "14h", hm: "Portugal", aw: "RD Congo", g: "K" },
    { id: "g22", d: "17/06", h: "17h", hm: "Inglaterra", aw: "Cro\xE1cia", g: "L" },
    { id: "g23", d: "17/06", h: "20h", hm: "Gana", aw: "Panam\xE1", g: "L" },
    { id: "g24", d: "17/06", h: "23h", hm: "Uzbequist\xE3o", aw: "Col\xF4mbia", g: "K" },
    { id: "g25", d: "18/06", h: "13h", hm: "Rep. Tcheca", aw: "\xC1frica do Sul", g: "A" },
    { id: "g26", d: "18/06", h: "16h", hm: "Su\xED\xE7a", aw: "B\xF3snia", g: "B" },
    { id: "g27", d: "18/06", h: "19h", hm: "Canad\xE1", aw: "Catar", g: "B" },
    { id: "g28", d: "18/06", h: "22h", hm: "M\xE9xico", aw: "Coreia do Sul", g: "A" },
    { id: "g29", d: "19/06", h: "01h", hm: "Turquia", aw: "Paraguai", g: "D" },
    { id: "g30", d: "19/06", h: "16h", hm: "EUA", aw: "Austr\xE1lia", g: "D" },
    { id: "g31", d: "19/06", h: "19h", hm: "Esc\xF3cia", aw: "Marrocos", g: "C" },
    { id: "g32", d: "19/06", h: "22h", hm: "Brasil", aw: "Haiti", g: "C" },
    { id: "g33", d: "20/06", h: "14h", hm: "Holanda", aw: "Su\xE9cia", g: "F" },
    { id: "g34", d: "20/06", h: "17h", hm: "Alemanha", aw: "Costa do Marfim", g: "E" },
    { id: "g35", d: "20/06", h: "21h", hm: "Equador", aw: "Cura\xE7ao", g: "E" },
    { id: "g36", d: "21/06", h: "01h", hm: "Tun\xEDsia", aw: "Jap\xE3o", g: "F" },
    { id: "g37", d: "21/06", h: "13h", hm: "Espanha", aw: "Ar\xE1bia Saudita", g: "H" },
    { id: "g38", d: "21/06", h: "16h", hm: "B\xE9lgica", aw: "Ir\xE3", g: "G" },
    { id: "g39", d: "21/06", h: "19h", hm: "Uruguai", aw: "Cabo Verde", g: "H" },
    { id: "g40", d: "21/06", h: "22h", hm: "Nova Zel\xE2ndia", aw: "Egito", g: "G" },
    { id: "g41", d: "22/06", h: "14h", hm: "Argentina", aw: "\xC1ustria", g: "J" },
    { id: "g42", d: "22/06", h: "18h", hm: "Fran\xE7a", aw: "Iraque", g: "I" },
    { id: "g43", d: "22/06", h: "21h", hm: "Noruega", aw: "Senegal", g: "I" },
    { id: "g44", d: "23/06", h: "00h", hm: "Jord\xE2nia", aw: "Arg\xE9lia", g: "J" },
    { id: "g45", d: "23/06", h: "14h", hm: "Portugal", aw: "Uzbequist\xE3o", g: "K" },
    { id: "g46", d: "23/06", h: "17h", hm: "Inglaterra", aw: "Gana", g: "L" },
    { id: "g47", d: "23/06", h: "20h", hm: "Panam\xE1", aw: "Cro\xE1cia", g: "L" },
    { id: "g48", d: "23/06", h: "23h", hm: "Col\xF4mbia", aw: "RD Congo", g: "K" },
    { id: "g49", d: "24/06", h: "16h", hm: "Su\xED\xE7a", aw: "Canad\xE1", g: "B" },
    { id: "g50", d: "24/06", h: "16h", hm: "B\xF3snia", aw: "Catar", g: "B" },
    { id: "g51", d: "24/06", h: "19h", hm: "Esc\xF3cia", aw: "Brasil", g: "C" },
    { id: "g52", d: "24/06", h: "19h", hm: "Marrocos", aw: "Haiti", g: "C" },
    { id: "g53", d: "24/06", h: "22h", hm: "Rep. Tcheca", aw: "M\xE9xico", g: "A" },
    { id: "g54", d: "24/06", h: "22h", hm: "\xC1frica do Sul", aw: "Coreia do Sul", g: "A" },
    { id: "g55", d: "25/06", h: "17h", hm: "Equador", aw: "Alemanha", g: "E" },
    { id: "g56", d: "25/06", h: "17h", hm: "Cura\xE7ao", aw: "Costa do Marfim", g: "E" },
    { id: "g57", d: "25/06", h: "20h", hm: "Tun\xEDsia", aw: "Holanda", g: "F" },
    { id: "g58", d: "25/06", h: "20h", hm: "Jap\xE3o", aw: "Su\xE9cia", g: "F" },
    { id: "g59", d: "25/06", h: "23h", hm: "Turquia", aw: "EUA", g: "D" },
    { id: "g60", d: "25/06", h: "23h", hm: "Paraguai", aw: "Austr\xE1lia", g: "D" },
    { id: "g61", d: "26/06", h: "16h", hm: "Noruega", aw: "Fran\xE7a", g: "I" },
    { id: "g62", d: "26/06", h: "16h", hm: "Senegal", aw: "Iraque", g: "I" },
    { id: "g63", d: "26/06", h: "21h", hm: "Uruguai", aw: "Espanha", g: "H" },
    { id: "g64", d: "26/06", h: "21h", hm: "Cabo Verde", aw: "Ar\xE1bia Saudita", g: "H" },
    { id: "g65", d: "27/06", h: "00h", hm: "Egito", aw: "Ir\xE3", g: "G" },
    { id: "g66", d: "27/06", h: "00h", hm: "Nova Zel\xE2ndia", aw: "B\xE9lgica", g: "G" },
    { id: "g67", d: "27/06", h: "18h", hm: "Panam\xE1", aw: "Inglaterra", g: "L" },
    { id: "g68", d: "27/06", h: "18h", hm: "Cro\xE1cia", aw: "Gana", g: "L" },
    { id: "g69", d: "27/06", h: "20h30", hm: "Col\xF4mbia", aw: "Portugal", g: "K" },
    { id: "g70", d: "27/06", h: "20h30", hm: "RD Congo", aw: "Uzbequist\xE3o", g: "K" },
    { id: "g71", d: "27/06", h: "23h", hm: "Jord\xE2nia", aw: "Argentina", g: "J" },
    { id: "g72", d: "27/06", h: "23h", hm: "Arg\xE9lia", aw: "\xC1ustria", g: "J" }
  ];
  const OPENING = /* @__PURE__ */ new Date("2026-06-11T16:00:00-05:00");
  const COLORS = ["#FF2D55", "#BF5AF2", "#0A84FF", "#30D158", "#FF9F0A", "#FF6B35", "#5AC8FA", "#FFD60A", "#FF375F", "#64D2FF"];
  const DEFAULT_STATE = {
    players: [],
    matchResults: {},
    groupBets: {},
    matchBets: {},
    bracket: {
      r32: makeRound(16, 73, "28 Jun \u2013 4 Jul"),
      r16: makeRound(8, 89, "5 \u2013 8 Jul"),
      qf: makeRound(4, 97, "9 \u2013 11 Jul"),
      sf: makeRound(2, 101, "14 \u2013 15 Jul"),
      f: [{ id: "final", matchNo: 103, hm: "TBD", aw: "TBD", hs: null, as: null, done: false, date: "19 Jul 2026 \xB7 MetLife, Nova York" }]
    }
  };
  const ROUND_OF_32_SLOTS = [
    { matchNo: 73, home: "Runner-up Group A", away: "Runner-up Group B" },
    { matchNo: 74, home: "Winner Group E", away: "Third-place qualifier", thirdGroups: ["A", "B", "C", "D", "F"] },
    { matchNo: 75, home: "Winner Group F", away: "Runner-up Group C" },
    { matchNo: 76, home: "Winner Group C", away: "Runner-up Group F" },
    { matchNo: 77, home: "Winner Group I", away: "Third-place qualifier", thirdGroups: ["C", "D", "F", "G", "H"] },
    { matchNo: 78, home: "Runner-up Group E", away: "Runner-up Group I" },
    { matchNo: 79, home: "Winner Group A", away: "Third-place qualifier", thirdGroups: ["C", "E", "F", "H", "I"] },
    { matchNo: 80, home: "Winner Group L", away: "Third-place qualifier", thirdGroups: ["E", "H", "I", "J", "K"] },
    { matchNo: 81, home: "Winner Group D", away: "Third-place qualifier", thirdGroups: ["B", "E", "F", "I", "J"] },
    { matchNo: 82, home: "Winner Group G", away: "Third-place qualifier", thirdGroups: ["A", "E", "H", "I", "J"] },
    { matchNo: 83, home: "Runner-up Group K", away: "Runner-up Group L" },
    { matchNo: 84, home: "Winner Group H", away: "Runner-up Group J" },
    { matchNo: 85, home: "Winner Group B", away: "Third-place qualifier", thirdGroups: ["E", "F", "G", "I", "J"] },
    { matchNo: 86, home: "Winner Group J", away: "Runner-up Group H" },
    { matchNo: 87, home: "Winner Group K", away: "Third-place qualifier", thirdGroups: ["D", "E", "I", "J", "L"] },
    { matchNo: 88, home: "Runner-up Group D", away: "Runner-up Group G" }
  ];
  function normalizeBracket(bracket) {
    const source = bracket || {};
    return {
      r32: (source.r32 || DEFAULT_STATE.bracket.r32).map((match, index) => ({ ...DEFAULT_STATE.bracket.r32[index], ...match, matchNo: match.matchNo || DEFAULT_STATE.bracket.r32[index].matchNo })),
      r16: (source.r16 || DEFAULT_STATE.bracket.r16).map((match, index) => ({ ...DEFAULT_STATE.bracket.r16[index], ...match, matchNo: match.matchNo || DEFAULT_STATE.bracket.r16[index].matchNo })),
      qf: (source.qf || DEFAULT_STATE.bracket.qf).map((match, index) => ({ ...DEFAULT_STATE.bracket.qf[index], ...match, matchNo: match.matchNo || DEFAULT_STATE.bracket.qf[index].matchNo })),
      sf: (source.sf || DEFAULT_STATE.bracket.sf).map((match, index) => ({ ...DEFAULT_STATE.bracket.sf[index], ...match, matchNo: match.matchNo || DEFAULT_STATE.bracket.sf[index].matchNo })),
      f: (source.f || DEFAULT_STATE.bracket.f).map((match, index) => ({ ...DEFAULT_STATE.bracket.f[index], ...match, matchNo: match.matchNo || DEFAULT_STATE.bracket.f[index].matchNo }))
    };
  }
  async function dbLoad() {
    const { data, error } = await supa.from("bolao_state").select("data").eq("id", "main").single();
    if (error || !data) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...data.data, bracket: normalizeBracket(data.data.bracket) };
  }
  async function dbSave(state) {
    const { error } = await supa.from("bolao_state").upsert({ id: "main", data: state, updated_at: (/* @__PURE__ */ new Date()).toISOString() });
    return !error;
  }
  function teamFlag(name) {
    const t = GROUPS.flatMap((g) => g.teams).find((t2) => t2.n === name);
    return t ? t.f : "\u{1F3F3}\uFE0F";
  }
  function computeStandings(groupId, matchResults) {
    const g = GROUPS.find((x) => x.id === groupId);
    const table = {};
    g.teams.forEach((t) => {
      table[t.n] = { pts: 0, gf: 0, ga: 0, pj: 0 };
    });
    GROUP_MATCHES.filter((m) => m.g === groupId).forEach((m) => {
      const r = matchResults[m.id];
      if (!(r == null ? void 0 : r.done)) return;
      table[m.hm].gf += r.hs;
      table[m.hm].ga += r.as;
      table[m.hm].pj++;
      table[m.aw].gf += r.as;
      table[m.aw].ga += r.hs;
      table[m.aw].pj++;
      if (r.hs > r.as) table[m.hm].pts += 3;
      else if (r.hs < r.as) table[m.aw].pts += 3;
      else {
        table[m.hm].pts += 1;
        table[m.aw].pts += 1;
      }
    });
    return g.teams.map((t) => ({ ...t, ...table[t.n] })).sort((a, b) => {
      const p = (b.pts || 0) - (a.pts || 0);
      if (p !== 0) return p;
      return (b.gf || 0) - (b.ga || 0) - ((a.gf || 0) - (a.ga || 0));
    });
  }
  function Toast({ msg, type }) {
    if (!msg) return null;
    return /* @__PURE__ */ React.createElement("div", { className: `toast ${type || "ok"}` }, msg);
  }
  function useToast() {
    const [t, setT] = useState({ msg: "", type: "ok" });
    function show(msg, type = "ok") {
      setT({ msg, type });
      setTimeout(() => setT({ msg: "", type: "ok" }), 2500);
    }
    return [t, show];
  }
  function Countdown() {
    const [t, setT] = useState({});
    useEffect(() => {
      function calc() {
        const diff = OPENING - /* @__PURE__ */ new Date();
        if (diff <= 0) {
          setT({ d: 0, h: 0, m: 0, s: 0 });
          return;
        }
        setT({ d: Math.floor(diff / 864e5), h: Math.floor(diff % 864e5 / 36e5), m: Math.floor(diff % 36e5 / 6e4), s: Math.floor(diff % 6e4 / 1e3) });
      }
      calc();
      const i = setInterval(calc, 1e3);
      return () => clearInterval(i);
    }, []);
    return /* @__PURE__ */ React.createElement("div", { className: "cd" }, /* @__PURE__ */ React.createElement("div", { className: "cd-lbl" }, "\u{1F3DF}\uFE0F Abertura \u2014 Azteca, M\xE9xico \xB7 11 Jun 2026"), /* @__PURE__ */ React.createElement("div", { className: "cd-row" }, [["d", "Dias"], ["h", "Horas"], ["m", "Min"], ["s", "Seg"]].map(([k, l], i) => {
      var _a;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: k }, i > 0 && /* @__PURE__ */ React.createElement("span", { className: "cd-sep" }, ":"), /* @__PURE__ */ React.createElement("div", { className: "cd-u" }, /* @__PURE__ */ React.createElement("div", { className: "cd-n" }, String((_a = t[k]) != null ? _a : 0).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { className: "cd-l" }, l)));
    })));
  }
  function GroupsTab({ data, saving, lastSync, doSync }) {
    const [active, setActive] = useState(null);
    const [view, setView] = useState("table");
    const standings = GROUPS.map((g) => ({ ...g, teams: computeStandings(g.id, data.matchResults) }));
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "stitle" }, "\u{1F30D} Grupos ", /* @__PURE__ */ React.createElement("span", { className: "stitle-pill" }, "FIFA 2026")), /* @__PURE__ */ React.createElement("div", { className: "syncbar" }, /* @__PURE__ */ React.createElement("div", { className: `sdot${saving ? " spin" : ""}` }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, saving ? "Atualizando..." : lastSync ? `\u2713 Sync ${new Date(lastSync).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}` : "\u2601\uFE0F Conectado \xB7 Tempo real"), /* @__PURE__ */ React.createElement("button", { className: "sync-btn", onClick: doSync }, "\u21BA Atualizar")), /* @__PURE__ */ React.createElement("div", { className: "tabs2" }, /* @__PURE__ */ React.createElement("button", { className: `tab2${view === "table" ? " on" : ""}`, onClick: () => setView("table") }, "\u{1F4CA} Tabela"), /* @__PURE__ */ React.createElement("button", { className: `tab2${view === "matches" ? " on" : ""}`, onClick: () => setView("matches") }, "\u{1F4C5} Todos os jogos")), view === "table" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "gfilter" }, /* @__PURE__ */ React.createElement("button", { className: `gfbtn${!active ? " on" : ""}`, onClick: () => setActive(null) }, "Todos"), GROUPS.map((g) => /* @__PURE__ */ React.createElement("button", { key: g.id, className: `gfbtn${active === g.id ? " on" : ""}`, onClick: () => setActive(active === g.id ? null : g.id) }, g.id))), standings.filter((g) => !active || g.id === active).map((g) => /* @__PURE__ */ React.createElement("div", { key: g.id, className: "gc" }, /* @__PURE__ */ React.createElement("div", { className: "gh" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement("span", { className: "gname" }, "GRUPO ", g.id), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "2px" } }, g.teams.map((t) => /* @__PURE__ */ React.createElement("span", { key: t.n, style: { fontSize: "14px" } }, t.f)))), /* @__PURE__ */ React.createElement("span", { className: "gstatus" }, GROUP_MATCHES.filter((m) => {
      var _a;
      return m.g === g.id && ((_a = data.matchResults[m.id]) == null ? void 0 : _a.done);
    }).length, "/", GROUP_MATCHES.filter((m) => m.g === g.id).length, " jogos")), /* @__PURE__ */ React.createElement("div", { className: "ghdr2" }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, marginLeft: "30px", textAlign: "left" } }, "Sele\xE7\xE3o"), ["PJ", "Pts", "GF", "GC", "SG"].map((h) => /* @__PURE__ */ React.createElement("span", { key: h, style: { width: "22px" } }, h)), /* @__PURE__ */ React.createElement("span", { style: { width: "22px" } })), g.teams.map((t, i) => /* @__PURE__ */ React.createElement("div", { key: t.n, className: `tr${i < 2 ? " q" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "tpos" }, i + 1), /* @__PURE__ */ React.createElement("span", { className: "tflag" }, t.f), /* @__PURE__ */ React.createElement("span", { className: "tname" }, t.n), /* @__PURE__ */ React.createElement("span", { className: "tcol", style: { color: "rgba(255,255,255,.4)" } }, t.pj || 0), /* @__PURE__ */ React.createElement("span", { className: "tcol", style: { color: i < 2 ? "#fff" : "rgba(255,255,255,.6)", fontSize: "13px" } }, t.pts || 0), /* @__PURE__ */ React.createElement("span", { className: "tcol", style: { color: "rgba(255,255,255,.5)" } }, t.gf || 0), /* @__PURE__ */ React.createElement("span", { className: "tcol", style: { color: "rgba(255,255,255,.5)" } }, t.ga || 0), /* @__PURE__ */ React.createElement("span", { className: "tcol", style: { color: t.gf - t.ga > 0 ? "#30D158" : t.gf - t.ga < 0 ? "#FF2D55" : "rgba(255,255,255,.3)" } }, (t.gf || 0) - (t.ga || 0) > 0 ? "+" + (t.gf - t.ga) : (t.gf || 0) - (t.ga || 0)), i < 2 ? /* @__PURE__ */ React.createElement("div", { className: "qdot" }, "\u2713") : /* @__PURE__ */ React.createElement("span", { style: { width: "18px" } })))))), view === "matches" && GROUPS.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.id, style: { marginBottom: "14px" } }, /* @__PURE__ */ React.createElement("div", { className: "rlbl" }, "Grupo ", g.id, " \xA0", g.teams.map((t) => t.f).join(" ")), GROUP_MATCHES.filter((m) => m.g === g.id).map((m) => {
      const r = data.matchResults[m.id];
      return /* @__PURE__ */ React.createElement("div", { key: m.id, className: "mc" }, /* @__PURE__ */ React.createElement("div", { className: "mdate" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4C5} ", m.d, " \xB7 ", m.h, " (Bras\xEDlia)"), (r == null ? void 0 : r.status) === "IN_PLAY" && /* @__PURE__ */ React.createElement("span", { className: "badge-live" }, "\u{1F534} AO VIVO"), (r == null ? void 0 : r.done) && /* @__PURE__ */ React.createElement("span", { className: "badge-ft" }, "\u2713 FT"), !r && /* @__PURE__ */ React.createElement("span", { className: "badge-ns" }, "Em breve")), /* @__PURE__ */ React.createElement("div", { className: "mteams" }, /* @__PURE__ */ React.createElement("div", { className: "mteam" }, /* @__PURE__ */ React.createElement("span", { className: "mflag" }, teamFlag(m.hm)), /* @__PURE__ */ React.createElement("span", { className: "mtn" }, m.hm)), r ? /* @__PURE__ */ React.createElement("span", { className: "mscore" }, r.hs, " \u2013 ", r.as) : /* @__PURE__ */ React.createElement("span", { className: "mscore tbd" }, "vs"), /* @__PURE__ */ React.createElement("div", { className: "mteam r" }, /* @__PURE__ */ React.createElement("span", { className: "mflag" }, teamFlag(m.aw)), /* @__PURE__ */ React.createElement("span", { className: "mtn" }, m.aw))));
    }))));
  }
  function BetsTab({ data, setData, onSave }) {
    var _a;
    const [phase, setPhase] = useState("groups");
    const [sp, setSp] = useState(null);
    const [toast, show] = useToast();
    useEffect(() => {
      if (!sp && data.players.length > 0) setSp(data.players[0].id);
    }, [data.players]);
    async function save() {
      const ok = await onSave();
      show(ok ? "\u2601\uFE0F Apostas salvas para todos!" : "\u274C Erro ao salvar.", ok ? "ok" : "err");
    }
    if (!data.players.length) return /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("span", { className: "ico" }, "\u{1F465}"), /* @__PURE__ */ React.createElement("p", null, "Nenhum participante ainda.", /* @__PURE__ */ React.createElement("br", null), "Vai em ", /* @__PURE__ */ React.createElement("strong", null, "Jogadores"), " e chama a fam\xEDlia!"));
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "stitle" }, "\u{1F3AF} Apostas"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "11px", color: "rgba(255,255,255,.35)", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" } }, "Apostando como:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } }, data.players.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => setSp(p.id), className: `ppill${sp === p.id ? " on" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "pdot", style: { background: p.color } }), p.name)))), /* @__PURE__ */ React.createElement("div", { className: "tabs2" }, /* @__PURE__ */ React.createElement("button", { className: `tab2${phase === "groups" ? " on" : ""}`, onClick: () => setPhase("groups") }, "\u{1F30D} Grupos \xB7 1pt"), /* @__PURE__ */ React.createElement("button", { className: `tab2${phase === "ko" ? " on" : ""}`, onClick: () => setPhase("ko") }, "\u2694\uFE0F Mata-mata")), phase === "groups" && sp && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "infobox" }, "\u{1F3AF} Escolha os ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FFD60A" } }, "2 que avan\xE7am"), " de cada grupo. Acertar = ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FFD60A" } }, "1 ponto"), " cada! Boa sorte \u{1F340}"), GROUPS.map((g) => {
      var _a2, _b;
      const bets = ((_b = (_a2 = data.groupBets) == null ? void 0 : _a2[sp]) == null ? void 0 : _b[g.id]) || [];
      function toggle(tn) {
        const nb = JSON.parse(JSON.stringify(data));
        if (!nb.groupBets) nb.groupBets = {};
        if (!nb.groupBets[sp]) nb.groupBets[sp] = {};
        const cur = nb.groupBets[sp][g.id] || [];
        nb.groupBets[sp][g.id] = cur.includes(tn) ? cur.filter((x) => x !== tn) : cur.length < 2 ? [...cur, tn] : cur;
        setData(nb);
      }
      return /* @__PURE__ */ React.createElement("div", { key: g.id, className: "betcard" }, /* @__PURE__ */ React.createElement("div", { className: "bethdr" }, /* @__PURE__ */ React.createElement("div", { className: "betphase" }, "Grupo ", g.id), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "3px" } }, g.teams.map((t) => /* @__PURE__ */ React.createElement("span", { key: t.n, style: { fontSize: "18px" } }, t.f))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", color: bets.length === 2 ? "#30D158" : "rgba(255,255,255,.3)", fontWeight: "800" } }, bets.length === 2 ? "\u2705 Completo!" : bets.length === 1 ? "1 de 2 \u2713" : "Escolha 2"))), /* @__PURE__ */ React.createElement("div", { className: "betbody", style: { paddingTop: "8px" } }, g.teams.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.n, className: `qopt${bets.includes(t.n) ? " sel" : ""}`, onClick: () => toggle(t.n) }, /* @__PURE__ */ React.createElement("div", { className: "chk" }, bets.includes(t.n) ? "\u2713" : ""), /* @__PURE__ */ React.createElement("span", { className: "qflag" }, t.f), /* @__PURE__ */ React.createElement("span", { className: "qname" }, t.n), bets.includes(t.n) && /* @__PURE__ */ React.createElement("span", { className: "q-avanca" }, "AVAN\xC7A \u26A1")))));
    }), /* @__PURE__ */ React.createElement("button", { className: "savebtn", onClick: save }, "\u2601\uFE0F Salvar apostas dos grupos")), phase === "ko" && sp && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "infobox" }, "\u2694\uFE0F ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FFD60A" } }, "Placar exato = 3 pts"), " \xB7 Acertar o classificado = ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#FFD60A" } }, "1 pt"), /* @__PURE__ */ React.createElement("br", null), "Os jogos ser\xE3o desbloqueados ap\xF3s a fase de grupos! \u{1F513}"), (((_a = data.bracket) == null ? void 0 : _a.r32) || []).map((m, i) => {
      var _a2, _b, _c, _d;
      const mb = ((_b = (_a2 = data.matchBets) == null ? void 0 : _a2[sp]) == null ? void 0 : _b[m.id]) || {};
      function upd(f, v) {
        const nb = JSON.parse(JSON.stringify(data));
        if (!nb.matchBets) nb.matchBets = {};
        if (!nb.matchBets[sp]) nb.matchBets[sp] = {};
        if (!nb.matchBets[sp][m.id]) nb.matchBets[sp][m.id] = {};
        nb.matchBets[sp][m.id][f] = v === "" ? "" : parseInt(v) || 0;
        setData(nb);
      }
      return /* @__PURE__ */ React.createElement("div", { key: m.id, className: "betcard" }, /* @__PURE__ */ React.createElement("div", { className: "bethdr" }, /* @__PURE__ */ React.createElement("div", { className: "betphase" }, "32 Avos \xB7 Jogo ", i + 1), /* @__PURE__ */ React.createElement("div", { className: "bettitle" }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "22px" } }, teamFlag(m.hm)), /* @__PURE__ */ React.createElement("span", null, m.hm), /* @__PURE__ */ React.createElement("span", { className: "betvs" }, "\xD7"), /* @__PURE__ */ React.createElement("span", null, m.aw), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "22px" } }, teamFlag(m.aw)))), /* @__PURE__ */ React.createElement("div", { className: "betbody" }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "10px", color: "rgba(255,255,255,.3)", marginBottom: "7px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" } }, "Placar (90min)"), /* @__PURE__ */ React.createElement("div", { className: "scorerow" }, /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: "20", className: "sinp", placeholder: "0", value: (_c = mb.hs) != null ? _c : "", onChange: (e) => upd("hs", e.target.value) }), /* @__PURE__ */ React.createElement("span", { className: "ssep" }, "\u2013"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: "20", className: "sinp", placeholder: "0", value: (_d = mb.as) != null ? _d : "", onChange: (e) => upd("as", e.target.value) }))));
    }), /* @__PURE__ */ React.createElement("button", { className: "savebtn", onClick: save }, "\u2601\uFE0F Salvar apostas do mata-mata")), /* @__PURE__ */ React.createElement(Toast, { ...toast }));
  }
  function BracketTab({ data }) {
    const rounds = [
      { k: "r32", l: "32 Avos de Final", sub: "Jogos 73-88 \u00B7 28 Jun \u2013 4 Jul" },
      { k: "r16", l: "Oitavas de Final", sub: "Jogos 89-96 \u00B7 5 \u2013 8 Jul" },
      { k: "qf", l: "Quartas de Final", sub: "Jogos 97-100 \u00B7 9 \u2013 11 Jul" },
      { k: "sf", l: "Semifinais", sub: "Jogos 101-102 \u00B7 14 \u2013 15 Jul" },
      { k: "f", l: "\u{1F3C6} Grande Final", sub: "Jogo 103 \u00B7 19 Jul \u00B7 MetLife, Nova York" }
    ];
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "stitle" }, "\u2694\uFE0F Chaveamento"), /* @__PURE__ */ React.createElement("div", { className: "infobox" }, "48 sele\xE7\xF5es \xB7 12 grupos \xB7 104 jogos \u{1F30E}", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: "#FFD60A" } }, "32 avan\xE7am"), " (1\xBA e 2\xBA de cada grupo + 8 melhores 3\xBAs) \u2192 5 fases at\xE9 o campe\xE3o!"), rounds.map((r) => {
      var _a;
      return /* @__PURE__ */ React.createElement("div", { key: r.k }, /* @__PURE__ */ React.createElement("div", { className: "rlbl" }, r.l, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", fontFamily: "'Nunito',sans-serif", fontWeight: "600", letterSpacing: "0", textTransform: "none", color: "rgba(255,255,255,.22)" } }, "\xB7 ", r.sub)), (((_a = data.bracket) == null ? void 0 : _a[r.k]) || []).map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id, className: "mc" }, /* @__PURE__ */ React.createElement("div", { className: "mdate" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4C5} Jogo ", m.matchNo || m.id, " \u00B7 ", m.date), m.done && /* @__PURE__ */ React.createElement("span", { className: "badge-ft" }, "\u2713 Encerrado")), /* @__PURE__ */ React.createElement("div", { className: "mteams" }, /* @__PURE__ */ React.createElement("div", { className: "mteam" }, /* @__PURE__ */ React.createElement("span", { className: "mflag" }, teamFlag(m.hm)), /* @__PURE__ */ React.createElement("span", { className: "mtn" }, m.hm)), m.done ? /* @__PURE__ */ React.createElement("span", { className: "mscore" }, m.hs, " \u2013 ", m.as) : /* @__PURE__ */ React.createElement("span", { className: "mscore tbd" }, "TBD"), /* @__PURE__ */ React.createElement("div", { className: "mteam r" }, /* @__PURE__ */ React.createElement("span", { className: "mflag" }, teamFlag(m.aw)), /* @__PURE__ */ React.createElement("span", { className: "mtn" }, m.aw))))));
    }));
  }
  function calcPoints(p, data) {
    var _a;
    let pts = 0;
    let ptsGrupos = 0, ptsMata = 0;
    const detalhes = [];
    GROUPS.forEach((g) => {
      var _a2, _b;
      const standings = computeStandings(g.id, data.matchResults);
      const allDone = GROUP_MATCHES.filter((m) => m.g === g.id).every((m) => {
        var _a3;
        return (_a3 = data.matchResults[m.id]) == null ? void 0 : _a3.done;
      });
      const q = standings.slice(0, 2).map((t) => t.n);
      const bets = ((_b = (_a2 = data.groupBets) == null ? void 0 : _a2[p.id]) == null ? void 0 : _b[g.id]) || [];
      bets.forEach((b) => {
        if (allDone && q.includes(b)) {
          pts += 1;
          ptsGrupos += 1;
          detalhes.push({ tipo: "grupo", texto: `${teamFlag(b)} ${b} classificou no Grupo ${g.id}`, pts: 1, ok: true });
        } else if (allDone && !q.includes(b)) {
          detalhes.push({ tipo: "grupo", texto: `${teamFlag(b)} ${b} (Grupo ${g.id}) \u2014 n\xE3o passou`, pts: 0, ok: false });
        } else if (!allDone && bets.length > 0) {
          if (b === bets[0])
            detalhes.push({ tipo: "grupo", texto: `Grupo ${g.id} em andamento...`, pts: 0, ok: null, pending: true });
        }
      });
    });
    Object.keys(((_a = data.matchBets) == null ? void 0 : _a[p.id]) || {}).forEach((mid) => {
      const r = data.matchResults[mid];
      const b = data.matchBets[p.id][mid];
      if (!(r == null ? void 0 : r.done)) return;
      const rw = r.hs > r.as ? "h" : r.as > r.hs ? "a" : "d";
      const bw = b.hs > b.as ? "h" : b.as > b.hs ? "a" : "d";
      const exato = Number(b.hs) === Number(r.hs) && Number(b.as) === Number(r.as);
      if (exato) {
        pts += 3;
        ptsMata += 3;
        detalhes.push({ tipo: "mata", texto: `Placar exato ${r.hs}\u2013${r.as} \u2713`, pts: 3, ok: true });
      } else if (rw === bw) {
        pts += 1;
        ptsMata += 1;
        detalhes.push({ tipo: "mata", texto: `Classificado certo (placar ${b.hs}\u2013${b.as} errado)`, pts: 1, ok: "partial" });
      } else {
        detalhes.push({ tipo: "mata", texto: `Resultado errado (apostou ${b.hs}\u2013${b.as}, foi ${r.hs}\u2013${r.as})`, pts: 0, ok: false });
      }
    });
    return { pts, ptsGrupos, ptsMata, detalhes };
  }
  function ScoreTab({ data }) {
    const [expanded, setExpanded] = useState(null);
    const ranked = [...data.players].map((p) => {
      const { pts, ptsGrupos, ptsMata, detalhes } = calcPoints(p, data);
      return { ...p, pts, ptsGrupos, ptsMata, detalhes };
    }).sort((a, b) => b.pts - a.pts);
    const max = Math.max(1, ...ranked.map((p) => p.pts));
    const medals = ["\u{1F947}", "\u{1F948}", "\u{1F949}"];
    const rankClass = ["first", "second", "third"];
    const totalJogos = GROUP_MATCHES.length;
    const jogosFeitos = GROUP_MATCHES.filter((m) => {
      var _a;
      return (_a = data.matchResults[m.id]) == null ? void 0 : _a.done;
    }).length;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "stitle" }, "\u{1F3C6} Placar"), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "11px 13px", marginBottom: "12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", fontWeight: "800", color: "rgba(255,255,255,.5)" } }, "\u26BD Progresso da Copa"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", fontWeight: "900", color: "var(--gold)" } }, jogosFeitos, "/", totalJogos, " jogos")), /* @__PURE__ */ React.createElement("div", { style: { height: "6px", background: "rgba(255,255,255,.07)", borderRadius: "4px", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${jogosFeitos / totalJogos * 100}%`, background: "linear-gradient(90deg,var(--gold),var(--orange))", borderRadius: "4px", transition: "width .6s ease" } })), data.lastApiSync && /* @__PURE__ */ React.createElement("div", { style: { fontSize: "10px", color: "rgba(255,255,255,.3)", fontWeight: "700", marginTop: "6px" } }, "\u{1F916} \xDAltimo sync autom\xE1tico: ", new Date(data.lastApiSync).toLocaleDateString("pt-BR"), " \xE0s ", new Date(data.lastApiSync).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))), !ranked.length ? /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("span", { className: "ico" }, "\u{1F3C6}"), /* @__PURE__ */ React.createElement("p", null, "Nenhum participante ainda!", /* @__PURE__ */ React.createElement("br", null), "Adiciona a galera e faz as apostas! \u{1F604}")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "rank-card" }, ranked.map((p, i) => /* @__PURE__ */ React.createElement("div", { key: p.id }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `rank-row${i < 3 ? " " + rankClass[i] : ""}`,
        onClick: () => setExpanded(expanded === p.id ? null : p.id),
        style: { cursor: "pointer" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { width: "26px", textAlign: "center", fontSize: i < 3 ? "20px" : "15px", lineHeight: 1 } }, i < 3 ? medals[i] : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "rgba(255,255,255,.2)" } }, i + 1)),
      /* @__PURE__ */ React.createElement("div", { style: { width: "38px", height: "38px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "15px", flexShrink: 0, color: "#fff", boxShadow: `0 0 12px ${p.color}50` } }, p.name.charAt(0).toUpperCase()),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: "800", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.name), p.ptsGrupos > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: "9px", background: "rgba(48,209,88,.15)", border: "1px solid rgba(48,209,88,.25)", color: "#30D158", padding: "1px 5px", borderRadius: "4px", fontWeight: "800", flexShrink: 0 } }, "+", p.ptsGrupos, "G"), p.ptsMata > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: "9px", background: "rgba(255,214,10,.12)", border: "1px solid rgba(255,214,10,.2)", color: "var(--gold)", padding: "1px 5px", borderRadius: "4px", fontWeight: "800", flexShrink: 0 } }, "+", p.ptsMata, "M")), /* @__PURE__ */ React.createElement("div", { className: "sbar" }, /* @__PURE__ */ React.createElement("div", { className: "sbarfill", style: { width: `${p.pts / max * 100}%` } }))),
      /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0, marginLeft: "6px" } }, /* @__PURE__ */ React.createElement("div", { className: "ppts" }, p.pts), /* @__PURE__ */ React.createElement("div", { className: "pptsl" }, "pontos")),
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: "12px", color: "rgba(255,255,255,.2)", marginLeft: "4px", flexShrink: 0 } }, expanded === p.id ? "\u25B2" : "\u25BC")
    ), expanded === p.id && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(0,0,0,.25)", borderTop: "1px solid rgba(255,255,255,.05)", padding: "10px 14px" } }, p.detalhes.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: "12px", color: "rgba(255,255,255,.3)", fontWeight: "600", textAlign: "center", padding: "6px 0" } }, "Nenhuma aposta registrada ainda ou jogos ainda n\xE3o encerrados.") : p.detalhes.map((d, di) => /* @__PURE__ */ React.createElement("div", { key: di, style: { display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.04)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "14px", flexShrink: 0 } }, d.ok === true ? "\u2705" : d.ok === false ? "\u274C" : d.ok === "partial" ? "\u{1F7E1}" : "\u23F3"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "12px", flex: 1, color: "rgba(255,255,255,.7)", fontWeight: "600" } }, d.texto), d.pts > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "15px", color: d.pts >= 3 ? "var(--gold)" : "#30D158", flexShrink: 0 } }, "+", d.pts, "pt", d.pts > 1 ? "s" : ""))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px", display: "flex", gap: "8px" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "rgba(48,209,88,.08)", border: "1px solid rgba(48,209,88,.15)", borderRadius: "7px", padding: "6px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "#30D158" } }, p.ptsGrupos), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "9px", fontWeight: "800", color: "rgba(255,255,255,.35)", letterSpacing: "1px", textTransform: "uppercase" } }, "Grupos")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "rgba(255,214,10,.08)", border: "1px solid rgba(255,214,10,.15)", borderRadius: "7px", padding: "6px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "var(--gold)" } }, p.ptsMata), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "9px", fontWeight: "800", color: "rgba(255,255,255,.35)", letterSpacing: "1px", textTransform: "uppercase" } }, "Mata-mata")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "rgba(10,132,255,.08)", border: "1px solid rgba(10,132,255,.2)", borderRadius: "7px", padding: "6px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "#0A84FF" } }, p.pts), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "9px", fontWeight: "800", color: "rgba(255,255,255,.35)", letterSpacing: "1px", textTransform: "uppercase" } }, "Total"))))))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "14px", marginTop: "4px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "11px", fontWeight: "900", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: "10px" } }, "Como ganhar pontos \u{1F4A1}"), [
      ["\u2705", "Acertar 2 classificados do grupo", "1 pt cada"],
      ["\u2694\uFE0F", "Acertar classificado no mata-mata", "1 pt"],
      ["\u{1F7E1}", "Acertar o placar exato no mata-mata", "3 pts \u{1F525}"]
    ].map(([ico, d, pts_]) => /* @__PURE__ */ React.createElement("div", { key: d, style: { display: "flex", alignItems: "center", gap: "8px", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.04)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "16px" } }, ico), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "12px", flex: 1, color: "rgba(255,255,255,.65)", fontWeight: "600" } }, d), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", color: "var(--gold)", flexShrink: 0 } }, pts_))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "10px", fontSize: "11px", color: "rgba(255,255,255,.3)", fontWeight: "600", textAlign: "center" } }, "\u{1F4A1} Toque em qualquer participante para ver o detalhamento das apostas"))));
  }
  function PlayersTab({ data, setData, onSave }) {
    const [name, setName] = useState("");
    const [toast, show] = useToast();
    async function add() {
      const n = name.trim();
      if (!n) return;
      if (data.players.find((p) => p.name.toLowerCase() === n.toLowerCase())) {
        show("Nome j\xE1 existe!", "err");
        return;
      }
      const nb = JSON.parse(JSON.stringify(data));
      nb.players.push({ id: Date.now().toString(), name: n, color: COLORS[nb.players.length % COLORS.length] });
      setData(nb);
      setName("");
      const ok = await onSave(nb);
      show(ok ? `\u{1F389} ${n} entrou no bol\xE3o!` : "Erro ao salvar.", ok ? "ok" : "err");
    }
    async function rem(id) {
      const nb = JSON.parse(JSON.stringify(data));
      nb.players = nb.players.filter((p) => p.id !== id);
      setData(nb);
      await onSave(nb);
      show("Removido.", "ok");
    }
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "stitle" }, "\u{1F465} Participantes"), /* @__PURE__ */ React.createElement("div", { className: "syncbar", style: { background: "linear-gradient(90deg,rgba(10,132,255,.08),rgba(10,132,255,.04))", borderColor: "rgba(10,132,255,.2)" } }, /* @__PURE__ */ React.createElement("div", { className: "sdot", style: { background: "#0A84FF" } }), /* @__PURE__ */ React.createElement("span", null, "\u2601\uFE0F Dados salvos no Supabase \u2014 acesse de qualquer celular!")), /* @__PURE__ */ React.createElement("div", { className: "addform" }, /* @__PURE__ */ React.createElement("div", { className: "ftitle" }, "\u2795 Adicionar participante"), /* @__PURE__ */ React.createElement("div", { className: "frow" }, /* @__PURE__ */ React.createElement("input", { className: "finp", placeholder: "Nome da pessoa...", value: name, onChange: (e) => setName(e.target.value), onKeyDown: (e) => e.key === "Enter" && add() }), /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: add }, "Add"))), !data.players.length ? /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("span", { className: "ico" }, "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}"), /* @__PURE__ */ React.createElement("p", null, "Chama a fam\xEDlia!", /* @__PURE__ */ React.createElement("br", null), "Adicione os participantes pra come\xE7ar o bol\xE3o \u{1F973}")) : data.players.map((p, i) => /* @__PURE__ */ React.createElement("div", { key: p.id, className: "pcard" }, /* @__PURE__ */ React.createElement("div", { style: { width: "40px", height: "40px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "16px", flexShrink: 0, color: "#fff", boxShadow: `0 0 14px ${p.color}50` } }, p.name.charAt(0).toUpperCase()), /* @__PURE__ */ React.createElement("div", { className: "pname" }, p.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", color: "rgba(255,255,255,.2)", fontWeight: "700", marginRight: "6px" } }, "#", i + 1), /* @__PURE__ */ React.createElement("button", { className: "delbtn", onClick: () => rem(p.id) }, "\u2715"))), /* @__PURE__ */ React.createElement(Toast, { ...toast }));
  }
  const API_NAME_MAP = {
    "Mexico": "M\xE9xico",
    "Mexico City": "M\xE9xico",
    "South Africa": "\xC1frica do Sul",
    "South Korea": "Coreia do Sul",
    "Korea Republic": "Coreia do Sul",
    "Czech Republic": "Rep. Tcheca",
    "Czechia": "Rep. Tcheca",
    "Canada": "Canad\xE1",
    "Bosnia and Herzegovina": "B\xF3snia",
    "Bosnia": "B\xF3snia",
    "Qatar": "Catar",
    "Switzerland": "Su\xED\xE7a",
    "Brazil": "Brasil",
    "Morocco": "Marrocos",
    "Haiti": "Haiti",
    "Scotland": "Esc\xF3cia",
    "United States": "EUA",
    "USA": "EUA",
    "Paraguay": "Paraguai",
    "Australia": "Austr\xE1lia",
    "Turkey": "Turquia",
    "T\xFCrkiye": "Turquia",
    "Germany": "Alemanha",
    "Cura\xE7ao": "Cura\xE7ao",
    "Curacao": "Cura\xE7ao",
    "C\xF4te d'Ivoire": "Costa do Marfim",
    "Cote d'Ivoire": "Costa do Marfim",
    "Ivory Coast": "Costa do Marfim",
    "Ecuador": "Equador",
    "Netherlands": "Holanda",
    "Japan": "Jap\xE3o",
    "Sweden": "Su\xE9cia",
    "Tunisia": "Tun\xEDsia",
    "Belgium": "B\xE9lgica",
    "Egypt": "Egito",
    "Iran": "Ir\xE3",
    "New Zealand": "Nova Zel\xE2ndia",
    "Spain": "Espanha",
    "Cape Verde": "Cabo Verde",
    "Saudi Arabia": "Ar\xE1bia Saudita",
    "Uruguay": "Uruguai",
    "France": "Fran\xE7a",
    "Senegal": "Senegal",
    "Iraq": "Iraque",
    "Norway": "Noruega",
    "Argentina": "Argentina",
    "Algeria": "Arg\xE9lia",
    "Austria": "\xC1ustria",
    "Jordan": "Jord\xE2nia",
    "Portugal": "Portugal",
    "DR Congo": "RD Congo",
    "Congo DR": "RD Congo",
    "Democratic Republic of Congo": "RD Congo",
    "Uzbekistan": "Uzbequist\xE3o",
    "Colombia": "Col\xF4mbia",
    "England": "Inglaterra",
    "Croatia": "Cro\xE1cia",
    "Panama": "Panam\xE1",
    "Ghana": "Gana"
  };
  function mapApiName(n) {
    return API_NAME_MAP[n] || n;
  }
  function cloneState(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function compareAutoTeams(a, b) {
    const gaA = (a.ga || 0);
    const gaB = (b.ga || 0);
    return (b.pts || 0) - (a.pts || 0) || ((b.gf || 0) - gaB) - ((a.gf || 0) - gaA) || (b.gf || 0) - (a.gf || 0) || gaA - gaB || String(a.n || "").localeCompare(String(b.n || ""), "pt-BR");
  }
  function makeRound(count, startNo, date) {
    return Array(count).fill(null).map((_, index) => ({ id: `m_${startNo + index}`, matchNo: startNo + index, hm: "TBD", aw: "TBD", hs: null, as: null, done: false, date }));
  }
  function getWinner(match) {
    if (!(match == null ? void 0 : match.done)) return null;
    if (Number(match.hs) > Number(match.as)) return match.hm;
    if (Number(match.as) > Number(match.hs)) return match.aw;
    return null;
  }
  function buildAutoRoundOf32(matchResults) {
    const standingsByGroup = GROUPS.map((group) => computeStandings(group.id, matchResults));
    const groupMap = new Map();
    standingsByGroup.forEach((standing, index) => {
      const groupId = GROUPS[index].id;
      standing.forEach((team) => {
        groupMap.set(team.n, groupId);
      });
    });
    const winners = new Map(standingsByGroup.map((standing, index) => [GROUPS[index].id, standing[0]]).filter(([, team]) => Boolean(team)));
    const runnersUp = new Map(standingsByGroup.map((standing, index) => [GROUPS[index].id, standing[1]]).filter(([, team]) => Boolean(team)));
    const thirdPlaces = standingsByGroup.map((standing, index) => {
      const team = standing[2];
      return team ? { ...team, groupId: GROUPS[index].id } : null;
    }).filter(Boolean).sort(compareAutoTeams).slice(0, 8);
    const thirdByGroup = new Map(thirdPlaces.map((team) => [team.groupId, team]));
    const qualifiedThirdGroups = thirdPlaces.map((team) => team.groupId);
    if (qualifiedThirdGroups.length < 8) return null;
    const thirdSlots = ROUND_OF_32_SLOTS.map((slot, index) => slot.thirdGroups ? { index, groups: slot.thirdGroups } : null).filter(Boolean);
    const assignment = new Map();
    const usedGroups = new Set();
    const orderedThirdSlots = [...thirdSlots].sort((a, b) => a.groups.length - b.groups.length);
    const pickThirdAssignment = (idx) => {
      if (idx >= orderedThirdSlots.length) return true;
      const slot = orderedThirdSlots[idx];
      for (const groupId of slot.groups) {
        if (usedGroups.has(groupId) || !thirdByGroup.has(groupId)) continue;
        usedGroups.add(groupId);
        assignment.set(slot.index, groupId);
        if (pickThirdAssignment(idx + 1)) return true;
        assignment.delete(slot.index);
        usedGroups.delete(groupId);
      }
      return false;
    };
    pickThirdAssignment(0);
    const fallbackGroups = [...qualifiedThirdGroups];
    return ROUND_OF_32_SLOTS.map((slot, index) => {
      const result = { id: `r32_${index}`, hm: "TBD", aw: "TBD", hs: null, as: null, done: false, date: "28 Jun \u2013 4 Jul", matchNo: slot.matchNo };
      const homeMatch = /Winner Group ([A-L])/.exec(slot.home);
      const awayMatch = /Runner-up Group ([A-L])/.exec(slot.away);
      if (homeMatch) {
        const team = winners.get(homeMatch[1]);
        if (team) result.hm = team.n;
      } else if (slot.home === "Third-place qualifier") {
        const chosenGroup = assignment.get(index) || fallbackGroups.shift();
        const team = chosenGroup ? thirdByGroup.get(chosenGroup) : null;
        if (team) result.hm = team.n;
      }
      if (awayMatch) {
        const team = runnersUp.get(awayMatch[1]);
        if (team) result.aw = team.n;
      } else if (slot.away === "Third-place qualifier") {
        const chosenGroup = assignment.get(index) || fallbackGroups.shift();
        const team = chosenGroup ? thirdByGroup.get(chosenGroup) : null;
        if (team) result.aw = team.n;
      }
      return result;
    });
  }
  function autoPopulateBracket(state) {
    const next = cloneState(state);
    let changed = false;
    const groupsComplete = GROUP_MATCHES.every((match) => {
      var _a;
      return (_a = next.matchResults[match.id]) == null ? void 0 : _a.done;
    });
    const r32Seed = (next.bracket && next.bracket.r32) || [];
    const pristineR32 = r32Seed.length === DEFAULT_STATE.bracket.r32.length && r32Seed.every((match) => match.hm === "TBD" && match.aw === "TBD");
    if (groupsComplete && pristineR32) {
      const generated = buildAutoRoundOf32(next.matchResults);
      if (generated) {
        next.bracket.r32 = generated;
        changed = true;
      }
    }
    const r32 = next.bracket.r32 || [];
    const r16 = next.bracket.r16 || [];
    const qf = next.bracket.qf || [];
    const sf = next.bracket.sf || [];
    const finalMatch = next.bracket.f || [];
    const setMatchSide = (round, index, side, value) => {
      if (!round[index]) return;
      if (round[index][side] === value) return;
      round[index][side] = value;
      changed = true;
    };
    const r16Map = [
      [0, 2],
      [1, 4],
      [3, 5],
      [6, 7],
      [10, 11],
      [8, 9],
      [13, 15],
      [12, 14]
    ];
    r16Map.forEach(([a, b], idx) => {
      const winnerA = getWinner(r32[a]);
      const winnerB = getWinner(r32[b]);
      if (winnerA) setMatchSide(r16, idx, "hm", winnerA);
      if (winnerB) setMatchSide(r16, idx, "aw", winnerB);
    });
    const qfMap = [
      [0, 1],
      [4, 5],
      [2, 3],
      [6, 7]
    ];
    qfMap.forEach(([a, b], idx) => {
      const winnerA = getWinner(r16[a]);
      const winnerB = getWinner(r16[b]);
      if (winnerA) setMatchSide(qf, idx, "hm", winnerA);
      if (winnerB) setMatchSide(qf, idx, "aw", winnerB);
    });
    const sfMap = [
      [0, 1],
      [2, 3]
    ];
    sfMap.forEach(([a, b], idx) => {
      const winnerA = getWinner(qf[a]);
      const winnerB = getWinner(qf[b]);
      if (winnerA) setMatchSide(sf, idx, "hm", winnerA);
      if (winnerB) setMatchSide(sf, idx, "aw", winnerB);
    });
    const finalWinnerA = getWinner(sf[0]);
    const finalWinnerB = getWinner(sf[1]);
    if (finalMatch[0]) {
      if (finalWinnerA) setMatchSide(finalMatch, 0, "hm", finalWinnerA);
      if (finalWinnerB) setMatchSide(finalMatch, 0, "aw", finalWinnerB);
    }
    return { state: next, changed };
  }
  async function syncResultsIntoState(state) {
    const matches = await fetchMatchResults();
    if (!matches.length) return { state, updated: 0, bracketChanged: false };
    const next = cloneState(state);
    let updated = 0;
    matches.forEach((match) => {
      var _a, _b, _c, _d, _e, _f;
      if (match.status !== "FINISHED") return;
      const apiHome = mapApiName(((_a = match.homeTeam) == null ? void 0 : _a.name) || "");
      const apiAway = mapApiName(((_b = match.awayTeam) == null ? void 0 : _b.name) || "");
      const hs = (_d = (_c = match.score) == null ? void 0 : _c.fullTime) == null ? void 0 : _d.home;
      const as = (_f = (_e = match.score) == null ? void 0 : _e.fullTime) == null ? void 0 : _f.away;
      if (hs === void 0 || hs === null || as === void 0 || as === null) return;
      const localMatch = GROUP_MATCHES.find((gm) => gm.hm === apiHome && gm.aw === apiAway || gm.hm === apiAway && gm.aw === apiHome);
      if (!localMatch) return;
      const [finalHs, finalAs] = localMatch.hm === apiHome ? [hs, as] : [as, hs];
      const current = next.matchResults[localMatch.id];
      if ((current == null ? void 0 : current.done) && current.hs === finalHs && current.as === finalAs) return;
      next.matchResults[localMatch.id] = { hs: finalHs, as: finalAs, done: true, status: "FINISHED" };
      updated++;
    });
    const autoBracket = autoPopulateBracket(next);
    if (!updated && !autoBracket.changed) return { state, updated: 0, bracketChanged: false };
    autoBracket.state.lastApiSync = (/* @__PURE__ */ new Date()).toISOString();
    return { state: autoBracket.state, updated, bracketChanged: autoBracket.changed };
  }
  async function fetchMatchResults() {
    const EDGE = "https://cjxgjtzmwttapujhxvoo.supabase.co/functions/v1/football-proxy";
    const res = await fetch(EDGE, {
      headers: {
        "Authorization": "Bearer " + SUPA_KEY,
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) throw new Error("HTTP " + res.status + " \u2014 " + res.statusText);
    const d = await res.json();
    if (d.error) throw new Error(d.error);
    return d.matches || [];
  }
  function AdminTab({ data, setData, onSave }) {
    var _a, _b;
    const [ag, setAg] = useState("A");
    const [vals, setVals] = useState({});
    const [toast, show] = useToast();
    const [fetching, setFetching] = useState(false);
    const [fetchLog, setFetchLog] = useState("");
    async function saveMatch(matchId, hs, as_) {
      if (hs === "" || hs === void 0 || as_ === "" || as_ === void 0) return;
      const nb = JSON.parse(JSON.stringify(data));
      nb.matchResults[matchId] = { hs: parseInt(hs), as: parseInt(as_), done: true, status: "FINISHED" };
      setData(nb);
      const ok = await onSave(nb);
      show(ok ? "\u2713 Placar salvo para todos!" : "Erro ao salvar.", ok ? "ok" : "err");
    }
    async function clearAll() {
      if (!confirm("Apagar TODOS os dados do bol\xE3o? Isso n\xE3o pode ser desfeito!")) return;
      setData(DEFAULT_STATE);
      const ok = await onSave(DEFAULT_STATE);
      show(ok ? "\u{1F5D1}\uFE0F Dados apagados!" : "Erro.", ok ? "ok" : "err");
    }
    async function fetchAndSync() {
      setFetching(true);
      setFetchLog("\u{1F50D} Buscando resultados na API...");
      try {
        const { state: nb, updated, bracketChanged } = await syncResultsIntoState(data);
        if (updated === 0 && !bracketChanged) {
          setFetchLog("\u2139\uFE0F Nenhum jogo novo encontrado para atualizar.");
          setFetching(false);
          return;
        }
        setData(nb);
        const ok = await onSave(nb);
        const hora = (/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        setFetchLog(
          ok ? bracketChanged && updated === 0 ? `\u26A1 Chave do mata montada automaticamente \xE0s ${hora}!` : `\u2705 ${updated} jogo(s) atualizado(s) \xE0s ${hora}! Tabela e pontos j\xE1 foram recalculados.` : `\u26A0\uFE0F ${updated} jogos buscados mas houve erro ao salvar.`
        );
        show(ok ? bracketChanged && updated === 0 ? "\u26A1 Chave montada automaticamente!" : `\u26BD ${updated} resultados importados!` : "Erro ao salvar.", ok ? "ok" : "err");
      } catch (e) {
        const msg = e.message || "";
        const nota = msg.includes("404") ? "\u26A0\uFE0F A Copa ainda n\xE3o come\xE7ou (11 Jun 2026) \u2014 a API n\xE3o tem jogos ainda. O bot\xE3o vai funcionar a partir do in\xEDcio da Copa!" : `\u274C Erro na API: ${msg}. Tente novamente em alguns instantes.`;
        setFetchLog(nota);
        show("Erro na API.", "err");
      }
      setFetching(false);
    }
    const gMatches = GROUP_MATCHES.filter((m) => m.g === ag);
    const done = gMatches.filter((m) => {
      var _a2;
      return (_a2 = data.matchResults[m.id]) == null ? void 0 : _a2.done;
    }).length;
    const totalDone = GROUP_MATCHES.filter((m) => {
      var _a2;
      return (_a2 = data.matchResults[m.id]) == null ? void 0 : _a2.done;
    }).length;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "stitle" }, "\u{1F6E1}\uFE0F Admin"), /* @__PURE__ */ React.createElement("div", { style: {
      background: "linear-gradient(135deg,rgba(48,209,88,.1),rgba(10,132,255,.08))",
      border: "1.5px solid rgba(48,209,88,.3)",
      borderRadius: "16px",
      padding: "14px",
      marginBottom: "14px"
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "22px" } }, "\u{1F916}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: "900", fontSize: "13px", color: "#fff" } }, "Buscar Resultados Automaticamente"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "11px", color: "rgba(255,255,255,.45)", fontWeight: "600" } }, "Aperte 1x por dia ap\xF3s os jogos e tudo atualiza! \u26A1"))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: fetchAndSync,
        disabled: fetching,
        style: {
          width: "100%",
          background: fetching ? "rgba(255,255,255,.06)" : "linear-gradient(90deg,#1A7A3A,#30D158)",
          border: `1.5px solid ${fetching ? "rgba(255,255,255,.1)" : "rgba(48,209,88,.5)"}`,
          color: "#fff",
          fontFamily: "'Nunito',sans-serif",
          fontWeight: "900",
          fontSize: "15px",
          letterSpacing: "1px",
          padding: "13px",
          borderRadius: "11px",
          cursor: fetching ? "not-allowed" : "pointer",
          boxShadow: fetching ? "none" : "0 4px 18px rgba(48,209,88,.3)",
          transition: "all .2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }
      },
      fetching ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", animation: "spin .7s linear infinite", fontSize: "16px" } }, "\u26BD"), " Buscando resultados...") : "\u26A1 Buscar & Atualizar Resultados Agora"
    ), fetchLog && /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: "10px",
      background: "rgba(0,0,0,.3)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: "8px",
      padding: "9px 12px",
      fontSize: "12px",
      fontWeight: "600",
      color: "rgba(255,255,255,.7)",
      lineHeight: "1.6"
    } }, fetchLog), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "10px", display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,.4)", fontWeight: "700" } }, /* @__PURE__ */ React.createElement("span", null, "\u26BD"), /* @__PURE__ */ React.createElement("span", null, totalDone, " de ", GROUP_MATCHES.length, " jogos da fase de grupos inseridos"), data.lastApiSync && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", color: "rgba(48,209,88,.6)" } }, "\xDAltimo sync: ", new Date(data.lastApiSync).toLocaleDateString("pt-BR"), " ", new Date(data.lastApiSync).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: "1px", background: "rgba(255,255,255,.08)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", fontWeight: "800", color: "rgba(255,255,255,.25)", letterSpacing: "1px", textTransform: "uppercase" } }, "ou insira manualmente"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: "1px", background: "rgba(255,255,255,.08)" } })), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: "900", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: "8px" } }, "Fase de Grupos \u2014 Inserir Placares"), /* @__PURE__ */ React.createElement("div", { className: "gfilter" }, GROUPS.map((gr) => /* @__PURE__ */ React.createElement("button", { key: gr.id, onClick: () => setAg(gr.id), className: `gfbtn${ag === gr.id ? " on" : ""}` }, gr.id))), /* @__PURE__ */ React.createElement("div", { className: "gc", style: { marginBottom: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "gh" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement("span", { className: "gname" }, "Grupo ", ag), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: "2px" } }, (_a = GROUPS.find((g) => g.id === ag)) == null ? void 0 : _a.teams.map((t) => /* @__PURE__ */ React.createElement("span", { key: t.n, style: { fontSize: "14px" } }, t.f)))), /* @__PURE__ */ React.createElement("span", { className: "gstatus" }, done, "/", gMatches.length, " inseridos")), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px" } }, gMatches.map((m) => {
      var _a2, _b2;
      const r = data.matchResults[m.id] || {};
      const vh = ((_a2 = vals[m.id]) == null ? void 0 : _a2.hs) !== void 0 ? vals[m.id].hs : r.hs !== void 0 ? r.hs : "";
      const va = ((_b2 = vals[m.id]) == null ? void 0 : _b2.as) !== void 0 ? vals[m.id].as : r.as !== void 0 ? r.as : "";
      return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "9px", color: "rgba(255,255,255,.25)", width: "24px", fontWeight: "700", flexShrink: 0 } }, m.d), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "16px", flexShrink: 0 } }, teamFlag(m.hm)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "700" } }, m.hm.length > 8 ? m.hm.slice(0, 8) + "\u2026" : m.hm), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: "20", className: "ainp", value: vh, placeholder: "0", onChange: (e) => setVals((v) => ({ ...v, [m.id]: { ...v[m.id], hs: e.target.value } })) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", color: "rgba(255,255,255,.2)" } }, "\u2013"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: "20", className: "ainp", value: va, placeholder: "0", onChange: (e) => setVals((v) => ({ ...v, [m.id]: { ...v[m.id], as: e.target.value } })) }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "700", textAlign: "right" } }, m.aw.length > 8 ? m.aw.slice(0, 8) + "\u2026" : m.aw), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "16px", flexShrink: 0 } }, teamFlag(m.aw)), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            var _a3, _b3;
            return saveMatch(m.id, ((_a3 = vals[m.id]) == null ? void 0 : _a3.hs) !== void 0 ? vals[m.id].hs : r.hs, ((_b3 = vals[m.id]) == null ? void 0 : _b3.as) !== void 0 ? vals[m.id].as : r.as);
          },
          style: { background: r.done ? "rgba(48,209,88,.15)" : "rgba(10,132,255,.2)", border: `1px solid ${r.done ? "rgba(48,209,88,.3)" : "rgba(10,132,255,.35)"}`, borderRadius: "6px", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "4px 8px", cursor: "pointer", flexShrink: 0 }
        },
        r.done ? "\u2713" : "OK"
      ));
    }))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: "900", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: "8px" } }, "Fase de Grupos \u2014 Inserir Placares"), /* @__PURE__ */ React.createElement("div", { className: "gfilter" }, GROUPS.map((gr) => /* @__PURE__ */ React.createElement("button", { key: gr.id, onClick: () => setAg(gr.id), className: `gfbtn${ag === gr.id ? " on" : ""}` }, gr.id))), /* @__PURE__ */ React.createElement("div", { className: "gc", style: { marginBottom: "16px" } }, /* @__PURE__ */ React.createElement("div", { className: "gh" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement("span", { className: "gname" }, "Grupo ", ag), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: "2px" } }, (_b = GROUPS.find((g) => g.id === ag)) == null ? void 0 : _b.teams.map((t) => /* @__PURE__ */ React.createElement("span", { key: t.n, style: { fontSize: "14px" } }, t.f)))), /* @__PURE__ */ React.createElement("span", { className: "gstatus" }, done, "/", gMatches.length, " inseridos")), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px" } }, gMatches.map((m) => {
      var _a2, _b2;
      const r = data.matchResults[m.id] || {};
      const vh = ((_a2 = vals[m.id]) == null ? void 0 : _a2.hs) !== void 0 ? vals[m.id].hs : r.hs !== void 0 ? r.hs : "";
      const va = ((_b2 = vals[m.id]) == null ? void 0 : _b2.as) !== void 0 ? vals[m.id].as : r.as !== void 0 ? r.as : "";
      return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "9px", color: "rgba(255,255,255,.25)", width: "24px", fontWeight: "700", flexShrink: 0 } }, m.d), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "16px", flexShrink: 0 } }, teamFlag(m.hm)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "700" } }, m.hm.length > 8 ? m.hm.slice(0, 8) + "\u2026" : m.hm), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: "20", className: "ainp", value: vh, placeholder: "0", onChange: (e) => setVals((v) => ({ ...v, [m.id]: { ...v[m.id], hs: e.target.value } })) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", color: "rgba(255,255,255,.2)" } }, "\u2013"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: "20", className: "ainp", value: va, placeholder: "0", onChange: (e) => setVals((v) => ({ ...v, [m.id]: { ...v[m.id], as: e.target.value } })) }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "11px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "700", textAlign: "right" } }, m.aw.length > 8 ? m.aw.slice(0, 8) + "\u2026" : m.aw), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "16px", flexShrink: 0 } }, teamFlag(m.aw)), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            var _a3, _b3;
            return saveMatch(m.id, ((_a3 = vals[m.id]) == null ? void 0 : _a3.hs) !== void 0 ? vals[m.id].hs : r.hs, ((_b3 = vals[m.id]) == null ? void 0 : _b3.as) !== void 0 ? vals[m.id].as : r.as);
          },
          style: { background: r.done ? "rgba(48,209,88,.15)" : "rgba(10,132,255,.2)", border: `1px solid ${r.done ? "rgba(48,209,88,.3)" : "rgba(10,132,255,.35)"}`, borderRadius: "6px", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "4px 8px", cursor: "pointer", flexShrink: 0 }
        },
        r.done ? "\u2713" : "OK"
      ));
    }))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: "900", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: "8px" } }, "Mata-Mata \u2014 Jogos e Placares"), [["r32", "32 Avos"], ["r16", "Oitavas"], ["qf", "Quartas"], ["sf", "Semis"], ["f", "\u{1F3C6} Final"]].map(([rk, rl]) => {
      var _a2;
      return /* @__PURE__ */ React.createElement("div", { key: rk, style: { marginBottom: "10px" } }, /* @__PURE__ */ React.createElement("div", { className: "rlbl" }, rl), (((_a2 = data.bracket) == null ? void 0 : _a2[rk]) || []).map((m, idx) => {
        var _a3, _b2;
        return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "10px 12px", marginBottom: "6px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "6px", marginBottom: "7px" } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            className: "finp",
            style: { fontSize: "12px", padding: "6px 10px" },
            placeholder: `\u{1F3F3}\uFE0F Time A`,
            value: m.hm === "TBD" ? "" : m.hm,
            onChange: (e) => {
              const nb = JSON.parse(JSON.stringify(data));
              nb.bracket[rk][idx].hm = e.target.value || "TBD";
              setData(nb);
            }
          }
        ), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "rgba(255,255,255,.2)", alignSelf: "center", flexShrink: 0 } }, "\xD7"), /* @__PURE__ */ React.createElement(
          "input",
          {
            className: "finp",
            style: { fontSize: "12px", padding: "6px 10px" },
            placeholder: `\u{1F3F3}\uFE0F Time B`,
            value: m.aw === "TBD" ? "" : m.aw,
            onChange: (e) => {
              const nb = JSON.parse(JSON.stringify(data));
              nb.bracket[rk][idx].aw = e.target.value || "TBD";
              setData(nb);
            }
          }
        )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "7px" } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            min: "0",
            max: "20",
            className: "ainp",
            placeholder: "0",
            value: (_a3 = m.hs) != null ? _a3 : "",
            onChange: (e) => {
              const nb = JSON.parse(JSON.stringify(data));
              nb.bracket[rk][idx].hs = e.target.value === "" ? null : parseInt(e.target.value);
              setData(nb);
            }
          }
        ), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", color: "rgba(255,255,255,.2)" } }, "\u2013"), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            min: "0",
            max: "20",
            className: "ainp",
            placeholder: "0",
            value: (_b2 = m.as) != null ? _b2 : "",
            onChange: (e) => {
              const nb = JSON.parse(JSON.stringify(data));
              nb.bracket[rk][idx].as = e.target.value === "" ? null : parseInt(e.target.value);
              setData(nb);
            }
          }
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: async () => {
              const ok = await onSave(data);
              show(ok ? "\u2713 Salvo!" : "Erro.", ok ? "ok" : "err");
            },
            style: { background: "rgba(10,132,255,.2)", border: "1px solid rgba(10,132,255,.35)", borderRadius: "7px", color: "#fff", fontSize: "11px", fontWeight: "800", padding: "5px 12px", cursor: "pointer", marginLeft: "auto" }
          },
          "\u2601\uFE0F Salvar"
        )));
      }));
    }), /* @__PURE__ */ React.createElement("button", { onClick: clearAll, style: { width: "100%", background: "rgba(255,45,85,.08)", border: "1px solid rgba(255,45,85,.2)", color: "rgba(255,45,85,.65)", fontWeight: "800", fontSize: "13px", letterSpacing: "1px", padding: "11px", borderRadius: "10px", cursor: "pointer", marginTop: "8px" } }, "\u{1F5D1}\uFE0F Apagar todos os dados"), /* @__PURE__ */ React.createElement(Toast, { ...toast }));
  }
  function App() {
    const [data, setData] = useState(DEFAULT_STATE);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("groups");
    const [saving, setSaving] = useState(false);
    const [lastSync, setLastSync] = useState(null);
    const dataRef = useRef(data);
    useEffect(() => {
      dbLoad().then((d) => {
        setData(d);
        setLoading(false);
        setLastSync((/* @__PURE__ */ new Date()).toISOString());
      });
    }, []);
    useEffect(() => {
      dataRef.current = data;
    }, [data]);
    useEffect(() => {
      if (loading) return;
      const ch = supa.channel("bolao_rt").on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bolao_state", filter: "id=eq.main" },
        (payload) => {
          var _a;
          if ((_a = payload.new) == null ? void 0 : _a.data) {
            setData({ ...DEFAULT_STATE, ...payload.new.data, bracket: normalizeBracket(payload.new.data.bracket) });
            setLastSync((/* @__PURE__ */ new Date()).toISOString());
          }
        }
      ).subscribe();
      return () => supa.removeChannel(ch);
    }, [loading]);
    useEffect(() => {
      if (loading) return;
      let alive = true;
      let busy = false;
      const run = async () => {
        if (busy || !alive) return;
        busy = true;
        try {
          const { state: next, updated, bracketChanged } = await syncResultsIntoState(dataRef.current);
          if (!alive || (updated === 0 && !bracketChanged)) return;
          dataRef.current = next;
          setData(next);
          const ok = await dbSave(next);
          if (ok) setLastSync((/* @__PURE__ */ new Date()).toISOString());
        } catch {
        } finally {
          busy = false;
        }
      };
      run();
      const timer = window.setInterval(run, 15 * 60 * 1000);
      const onVisible = () => {
        if (document.visibilityState === "visible") run();
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => {
        alive = false;
        clearInterval(timer);
        document.removeEventListener("visibilitychange", onVisible);
      };
    }, [loading]);
    const onSave = useCallback(async (override) => {
      setSaving(true);
      const ok = await dbSave(override || data);
      setSaving(false);
      if (ok) setLastSync((/* @__PURE__ */ new Date()).toISOString());
      return ok;
    }, [data]);
    async function doSync() {
      setSaving(true);
      const d = await dbLoad();
      setData(d);
      setLastSync((/* @__PURE__ */ new Date()).toISOString());
      setSaving(false);
    }
    if (loading) return /* @__PURE__ */ React.createElement("div", { className: "loading-screen" }, /* @__PURE__ */ React.createElement("div", { className: "loading-ball" }, "\u26BD"), /* @__PURE__ */ React.createElement("div", { className: "spinner" }), /* @__PURE__ */ React.createElement("div", { className: "loading-txt" }, "Carregando o bol\xE3o..."));
    const tabs = [
      { id: "groups", ico: "\u{1F30D}", lbl: "Grupos" },
      { id: "bets", ico: "\u{1F3AF}", lbl: "Apostar" },
      { id: "bracket", ico: "\u2694\uFE0F", lbl: "Chaves" },
      { id: "score", ico: "\u{1F3C6}", lbl: "Placar" },
      { id: "players", ico: "\u{1F465}", lbl: "Jogadores" },
      { id: "admin", ico: "\u{1F6E1}\uFE0F", lbl: "Admin" }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "app" }, /* @__PURE__ */ React.createElement("div", { className: "hdr" }, /* @__PURE__ */ React.createElement("div", { className: "hdr-confetti" }), /* @__PURE__ */ React.createElement("div", { className: "hdr-inner" }, /* @__PURE__ */ React.createElement("div", { className: "hdr-top" }, /* @__PURE__ */ React.createElement("div", { className: "hdr-logo" }, /* @__PURE__ */ React.createElement("div", { className: "logo-circle" }, "FIFA", /* @__PURE__ */ React.createElement("br", null), "2026"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "logo-text" }, "Bol\xE3o Copa 2026"), /* @__PURE__ */ React.createElement("div", { className: "logo-sub" }, "48 sele\xE7\xF5es \xB7 104 jogos \xB7 1 campe\xE3o \u{1F3C6}"))), /* @__PURE__ */ React.createElement("div", { className: "hdr-flags" }, "\u{1F1FA}\u{1F1F8}\u{1F1E8}\u{1F1E6}\u{1F1F2}\u{1F1FD}")), /* @__PURE__ */ React.createElement(Countdown, null))), /* @__PURE__ */ React.createElement("div", { className: "nav" }, tabs.map((t) => /* @__PURE__ */ React.createElement("button", { key: t.id, className: `nb${tab === t.id ? " on" : ""}`, onClick: () => setTab(t.id) }, t.ico, " ", t.lbl))), /* @__PURE__ */ React.createElement("div", { className: "content" }, tab === "groups" && /* @__PURE__ */ React.createElement(GroupsTab, { data, saving, lastSync, doSync }), tab === "bets" && /* @__PURE__ */ React.createElement(BetsTab, { data, setData, onSave }), tab === "bracket" && /* @__PURE__ */ React.createElement(BracketTab, { data }), tab === "score" && /* @__PURE__ */ React.createElement(ScoreTab, { data }), tab === "players" && /* @__PURE__ */ React.createElement(PlayersTab, { data, setData, onSave }), tab === "admin" && /* @__PURE__ */ React.createElement(AdminTab, { data, setData, onSave })));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
