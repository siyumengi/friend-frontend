import myAxios from "../config/myAxios";
import {setCurrentUserState} from "../states/user";
import {currentID} from "../states/currentID";
// import {getcurrentID} from "../states/currentID";
//调用函数获取当前用户信息
export const getCurrentUser = async () => {

    const res = await myAxios.get('/user/current?id='+currentID.value);
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;

}

