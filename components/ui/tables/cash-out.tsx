'use client'

import { useState } from 'react'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../table'
import { Status } from '../status'

export function CashOutTable() {
  
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Cash Out</TableHead>
        <TableHead>Receiver</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell>50$</TableCell>
        <TableCell>Paypal Transfer</TableCell>
        <TableCell><Status /></TableCell>
      </TableRow>
    </TableBody>
  </Table>    
  )
}