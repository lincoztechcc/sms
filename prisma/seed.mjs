import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create a default school
  const school = await prisma.school.create({
    data: {
      name: "Default EduERP School",
      domain: "default.eduerp.com",
      plan: "PREMIUM",
    }
  })

  // Create SuperAdmin
  const superAdminPassword = await bcrypt.hash("superadmin123", 10)
  await prisma.user.create({
    data: {
      name: "System SuperAdmin",
      email: "superadmin@eduerp.com",
      password: superAdminPassword,
      role: "SUPERADMIN",
    }
  })

  // Create Admin
  const adminPassword = await bcrypt.hash("admin123", 10)
  await prisma.user.create({
    data: {
      name: "School Admin",
      email: "admin@eduerp.com",
      password: adminPassword,
      role: "ADMIN",
      schoolId: school.id
    }
  })

  // Create Teacher
  const teacherPassword = await bcrypt.hash("teacher123", 10)
  const teacherUser = await prisma.user.create({
    data: {
      name: "John Teacher",
      email: "teacher@eduerp.com",
      password: teacherPassword,
      role: "TEACHER",
      schoolId: school.id
    }
  })
  await prisma.teacher.create({
    data: {
      teacherId: "TCH-001",
      name: "John Teacher",
      email: "teacher@eduerp.com",
      phone: "1234567890",
      qualification: "MSc Mathematics",
      department: "Science",
      salary: 50000,
      schoolId: school.id
    }
  })

  // Create Student
  const studentPassword = await bcrypt.hash("student123", 10)
  const studentUser = await prisma.user.create({
    data: {
      name: "Jane Student",
      email: "student@eduerp.com",
      password: studentPassword,
      role: "STUDENT",
      schoolId: school.id
    }
  })
  await prisma.student.create({
    data: {
      studentId: "STU-001",
      name: "Jane Student",
      grade: "10",
      section: "A",
      rollNo: "15",
      parentName: "Richard Student",
      phone: "0987654321",
      schoolId: school.id
    }
  })

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
