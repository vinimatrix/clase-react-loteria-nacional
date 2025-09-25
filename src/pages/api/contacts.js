import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    // Crear nuevo contacto
    case 'POST':
      try {
        const { name, email, phone, company } = req.body
        const contact = await prisma.contact.create({
          data: { name, email, phone, company }
        })
        res.status(201).json(contact)
      } catch (error) {
        res.status(500).json({ error: 'Error al crear contacto' })
      }
      break

    // Obtener todos los contactos
    case 'GET':
      const contacts = await prisma.contact.findMany()
      res.status(200).json(contacts)
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}