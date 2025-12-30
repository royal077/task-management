import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const internPassword = await bcrypt.hash('intern123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const intern = await prisma.user.upsert({
    where: { email: 'intern@example.com' },
    update: {},
    create: {
      email: 'intern@example.com',
      name: 'Intern User',
      password: internPassword,
      role: 'INTERN',
    },
  })

  console.log({ admin, intern })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
