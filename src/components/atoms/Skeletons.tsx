import React from 'react';
import { Skeleton, SkeletonProps } from '@mui/material';

type TSkeleton = Omit<SkeletonProps, 'animation' | 'variant'>;

export const TextSkeleton = ({
    sx = { fontSize: '0.7rem' },
}: TSkeleton) => {
    return (
        <Skeleton variant='text' sx={sx} />
    );
};

export const RoundedSkeleton = ({
    width,
    height = 50,
}: TSkeleton) => {
    return (
        <Skeleton variant='rounded' width={width} height={height} />
    );
};

export const RectangularSkeleton = ({
    width,
    height = 50,
}: TSkeleton) => {
    return (
        <Skeleton variant='rectangular' width={width} height={height} />
    );
};

export const CircularSkeleton = ({
    width = 50,
    height = 50,
}: TSkeleton) => {
    return (
        <Skeleton variant='circular' width={width} height={height} />
    );
};
