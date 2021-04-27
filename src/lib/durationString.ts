function durationString(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hour = Math.floor(minute / 60);
  minute = minute % 60;
  let day = Math.floor(hour / 24);
  hour = hour % 24;

  let result = ""

  if (day !== 0)
    result += ` ${day} Days`
  if (hour !== 0)
    result += ` ${hour} Hours`
  if (minute !== 0)
    result += ` ${minute} Minutes`

  return result
}

export default durationString