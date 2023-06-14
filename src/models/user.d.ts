/**
 * 用户类别
 */
export type UserType = {
    // id: number;
    // username: string;
    // userAccount: string;
    // avatarUrl?: string;
    // profile?: string;
    // gender:number;
    // phone: string;
    // email: string;
    // userStatus: number;
    // userRole: number;
    // planetCode: string;
    // tags: string;
    // createTime: Date;
    id: number,
    username: string,
    userAccount: string,
    age: number,
    avatar: string,
    email: string,
    gender: number,
    phone: string,
    profile: string,
    tags: string[],
    userRole: number,
    userStatus: number,
    createTime: Date,
    updateTime: Date,
    isDelete: boolean
};
