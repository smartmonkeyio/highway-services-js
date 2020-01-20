export const clients = {
  client1: {
    external_id: `client1`,
        icon: `icon`,
        location: {
            lat: 1,
            lng: 1,
            label: `Avenida Meridiana`,
        },
        label: `label1`,
        tags: [`tag1`, `tag2`],
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
        default_timewindows: [[0, 3600]],
        //default_size: 100,
        default_volume: 1000,
        default_weight: 1000,
  },
};

export function getVehicles() {
  return [
    {
      id: `vehicle1`,
      start: {
        lat: 41.396852,
        lng: 2.183839,
      },
      end: {
        lat: 41.400087,
        lng: 2.177638,
      },
      capacity: [20, 20],
    },
    {
      id: `vehicle2`,
      start: {
        lat: 41.336852,
        lng: 2.153839,
      },
      end: {
        lat: 41.396852,
        lng: 2.193839,
      },
      capacity: [10, 20],
    },
    {
      id: `vehicle3`,
      start: {
        lat: 41.426852,
        lng: 2.183839,
      },
      end: {
        lat: 41.416852,
        lng: 2.163839,
      },
      capacity: [20, 20],
      provides: [`candy`],
    },
  ];
}

export function getServices() {
  return [
    {
      id: `Service1`,
      location: {
        lat: 41.286852,
        lng: 2.083839,
      },
      size: [10, 2],
    },
    {
      id: `Service2`,
      location: {
        lat: 41.336852,
        lng: 2.083839,
      },
      size: [4, 8],
    },
    {
      id: `Service3`,
      location: {
        lat: 41.316852,
        lng: 2.093839,
      },
      size: [4, 8],
    },
  ];
}

export function getRewardRegions() {
  return [
    {
      lat: 41.3168,
      lng: 2.09,
      radius: 500,
      reward: 1000,
    },
    {
      lat: 42.3168,
      lng: 2.09,
      radius: 500,
      reward: 1000,
    },
  ];
}
