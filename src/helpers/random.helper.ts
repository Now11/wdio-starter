import * as fake from 'faker';

export const rndNumber = (from = 1, to = 9999) => fake.random.number({ min: from, max: to });
