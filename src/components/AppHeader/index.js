import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {doInputSearch,doChangeKeywordSearched} from "../../redux/action/inputSearch";
import InputSearch from "./InputSearch/index";


export class AppHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="app-header">
                <div className="app-header-logo">
                    <span className="app-header-logo-message">Music Player</span>
                </div>
                <InputSearch onChangeKeywordSearched={this.props.onChangeKeywordSearched}/>
            </div>
        )
    }
}




const mapStateToProps=(state)=>{
    return {
        keyword:state.inputSearch.keyword
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onChangeKeywordSearched:(keyword)=>dispatch(doChangeKeywordSearched(keyword))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppHeader)
