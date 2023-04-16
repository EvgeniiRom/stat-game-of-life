import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from "./styled/Button";
import DialogContainer from "./styled/DialogContainer";
import Label from "./styled/Label";
import Overlay from "./styled/Overlay";
import TextField from "./styled/TextField";

interface TextDialogProps {
    message?: string;
    onOk?: (value: string) => void;
}

const TextDialog = (props: TextDialogProps) => {
    const { message = "", onOk = () => undefined } = props;

    const [value, setValue] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onOk(value);
        }
    };

    return (
        <Overlay>
            <DialogContainer>
                <Label size="large">{message}</Label>
                <TextField value={value} onChange={onChange} onKeyUp={onEnter} />
                <Button onClick={() => onOk(value)}>OK</Button>
            </DialogContainer>
        </Overlay>
    );
};

export default TextDialog;
