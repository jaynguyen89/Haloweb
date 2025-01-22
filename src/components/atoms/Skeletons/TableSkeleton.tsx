import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { RoundedSkeleton, TextSkeleton } from './Skeletons';

const TableSkeleton = () => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell><TextSkeleton /></TableCell>
                    <TableCell><TextSkeleton /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><RoundedSkeleton /></TableCell>
                    <TableCell><RoundedSkeleton /></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default TableSkeleton;