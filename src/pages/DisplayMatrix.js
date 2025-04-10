import React from "react";
import { Box, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

export default function DisplayMatrix({ table, rowHeaders, colHeaders }) {
    if (!table)
        return (<Box>Loading...</Box>)
    return (
        <TableContainer component={Paper}>
            <Table size="small" sx={{ border: "1px solid black" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid black" }}></TableCell>
                        {colHeaders.map((col, i) => (
                            <TableCell key={i} sx={{ fontWeight: "bold", borderRight: "1px solid black" }}>
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid black" }}>
                                {rowHeaders[i]} {/* Row Header */}
                            </TableCell>
                            {row.map((cell, j) => (
                                <TableCell key={j} sx={{ borderRight: "1px solid black" }}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};