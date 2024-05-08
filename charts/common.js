
function getTotalCountByDayForDateRange(startDate,endDate,serviceType,type){
	const start = new Date(startDate);
	const end = new Date(endDate);
	//end.setDate(end.getDate() + 1);
	
	const dailyTotals = {};
	const dates = [];
	const values = [];
	const name = serviceType;
 
	
	var key = '';
	
	snowflake_usage_data.forEach(record => {
		const recordDate = new Date(record.Date);

		if((serviceType == "All" || record.Attribute === serviceType) && recordDate >= start && recordDate <= end){
			const dayKey = recordDate.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
			const monthName = moment(dayKey).format("MMM Y");
			
			if(type == "Monthly"){
				key = monthName;
			}
			else if(type == "Daily"){
				key = dayKey;
			}
			
			if(!dailyTotals[key]){
				dailyTotals[key] = 0;
			}

			dailyTotals[key] += parseInt(record.Value, 10);
		}
	});

 
	for(const [date, value] of Object.entries(dailyTotals)){
		dates.push(date);
		values.push(value);
	}

	return {name, dates,values };
}