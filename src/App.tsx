import React from 'react';
import './App.css';
import Header from "./ui/header/Header";
import Posts from './ui/posts/Posts';
import Footer from "./ui/footer/Footer";
import Post from './ui/posts/post/Post';
import {Route} from 'react-router-dom';
import AddPostPopUp from './components/PopUps/AddPostPopUp';
import {useSelector} from "react-redux";
import {RootStateType} from "./bll/store";
import Preloader from "./components/preloader/Preloader";

function App() {

    const isShowPopUp = useSelector<RootStateType, boolean>(state => state.common.isShowPopUp)
    const isFetching = useSelector<RootStateType, boolean>(state => state.common.isFetching)
    return (
        <div className="App">
            <Header/>
            {isFetching && <Preloader/>}
            {isShowPopUp && <AddPostPopUp/>}
            <Route path={"/post/:id"} render={() => <Post/>}/>
            <Route exact path={"/"} render={() => <Posts/>}/>
            <Footer/>
        </div>
    );
}

export default App;
