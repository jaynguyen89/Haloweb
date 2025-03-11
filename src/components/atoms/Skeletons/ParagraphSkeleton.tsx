import { TextSkeleton } from 'src/components/atoms/Skeletons/Skeletons';
import Grid from '@mui/material/Grid';

const ParagraphSkeleton = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextSkeleton />
                <TextSkeleton />
            </Grid>
            <Grid item xs={6}>
                <TextSkeleton />
                <TextSkeleton />
            </Grid>
            <Grid item xs={12}>
                <TextSkeleton />
                <TextSkeleton />
            </Grid>
        </Grid>
    );
};

export default ParagraphSkeleton;