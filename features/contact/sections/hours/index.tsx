import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { hoursData } from './data'

export function HoursSection() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Image
            src="/geist-icons/clock.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
          {hoursData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Table>
          <TableBody>
            {hoursData.schedule.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.day}</TableCell>
                <TableCell className="text-right text-muted-foreground">{item.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {hoursData.holiday?.hours && (
          <div className="mt-6 rounded-md border bg-primary/5 p-4">
            <p className="font-semibold">{hoursData.holiday.title}</p>
            <p className="text-muted-foreground">{hoursData.holiday.hours}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
