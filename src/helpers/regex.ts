export const regex = {
  licensePlate: {
    regex: /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/,
    message: 'License plate must be in the format ABC1234 or ABC1A34',
  },
  name: {
    regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    message: 'Name must be a string',
  },
};
