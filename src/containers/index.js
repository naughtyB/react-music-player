/**
 * Created by Administrator on 2017/9/6.
 */
import React from 'react';
import store from "../redux/store/index";
import {Provider} from "react-redux"
import AppLayout from "../components/index"

class App extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <AppLayout />
            </Provider>
        )
    }
}

export default App;