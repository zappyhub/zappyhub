-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLegalRegister" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphoneNumber" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "public"."Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "public"."Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_cellphoneNumber_key" ON "public"."Company"("cellphoneNumber");

-- CreateIndex
CREATE INDEX "Company_email_idx" ON "public"."Company"("email");

-- CreateIndex
CREATE INDEX "Company_cellphoneNumber_idx" ON "public"."Company"("cellphoneNumber");

-- CreateIndex
CREATE INDEX "Company_companyName_idx" ON "public"."Company"("companyName");

-- CreateIndex
CREATE INDEX "Company_active_idx" ON "public"."Company"("active");
