import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Container,
	Grid,
	Paper,
	List,
	ListItem,
	TextField,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2, 1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}))

export default function App() {
	const classes = useStyles()
	const today = new Date()
	const convertDate = (date) => {
		const dd = String(date.getDate()).padStart(2, "0")
		const mm = String(date.getMonth() + 1).padStart(2, "0")
		const yyyy = date.getFullYear()

		return yyyy + "-" + mm + "-" + dd
	}

	const [events, setEvents] = useState([
		{ index: 0, date: convertDate(today) },
		{ index: 1, date: convertDate(today) },
	])
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
		// console.log(index)
	}
	const handleDateChange = (event) => {
		console.log(event.target.value)
	}

	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Grid container>
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Paper elevation={2} className={classes.paper}>
							<List aria-label='list'>
								{events.map((event) => {
									return (
										<ListItem
											key={event.index}
											button
											selected={
												selectedIndex === event.index
											}
											onClick={(e) =>
												handleListItemClick(
													e,
													event.index,
												)
											}>
											{event.date}
											<TextField
												label='Event start date'
												type='date'
												onChange={(e) => {
													handleDateChange(e)
												}}
												defaultValue={event.date}
												className={classes.textField}
												InputLabelProps={{
													shrink: true,
												}}
											/>
										</ListItem>
									)
								})}
							</List>
						</Paper>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Container>
		</div>
	)
}
