import reducer, { cleanSessionStatistic, fixSessionStat, StatisticState, updateSessionStat } from "./statisticReduser";

describe("statisticReduser", () => {
    it("update session", () => {
        const state: StatisticState = {
            gameStat: [5, 2, 6],
            sessionStat: [4, 2, 7],
            lastSessionFixed: false,
        };
        const state2 = reducer(state, updateSessionStat(33));
        expect(state2.sessionStat).toEqual([4, 2, 33]);
    });
    it("update fixed session", () => {
        const state: StatisticState = {
            gameStat: [5, 2, 6],
            sessionStat: [4, 2, 7],
            lastSessionFixed: false,
        };
        const state2 = reducer(state, fixSessionStat());
        const state3 = reducer(state2, updateSessionStat(33));
        expect(state3.sessionStat).toEqual([4, 2, 7, 33]);
    });
    it("clean session", () => {
        const state: StatisticState = {
            gameStat: [5, 2, 6],
            sessionStat: [4, 2, 7],
            lastSessionFixed: true,
        };
        const state2 = reducer(state, cleanSessionStatistic());
        expect(state2).toEqual({
            gameStat: [5, 2, 6],
            sessionStat: [],
            lastSessionFixed: false,
        });
    });
});
