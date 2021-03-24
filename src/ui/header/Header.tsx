import React from 'react';
import {useDispatch} from "react-redux";
import {openPopUpAC} from "../../bll/reducers/commonReducer";

const Header = () => {

    const dispatch = useDispatch();

    const openPopUp = () => {
        dispatch(openPopUpAC(true))
    }

    return (
        <div className={'header'}>
            <div>
                BLOG
            </div>
            <div>
                <span onClick={openPopUp} className={'add-button'}>
                    Добавить пост
                </span>
            </div>
        </div>
    );
};

export default Header;
