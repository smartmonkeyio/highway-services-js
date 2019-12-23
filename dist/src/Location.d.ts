declare class Location {
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
    constructor(lat?: Number, lng?: Number);
}
export default Location;
