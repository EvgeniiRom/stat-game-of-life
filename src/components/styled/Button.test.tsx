import { fireEvent, screen, render } from "@testing-library/react";
import React from "react";
import Button from "./Button";

test('BottomMenu - Speed click', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>test</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toBeCalled();
});