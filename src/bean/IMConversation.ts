/**
 * 会话实体类
 *
 * @class IMConversation
 */
class IMConversation {

    private _id: string; // 会话 Id
    private _type: string; // 类型 0-单聊 1-群聊
    private _title: string; // 标题
    private _desc: string; // 描述
    private _time: string; // 时间
    private _top: number; // 置顶状态
    private _unread: number; // 未读

    constructor(params: any) {
        this._id = params.id
        this._type = params.type
        this._title = params.title
        this._desc = params.desc
        this._time = params.time
        this._top = params.top
        this._unread = params.unread
    }

    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }


    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    public get desc(): string {
        return this._desc;
    }
    public set desc(v: string) {
        this._desc = v;
    }

    public get time(): string {
        return this._time;
    }
    public set time(v: string) {
        this._time = v;
    }

    public get top(): number {
        return this._top;
    }
    public set top(v: number) {
        this._top = v;
    }

    public get unread(): number {
        return this._unread;
    }
    public set unread(v: number) {
        this._unread = v;
    }
}

export default IMConversation