import React, { useContext } from "react";
import ContextStore from "../../Context/ContextStore";

const TopBar = () =>{
    const store = useContext(ContextStore)
    return(
        <>
            <div className="flex flex-row h-full">
                <div className="left w-1/4">
                    {/* {store.contextStore.loggedIn && "Sheetab"} */}
                </div>

                <div className="center w-1/2">
                    
                </div>

                <div className="right w-1/4">

                </div>
            </div>
        </>
    );
};

export default TopBar;