export interface IHighway {
    vehicle?: IVehicleClass;
    client?: IClientClass;
    plan?: IPlanClass;
    route?: IRouteClass;
    service?: IServiceClass;
    location?: ILocation;
    token?: String;
    post: Function;
    get: Function;
    put: Function;
    delete: Function;
}
export interface IClientData {
    user_id?: String;
    external_id?: String;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    location?: ILocation;
    label?: String;
    tags?: Array<String>;
    comments?: String;
    phone?: String;
    email?: String;
    website?: String;
    default_duration?: Number;
    default_reward?: Number;
    default_requires?: Array<String>;
    default_cluster?: String;
    default_assign_to?: String;
    default_timewindows?: [[Number, Number]];
    default_volume?: Number;
    default_weight?: Number;
}
export interface IClient extends IClientData {
    id: String;
}
export interface IClientClass {
    create: Function;
    createMany: Function;
    update: Function;
    delete: Function;
    get: Function;
}
export interface IPlanClass {
    create: Function;
    update: Function;
    delete: Function;
    get: Function;
}
export interface IPlan extends IPlanData {
    id: String;
}
export interface IPlanData {
    unit_id?: String;
    _version?: Number;
    user_id?: String;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    date_start?: Date;
    date_end?: Date;
    single_day?: Boolean;
    tags?: Array<String>;
    label?: String;
}
export interface IRoute extends IRouteData {
    id: String;
}
export interface IRouteData {
    user_id?: String;
    external_id?: String;
    plan_id?: String;
    vehicle_id?: String;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    label?: String;
    phone?: String;
    avatar?: String;
    email?: String;
    plate?: String;
    timewindow?: [[Number, Number]];
    max_weight?: Number;
    max_volume?: Number;
    location_start?: ILocation;
    location_end?: ILocation;
    provides?: Array<String>;
    date_start?: Date;
    date_end?: Date;
    feedback_images?: Array<String>;
    feedback_comments?: String;
    feedback_duration?: Number;
}
export interface IRouteClass {
    create: Function;
    update: Function;
    delete: Function;
    get: Function;
}
export interface IService extends IServiceData {
    id: String;
}
export interface IServiceData {
    plan_id?: String;
    client_id?: String;
    user_id?: String;
    external_id?: String;
    route_id?: String;
    order?: Number;
    planned_arrival_time?: Number;
    planned_departure_time?: Number;
    created_at?: Date;
    up?: Date;
    d_at?: Date;
    deleted_at?: Date;
    location?: ILocation;
    label?: String;
    tags?: Array<String>;
    comments?: String;
    phone?: String;
    email?: String;
    duration?: Number;
    reward?: Number;
    requires?: Array<String>;
    cluster?: String;
    assign_to?: String;
    timewindows?: [[Number, Number]];
    volume?: Number;
    weight?: Number;
    done_at?: Date;
    done_location?: ILocation;
    feedback_images?: Array<String>;
    feedback_comments?: String;
    feedback_duration?: Number;
    feedback_rejection_reason?: String;
}
export interface IServiceClass {
    create: Function;
    update: Function;
    delete: Function;
    get: Function;
}
export interface IVehicle extends IWebhookData {
    id: string;
}
export interface IWebhookData {
    user_id?: String;
    external_id?: String;
    unit_id?: String;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    label?: String;
    phone?: String;
    avatar?: String;
    email?: String;
    plate?: String;
    vehicle_model?: String;
    brand?: String;
    default_timewindow?: [[Number, Number]];
    default_max_weight?: Number;
    default_max_volume?: Number;
    default_location_start?: ILocation;
    default_location_end?: ILocation;
    default_provides?: Array<String>;
}
export interface IVehicleClass {
    create: Function;
    update: Function;
    delete: Function;
    get: Function;
}
export interface ILocation {
    label?: String;
    country?: String;
    state?: String;
    county?: String;
    city?: String;
    district?: String;
    street?: String;
    house_number?: String;
    postal_code?: String;
    comments?: String;
    lat?: Number;
    lng?: Number;
}
