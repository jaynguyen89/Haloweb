import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import VerticalDrawer from 'src/components/compounds/VerticalDrawer/VerticalDrawer';
import useStyles from 'src/components/showcases/styles';

const mockMenu = [
    {
        title: 'Menu title',
        items: [
            {
                text: 'Menu item 1',
                icon: faCaretRight,
            },
            {
                isActive: true,
                text: 'Menu item 2',
            },
            {
                isActive: true,
                text: 'Menu item 3',
                icon: faCaretRight,
            },
            {
                text: 'Menu item 4',
                icon: faCaretRight,
                subMenu: [
                    {
                        text: 'Menu item 1',
                        icon: faCaretRight,
                    },
                    {
                        isActive: true,
                        text: 'Menu item 2',
                    },
                    {
                        isActive: true,
                        text: 'Menu item 1',
                        icon: faCaretRight,
                    },
                    {
                        text: 'Menu item 1',
                        icon: faCaretRight,
                    },
                ],
            },
        ],
    },
    {
        title: 'Menu title',
        items: [
            {
                text: 'Menu item 1',
                icon: faCaretRight,
            },
            {
                isActive: true,
                text: 'Menu item 2',
            },
            {
                text: 'Menu item 3',
                icon: faCaretRight,
            },
            {
                isActive: true,
                text: 'Menu item 4',
            },
        ],
    },
    {
        title: 'Menu title',
        items: [
            {
                text: 'Menu item 1',
                icon: faCaretRight,
            },
        ],
    },
];

const VerticalDrawerShowcase = () => {
    const styles = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
                <Typography variant='body1'>Example vertical drawer</Typography>
                <VerticalDrawer menuItems={mockMenu} />
            </Grid>
            <Grid item md={6} sm={12}>
                <Box className={styles.code}>
                    <code>
                        {`<VerticalDrawer menuItems={mockMenu} />`}
                    </code>
                </Box>

                <br />
                <Typography variant='body1'>Menu data</Typography>
                <Box className={styles.code}>
                    <code>
                        {`[
                            {
                                title: 'Menu title',
                                items: [
                                    {
                                        text: 'Menu item 1',
                                        icon: faCaretRight,
                                    },
                                    {
                                        isActive: true,
                                        text: 'Menu item 2',
                                    },
                                    {
                                        isActive: true,
                                        text: 'Menu item 3',
                                        icon: faCaretRight,
                                    },
                                    {
                                        text: 'Menu item 4',
                                        icon: faCaretRight,
                                        subMenu: [
                                            {
                                                text: 'Menu item 1',
                                                icon: faCaretRight,
                                            },
                                            {
                                                isActive: true,
                                                text: 'Menu item 2',
                                            },
                                            {
                                                isActive: true,
                                                text: 'Menu item 1',
                                                icon: faCaretRight,
                                            },
                                            {
                                                text: 'Menu item 1',
                                                icon: faCaretRight,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'Menu title',
                                items: [
                                    {
                                        text: 'Menu item 1',
                                        icon: faCaretRight,
                                    },
                                    {
                                        isActive: true,
                                        text: 'Menu item 2',
                                    },
                                    {
                                        text: 'Menu item 3',
                                        icon: faCaretRight,
                                    },
                                    {
                                        isActive: true,
                                        text: 'Menu item 4',
                                    },
                                ],
                            },
                            {
                                title: 'Menu title',
                                items: [
                                    {
                                        text: 'Menu item 1',
                                        icon: faCaretRight,
                                    },
                                ],
                            },
                        ];`}
                    </code>
                </Box>

                <br />
                <Typography variant='body1'>Data schema</Typography>
                <Box className={styles.code}>
                    <code>
                        {`
                        type TVerticalDrawerMenuItem = {
                            isActive?: true,
                            text: string,
                            icon?: IconName | IconDefinition | string,
                            subMenu?: Array<Omit<TVerticalDrawerMenuItem, 'subMenu'>>,
                        };`}
                    </code>
                </Box>
                <Box className={styles.code}>
                    <code>
                        {`
                        type TVerticalDrawerMenu = {
                            title: string,
                            items: Array<TVerticalDrawerMenuItem>,
                            divider?: true,
                        };`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default VerticalDrawerShowcase;
