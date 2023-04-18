import { Field } from "./../common/Tools";
import { expectSaga } from "redux-saga-test-plan";
import { addGen, clean, gameSaga } from "./gameReduser";
import { addGameStat, cleanGameStatistic, fixSessionStat, updateSessionStat } from "./statisticReduser";

describe("game saga", () => {
    test("game statistic", () => {
        const generation1: Field = {
            data: [
                [0, 1, 2],
                [1, 0, 0],
            ],
            width: 3,
            height: 2,
            generation: 0,
        };
        const generation2: Field = {
            data: [
                [1, 1, 2],
                [1, 1, 1],
            ],
            width: 3,
            height: 2,
            generation: 1,
        };
        return expectSaga(gameSaga)
            .dispatch(addGen(generation1))
            .put(addGameStat(3))
            .dispatch(addGen(generation2))
            .put(addGameStat(6))
            .dispatch(clean())
            .put(cleanGameStatistic())
            .run({ silenceTimeout: true });
    });

    test("session statistic", () => {
        const generation1: Field = {
            data: [
                [0, 1, 2],
                [1, 0, 0],
            ],
            width: 3,
            height: 2,
            generation: 0,
        };
        const generation2: Field = {
            data: [
                [1, 1, 2],
                [1, 1, 1],
            ],
            width: 3,
            height: 2,
            generation: 1,
        };
        return expectSaga(gameSaga)
            .dispatch(addGen(generation1))
            .put(updateSessionStat(0.5))
            .dispatch(addGen(generation2))
            .put(updateSessionStat(1))
            .dispatch(clean())
            .put(fixSessionStat())
            .run({ silenceTimeout: true });
    });
});
