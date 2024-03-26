import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.users.upsert({
    where: { email: 'andreyelyan.contato@gmail.com' },
    update: {},
    create: {
      id: randomUUID(),
      imageUrl: '',
      name: 'Andrey',
      lastName: 'Silveira',
      password: '12345678',
      dateOfBirth: '19/07/1998',
      gender: 'Masculino',
      cellPhone: '51985809513',
      email: 'andreyelyan.contato@gmail.com',
    },
  });

  const post2 = await prisma.users.upsert({
    where: { email: 'andreyelyan@gmail.com' },
    update: {},
    create: {
      id: randomUUID(),
      imageUrl: '',
      name: 'Andrey',
      lastName: 'Elyan',
      password: '12345678',
      dateOfBirth: '19/07/1998',
      gender: 'Masculino',
      cellPhone: '51985809513',
      email: 'andreyelyan@gmail.com',
    },
  });

  const post3 = await prisma.userCarInfo.upsert({
    where: { id: 1 },
    update: { userId: post1.id },
    create: {
      id: 1,
      userId: post1.id,
      category: 'car',
      model: 'Gol',
      make: 'Volkswagen',
      year: '2010',
      color: 'Preto',
      licensePlate: 'ABC1234',
      imageUrl: '',
    },
  });

  const post4 = await prisma.trips.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      origin: 'Porto Alegre',
      destination: 'São Paulo',
      lat: 0,
      lng: 0,
      latDest: 0,
      lngDest: 0,
      date: '2021-07-19',
      time: '10:00',
      cost: 100,
      seats: 4,
      description: 'Viagem de teste',
      carInfoId: post3.id,
      driverId: post1.id,
      distance: 0,
      duration: 0,
      status: '',
      tripType: 'DRIVER',
    },
  });

  console.info({
    post1,
    post2,
    post3,
    post4,
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
