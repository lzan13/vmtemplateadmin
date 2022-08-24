import IMBMsg from "./IMBMsg";

/**
 * 信令消息实体类
 *
 * @class IMSignal
 */
class IMSignal extends IMBMsg {
    private _action: string; // 指令

    /**
     * 构造函数
     * @param {*} params
     */
    constructor(params: any) {
        super(params)
        this._action = params.action
    }

    public get action(): string {
        return this._action;
    }
    public set action(v: string) {
        this._action = v;
    }


    /**
     * 将对象转为 json
     */
    public toJson() {
        const json = super.toJson()
        if (this._action) {
            json.action = this._action
        }
        return json
    }
}

export default IMSignal