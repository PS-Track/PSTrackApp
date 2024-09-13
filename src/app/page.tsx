'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

// todo: make the names as Hover Card component

const days = [
  {
    day: '13/09',
    problemNumber: 1,
    link: 'https://leetcode.com/problems/two-sum/',
    topic: 'Array',
  },
  {
    day: '14/09',
    problemNumber: 2,
    link: 'https://leetcode.com/problems/add-two-numbers/',
    topic: 'Linked List',
  },
  {
    day: '15/09',
    problemNumber: 3,
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    topic: 'String',
  },
  {
    day: '16/09',
    problemNumber: 4,
    link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    topic: 'Array',
  },
  {
    day: '17/09',
    problemNumber: 5,
    link: 'https://leetcode.com/problems/longest-palindromic-substring/',
    topic: 'String',
  },
  {
    day: '18/09',
    problemNumber: 6,
    link: 'https://leetcode.com/problems/zigzag-conversion/',
    topic: 'String',
  },
  {
    day: '19/09',
    problemNumber: 7,
    link: 'https://leetcode.com/problems/reverse-integer/',
    topic: 'Math',
  },
]
const leetCoders = [
  '@Hüsam',
  '@Kholoud',
  '@Majd',
  '@Mohammed',
  '@Nour',
  '@Omar',
  '@Sara',
  '@Yazan',
  '@Yazan',
  '@Yazan',
  '@Hüsam',
  '@Kholoud',
  '@Majd',
  '@Yazan',
  '@Yazan',
  '@Yazan',
  '@Hüsam',
  '@Kholoud',
  '@Mohammed',
  '@Nour',
  '@Omar',
  '@Sara',
  '@Yazan',
  '@Yazan',
  '@Yazan',
]

export default function Home() {
  return (
    <div className="relative overflow-auto">
      <Table className="table-fixed">
        <TableHeader className="overflow-hidden rounded-t-md">
          <TableRow className="flex h-20 items-center overflow-hidden rounded-t-md border-b border-[#2f2f2f] hover:bg-[#2f2f2f]">
            {/** LeetCoders **/}
            <TableHead className="inline-flex w-28 items-center justify-center text-left font-medium">
              LeetCoders
            </TableHead>
            {/** Days **/}
            {days.map(day => (
              <TableHead
                key={day.day}
                className="inline-flex h-fit w-28 flex-col items-center justify-center gap-1 text-center"
              >
                <p>
                  <span>{day.day}</span>
                  <span> - </span>
                  <a
                    href={day.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    {`${day.problemNumber}`}
                  </a>
                </p>
                <Badge className="ml-1">{day.topic}</Badge>
              </TableHead>
            ))}
            {/** Performance **/}
            <TableHead className="inline-flex w-28 items-center justify-center text-center">
              Performance
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leetCoders.map(coder => (
            <TableRow
              key={coder}
              className="flex h-12 border-[#2f2f2f] hover:bg-[#2f2f2f]"
            >
              {/* Coder name */}
              <TableCell className="inline-flex w-28 items-center text-left">{coder}</TableCell>
              {/* Checkboxes for each day */}
              {days.map(day => (
                <TableCell
                  key={day.day}
                  className="inline-flex w-28 items-center justify-center text-center"
                >
                  <Checkbox className="border-gray-400" />
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/** Performance **/}
          <TableRow className="sticky bottom-0 flex h-12 border-t-2 border-[#2f2f2f] bg-[#1f1f1f]">
            <TableCell className="inline-flex w-28 items-center text-left">Total</TableCell>
            {days.map(day => (
              <TableCell
                key={day.day}
                className="inline-flex w-28 items-center justify-center text-center"
              >
                <Badge>100%</Badge>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
