//As the logic behind is very simple I made few tests in order
//to demostrate I'm familiar with this.

describe('Testing api methods to get user data.', () => {
  //This spec works as an example of spying calls
  it('Should have been called only once with dhguissepe', async () => {
    spyOn(api.users, 'get')
    const response = await api.users.get('dhguissepe')

    expect(api.users.get).toHaveBeenCalledTimes(1)
    expect(api.users.get).toHaveBeenCalledWith('dhguissepe')
  })

  //This spec also works for any other kind of exception like failed to fetch
  it('Should throw an exception if not found', async () => {
    try {
      const response = await api.users.get('qwldqw')
      expect(() => {}).toThrow()
    } catch {
      expect(() => {throw 'Not Found'}).toThrow()
    }
  })
})