describe('Testing GateWay methods to get user data.', () => {

  it('Should get dhguissepe data and not null or undefined.', async () => {
    const getCurrentUserData = new GateWay('dhguissepe')
    const response = await getCurrentUserData.getUserSummary()

    expect(response).toEqual(jasmine.anything())
    expect(response.login).toBe('dhguissepe')
  })

  it('Should get facebook data and not null or undefined.', async () => {
    const getCurrentUserData = new GateWay('facebook')
    const response = await getCurrentUserData.getUserSummary()

    expect(response).toEqual(jasmine.anything())
    expect(response.login).toBe('facebook')
  })

  it('Should get google data and not null or undefined.', async () => {
    const getCurrentUserData = new GateWay('google')
    const response = await getCurrentUserData.getUserSummary()

    expect(response).toEqual(jasmine.anything())
    expect(response.login).toBe('google')
  })

  it('Should throw an exception if not found.', async () => {
    const getCurrentUserData = new GateWay('')
    try {
      const response = await getCurrentUserData.getUserSummary()
      fail("Function didn't throw an exception when server responded with 404.")
    } catch(error) {
      expect(error).toBe('User Not Found')
    }
  })

})

describe(`Testing how user data can change DOM element attributes by evaluating it as falsy or truthy.`, () => {

  it('Should evaluate the following values as falsy: name, bio.', async () => {
    const getCurrentUserData = new GateWay('danielito')
    const response = await getCurrentUserData.getUserSummary()
    expect(response.name).toBeFalsy()
    expect(response.bio).toBeFalsy()
  })

  it('Should evaluate the following values as truthy: login, name, bio, avatar_url.', async () => {
    const getCurrentUserData = new GateWay('dhguissepe')
    const response = await getCurrentUserData.getUserSummary()
    expect(response.login).toBeTruthy()
    expect(response.bio).toBeTruthy()
    expect(response.name).toBeTruthy()
    expect(response.avatar_url).toBeTruthy()
  })

})