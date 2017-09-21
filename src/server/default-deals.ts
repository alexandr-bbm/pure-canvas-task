const now = new Date();
const data = [
  {
    id: 1,
    value: 22.51,
  },
  {
    id: 2,
    value: 13.24,
  },
  {
    id: 3,
    value: 17.47,
  },
  {
    id: 4,
    value: 15.94,
  },
  {
    id: 5,
    value: 9.55,
  },
  {
    id: 6,
    value: 4,
  },
  {
    id: 7,
    value: 17,
  },
  {
    id: 8,
    value: 24,
  },
  {
    id: 9,
    value: 5,
  },
  {
    id: 10,
    value: 3,
  },
];

const SECONDS = [0, 15, 30, 45];

export const fakeDeals = data.reverse().map((item, index) => {
  const date = new Date(now.getTime() - index * 1000 * 60);
  date.setSeconds(SECONDS[index % SECONDS.length]);
  return ({
    ...item,
    date,
  });
}).reverse();