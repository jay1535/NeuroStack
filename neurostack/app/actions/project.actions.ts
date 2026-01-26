"use server";

import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";

export async function getProjects() {
  const user = await currentUser();

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    throw new Error("Unauthorized");
  }

  const email = user.primaryEmailAddress.emailAddress;

  const projects = await db
    .select()
    .from(ProjectTable)
    .where(eq(ProjectTable.userId, email))
    

  return projects;
}
