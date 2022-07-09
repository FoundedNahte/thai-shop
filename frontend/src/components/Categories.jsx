import React, { Fragment } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';

const Container = styled.div`
	padding: 0;
`

function Categories() {
	const [value, setValue] = React.useState(0);

	const tabs = [];

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	};

	return (
		<div>
			<Container>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label="Sauce" />
					<Tab label="Fruit" />
					<Tab label="Snacks" />
				</Tabs>
			</Container>
		</div>
	)
}

export default Categories;
