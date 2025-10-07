import * as React from "react"
import { View } from "react-native"
import * as TablePrimitive from "@rn-primitives/table"
import { TextClassContext } from "./text"
import { cn } from '../lib'

function Table( { className, ...props }: React.ComponentProps<typeof TablePrimitive.Root> ) {
  return (
    <TablePrimitive.Root
      className={cn( "w-full caption-bottom text-sm", className )}
      {...props}
    />
  )
}


function TableHeader( { className, ...props }: React.ComponentProps<typeof TablePrimitive.Header> ) {
  return ( <TablePrimitive.Header
    role="rowgroup"
    className={cn( "border-border [&_tr]:border-b", className )}
    {...props}
  /> )
}

function TableBody( { className, style, ...props }: React.ComponentProps<typeof TablePrimitive.Body> ) {
  return (
    <TablePrimitive.Body
      className={cn( "web:flex-1 border-border [&_tr:last-child]:border-0", className )}
      style={[ { minHeight: 2 }, style ]}
      {...props}
    />
  )
}

function TableFooter( { className, style, ...props }: React.ComponentProps<typeof TablePrimitive.Footer> ) {
  return (
    <TablePrimitive.Footer
      className={cn( "bg-muted/50 font-medium [&>tr]:last:border-b-0", className )}
      {...props}
    />
  )
}

function TableRow( { className, style, ...props }: React.ComponentProps<typeof TablePrimitive.Row> ) {
  return (
    <TablePrimitive.Row
      className={cn(
        "flex-row border-border border-b web:transition-colors web:hover:bg-muted/50 web:data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function TableHead( { className, ...props }: React.ComponentProps<typeof TablePrimitive.Head> ) {
  return (
    <TextClassContext.Provider value="text-muted-foreground">
      <TablePrimitive.Head
        className={cn(
          "h-12 px-4 text-left justify-center font-medium [&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  )
}

function TableCell( { className, ...props }: React.ComponentProps<typeof TablePrimitive.Cell> ) {
  return (
    <TablePrimitive.Cell
      className={cn( "p-4 align-middle [&:has([role=checkbox])]:pr-0", className )}
      {...props}
    />
  )
}

function TableCaption( { className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View> ) {
  return (
    <View
      className={cn( "mt-4 text-sm text-muted-foreground", className )}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
}
