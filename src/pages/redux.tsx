import { login, logout, statNameSelector } from "@/store/userStatReduser";
import { useDispatch, useSelector } from "react-redux";

const ReduxPage = () => {
    const name = useSelector(statNameSelector);
    const dispatch = useDispatch();

    return <div>
        {name}
        <button onClick={() => dispatch(login("player"))}>LOGIN</button>
        <button onClick={() => dispatch(logout())}>LOGOUT</button>
    </div>
}

export default ReduxPage;