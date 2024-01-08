'use server'

import { error } from 'console'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function fetchCashflowTable(category: string) {
  try {
    const res = await fetch(`http://localhost:8000/cashflow?category=${category}`)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function fetchDate(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/cashflow/:${id}`)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function updateDate(prevState: { message: string }, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    newDate: z.string()
  })

  const data = schema.parse({
    id: formData.get('id'),
    newDate: formData.get('date')
  })

  try {
    await fetch(`http://localhost:8000/cashflow/:${data.id}`, { method: 'PUT', body: JSON.stringify(data.newDate), })

    revalidatePath('/cashflow-tables')
    return { message: 'Date updated successfully' }
  } catch (error) {
    return { message: 'Failed to update data' }
  }
}

export async function editDate(id: string, newDate: Date) {
  // const schema = z.object({
  //   id: z.string().min(1),
  //   newDate: z.string()
  // })

  // const data = schema.parse({
  //   id: id,
  //   newDate: newDate
  // })

  try {
    await fetch(`http://localhost:8000/cashflow/${id}`, {
      method: 'PATCH', headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({ date: newDate }),
    })

    revalidatePath('/cashflow-tables')
    return { message: 'Date updated successfully' }
  } catch (error) {
    return { message: 'Failed to update data' }
  }
}