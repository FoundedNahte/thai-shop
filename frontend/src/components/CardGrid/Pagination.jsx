import React from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { usePagination, DOTS } from './usePagination';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Container = tw.div`
    items-center justify-center
`

const PaginationContainer = tw.ul`
    items-center justify-center content-center flex p-4 m-6
`

const PaginationItem = tw.li`
    inline items-center justify-center
`

const HoverWrapper = tw.span`
    items-center justify-center cursor-default focus:bg-gray-300 hover:bg-gray-200 hover:cursor-pointer
`

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage, 
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if (currentPage + 1 != paginationRange.length + 1) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage - 1 != 0) {
            onPageChange(currentPage - 1);
        }
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <Container>
            <PaginationContainer>
                <HoverWrapper>
                    <PaginationItem>
                        <IconButton onClick={onPageChange(1)}>
                            <FirstPageIcon />
                        </IconButton>
                    </PaginationItem>
                </HoverWrapper>
                <HoverWrapper>
                    <PaginationItem>
                        <IconButton onClick={onPrevious}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </PaginationItem>
                </HoverWrapper>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return (
                            <HoverWrapper>
                                <PaginationItem>
                                    ...
                                </PaginationItem>
                            </HoverWrapper>
                        );
                    }

                    return (
                        <HoverWrapper>
                            <PaginationItem>
                                <Button onClick={onPageChange(pageNumber)}>
                                    {pageNumber}
                                </Button>
                            </PaginationItem>
                        </HoverWrapper>
                    );
                })}
                <HoverWrapper>
                    <PaginationItem>
                        <IconButton onClick={onNext}>
                            <ChevronRightIcon />
                        </IconButton>
                    </PaginationItem>
                </HoverWrapper>
                <HoverWrapper>
                    <PaginationItem>
                        <IconButton onClick={onPageChange(paginationRange.length)}>
                            <LastPageIcon />
                        </IconButton>
                    </PaginationItem>
                </HoverWrapper>
            </PaginationContainer>
        </Container>
    )
}

export default Pagination;