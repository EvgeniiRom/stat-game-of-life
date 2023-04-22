import { Field } from "./../common/Tools";
import { expectSaga } from "redux-saga-test-plan";
import { clean, gameSaga, nextGen } from "./gameReduser";
import { addGameStat, cleanGameStatistic, fixSessionStat, updateSessionStat } from "./statisticReduser";

describe("game saga", () => {
    test("game statistic", () => {
        const u = undefined;
        const r = "#ff0000";
        const g = "#00ff00";
        const generation1: Field = {
            data: [
                [u, r, g],
                [r, u, u],
            ],
            width: 3,
            height: 2,
            generation: 0,
        };
        const generation2: Field = {
            data: [
                [r, r, g],
                [r, r, r],
            ],
            width: 3,
            height: 2,
            generation: 1,
        };
        return expectSaga(gameSaga)
            .dispatch(nextGen(generation1))
            .put(addGameStat(3))
            .dispatch(nextGen(generation2))
            .put(addGameStat(6))
            .dispatch(clean())
            .put(cleanGameStatistic())
            .run({ silenceTimeout: true });
    });

    test("session statistic", () => {
        const u = undefined;
        const r = "#ff0000";
        const g = "#00ff00";
        const generation1: Field = {
            data: [
                [u, r, g],
                [r, u, u],
            ],
            width: 3,
            height: 2,
            generation: 0,
        };
        const generation2: Field = {
            data: [
                [r, r, g],
                [r, r, r],
            ],
            width: 3,
            height: 2,
            generation: 1,
        };
        return expectSaga(gameSaga)
            .dispatch(nextGen(generation1))
            .put(updateSessionStat(50))
            .dispatch(nextGen(generation2))
            .put(updateSessionStat(100))
            .dispatch(clean())
            .put(fixSessionStat())
            .run({ silenceTimeout: true });
    });
});
