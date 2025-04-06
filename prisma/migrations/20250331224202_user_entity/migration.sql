/*
  Warnings:

  - A unique constraint covering the columns `[commentId,createdByUserId]` on the table `Downvote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,createdByUserId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Downvote_commentId_createdByUserId_key" ON "Downvote"("commentId", "createdByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_commentId_createdByUserId_key" ON "Upvote"("commentId", "createdByUserId");
