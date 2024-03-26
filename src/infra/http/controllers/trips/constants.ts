export const descriptionGetTripsByAddress = `This endpoint allows you to search for trips based on specific parameters. You can search for trips between two locations, specify the number of seats you need, and apply filters to find trips that meet your preferences. Filters can be combined with the '&' symbol.

To use this endpoint, include the origin and destination locations in the URL, along with the number of seats you need. You can also specify the date of the trip.

For example: /origin/city1/destination/city2/seats/2/date/05-07-1992

To filter your search, you can add the following order preferences:

order-by-value: sort trips by cost in ascending order
order-by-distance: sort trips by distance in ascending order
order-by-duration: sort trips by duration in ascending order
You can also apply filters to find trips that meet your preferences:

conversation: filter trips where passengers are open to conversation
music: filter trips where passengers are open to playing music
smoking: filter trips where smoking is allowed
pets: filter trips where pets are allowed
hadVaccines: filter trips where passengers have been vaccinated
eatFood: filter trips where eating food is allowed

category must be added as category={category}

If you apply multiple filters, they will be combined with the '&' symbol. For example:

/origin/city1/destination/city2/seats/2/date/05-07-1992/order-by-value&order-by-time-afternoon&smoking&category=van

This will search for trips from city1 to city2 on 05-07-1992 with 2 seats available, sorted by value and departing in the afternoon, and where smoking is allowed, also the category of the vehicle must be van.`;
