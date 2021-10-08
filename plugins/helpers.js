
function formatMonthDDYear(dateString)
{
  var dt=new Date(dateString)
  return dt.getDate() + " " + dt.toLocaleString('default', { month: 'long' }) + " " + dt.getFullYear()
}

export default (_, inject) => {
  inject('formatMonthDDYear', dateToFormat => {return formatMonthDDYear(dateToFormat)})
}