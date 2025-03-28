-- CreateTable
CREATE TABLE "Sandbox" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sandbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sandbox_userId_idx" ON "Sandbox"("userId");
