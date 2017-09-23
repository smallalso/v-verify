export default function (value) {
  if (value === undefined || value === null || value === '') {
    return false;
  }

  return !! String(value).trim().length;
}
