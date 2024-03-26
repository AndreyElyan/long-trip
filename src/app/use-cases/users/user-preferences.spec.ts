import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

describe('User Preferences', () => {
  it('should be able to update user preferences', async () => {
    const usersRepository = new InMemoryUsersRepository();

    const body = {
      id: 'valid_id',
      conversation: true,
      music: true,
      smoking: true,
      pets: true,
      hadVaccines: true,
      eatFood: true,
    };

    const user = usersRepository.user_response;

    if (!user) throw new Error('User not found');

    await usersRepository.updatePreferences(
      user.id,
      body.conversation,
      body.music,
      body.smoking,
      body.pets,
      body.hadVaccines,
      body.eatFood,
    );

    const preferences = await usersRepository.findPreferencesByUserId(user.id);

    expect(preferences).toEqual({
      conversation: body.conversation,
      music: body.music,
      smoking: body.smoking,
      pets: body.pets,
      hadVaccines: body.hadVaccines,
      eatFood: body.eatFood,
    });
  });
});
