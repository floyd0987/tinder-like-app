import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { id: 1, email: 'eronne@example.com', name: 'Eronne', age: 51, photoUrl: '/images/1.jpg' },
    { id: 2, email: 'alice@example.com', name: 'Alice', age: 25, photoUrl: '/images/2.jpg' },
    { id: 3, email: 'ekaterina@example.com', name: 'Ekaterina', age: 42, photoUrl: '/images/3.jpg' },
    { id: 4, email: 'eve@example.com', name: 'Eve', age: 27, photoUrl: '/images/4.jpg' },
    { id: 5, email: 'grace@example.com', name: 'Grace', age: 23, photoUrl: '/images/5.jpg' },
    { id: 6, email: 'heidi@example.com', name: 'Heidi', age: 26, photoUrl: '/images/1.jpg' },
    { id: 7, email: 'judy@example.com', name: 'Judy', age: 21, photoUrl: '/images/2.jpg' },
    { id: 8, email: 'laura@example.com', name: 'Laura', age: 22, photoUrl: '/images/3.jpg' },
    { id: 9, email: 'nina@example.com', name: 'Nina', age: 24, photoUrl: '/images/4.jpg' },
    { id: 10, email: 'paula@example.com', name: 'Paula', age: 26, photoUrl: '/images/5.jpg' },
    { id: 11, email: 'rachel@example.com', name: 'Rachel', age: 25, photoUrl: '/images/1.jpg' },
    { id: 12, email: 'tina@example.com', name: 'Tina', age: 23, photoUrl: '/images/2.jpg' },
    { id: 13, email: 'wendy@example.com', name: 'Wendy', age: 26, photoUrl: '/images/3.jpg' },
    { id: 14, email: 'yvonne@example.com', name: 'Yvonne', age: 24, photoUrl: '/images/4.jpg' },
    { id: 15, email: 'amber@example.com', name: 'Amber', age: 22, photoUrl: '/images/5.jpg' },
    { id: 16, email: 'cindy@example.com', name: 'Cindy', age: 25, photoUrl: '/images/1.jpg' },
    { id: 17, email: 'ella@example.com', name: 'Ella', age: 23, photoUrl: '/images/2.jpg' },
    { id: 18, email: 'gina@example.com', name: 'Gina', age: 26, photoUrl: '/images/3.jpg' },
    { id: 19, email: 'iris@example.com', name: 'Iris', age: 24, photoUrl: '/images/4.jpg' },
    { id: 20, email: 'katie@example.com', name: 'Katie', age: 22, photoUrl: '/images/5.jpg' },
    { id: 21, email: 'mia@example.com', name: 'Mia', age: 25, photoUrl: '/images/1.jpg' },
    { id: 22, email: 'olga@example.com', name: 'Olga', age: 23, photoUrl: '/images/2.jpg' },
    { id: 23, email: 'queenie@example.com', name: 'Queenie', age: 26, photoUrl: '/images/3.jpg' },
    { id: 24, email: 'sara@example.com', name: 'Sara', age: 24, photoUrl: '/images/4.jpg' },
    { id: 25, email: 'uma@example.com', name: 'Uma', age: 22, photoUrl: '/images/5.jpg' },
    { id: 26, email: 'victoria@example.com', name: 'Victoria', age: 27, photoUrl: '/images/1.jpg' },
    { id: 27, email: 'amber2@example.com', name: 'Amber', age: 23, photoUrl: '/images/2.jpg' },
    { id: 28, email: 'cindy2@example.com', name: 'Cindy', age: 26, photoUrl: '/images/3.jpg' },
    { id: 29, email: 'ella2@example.com', name: 'Ella', age: 24, photoUrl: '/images/4.jpg' },
    { id: 30, email: 'gina2@example.com', name: 'Gina', age: 22, photoUrl: '/images/5.jpg' },
    { id: 31, email: 'iris2@example.com', name: 'Iris', age: 25, photoUrl: '/images/1.jpg' },
    { id: 32, email: 'katie2@example.com', name: 'Katie', age: 23, photoUrl: '/images/2.jpg' },
    { id: 33, email: 'mia2@example.com', name: 'Mia', age: 26, photoUrl: '/images/3.jpg' },
    { id: 34, email: 'olga2@example.com', name: 'Olga', age: 24, photoUrl: '/images/4.jpg' },
    { id: 35, email: 'queenie2@example.com', name: 'Queenie', age: 22, photoUrl: '/images/5.jpg' },
    { id: 36, email: 'sara2@example.com', name: 'Sara', age: 25, photoUrl: '/images/1.jpg' },
    { id: 37, email: 'uma2@example.com', name: 'Uma', age: 23, photoUrl: '/images/2.jpg' },
    { id: 38, email: 'victoria2@example.com', name: 'Victoria', age: 26, photoUrl: '/images/3.jpg' },
    { id: 39, email: 'anna@example.com', name: 'Anna', age: 24, photoUrl: '/images/4.jpg' },
    { id: 40, email: 'alice2@example.com', name: 'Alice', age: 22, photoUrl: '/images/5.jpg' },
    { id: 41, email: 'jessica@example.com', name: 'Jessica', age: 25, photoUrl: '/images/1.jpg' },
    { id: 42, email: 'eve2@example.com', name: 'Eve', age: 23, photoUrl: '/images/2.jpg' },
    { id: 43, email: 'grace2@example.com', name: 'Grace', age: 26, photoUrl: '/images/3.jpg' },
    { id: 44, email: 'heidi2@example.com', name: 'Heidi', age: 24, photoUrl: '/images/4.jpg' },
    { id: 45, email: 'judy2@example.com', name: 'Judy', age: 22, photoUrl: '/images/5.jpg' },
    { id: 46, email: 'laura2@example.com', name: 'Laura', age: 25, photoUrl: '/images/1.jpg' },
    { id: 47, email: 'nina2@example.com', name: 'Nina', age: 23, photoUrl: '/images/2.jpg' },
    { id: 48, email: 'paula2@example.com', name: 'Paula', age: 26, photoUrl: '/images/3.jpg' },
    { id: 49, email: 'rachel2@example.com', name: 'Rachel', age: 24, photoUrl: '/images/4.jpg' },
    { id: 50, email: 'tina2@example.com', name: 'Tina', age: 22, photoUrl: '/images/5.jpg' },
  ];



  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });


  // Optional: create some actions
  await prisma.action.createMany({
    data: [
      { userId: 3, recipientId: 1, action: 'LIKE' }
    ],
  });

  console.log('Seed finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
