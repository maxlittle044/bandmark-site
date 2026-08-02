import { prisma } from "@/lib/prisma";

export const FREE_MONTHLY_WRITING_LIMIT = 2;

export async function getWritingUsageThisMonth(userId: string): Promise<number> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return prisma.writingSubmission.count({
    where: { userId, submittedAt: { gte: startOfMonth } },
  });
}
