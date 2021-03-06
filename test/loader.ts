import { Timewindow } from '../lib/common/interfaces/common';
import { ServiceIconTypes } from '../lib/common/interfaces/services';

export const clients = {
  client1: {
    external_id: `client1`,
    icon: `normal` as ServiceIconTypes,
    location: {
      lat: 1,
      lng: 1,
      label: `Avenida Meridiana`,
    },
    label: `label1`,
    comments: `comments`,
    phone: `phone1`,
    email: `example@mail.com1`,
    website: `http://example.com1`,
    reference_person: `Manolo`,
    default_duration: 3600,
    default_reward: 100,
    default_requires: [`requires1`],
    default_cluster: `cluster1`,
    default_assign_to: [`Manolo`],
    default_timewindows: [[0, 3600]] as Timewindow[],
    //default_size: 100,
    default_volume: 1000,
    default_weight: 1000,
  },
};

export const vehicles = {
  vehicle1: {
    external_id: `external_id_1`,
    label: `label1`,
    phone: `phone1`,
    email: `email1`,
    plate: `plate1`,
    color: `blue`,
    vehicle_model: `model1`,
    brand: `brand1`,
    default_timewindow: [0, 10000] as Timewindow,
    default_max_weight: 100,
    default_max_volume: 200,
    default_start_location: { lat: 1, lng: 1, county: `Mataro` },
    default_end_location: { lat: 2, lng: 2, county: `Mataro` },
    default_provides: [`p1`],
  },
};
