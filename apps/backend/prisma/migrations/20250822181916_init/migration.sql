-- CreateEnum
CREATE TYPE "public"."ActionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Action" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "action" "public"."ActionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Match" (
    "id" SERIAL NOT NULL,
    "user1Id" INTEGER NOT NULL,
    "user2Id" INTEGER NOT NULL,
    "matchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Action_userId_recipientId_key" ON "public"."Action"("userId", "recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_user1Id_user2Id_key" ON "public"."Match"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
