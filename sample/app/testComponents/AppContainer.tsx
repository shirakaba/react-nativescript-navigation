import { hot } from 'react-hot-loader/root';
import * as React from "react";

const AppContainer = () => (
    <flexboxLayout flexDirection={"row"} height={40} backgroundColor={"purple"}>
        <flexboxLayout
            backgroundColor={"green"}
            flexDirection={"column"}
            flexGrow={1}
            paddingTop={7}
            // position={"absolute"}
            alignItems={"center"}
        >
            <label text={"LABEL"}/>
        </flexboxLayout>
        <flexboxLayout
            backgroundColor={"blue"}
            flexDirection={"column"}
        >
            <button text={"BUTTON"} className={""}/>
        </flexboxLayout>
        {/* <button text={"BUTTON"} className={""}/> */}
    </flexboxLayout>
);


export default hot(AppContainer);
// export default AppContainer;