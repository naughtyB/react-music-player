/**
 * Created by Administrator on 2017/9/6.
 */
import "./index.scss"
import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppHeader from "./AppHeader/index"
import AppSider from "./AppSider/index"
import AppContent from "./AppContent/index"
import AppFooter from "./AppFooter/index"
import Audio from "./Audio/index"
import { Layout} from 'antd';
const { Header, Sider, Content,Footer } = Layout;



export class AppLayout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <BrowserRouter>
                <Layout className="app-layout">
                    <Audio />
                    <Header className="app-layout-header">
                        <AppHeader />
                    </Header>
                    <Layout className="app-layout-body">
                        <Sider
                            className="app-layout-side"
                               width="240"
                        >
                            <AppSider />
                        </Sider>
                        <Content
                            className="app-layout-content"
                            ref="app-layout-content"
                        >
                            <AppContent/>
                        </Content>
                    </Layout>
                    <Footer className="app-layout-footer">
                        <AppFooter/>
                    </Footer>
                </Layout>
            </BrowserRouter>
        )
    }
}

export default AppLayout;


