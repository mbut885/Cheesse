import Referee from '../../../main/chess/referee/Referee';

describe('Referee', () => {
  let referee: Referee;

  beforeEach(() => {
    referee = new Referee();
  });

  it('should be defined', () => {
    expect(referee).toBeDefined();
  });

  // Add more tests here
});