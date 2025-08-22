import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { id: 1, email: 'eronne@example.com', name: 'Eronne', age: 51, photoUrl: 'https://placehold.co/400x400/8c728e/fff' },
    { id: 2, email: 'alice@example.com', name: 'Alice', age: 25, photoUrl: 'https://placehold.co/400x400/ff7f7f/fff' },
    { id: 3, email: 'bob@example.com', name: 'Bob', age: 28, photoUrl: 'https://placehold.co/400x400/7f7fff/fff' },
    { id: 4, email: 'ekaterina@example.com', name: 'Ekaterina', age: 42, photoUrl: 'https://placehold.co/400x400/7fff7f/fff' },
    { id: 5, email: 'dave@example.com', name: 'Dave', age: 30, photoUrl: 'https://placehold.co/400x400/ffdf7f/fff' },
    { id: 6, email: 'eve@example.com', name: 'Eve', age: 27, photoUrl: 'https://placehold.co/400x400/df7fff/fff' },
    { id: 7, email: 'frank@example.com', name: 'Frank', age: 24, photoUrl: 'https://placehold.co/400x400/7fdfff/fff' },
    { id: 8, email: 'grace@example.com', name: 'Grace', age: 23, photoUrl: 'https://placehold.co/400x400/ff7fdf/fff' },
    { id: 9, email: 'heidi@example.com', name: 'Heidi', age: 26, photoUrl: 'https://placehold.co/400x400/7fffdf/fff' },
    { id: 10, email: 'ivan@example.com', name: 'Ivan', age: 29, photoUrl: 'https://placehold.co/400x400/df7f7f/fff' },
    { id: 11, email: 'judy@example.com', name: 'Judy', age: 21, photoUrl: 'https://placehold.co/400x400/7fdf7f/fff' },
    { id: 12, email: 'karl@example.com', name: 'Karl', age: 31, photoUrl: 'https://placehold.co/400x400/7f7fdf/fff' },
    { id: 13, email: 'laura@example.com', name: 'Laura', age: 22, photoUrl: 'https://placehold.co/400x400/ff7f7f/fff' },
    { id: 14, email: 'mike@example.com', name: 'Mike', age: 33, photoUrl: 'https://placehold.co/400x400/7fff7f/fff' },
    { id: 15, email: 'nina@example.com', name: 'Nina', age: 24, photoUrl: 'https://placehold.co/400x400/ffdf7f/fff' },
    { id: 16, email: 'oliver@example.com', name: 'Oliver', age: 28, photoUrl: 'https://placehold.co/400x400/df7fff/fff' },
    { id: 17, email: 'paula@example.com', name: 'Paula', age: 26, photoUrl: 'https://placehold.co/400x400/7fdfff/fff' },
    { id: 18, email: 'quentin@example.com', name: 'Quentin', age: 29, photoUrl: 'https://placehold.co/400x400/ff7fdf/fff' },
    { id: 19, email: 'rachel@example.com', name: 'Rachel', age: 25, photoUrl: 'https://placehold.co/400x400/7fffdf/fff' },
    { id: 20, email: 'steve@example.com', name: 'Steve', age: 32, photoUrl: 'https://placehold.co/400x400/df7f7f/fff' },
    { id: 21, email: 'tina@example.com', name: 'Tina', age: 23, photoUrl: 'https://placehold.co/400x400/ff7f7f/fff' },
    { id: 22, email: 'umar@example.com', name: 'Umar', age: 27, photoUrl: 'https://placehold.co/400x400/7f7fff/fff' },
    { id: 23, email: 'victor@example.com', name: 'Victor', age: 28, photoUrl: 'https://placehold.co/400x400/7fff7f/fff' },
    { id: 24, email: 'wendy@example.com', name: 'Wendy', age: 26, photoUrl: 'https://placehold.co/400x400/ffdf7f/fff' },
    { id: 25, email: 'xavier@example.com', name: 'Xavier', age: 31, photoUrl: 'https://placehold.co/400x400/df7fff/fff' },
    { id: 26, email: 'yvonne@example.com', name: 'Yvonne', age: 24, photoUrl: 'https://placehold.co/400x400/7fdfff/fff' },
    { id: 27, email: 'zach@example.com', name: 'Zach', age: 29, photoUrl: 'https://placehold.co/400x400/ff7fdf/fff' },
    { id: 28, email: 'amber@example.com', name: 'Amber', age: 22, photoUrl: 'https://placehold.co/400x400/7fffdf/fff' },
    { id: 29, email: 'brian@example.com', name: 'Brian', age: 30, photoUrl: 'https://placehold.co/400x400/df7f7f/fff' },
    { id: 30, email: 'cindy@example.com', name: 'Cindy', age: 25, photoUrl: 'https://placehold.co/400x400/7fdf7f/fff' },
    { id: 31, email: 'derek@example.com', name: 'Derek', age: 27, photoUrl: 'https://placehold.co/400x400/7f7fdf/fff' },
    { id: 32, email: 'ella@example.com', name: 'Ella', age: 23, photoUrl: 'https://placehold.co/400x400/ff7f7f/fff' },
    { id: 33, email: 'fred@example.com', name: 'Fred', age: 28, photoUrl: 'https://placehold.co/400x400/7f7fff/fff' },
    { id: 34, email: 'gina@example.com', name: 'Gina', age: 26, photoUrl: 'https://placehold.co/400x400/7fff7f/fff' },
    { id: 35, email: 'harry@example.com', name: 'Harry', age: 31, photoUrl: 'https://placehold.co/400x400/ffdf7f/fff' },
    { id: 36, email: 'iris@example.com', name: 'Iris', age: 24, photoUrl: 'https://placehold.co/400x400/df7fff/fff' },
    { id: 37, email: 'jack@example.com', name: 'Jack', age: 29, photoUrl: 'https://placehold.co/400x400/7fdfff/fff' },
    { id: 38, email: 'katie@example.com', name: 'Katie', age: 22, photoUrl: 'https://placehold.co/400x400/ff7fdf/fff' },
    { id: 39, email: 'leo@example.com', name: 'Leo', age: 27, photoUrl: 'https://placehold.co/400x400/7fffdf/fff' },
    { id: 40, email: 'mia@example.com', name: 'Mia', age: 25, photoUrl: 'https://placehold.co/400x400/df7f7f/fff' },
    { id: 41, email: 'nick@example.com', name: 'Nick', age: 30, photoUrl: 'https://placehold.co/400x400/7fdf7f/fff' },
    { id: 42, email: 'olga@example.com', name: 'Olga', age: 23, photoUrl: 'https://placehold.co/400x400/7f7fdf/fff' },
    { id: 43, email: 'paul@example.com', name: 'Paul', age: 28, photoUrl: 'https://placehold.co/400x400/ff7f7f/fff' },
    { id: 44, email: 'queenie@example.com', name: 'Queenie', age: 26, photoUrl: 'https://placehold.co/400x400/7f7fff/fff' },
    { id: 45, email: 'ryan@example.com', name: 'Ryan', age: 31, photoUrl: 'https://placehold.co/400x400/7fff7f/fff' },
    { id: 46, email: 'sara@example.com', name: 'Sara', age: 24, photoUrl: 'https://placehold.co/400x400/ffdf7f/fff' },
    { id: 47, email: 'tom@example.com', name: 'Tom', age: 29, photoUrl: 'https://placehold.co/400x400/df7fff/fff' },
    { id: 48, email: 'uma@example.com', name: 'Uma', age: 22, photoUrl: 'https://placehold.co/400x400/7fdfff/fff' },
    { id: 49, email: 'victoria@example.com', name: 'Victoria', age: 27, photoUrl: 'https://placehold.co/400x400/ff7fdf/fff' },
    { id: 50, email: 'will@example.com', name: 'Will', age: 25, photoUrl: 'https://placehold.co/400x400/7fffdf/fff' },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });


  // Optional: create some actions
  await prisma.action.createMany({
    data: [
      { userId: 4, recipientId: 1, action: 'LIKE' }, //  match with current user
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
