import {BrowserRouter} from 'react-router-dom';
import "./App.css"
import {AuthProvider} from "./utils/AuthContext";
import React from "react";
import Routes from "./utils/Routes";

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Routes />
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
