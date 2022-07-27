import React from 'react';
import { Breadcrumbs } from '@mui/material/Breadcrumbs';;
import { Typography } from '@mui/material/Typography';
const Breadcrumbs = ({history, location: { pathname }}) => {
    const pathnames = pathname.split("/").filter(x => x);
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {pathnames.length > 0 ? (
                <Link onClick={() => history.push("/")}>Home</Link>
            ) : (
                <Typography> Home </Typography>
            )}
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Typography key={name}>{name}</Typography>
                ) : (
                    <Link key={name} onClick={() => history.push(routeTo)}>
                        {name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    )
}

export default Breadcrumbs