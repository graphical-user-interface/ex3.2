import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Container,
	Grid,
	Paper,
	List,
	ListItem,
	TextField,
	Typography,
	Button,
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
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
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
	const handleListItemClick = (i) => {
		setSelectedIndex(i)
	}
	const handleDateChange = (e, i) => {
		let newEvents = [...events]
		newEvents[i].date = e.target.value
		setEvents(newEvents)
	}
	const handleAddEvent = () => {
		const newIndex =
			Math.max.apply(
				Math,
				events.map(function (event) {
					return event.index
				}),
			) + 1

		setEvents([...events, { index: newIndex, date: convertDate(today) }])
	}
	const handleDeleteEvent = () => {
		if (selectedIndex >= 0) {
			const newEvents = events.filter(
				(event) => event.index !== selectedIndex,
			)
			setEvents(newEvents)
			setSelectedIndex(-1)
		}
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
											className={classes.row}
											button
											selected={
												selectedIndex === event.index
											}
											onClick={(e) =>
												handleListItemClick(event.index)
											}>
											<Typography
												className={classes.date}>
												{event.date}
											</Typography>
											<TextField
												type='date'
												onChange={(e) => {
													handleDateChange(
														e,
														event.index,
													)
												}}
												defaultValue={event.date}
												InputLabelProps={{
													shrink: true,
												}}
											/>
										</ListItem>
									)
								})}
							</List>
							<Grid className={classes.row}>
								<Button
									variant='contained'
									color='primary'
									onClick={handleAddEvent}>
									Add
								</Button>
								<Button
									variant='contained'
									color='secondary'
									onClick={handleDeleteEvent}>
									Delete
								</Button>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Container>
		</div>
	)
}
