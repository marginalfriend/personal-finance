'use server'

export async function fetchCashflowTable(category:string) {
  try {
    const res = await fetch(`http://localhost:8000/cashflow?category=${category}`)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

// export async function editDate(id:string, date:string) {
//   try {
//     const res = await 
//   }
// }