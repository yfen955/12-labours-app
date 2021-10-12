
function formatDDMonthYear(dateString)
{
  var dt=new Date(dateString)
  return dt.getDate() + " " + dt.toLocaleString('default', { month: 'long' }) + " " + dt.getFullYear()
}

function formatMonDDYear(dateString)
{
  var dt=new Date(dateString)
  return dt.toLocaleString('default', { month: 'short' }) + " "+  dt.getDate() + ", " + dt.getFullYear()
}

export default (_, inject) => {
  inject('formatDDMonthYear', dateToFormat => {return formatDDMonthYear(dateToFormat)}),
  inject('formatMonDDYear', dateToFormat => {return formatMonDDYear(dateToFormat)})
}