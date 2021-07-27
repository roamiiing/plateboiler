import { replaceAll } from './vars';

describe('variables handling', () => {
  it('should replace vars without modifiers', () => {
    expect(replaceAll('__name__ __verb__ __adj__', {
      name: 'you',
      verb: 'are',
      adj: 'amazing',
    })).toEqual('you are amazing');
  });

  it('should replace vars with modifiers', () => {
    expect(replaceAll('__name.camel.capitalize__ __verb.upper__ __adj__', {
      name: 'pizza_with_pineapples',
      verb: 'is',
      adj: 'great',
    })).toEqual('PizzaWithPineapples IS great');
  });
});
