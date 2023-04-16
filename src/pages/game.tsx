import React from "react";
import GameField from "../components/GameField";
import { equalMatrix, Field, fillFieldByField, generateField, generateNextGeneration } from "../common/Tools";
import TopMenu, { ModeButtonType } from "../components/TopMenu";
import BottomMenu, { SizeButtonType, SpeedButtonType } from "../components/BottomMenu";
import { connect } from "react-redux";
import { RootState } from "../store";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

interface GameProps extends WithRouterProps {
    isLogin: boolean;
}

interface GameState {
    field: Field;
    mode: ModeButtonType;
    speed: SpeedButtonType;
    size: SizeButtonType;
    width: number;
    height: number;
}

class Game extends React.Component<GameProps, GameState> {
    _interval: NodeJS.Timer | undefined;

    setSpeed(speed: SpeedButtonType) {
        this.setState({ speed });
    }

    setSize(size: SizeButtonType) {
        this.setState({ size });
    }

    constructor(props: GameProps) {
        super(props);
        this.state = {
            field: generateField(50, 30),
            mode: "pause",
            speed: "medium",
            size: "50x30",
            width: 50,
            height: 30,
        };
        this.setSpeed = this.setSpeed.bind(this);
        this.setSize = this.setSize.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.onTopMenuClick = this.onTopMenuClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    onCellClick(x: number, y: number) {
        const { mode, field } = this.state;
        if (mode === "pause") {
            const fieldData = field.data.map((row, i) =>
                row.map((cell, j) => (i === x && j === y ? (cell > 0 ? 0 : 1) : cell))
            );
            this.setState({ field: { ...field, data: fieldData } });
        }
    }

    onTopMenuClick(mode: ModeButtonType) {
        if (mode === "clear") {
            const { width, height } = this.state;
            this.setState({
                mode: "pause",
                field: generateField(width, height),
            });
        } else {
            this.setState({ mode });
        }
    }

    onRandomClick(value: number) {
        if (this.state.mode === "pause") {
            const { width, height } = this.state;
            this.setState({
                field: generateField(width, height, value),
            });
        }
    }

    checkLogin() {
        const { isLogin, router } = this.props;
        {
            !isLogin && router.push("/");
        }
    }

    shouldComponentUpdate(nextProps: GameProps, nextState: GameState) {
        //не обновлять до момента соответсвия заданного размера игрового поля фактическому
        if (nextState.width !== nextState.field.width || nextState.height !== nextState.field.height) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.checkLogin();
    }

    componentDidUpdate() {
        this.checkLogin();
        const { size, width, height, field, mode, speed } = this.state;
        const sizeWH = size.split("x").map((item) => parseInt(item));
        const nextWidth = sizeWH[0];
        const nextHeight = sizeWH[1];
        if (nextWidth !== width || nextHeight !== height) {
            const nextField = generateField(nextWidth, nextHeight);
            fillFieldByField(nextField, field);
            this.setState({
                field: nextField,
                width: nextWidth,
                height: nextHeight,
            });
        }

        clearTimeout(this._interval);
        if (mode === "run") {
            let intervalValue = 400;
            if (speed === "slow") intervalValue = 600;
            if (speed === "fast") intervalValue = 150;
            this._interval = setInterval(() => {
                const nextGen = generateNextGeneration(field);
                const nextMode = equalMatrix(field.data, nextGen.data) ? "pause" : mode;
                this.setState({ field: nextGen, mode: nextMode });
            }, intervalValue);
        }
    }

    render() {
        const { mode, field, size, speed } = this.state;
        return (
            <>
                <TopMenu
                    active={mode}
                    onClick={this.onTopMenuClick}
                    onRandomClick={this.onRandomClick}
                    text={`Generation: ${field.generation}`}
                />
                <GameField field={field.data} onCellClick={this.onCellClick} />
                <BottomMenu
                    activeSize={size}
                    activeSpeed={speed}
                    onSizeClick={this.setSize}
                    onSpeedClick={this.setSpeed}
                />
            </>
        );
    }
}

function mapStateToProps(state: RootState) {
    const { session } = state;
    return { isLogin: session.isLogin };
}

export default withRouter(connect(mapStateToProps)(Game));
