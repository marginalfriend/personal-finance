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

    return { message: 'Date updated successfully' }
  } catch (error) {
    return { message: 'Failed to update data' }
  }
}

export async function updateData({ id, newData }: { id: string, newData: {} }) {
  if (newData === null) {
    return { message: newData }
  }
  try {
    await fetch(`http://localhost:8000/cashflow/${id}`, {
      method: 'PATCH', headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        ...newData,
      }),
    })

    return { message: `Updated ${newData}` }
  } catch (error) {
    return { message: `Error: ${error}` }
  }
}

export async function deleteRow(id:string) {
  try {
    await fetch(`http://localhost:8000/cashflow/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    revalidatePath('/cashflow-tables')
    return { message: `Deleted row ${id}`}
  } catch (error) {

    revalidatePath('/cashflow-tables')
    return {message:`Could not delete row ${id}. Error: ${error}`}
  }
}

export async function refresh(path: string) {
  revalidatePath(path)
}