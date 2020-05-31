import React, { useEffect, useReducer } from "react";

let reducer = (data, newData) => {
    return { ...data, ...newData };
};

const initialState = {
    tickets: [],
    sequence: [],
};

const localState = JSON.parse(localStorage.getItem("tambola"));

const TambolaContext = React.createContext();

function TambolaProvider(props) {
    const [tambola, setTambola] = useReducer(reducer, localState || initialState);

    useEffect(() => {
        localStorage.setItem("tambola", JSON.stringify(tambola));
    }, [tambola]);

    return (
        <TambolaContext.Provider value={{ tambola, setTambola }}>
            {props.children}
        </TambolaContext.Provider>
    );
}

export { TambolaContext, TambolaProvider };
